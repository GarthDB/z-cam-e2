import bent from "bent";
import WebSocket from "isomorphic-ws";

import { EventEmitter } from "events";
import { ZCamE2 } from "./types/ZCamE2";
import { FocusState } from "./state";

const getBent = bent(200, 409);

export class ZCamE2API extends EventEmitter {
  public ip: string;
  private readonly ws: WebSocket;
  /**
   * Creates an instance of ZCamE2API.
   *
   * @param {IP} string
   * @memberof ZCamE2API
   */
  constructor(IP) {
    super();
    this.ip = IP;
    this.ws = new WebSocket(`ws://${this.ip}:81/`);
    this.ws.addEventListener("open", (event) => {
      this._checkSession();
    });
    this.ws.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
    });
    this.ws.addEventListener("error", (event) => {
      console.log("Message from server ", event);
    });
  }
  /**
   * Checks if session is available.
   *
   * @private
   * @memberof ZCamE2API
   */
  private async _checkSession() {
    const result = await getBent(`http://${this.ip}/ctrl/session`);
    if (result.status == 409) {
      this.emit("error", "Session is unavailable");
    }
  }
  /**
   * You can use this command as 'ping' to see if the camera is OK.
   *
   * @returns {Promise<ZCamE2>}
   * @memberof ZCamE2API
   */
  public async getInfo(): Promise<any> {
    await getBent(`http://${this.ip}/ctrl/set?focus=MF`);
    const result = await getBent(`http://${this.ip}/ctrl/set?focus=MF`);
    if (result.status == 409) {
      this.emit("error", "Session is unavailable");
      return await result.text();
    }
    return await result.json();
  }
  public async getFocusState():Promise<any> {
    const result =
    focus: Enum.Focus;
    af_mode: Enum.AfMode;
    mf_drive: Enum.MfDrive;
    ois_mode: Enum.OisMode;
    af_lock: Enum.AfLock;
    lens_zoom_pos: Range;
    lens_focus_pos: Range;
    lens_focus_spd: Range;
    caf: Enum.ContinuosAf;
    caf_sens: Enum.ContinuosAfSensitivity;
    live_caf: Enum.LiveContinuosAf;
    mf_mag: Enum.MfMagnify;
    restore_lens_pos: Enum.RestoreLensPosition;
  }
}
