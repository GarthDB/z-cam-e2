import { EventEmitter } from "events";
import { ZCamE2 } from "./types/ZCamE2";
import bent from "bent";

const getJSON = bent("json");

export class ZCamE2API extends EventEmitter {
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
    const result = await getJSON(`http://${this.ip}/info`);
    const zCam: ZCamE2 = {
      model: result.model,
      number: Number(result.number),
      sw: result.sw,
      hw: result.hw,
      mac: result.mac,
      eth_ip: result.eth_ip,
      sn: result.sn,
      ble: result.ble,
      bt_mac: result.bt_mac,
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
    const result = await getJSON(`http://${this.ip}/ctrl/session`);
    return result;
  }
}
