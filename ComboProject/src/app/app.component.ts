import { Component, OnInit } from '@angular/core';
import { Team } from './models.ts/Team';
import { TrelloService } from './services/trello.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ComboProject';

  public team!: Team;

  constructor(public trello: TrelloService){}

  public ngOnInit(): void {
   this.trello.getCards()
   //this.trello.createCard('Test', new Team().toArray())
  }



}
