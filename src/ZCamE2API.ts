import { EventEmitter } from "eventemitter3";
import { ZCamE2 } from "./types/ZCamE2";
import bent from "bent";

const getBent = bent("GET", "string", 200, 409);

export interface AtemEvents {
  error: [string];
  info: [string];
  debug: [string];
  connected: [];
  disconnected: [];
  stateChanged: [AtemState, string[]];
  receivedCommands: [IDeserializedCommand[]];
}

export class ZCamE2API extends EventEmitter<AtemEvents> {
  public ip: string;
  /**
   * Creates an instance of ZCamE2API.
   *
   * @param {IP} string
   * @memberof ZCamE2API
   */
  constructor(IP) {
    super();
    this.ip = IP;
  }
  /**
   * You can use this command as 'ping' to see if the camera is OK.
   *
   * @returns {Promise<ZCamE2>}
   * @memberof ZCamE2API
   */
  public async getInfo(): Promise<ZCamE2> {
    const result = await getBent(`http://${this.ip}/info`);
    const resultJSON = JSON.parse(result);
    const zCam: ZCamE2 = {
      model: resultJSON.model,
      number: Number(resultJSON.number),
      sw: resultJSON.sw,
      hw: resultJSON.hw,
      mac: resultJSON.mac,
      eth_ip: resultJSON.eth_ip,
      sn: resultJSON.sn,
      ble: resultJSON.ble,
      bt_mac: resultJSON.bt_mac,
    };
    return zCam;
  }
  /**
   * Only one client can control the camera at the same time.
   *
   * You can try to get the session in the following interface, status code 409 means that you are failed to get the session.
   *
   * @returns {Promise<ZCamE2>}
   * @memberof ZCamE2API
   */
  public async getSession(): Promise<any> {
    const result = await getBent(`http://${this.ip}/ctrl/session`);

    return result;
  }
}
