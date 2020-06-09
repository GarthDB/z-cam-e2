import t from "tap";
import { ZCamE2API } from "../src/ZCamE2API";

t.test("constructor takes IP", (t) => {
  const ip = "192.168.1.1";
  const zCam = new ZCamE2API(ip);
  t.match(zCam.ip, ip);
  t.done();
});

t.test("get info", async (t) => {
  const zCam = new ZCamE2API("192.168.86.79");
  zCam.on("error", (evt) => {
    console.log("there was a problem");
  });
  const result = await zCam.getInfo();
  console.log(result);
  t.pass("all is good");
  t.done();
});
