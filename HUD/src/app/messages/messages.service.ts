import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Message} from "./Message";
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';


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

  // connection with server
  private socket;
  private port:number = 8082;
  private url:string = "192.168.1.22";
  private request: string = "http://" + this.url + ":" + this.port;

  constructor() {
    // hard-codage des messages predefini pour l'instant. Dans un second temps,
    // il faudrait les recuperer aupres de la tablette principale de la voiture.

    let ms = [
      {
        message: "danger",
        imgUrl: "assets/img/angular-logo.png"
      },
      {
        message: "merci",
        imgUrl: "assets/img/angular-logo.png"
      },
      {
        message: "drill3",
        imgUrl: "assets/img/angular-logo.png"
      },
      {
        message: "ga4",
        imgUrl: "assets/img/angular-logo.png"
      },
      {
        message: "bu5",
        imgUrl: "assets/img/angular-logo.png"
      },
      {
        message: "zo6",
        imgUrl: "assets/img/angular-logo.png"
      },
      { // conventionné comme message d'alerte
        message: "alert",
        imgUrl: "assets/img/angular-logo.png"
      }
    ];

    for (let m of ms) {
      this.messages.push(new Message(m.message, m.imgUrl));
    }

    this.max = this.messages.length - 1;

    // this.receivedMessage(new Message(this.messages[0].message, this.messages[0].imgUrl, "clio green"));
    this.listenServer().subscribe(message => {
      this.receivedMessage(message);
    });
  }

  // connect with server
  private listenServer():Observable<Message> {
    let observable:Observable<Message> = new Observable(observer => {
      this.socket = io(this.request);
      // connection with server
      this.socket.emit('register');

      // message's reception
      this.socket.on('message', (data) => {
        console.log("receive data: ", data);
        // TODO observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

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
