import * as Enum from "../enums";
import { Range } from "../types";

export interface FocusState {
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
