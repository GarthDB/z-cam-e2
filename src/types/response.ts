interface Response {
  key: string;
  readOnly: boolean;
  value: string | number;
}

export class ChoiceResponse implements Response {
  key: string;
  readOnly: boolean;
  value: string;
  options: Array<string>;
  constructor(response: any) {
    this.key = response.key;
    this.readOnly = Boolean(Number(response.ro));
    this.value = response.value;
    this.options = response.opts;
  }
}

export class RangeResponse implements Response {
  key: string;
  readOnly: boolean;
  value: number;
  min: number;
  max: number;
  step: number;
  constructor(response: any) {
    this.key = response.key;
    this.readOnly = Boolean(Number(response.ro));
    this.value = response.value;
    this.min = response.min;
    this.max = response.max;
    this.step = response.step;
  }
}

export class StringResponse implements Response {
  key: string;
  readOnly: boolean;
  value: string;
  constructor(response: any) {
    this.key = response.key;
    this.readOnly = Boolean(Number(response.ro));
    this.value = response.value;
  }
}
