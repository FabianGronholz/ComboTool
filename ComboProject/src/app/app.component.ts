import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { Team } from './models.ts/Team';
import { TrelloService } from './services/trello.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ComboProject';

  public teamArray: Team[] = [new Team([],[],[],[],[])];

  constructor(public trello: TrelloService,
   public matDialog: MatDialog){}

  public ngOnInit(): void {
   this.trello.getCards()
   this.trello.teamObservable.subscribe({
    next: value => {
      this.teamArray = value
    }
   })
  }

  public openDialog(){
    this.matDialog.open(CreateDialogComponent)
  }

}
