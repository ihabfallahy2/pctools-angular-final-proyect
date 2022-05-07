import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsernameService {

 username:String = '';

  constructor() { }

  uname (nombre:string) {
    this.username = nombre;
  }
}
