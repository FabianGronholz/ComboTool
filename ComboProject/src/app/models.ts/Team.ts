export class Team {
  name: string[];
  top: string[];
  jung: string[];
  mid: string[];
  adc: string[];
  supp: string[];

  constructor(name: string[], top: string[], jung: string[], mid: string[], adc: string[], supp: string[]) {
    this.name = name;
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

  private cardId: string = '';
  public setId(x: string){
    this.cardId = x;
  }
  public getId(){
    return this.cardId
  }
  private readeblename = "";
  public setName(x:string){
      this.readeblename = x;
  }
  public getName(){
    return this.readeblename
  }


}