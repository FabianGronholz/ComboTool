export class Team{
    top: string[];
    jung: string[];
    mid: string[];
    adc: string[];
    supp: string[];

    constructor(){
        this.top = [];
        this.jung = [];
        this.mid = [];
        this.adc = [];
        this.supp = [];
    }

    public toArray(){
        return this.top.toString() +  '/' + this.jung.toString() + '/' + this.mid.toString() + '/' + this.adc.toString() + '/' + this.supp.toString() 
    }

}