/**
 * Created by  on 10/01/17.
 */

export enum Kind {
  car
}

export class Message {
  message:string;
  imgUrl:string;
  by:Kind;
  description:string;
  isPropagated:boolean;

  constructor(message:string, imgUrl:string, description?:string, isPropagated?:boolean, by?:Kind){
    this.message = message;
    this.imgUrl = imgUrl;

    this.description = description ? description : "";
    this.by = by ? by : Kind.car;
    this.isPropagated = isPropagated? isPropagated : false;
  }
}
