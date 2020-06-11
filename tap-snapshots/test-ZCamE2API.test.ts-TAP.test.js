/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/ZCamE2API.test.ts TAP get focus > must match snapshot 1`] = `
ChoiceResponse {
  "key": "focus",
  "options": Array [
    "MF",
    "AF",
  ],
  "readOnly": false,
  "value": "MF",
}
`

exports[`test/ZCamE2API.test.ts TAP get info > must match snapshot 1`] = `
Object {
  "ble": "0.14",
  "bt_mac": "",
  "eth_ip": "192.168.86.79",
  "feature": Object {
    "fwCheck": "1",
    "fwName": "*.zip",
    "md5Check": "1",
    "photoSupport": "1",
    "platform": "hisi",
    "product_catalog": "camera",
    "rebootAfterClearSettings": "0",
    "rebootAfterVideoSystem": "0",
    "release": true,
    "setCfgToAll": "0",
    "snapSupportExposureMode": "1",
    "snapSupportFmt": Object {
      "fmt": Array [
        "C4KP29.97 (Low Noise)",
        "C4KP23.98 (Low Noise)",
        "4KP29.97 (Low Noise)",
        "4KP23.98 (Low Noise)",
        "C4KP29.97",
        "C4KP23.98",
        "4KP29.97",
        "4KP23.98",
        "2880P29.97 (1:1)",
        "2880P23.98 (1:1)",
        "2336x1344P59.94",
        "2336x1344P29.97",
        "2336x1344P23.98",
        "1080P59.94",
        "1080P29.97",
        "1080P23.98",
        "C4KP25 (Low Noise)",
        "4KP25 (Low Noise)",
        "C4KP25",
        "4KP25",
        "2880P25 (1:1)",
        "2336x1344P50",
        "2336x1344P25",
        "1080P50",
        "1080P25",
        "C4KP24 (Low Noise)",
        "4KP24 (Low Noise)",
        "C4KP24",
        "4KP24",
        "2880P24 (1:1)",
        "2336x1344P24",
        "1080P24",
      ],
      "isAllFmt": "1",
    },
    "stopPreviewInSnap": "0",
    "stopPreviewInTimelapse": "0",
    "syncOnlyMaster": "1",
    "timelapseSupportFmt": Object {
      "fmt": Array [
        "C4KP29.97 (Low Noise)",
        "C4KP23.98 (Low Noise)",
        "4KP29.97 (Low Noise)",
        "4KP23.98 (Low Noise)",
        "C4KP29.97",
        "C4KP23.98",
        "4KP29.97",
        "4KP23.98",
        "2880P29.97 (1:1)",
        "2880P23.98 (1:1)",
        "2336x1344P59.94",
        "2336x1344P29.97",
        "2336x1344P23.98",
        "1080P59.94",
        "1080P29.97",
        "1080P23.98",
        "C4KP25 (Low Noise)",
        "4KP25 (Low Noise)",
        "C4KP25",
        "4KP25",
        "2880P25 (1:1)",
        "2336x1344P50",
        "2336x1344P25",
        "1080P50",
        "1080P25",
        "C4KP24 (Low Noise)",
        "4KP24 (Low Noise)",
        "C4KP24",
        "4KP24",
        "2880P24 (1:1)",
        "2336x1344P24",
        "1080P24",
      ],
      "isAllFmt": "1",
    },
    "upgradeWOCard": "1",
    "wsSupport": "1",
  },
  "hw": "0.0",
  "mac": "2:4b:ba:c4:ef:8c",
  "model": "elephant",
  "number": "1",
  "sn": "446C0030098",
  "sw": "0.95.0",
}
`

exports[`test/ZCamE2API.test.ts TAP get lens_focus_pos > must match snapshot 1`] = `
RangeResponse {
  "key": "lens_focus_pos",
  "max": 16309,
  "min": 0,
  "readOnly": false,
  "step": 1,
  "value": 3562,
}
`

exports[`test/ZCamE2API.test.ts TAP get nonexistent property > must match snapshot 1`] = `
ZCamError: The property "poop" was not recognized {
  "data": Object {
    "code": -1,
    "desc": "Key is not supported",
    "msg": "",
  },
  "name": "ZCamError",
}
`

exports[`test/ZCamE2API.test.ts TAP get session > must match snapshot 1`] = `
Object {
  "code": 0,
  "desc": "",
  "msg": "",
}
`

exports[`test/ZCamE2API.test.ts TAP get sn > must match snapshot 1`] = `
StringResponse {
  "key": "sn",
  "readOnly": true,
  "value": "446C0030098",
}
`

exports[`test/ZCamE2API.test.ts TAP session unavailable > must match snapshot 1`] = `
ZCamError: Session is unavailable {
  "data": "",
  "name": "ZCamError",
}
`
