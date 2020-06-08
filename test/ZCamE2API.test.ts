import t from "tap";
import { ZCamE2API } from "../src/ZCamE2API";
import { back } from "nock";

back.fixtures = __dirname + "/nockFixtures";
back.setMode("lockdown");

t.test("constructor takes IP", (t) => {
  const ip = "192.168.1.1";
  const zCam = new ZCamE2API(ip);
  t.match(zCam.ip, ip);
  t.done();
});

t.test("get info", async (t) => {
  const { nockDone, context } = await back("getInfo.json");
  const zCam = new ZCamE2API("192.168.86.79");
  const result = await zCam.getInfo();
  context.assertScopesFinished();
  nockDone();
});

t.test("get session", async (t) => {
  const { nockDone, context } = await back("getSession.json");
  const zCam = new ZCamE2API("192.168.86.79");
  const result = await zCam.getSession();
  context.assertScopesFinished();
  nockDone();
  console.log(result);
});

t.test("get session error if unavailable", async (t) => {
  const { nockDone, context } = await back("getSession.fail.json");
  const zCam = new ZCamE2API("192.168.86.79");
  const result = await zCam.getSession();
  context.assertScopesFinished();
  nockDone();
  console.log(result);
});
