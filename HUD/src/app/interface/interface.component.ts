/**
 * Created by Corentin on 15/01/17.
 */
import {Component} from "@angular/core";
import {Http} from "@angular/http";
import {MessagesService} from "../messages/messages.service";

@Component({
  selector: 'interfaceAdmin',
  styleUrls: [ './interface.component.scss' ],
  templateUrl: './interface.component.html'
})
export class InterfaceAdmin{
  constructor(private messageService:MessagesService){
    console.log("constructor InterfaceAdmin");
  }

  push(n:number){
    console.log("produce http request push " + n);
    this.messageService.sendCommand(n);
//    this._http.get(this.messageService.request + "/push/" + n);
//    console.log("send get ", this.messageService.request + "/push/" + n);
  }

  send(n:number){
    console.log("we send extern message ", n);
    this.messageService.sendMessage(n);
  }
}
