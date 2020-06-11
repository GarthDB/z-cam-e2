import bent from "bent";
import WebSocket from "isomorphic-ws";

import { EventEmitter } from "events";
import {
  ZCamE2Info,
  ChoiceResponse,
  RangeResponse,
  StringResponse,
} from "./types";
import { FocusState } from "./state";

const getBent = bent(200, 409);

function queryString(data: object) {
  const array = Object.keys(data).map((key) => {
    return `${key}=${data[key]}`;
  });
  return array.join(",");
}

export class ZCamError extends Error {
  public message: string;
  public data: any;
  public name: string;
  constructor(message: string, data = {}) {
    super(message);
    this.name = "ZCamError";
    Object.assign(this, { message, data });
  }
}

export class ZCamE2API extends EventEmitter {
  public static OPEN_EVENT = "open";
  public static INFO_EVENT = "info";
  public static DEBUG_EVENT = "debug";
  public static ERROR_EVENT = "error";
  public static DISCONNECT_EVENT = "disconnect";
  public static STATE_CHANGE_EVENT = "stateChanged";
  public readonly ip: string;
  private readonly ws: WebSocket;
  /**
   * Creates an instance of ZCamE2API.
   *
   * @param {IP} string
   * @memberof ZCamE2API
   */
  constructor(IP: string, emitterOptions = {}) {
    super(emitterOptions);
    this.ip = IP;
    this.ws = new WebSocket(`ws://${this.ip}:81/`);
    this.ws.addEventListener("open", (event) => {
      console.log("websocket open");
      this.checkSession();
      this.emit(ZCamE2API.OPEN_EVENT, event);
    });
    this.ws.addEventListener("message", (event) => {
      this.emit(ZCamE2API.STATE_CHANGE_EVENT, JSON.parse(event.data));
      console.log(JSON.parse(event.data));
    });
    this.ws.addEventListener("error", (event) => {
      console.error(event);
    });
    this.ws.addEventListener("close", (event) => {
      this.emit(
        ZCamE2API.DISCONNECT_EVENT,
        "Connection with camera was closed",
        event
      );
    });
  }
  /**
   * Checks if session is available.
   *
   * @private
   * @memberof ZCamE2API
   */
  public async checkSession() {
    return await this.get("session");
  }
  public closeSession() {
    this.ws.close();
  }
  public async getInfo(): Promise<any> {
    return await this.get("info");
  }
  public async get(prop: string): Promise<any> {
    let url: string;
    switch (prop) {
      case "info":
        url = "/info";
        break;
      case "session":
        url = "/ctrl/session";
        break;
      default:
        url = `/ctrl/get?${queryString({ k: prop })}`;
        break;
    }
    const result = await getBent(`http://${this.ip}${url}`);
    if (result.status == 409) {
      const rString = await result.text();
      this.emit(
        ZCamE2API.ERROR_EVENT,
        new ZCamError("Session is unavailable", rString)
      );
      return rString;
    }
    const rJson = await result.json();
    if (rJson.code == -1) {
      this.emit(
        ZCamE2API.ERROR_EVENT,
        new ZCamError(`The property "${prop}" was not recognized`, rJson)
      );
    }
    switch (rJson.type) {
      case 1:
        return new ChoiceResponse(rJson);
      case 2:
        return new RangeResponse(rJson);
      case 3:
        return new StringResponse(rJson);
      default:
        return rJson;
    }
  }
  public async set(data: object): Promise<any> {
    const url = `/ctrl/set?${queryString(data)}`;
    return await getBent(`http://${this.ip}${url}`);
  }
}
