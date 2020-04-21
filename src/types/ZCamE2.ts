import { SubnetInfo } from "ip";

export class ZCamE2 {
  model: string;
  number: number;
  sw: string;
  hw: string;
  mac: string;
  eth_ip: SubnetInfo;
  sn: string;
  ble: string;
  bt_mac: string;
}

export class ZCamResponse {
  code: number;
  desc: string;
  msg: string;
}
