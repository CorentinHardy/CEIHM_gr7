import {Component, Input} from "@angular/core";
import {Message} from "./Message";
/**
 * Created by Corentin on 15/01/17.
 */

@Component({
  selector: 'message',
  styleUrls: [ './message.component.scss' ],
  templateUrl: './message.component.html'
})
export class MessageComponent{
  @Input("message") m:Message;
  @Input("type") type:boolean;

  constructor(){

  }

  
}
