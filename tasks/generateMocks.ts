import t from "tap";
import { ZCamE2API } from "../src/ZCamE2API";
import nock from "nock";
import path from "path";

const nockBack = nock.back;
nockBack.fixtures = path.resolve(__dirname, "..", "test", "fixtures");
nockBack.setMode("record");

const zCam = new ZCamE2API("192.168.86.79");

t.teardown(async () => {
  await zCam.closeSession();
});

t.afterEach(async (done) => {
  await zCam.closeSession();
  zCam.removeAllListeners(ZCamE2API.ERROR_EVENT);
  done();
});

t.test("get info", async (t) => {
  nockBack("getInfo.json", async (nockDone) => {
    await zCam.getInfo();
    nockDone();
    t.pass("all is good");
    t.done();
  });
});

// t.test("get session", async (t) => {
//   const { completeRecording, assertScopesFinished } = await record(
//     "getSession"
//   );
//   await zCam.checkSession();
//   completeRecording();
//   assertScopesFinished();
//   t.pass("this is fine");
//   t.done();
// });

t.test("get focus", async (t) => {
  nockBack("getFocus.json", async (nockDone) => {
    await zCam.get("focus");
    nockDone();
    t.pass("all is good");
    t.done();
  });
});

t.test("get lens_focus_pos", async (t) => {
  nockBack("getLensFocusPos.json", async (nockDone) => {
    await zCam.get("lens_focus_pos");
    nockDone();
    t.pass("all is good");
    t.done();
  });
});

t.test("get sn", async (t) => {
  nockBack("getSerialNumber.json", async (nockDone) => {
    await zCam.get("sn");
    nockDone();
    t.pass("all is good");
    t.done();
  });
});

t.test("get nonexistent property", async (t) => {
  nockBack("getNonexistent.json", async (nockDone) => {
    await zCam.get("poop");
    nockDone();
    t.pass("all is good");
    t.done();
  });
});

t.test("set lens_focus_pos", async (t) => {
  zCam.on(ZCamE2API.ERROR_EVENT, (e) => {
    //do nothing
  });
  nockBack("setLensFocusPos.json", async (nockDone) => {
    await zCam.set({ lens_focus_pos: 3562 });
    nockDone();
  });
});
