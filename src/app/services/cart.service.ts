import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Cesta} from "../models/cesta.models";
import {AuthService} from "./auth.service";

@Injectable({providedIn: "root"})
export class CartService {
  cantidad = localStorage.getItem("cantidad");
  cart: Cesta[] = [];

  constructor(private auth : AuthService, private http : HttpClient) {
    this.http.get<any>("https://productos-pctools-default-rtdb.firebaseio.com/productos.json").subscribe((data) => {
      for (const elemento of data) {
        let array = localStorage.getItem(elemento.cod);
        
        if (array) {
          if (array) {
            let inf = JSON.parse(array);
            var cant = 0;
            cant += inf.cantidad;
            localStorage.setItem("cantidad",cant.toString());
            
          }
        }
        }
    });

    console.log(this.cantidad);
  }

  createCart(producto : string, cantidad : any, precio : any) {
    const cod = producto;

    const obj = {
      producto: producto,
      cantidad: cantidad,
      precio: precio * cantidad
    };

    //filtro

    if (localStorage.getItem(cod) != null) {
      localStorage.removeItem(cod);
      localStorage.setItem(cod, JSON.stringify(obj));
    } else {
      localStorage.setItem(cod, JSON.stringify(obj));
    }
  }

  printCart() {
    this.http.get<any>("https://productos-pctools-default-rtdb.firebaseio.com/productos.json").subscribe((data) => {
      while (localStorage.getItem(data.cod) != null) {
        this.cart.push(data.cod);

        //new 

        // if (localStorage.getItem(data.cod)) {
        //   let array = localStorage.getItem(data.cod);
        //   if (array) {
        //     let inf = JSON.parse(array);
  
        //     this.cantidad += inf.cantidad;
        //     // console.log("cantidad 0> "+data.cod);
  
        //   }
        // }

        //new 
      }
    });
  }
}
