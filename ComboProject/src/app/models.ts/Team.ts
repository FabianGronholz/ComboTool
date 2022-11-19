export class Team {
  name: string;
  public lanes!: string[][];

  constructor(name: string) {
    this.name = name;
    this.lanes = [[], [], [], [], []];
  }

  public toString() {
    let returnString = '';
    this.lanes.forEach((value) => {
      returnString += (value.toString() + '/');
    });
    return returnString
    
  }

  private cardId: string = '';
  public setId(x: string) {
    this.cardId = x;
  }
  public getId() {
    return this.cardId;
  }
  private readeblename = '';
  public setName(x: string) {
    this.readeblename = x;
  }
  public getName() {
    return this.readeblename;
  }

  public setLanes(a: string, b:string, c:string, d:string, e:string){
      this.lanes[0].push(a)
      this.lanes[1].push(b)
      this.lanes[2].push(c)
      this.lanes[3].push(d)
      this.lanes[4].push(e)
      console.log(this.lanes)
  }
}
