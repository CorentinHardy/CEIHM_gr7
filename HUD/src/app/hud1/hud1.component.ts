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
  selector: 'hud1',
  styleUrls: [ './hud1.component.scss', '../huds.scss' ],
  templateUrl: './hud1.component.html'
})
export class Hud1Component implements OnInit {
  currentlySend:boolean = false;
  selection:{main:number, top:number, bottom:number} = {
    main: 0,
    top: 0,
    bottom: 0
  };

  constructor(public _messageService: MessagesService){
    this.resetSelection();
    this.test();
  }

  test(){
    console.log("start test");
    setTimeout(() => {
      console.log("to the bottom");
      this.bottomSelection();
    }, 2000);
    setTimeout(() => {
      console.log("to the bottom 2");
      this.bottomSelection();
    }, 3000);
    setTimeout(() => {
      console.log("to the up");
      this.topSelection();
    }, 4000);
    setTimeout(() => {
      console.log("send");
      this.send();
    }, 5000);
  }

  resetSelection(){
    this.selection = {
      main: 0,
      top: this._messageService.max,
      bottom: 1
    }
  }

  send(){
    this.currentlySend = true;
    setTimeout(() => {
      this.currentlySend = false;
    }, 1000)
  }

  topSelection(){
    this.selection.bottom = this.iterateToTop(this.selection.bottom);
    this.selection.main = this.iterateToTop(this.selection.main);
    this.selection.top = this.iterateToTop(this.selection.top);
  }

  bottomSelection(){
    this.selection.bottom = this.iterateToBottom(this.selection.bottom);
    this.selection.main = this.iterateToBottom(this.selection.main);
    this.selection.top = this.iterateToBottom(this.selection.top);
  }

  private iterateToTop(n:number):number{
    if(n >= this._messageService.max)
      return 0;
    return n + 1;
  }

  private iterateToBottom(n:number):number{
    if (n == 0)
      return this._messageService.max;
    return n - 1;
  }

  public ngOnInit() {

  }
}
