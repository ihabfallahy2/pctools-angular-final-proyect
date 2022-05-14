import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Usuarios } from "src/app/models/usuarios.models";
import { AuthService } from "src/app/services/auth.service";
import { ProductService } from "src/app/services/product.service";
import { UsernameService } from "src/app/services/username.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  bol = false;
  error = "border-color: none;";
  error_text = "Rellena este formulario para crear tu cuenta!";
  error_text_style = "color: black;";

  user:any = "";
  interChange :String | undefined;

  usuario = {
    email: "",
    password: "",
  };


  userLogged = this.authService.getUserLogged();

  constructor(public ruta:Router,public product: ProductService,public authService: AuthService, public unm: UsernameService,private http : HttpClient) {

    this.user = localStorage.getItem('user');
    console.log(this.userLogged);
    
    console.log(this.user);

  }

  ngOnInit(): void {}

  IngresarConGoogle() {
    
    const { email, password } = this.usuario;
    this.authService.loginWithGoogle(email, password).then((res) => {

      this.authService.insertGoogleUserToBd(res?.user?.email);

    });

  }

  registrar(username: HTMLInputElement,password: HTMLInputElement,spassword: HTMLInputElement,email: HTMLInputElement) {
    
    if (
      username.value.length == 0 ||
      password.value.length == 0  ||
      email.value.length == 0  
    ) {

      this.error_text= "Debe rellenar todos los campos del formulario!";
      this.error_text_style="color: red;";

    } else {
      if (password.value == spassword.value) {
        this.authService.register(username.value, password.value, email.value);
      } else {
        this.error = "border-color: red;";
      }
    }
  }

  loger(username: HTMLInputElement, password: HTMLInputElement){

    this.authService.loginAuthBd(username.value,password.value);
    
    if(!localStorage.getItem('user')){
      
      this.authService.loginAuthBd(username.value,password.value);
      
    }else{

      this.user = localStorage.getItem('user');
      
      window.location.reload();
    }
  }

  //logout

  logout() {
    this.authService.logout();
    localStorage.removeItem('user');
    this.user = "";
    window.location.reload();
  }

  //logout

  turnL() {this.bol = false;}

  turnR() {this.bol = true;}

  search(nombre:HTMLInputElement){
    if(nombre.value.length >= 1){
      this.product.finds(nombre.value);
      this.ruta.navigate(['results']);
    }
  }
  
  redirectToTermsConditions(){
    this.ruta.navigate(['terms']);
  }
}
