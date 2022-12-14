import { Component, OnInit } from '@angular/core';
import { Team } from '../models.ts/Team';
import { TrelloService } from '../services/trello.service';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {

  public combName = "";
  public top = "";
  public jung = "";
  public mid = "";
  public adc = "";
  public supp = "";


  constructor(public trello: TrelloService) { }

  ngOnInit(): void {
  }

  send(){
    let team = new Team('')
    team.setLanes(this.top, this.jung, this.mid, this.adc, this.supp)
    this.trello.createCard(this.combName, team.toString())
  }

}
