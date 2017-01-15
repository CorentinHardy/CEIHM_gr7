/**
 * Created by Corentin on 12/01/17.
 */
import {Component} from "@angular/core";
import {MessagesService} from "../messages/messages.service";

@Component({
  selector: 'receive',
  styleUrls: [ './receive.component.scss'],
  templateUrl: './receive.component.html'
})
export class ReceiveComponent {
  printNumber:number = 4;

  constructor(public _messageService: MessagesService){

  }


}
