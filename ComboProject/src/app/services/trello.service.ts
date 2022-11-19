import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Team } from '../models.ts/Team';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrelloService {
  constructor(public http: HttpClient) {}
  public team!: Team;
  public teamSubject = new BehaviorSubject<Team[]>([
    new Team([''], [], [], [], [], []),
  ]);
  public teamObservable = this.teamSubject.asObservable();

  public editCard(x: string) {
    //link nicht fertig ich muss noch an die cardId von Trello kommen
    this.http
      .delete(
        'https://api.trello.com/1/cards/' +
          x +
          '?key=6068dbcc09d9708b859bc1f76581564f&token=ebd58cac0c5804b59cbf74dcfdc45565931d1ec6e13c4317ce52878576a71514'
      )
      .subscribe({
        next: () => {
          this.getCards();
        },
      });
  }

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
      .subscribe({
        next: () => {
          this.getCards();
        },
      });
  }

  public getCards() {
    this.http
      .get<[]>(
        'https://api.trello.com/1/boards/HdFwA5Ju/cards?key=6068dbcc09d9708b859bc1f76581564f&token=ebd58cac0c5804b59cbf74dcfdc45565931d1ec6e13c4317ce52878576a71514'
      )
      .subscribe({
        next: (result) => {
          console.log(result);
          let teamArray: Team[] = [];
          for (let i = 0; i < result.length; i++) {
            //@ts-ignore
            let reresult: string = result[i].desc;
            //@ts-ignore
            let cardId: string = result[i].id;
            let team: Team = new Team([''], [], [], [], [], []);
            team.setId(cardId);
            //@ts-ignore
            team.setName(result[i].name);
            let aktuelleStelle: string[] = team.top;
            let currentString = '';
            const regexLetter: RegExp = new RegExp('[a-zA-Z]');
            const regexKomma: RegExp = new RegExp(',');
            const regexSlash: RegExp = new RegExp('/');
            team.name = ['Combo' + i];
            for (let i = 0; i < reresult.length; i++) {
              if (reresult.charAt(i).match(regexLetter)) {
                currentString += reresult.charAt(i);
              } else if (reresult.charAt(i).match(regexKomma)) {
                aktuelleStelle.push(currentString);
                currentString = '';
              } else if (reresult.charAt(i).match(regexSlash)) {
                aktuelleStelle.push(currentString);
                currentString = '';
                switch (aktuelleStelle) {
                  case team.top:
                    aktuelleStelle = team.jung;
                    break;
                  case team.jung:
                    aktuelleStelle = team.mid;
                    break;
                  case team.mid:
                    aktuelleStelle = team.adc;
                    break;
                  case team.adc:
                    aktuelleStelle = team.supp;
                    break;
                  default:
                }
              }
              if (i == reresult.length - 1) {
                aktuelleStelle.push(currentString);
              }
            }
            teamArray.push(team);
          }
          this.teamSubject.next(teamArray);
        },
      });
  }
}
