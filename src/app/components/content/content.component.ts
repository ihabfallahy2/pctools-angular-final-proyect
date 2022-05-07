import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  
  nombre = "";
  userLogged : any;
  user : any;
  constructor(public ruta:Router,public authService: AuthService,public product:ProductService,private cart:CartService) { 
    this.authService.getUserLogged().subscribe(res=>{
      this.userLogged = res;
    });

    this.user = localStorage.getItem('user');
    // console.log(this.user);
  }

  traspasoCart(cod:HTMLInputElement,number:HTMLInputElement){

    this.cart.carro(cod.value,number.value);
    
  }

  details(cod:string){
    this.product.detailsCod = cod;
    this.ruta.navigate(['details']);
  }

}
