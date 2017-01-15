import {Injectable} from "@angular/core";
import {Message} from "./Message";
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import {Hud1Component} from "../hud1/hud1.component";
import {Hud2Component} from "../hud2/hud2.component";


@Injectable()
export class MessagesService {
  /**
   * Time when we remove a message we have received. (in ms)
   */
  private REMOVE_TIME = 15000;

  public messages:Message[] = [];
  public max:number;

  public received:Message[] = [];
  public propagateMessage:Message[] = [];

  public hud1s:Hud1Component[] = [];
  public hud2s:Hud2Component[] = [];

  // connection with server
  private socket;
  private port:number = 8082;
  private url:string = "192.168.1.22";
  public request: string = "http://" + this.url + ":" + this.port;

  constructor() {
    // hard-codage des messages predefini pour l'instant. Dans un second temps,
    // il faudrait les recuperer aupres de la tablette principale de la voiture.

    let ms = [
      {
        message: "danger !",
        imgUrl: "assets/img/danger.png"
      },
      {
        message: "merci",
        imgUrl: "assets/img/merci.png"
      },
      {
        message: "distance de sécurité",
        imgUrl: "assets/img/distsecu.gif"
      },
      {
        message: "attention pieton",
        imgUrl: "assets/img/pieton.jpg"
      },
      {
        message: "rabattez-vous",
        imgUrl: "assets/img/rabattre.jpg"
      },
      {
        message: "danger",
        imgUrl: "assets/img/danger.png"
      },
      {
        message: "ralentissez !",
        imgUrl: "assets/img/ralentissez.png"
      }
    ];

    for (let m of ms) {
      this.messages.push(new Message(m.message, m.imgUrl));
    }

    this.messages[6].isPropagated = true;

    this.max = this.messages.length - 1;

    // this.receivedMessage(new Message(this.messages[0].message, this.messages[0].imgUrl, "clio green"));
    this.listenServer().subscribe(message => {
      console.log('WHAT IS THIS ? ', message);
      //this.receivedMessage(message);
    });
  }

  ////////////////////
  // socket.io part //

  // connect with server
  private listenServer():Observable<Message> {
    let observable:Observable<Message> = new Observable(observer => {
      this.socket = io(this.request);
      // connection with server
      this.socket.emit('register');

      // message's reception
      this.socket.on('command', (data) => {
        this.manageCommandReceive(data.message);
      });

      this.socket.on('externMessage', (data) => {
        // TODO in the future, this message wont be fake
        this.receivedMessage(this.messages[data.message])
      });

      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  public sendCommand(n:number) {
    this.socket.emit('push', {'message':n});
  }

  public sendMessage(n:number) {
    this.socket.emit('sendMessage', {'message':n});
  }

  ///////////////////
  // other methods //
  /**
   * return true if it is a response, false if it is another things
   */
  propagatedMessageResponse() {
    if(this.propagateMessage.length == 0)
      return false;
    // TODO transmission du message here ? en tout cas message de validation
    this.propagateMessage.splice(0);
    return true;
  }

  ////////////////////////////////////
  // manage intern message received //
  public addHud1(it:Hud1Component){
    this.hud1s.push(it);
  }
  public removeHud1(it:Hud1Component){
    let index:number = this.hud1s.indexOf(it);
    if(index > -1)
      this.hud1s.splice(index);
  }

  public addHud2(it:Hud2Component){
    this.hud2s.push(it);
  }
  public removeHud2(it:Hud2Component){
    let index:number = this.hud2s.indexOf(it);
    if(index > -1)
      this.hud2s.splice(index);
  }

  /**
   * TODO find a solution better than this *** if you have time for this
   * @param n number of message received
   */
  private manageCommandReceive(n:number) {
    if(this.propagatedMessageResponse){
      if(n >= 0)
        console.log("le message est validé");
      else
        console.log("message invalidé");
      this.propagateMessage.splice(0);
    }

    if(n >= 0){
      // user send directly a message
      console.log("command send ", n, " receive");
      for(let hud of this.hud2s)
        hud.send(n);
      for(let hud of this.hud1s)
        hud.send();
      return;
    }
    // else he do a command
    switch(n){
      case -3:
        console.log("command top receive");
        for(let hud of this.hud1s)
          hud.topSelection();
        break;
      case -2:
        console.log("command bottom receive");
        for(let hud of this.hud1s)
          hud.bottomSelection();
        break;
      case -1:
        console.log("command reset receive");
        for(let hud of this.hud1s)
          hud.resetSelection();
        break;
    }
  }

  ////////////////////////////////////
  // manage extern message received //
  /**
   * dispatch message received by others conductors
   * @param m
   */
  receivedMessage(m:Message) {
    if (!m.isPropagated) {
      this.received.push(m);
      setTimeout(() => {
        this.received.splice(0);
      }, this.REMOVE_TIME);
    } else {
      this.propagateMessage.push(m);
    }
  }
}
