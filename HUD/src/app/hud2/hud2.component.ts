import {Component, OnInit} from "@angular/core";
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
export class Hud2Component {
  currentlySend:boolean = false;
  selection:number = 0;

  constructor(public _messageService: MessagesService){
    this.test();
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
    this.selection = n;
    this.currentlySend = true;
    setTimeout(() => {
      this.currentlySend = false;
    }, 1000)
  }
}
