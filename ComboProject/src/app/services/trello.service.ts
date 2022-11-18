import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Team } from '../models.ts/Team';


@Injectable({
  providedIn: 'root',
})
export class TrelloService {
  constructor(public http: HttpClient) {}

  public createCard(name: string, desc: string) {
    this.http
      .post(
        'https://api.trello.com/1/cards?idList=635c145c47bfed0031bdc198&key=6068dbcc09d9708b859bc1f76581564f&token=ebd58cac0c5804b59cbf74dcfdc45565931d1ec6e13c4317ce52878576a71514' +
          '&name=' +
          name +
          '&desc=' +
          desc,
        {}
      )
      .subscribe({ next: () => {} });
  }

  public getCards() {
    this.http
      .get(
        'https://api.trello.com/1/boards/HdFwA5Ju/cards?key=6068dbcc09d9708b859bc1f76581564f&token=ebd58cac0c5804b59cbf74dcfdc45565931d1ec6e13c4317ce52878576a71514'
      )
      .subscribe({
        next: (result) => {
          //@ts-ignore
          let reresult: string = result[0].desc
          let team: Team = new Team()
          let aktuelleStelle: string[] = team.top
          let currentString = ""
          const regexLetter: RegExp = new RegExp('[a-zA-Z]')
          const regexKomma: RegExp = new RegExp('\,')
          const regexSlash: RegExp = new RegExp('\/')
          for(let i = 0; i < reresult.length; i++){
            console.log(reresult)
              if(reresult.charAt(i).match(regexLetter)){
                currentString += reresult.charAt(i)
              }
              else if(reresult.charAt(i).match(regexKomma)){
                aktuelleStelle.push(currentString)
                currentString = ""
              }
              else if(reresult.charAt(i).match(regexSlash)){
                aktuelleStelle.push(currentString)
                currentString= ""
                switch(aktuelleStelle){
                  case team.top:
                    aktuelleStelle = team.jung
                    break;             
                  case team.jung:
                    aktuelleStelle = team.mid
                    break;
                  case team.mid:
                    aktuelleStelle = team.adc
                    break;
                  case team.adc:
                    aktuelleStelle = team.supp
                    break;
                  default:
                    console.log('done')
                }
              }
              if(i == reresult.length){
                aktuelleStelle.push(currentString)
              }
          }
          console.log(team)
        },
      });
  }
}
