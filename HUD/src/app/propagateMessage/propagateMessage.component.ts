/**
 * Created by Corentin on 12/01/17.
 */
import {Component, Input} from "@angular/core";
import {Message} from "../messages/Message";
import {MessagesService} from "../messages/messages.service";


@Component({
  selector: 'propagate-message',
  styleUrls: [ './propagateMessage.component.scss'],
  templateUrl: './propagateMessage.component.html'
})
export class PropagateMessage {
  /*@Input("message") message: Message = null;*/

/*  // affichage directe: moyen de repondre
  @Input("accept") accept:string;
  @Input("decline") decline:string;*/

  constructor(_messageService : MessagesService) {

  }
}
