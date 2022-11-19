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

  public deleteChamp(cardID: string, newdesc: string) {
    this.http
      .put(
        'https://api.trello.com/1/cards/' +
          cardID +
          '?key=6068dbcc09d9708b859bc1f76581564f&token=ebd58cac0c5804b59cbf74dcfdc45565931d1ec6e13c4317ce52878576a71514' +
          '&desc=' +
          newdesc,
        {}
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
            let lastWasKomma = false;
            team.name = ['Combo' + i];
            for (let i = 0; i < reresult.length; i++) {
              if (reresult.charAt(i).match(regexLetter)) {
                currentString += reresult.charAt(i);
                lastWasKomma = false;
              } else if (reresult.charAt(i).match(regexKomma)) {
                if (!lastWasKomma && i != 0) {
                  aktuelleStelle.push(currentString);
                  currentString = '';
                  lastWasKomma = true;
                } else {
                  //do nothing
                }
              } else if (reresult.charAt(i).match(regexSlash)) {
                if (!lastWasKomma) {
                  lastWasKomma = true;
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
                } else if (lastWasKomma) {
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
              }
              if (i == reresult.length - 1) {
                aktuelleStelle.push(currentString);
              }
              team.cleanUp()
            }

            teamArray.push(team);
          }
          this.teamSubject.next(teamArray);
        },
      });
  }
}
