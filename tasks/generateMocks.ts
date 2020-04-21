import t from "tap";
import { ZCamE2API } from "../src/ZCamE2API";
import { setupRecorder } from "nock-record";
import path from 'path';

const record = setupRecorder({fixturePath: path.resolve(__dirname, '..', 'test', 'nockFixtures')});

t.test('get info', async (t) => {
  const { completeRecording, assertScopesFinished } = await record("getInfo");
  const zCam = new ZCamE2API('192.168.86.79');
  await zCam.getInfo();
  completeRecording();
  assertScopesFinished();
  t.pass('this is fine')
  t.done()
})

t.test('get session', async (t) => {
  const { completeRecording, assertScopesFinished } = await record("getSession");
  const zCam = new ZCamE2API('192.168.86.79');
  await zCam.getSession();
  completeRecording();
  assertScopesFinished();
  t.pass('this is fine')
  t.done()
})
