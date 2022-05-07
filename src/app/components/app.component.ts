import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { UsernameService } from "../services/username.service";
// import { AuthService } from "./services/auth.service";
// import { UsernameService } from "./services/username.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  bol = false;
  cont = 0;

  usuario = {
    email: "",
    password: "",
  };

  constructor(private authService: AuthService,private unm : UsernameService) {}

  Login() {
    console.log(this.usuario);
    const { email, password } = this.usuario;
    this.authService.login(email, password).then((res) => {
      if(!res?.user?.emailVerified){
        alert("tiene que verificar el usuario");
        console.log("tiene que verificar el usuario", res);
      }else{
        console.log("se logeo correctamente", res);
      }
    });
  }
  
  IngresarConGoogle() {
    console.log(this.usuario);
    const { email, password } = this.usuario;
    this.authService.loginWithGoogle(email, password).then((res) => {
      console.log("se registro", res);
    });
  }

  obtnerUsuarioLogeado() {
    let info;
    let array = new Array();

    this.authService.getUserLogged().subscribe((res) => {
      if (res?.displayName != null) {
        info = res.displayName;
      } else {
        info = res?.email;

        console.log(info);
        var email = res?.email;
        if (email != null) {
          var email_analizado = /^([^]+)@(\w+).(\w+)$/.exec(email);
          if (email_analizado != null) {
            for (const em of email_analizado) {
              array.push(em);
              console.log(array[1]);
              this.unm.uname(array[1]);
            }
          }
        }
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  turn() {
    // this.bol=true;
    this.cont = this.cont + 1;

    if (this.cont % 2 != 0) {
      this.bol = true;
    } else {
      this.bol = false;
    }
  }

  turnL() {
    this.bol = true;
  }

  turnR() {
    this.bol = false;
  }
}
