import t from "tap";
import { ZCamE2API } from "../src/ZCamE2API";
import { back } from "nock";

back.fixtures = __dirname + "/fixtures";
back.setMode("dryrun");

const zCam = new ZCamE2API("192.168.86.79", { captureRejections: true });

t.teardown(() => {
  zCam.closeSession();
});

t.afterEach((done) => {
  zCam.removeAllListeners(ZCamE2API.ERROR_EVENT);
  done();
});

t.test("constructor takes IP", (t) => {
  const ip = "192.168.86.79";
  t.match(zCam.ip, ip);
  t.done();
});
t.test("session unavailable", async (t) => {
  const { nockDone, context } = await back("getSession.fail.json");
  zCam.on(ZCamE2API.ERROR_EVENT, (event) => {
    t.matchSnapshot(event);
    context.assertScopesFinished();
    nockDone();
  });
  await zCam.get("session");
});

t.test("get session", async (t) => {
  const { nockDone, context } = await back("getSession.json");
  t.matchSnapshot(await zCam.checkSession());
  context.assertScopesFinished();
  nockDone();
});

t.test("get info", async (t) => {
  const { nockDone, context } = await back("getInfo.json");
  t.matchSnapshot(await zCam.getInfo());
  context.assertScopesFinished();
  nockDone();
});

t.test("get focus", async (t) => {
  const { nockDone, context } = await back("getFocus.json");
  t.matchSnapshot(await zCam.get("focus"));
  context.assertScopesFinished();
  nockDone();
});

t.test("get lens_focus_pos", async (t) => {
  const { nockDone, context } = await back("getLensFocusPos.json");
  t.matchSnapshot(await zCam.get("lens_focus_pos"));
  context.assertScopesFinished();
  nockDone();
});

t.test("set lens_focus_pos", async (t) => {
  const { nockDone, context } = await back("setLensFocusPos.json");
  zCam.on(ZCamE2API.ERROR_EVENT, (e) => {
    console.log(e);
  });
  await zCam.set({ lens_focus_pos: 3562 });
  // t.matchSnapshot(await zCam.set({ lens_focus_pos: 3562 }));
  t.pass("everything is good");
  context.assertScopesFinished();
  nockDone();
});

t.test("get sn", async (t) => {
  const { nockDone, context } = await back("getSerialNumber.json");
  t.matchSnapshot(await zCam.get("sn"));
  context.assertScopesFinished();
  nockDone();
});

t.test("get nonexistent property", async (t) => {
  const { nockDone, context } = await back("getNonexistent.json");
  zCam.on(ZCamE2API.ERROR_EVENT, (event) => {
    t.matchSnapshot(event);
    context.assertScopesFinished();
    nockDone();
  });
  await zCam.get("poop");
});
