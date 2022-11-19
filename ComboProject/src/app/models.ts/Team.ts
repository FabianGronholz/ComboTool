export class Team {
  top: string[];
  jung: string[];
  mid: string[];
  adc: string[];
  supp: string[];

  constructor(top: string[], jung: string[], mid: string[], adc: string[], supp: string[]) {
    this.top = top;
    this.jung = jung;
    this.mid = mid;
    this.adc = adc;
    this.supp = supp;
  }


  public toString() {
    return (
      this.top.toString() +
      '/' +
      this.jung.toString() +
      '/' +
      this.mid.toString() +
      '/' +
      this.adc.toString() +
      '/' +
      this.supp.toString()
    );
  }

  public iterable() {
    return [this.top, this.jung, this.mid, this.adc, this.supp];
  }
}