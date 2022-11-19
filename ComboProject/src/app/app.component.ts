import { Xliff2 } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
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

  public teamArray: Team[] = [new Team([''],[],[],[],[],[])];

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

  deleteMe(x: Team){
    this.trello.editCard(x.getId())
  }

  deleteChamp(champname: string, cardId: string){
    let x2 = '';
    this.teamArray.forEach(value => {
      if(value.getId() == cardId){
        x2 = value.toString().replace(champname, '')
      }
    })
    
    this.trello.deleteChamp(cardId, x2)
  }

}
