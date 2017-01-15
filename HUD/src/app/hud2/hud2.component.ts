import {Component, OnInit, OnDestroy} from "@angular/core";
import {MessagesService} from "../messages/messages.service";
/**
 * Created by Corentin on 10/01/17.
 *
 * Component pour le 1er modele de volant:
 *    touche haut/bas pour selectionner
 *    touche validation pour valider -> afficher une petite notification
 *    touche annuler -> revenir au premier choix
 *  touches valider / annuler servent pour la transmission de message boule de
 *  neige ou l'envoi de message simple
 */

@Component({
  selector: 'hud2',
  styleUrls: [ './hud2.component.scss', '../huds.scss' ],
  templateUrl: './hud2.component.html'
})
export class Hud2Component implements OnDestroy{
  currentlySend:boolean = false;
  selection:number = 0;

  // we are in a simplest case of prog conc, so simplest solution
  private eventNumber:number = 0;

  constructor(public _messageService: MessagesService){
    console.log("register to MessageService");
    this._messageService.addHud2(this);
    // this.test();
  }

  test(){
    setTimeout(() => {
      this.send(0);
    }, 1000);

    setTimeout(() => {
      this.send(2);
    }, 1500);

    setTimeout(() => {
      this.send(3);
    }, 3000);
  }

  send(n:number){
    this.eventNumber++;
    let action:number = this.eventNumber;
    this.selection = n;
    this.currentlySend = true;
    setTimeout(() => {
      // we want to desactivate this if we have receive another message
      if (action == this.eventNumber)
        this.currentlySend = false;
    }, 2000)
  }

  public ngOnDestroy() {
    this._messageService.removeHud2(this);
  }
}
