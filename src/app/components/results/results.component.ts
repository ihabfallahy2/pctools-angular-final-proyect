import { Component} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {

  userLogged : any;

  name = 'Get Current Url Route Demo';
  currentRoute = "";
  
  constructor(public ruta:Router,public authService: AuthService,public find:ProductService,private cart:CartService) { 
    this.authService.getUserLogged().subscribe(res=>{
      // console.log(res);
      this.userLogged = res;
    });
    console.log(this.find.estatus);

    if(this.find.estatus == false){
      this.ruta.navigate(['']);
    }
  }
  

  results = this.find.ntf;
  
  traspasoCart(cod:HTMLInputElement,number:HTMLInputElement){
    
    this.cart.carro(cod.value,number.value);
    
  }

}