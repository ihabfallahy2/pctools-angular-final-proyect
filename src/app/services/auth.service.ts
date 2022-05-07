import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {getAuth, sendEmailVerification, sendSignInLinkToEmail} from "firebase/auth";
import firebase from "firebase/compat/app";
import { Usuarios } from "../models/usuarios.models";

@Injectable({providedIn: "root"})
export class AuthService {

  user:Usuarios[] = [];

  constructor(private afauth : AngularFireAuth, private http : HttpClient) {}
  
  async login(email : string, password : string) {
    try {
      return await this.afauth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.log("error en login : ", err);
      return null;
    }
  }

  register(username : string, password : string, email : string) {
    this.http.get<any>("http://localhost/apis/register.php?username=" + username + "&password=" + password + "&email=" + email).subscribe((data) => {
      console.log(data);
    });
  }

  loginAuthBd(username : string, password : string) {
    this.http.get<any>("http://localhost/apis/login.php?username=" + username + "&password=" + password).subscribe((data) => {    
      localStorage.setItem('user', data.user); 
    });
  }

  verificar(email : string) {
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: "https://www.example.com/finishSignUp?cartId=1234",
      // This must be true.
      handleCodeInApp: true,
      iOS: {
        bundleId: "com.example.ios"
      },
      android: {
        packageName: "com.example.android",
        installApp: true,
        minimumVersion: "12"
      },
      dynamicLinkDomain: "example.page.link"
    };

    const auth = getAuth();
    sendSignInLinkToEmail(auth, email, actionCodeSettings).then(() => {
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      window.localStorage.setItem("emailForSignIn", email);
      // ...
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
    });
  }

  async loginWithGoogle(email : string, password : string) {
    try {
      return await this.afauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (err) {
      console.log("error en login con google: ", err);
      return null;
    }
  }

  getUserLogged() {
    return this.afauth.authState;
  }

  insertGoogleUserToBd(email : any) {
    
    //obtencion del string antes del @ en el email
    var ema = email;
    var name = ema.substring(0, ema.lastIndexOf("@"));
    
    //pasamos name y email a php
    this.http.get<any>('http://localhost/apis/loginGoogle.php?username=G-'+name+'&email='+email)
      .subscribe(data=>{
        console.log(data);
    });
  }

  logout() {
    this.afauth.signOut();
  }
}
