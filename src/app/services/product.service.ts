import {Producto} from "../models/producto.models";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import { Router } from "@angular/router";
// import { exit } from "process";

@Injectable({providedIn: "root"})
export class ProductService {

  detailsCod : String = "";
  
  /**
   * Este Array es el que usa el componente Content para mostar los productos de la tienda.
   * @param ntt array que contiene todos los productos de la base de datos.
  */
  ntt: Producto[] = [];
  
  /**
   * Este Array es el que usa tanto el componente Navbar como el componente Content para buscar y mostrar productos especificos.
   * @param ntf array que contiene todos los productos que la function servicio() a buscado previamente.
  */
  ntf: Producto[] = [];

  find:string = "";

  estatus = false;

  /**
   * Esta funcion se inyecta al constructor del servicio para poder consumir una api.
   * @param http Para consumir datos json de una api ya sea la api personal o firebase.
   */
  constructor(private http : HttpClient) {
    // this.http.get<any>("http://localhost/apis/select.php").subscribe((data) => {
    this.http.get<any>("https://productos-pctools-default-rtdb.firebaseio.com/productos.json").subscribe((data) => {
      for (let elemento of data) {
        this.ntt.push(elemento);
      }
    });
  }

  /**
   * Esta funcion añade al array ntf -> los resultados de busqueda del producto.
   * @param servicio Busca segun el nombre que recibe productos parecidos.
   */
  servicio (nombre:any) {
      this.http.get<any>("http://localhost/apis/select.php?nombre=" + nombre).subscribe((data) => {
        for (let elemento of data) {
          this.ntf.push(elemento);
          console.log(elemento);
        }
      });
      this.ntf.length = 0;
  }

  /**
   * Esta funcion añade al array ntf -> los resultados de busqueda del producto.
   * Esta operacionde busqueda se realiza en firebase.
   * @param searchSpecificProductFirebase Busca segun el nombre que recibe productos parecidos.
   */

  searchSpecificProductFirebase(nombre:String){
    console.log("hola fuera del for");
    this.http.get<any>("https://productos-pctools-default-rtdb.firebaseio.com/productos.json").subscribe((data) => {
      for(let elemento of data){
        let str = elemento.nombre_corto.toLowerCase();
        if(str.includes(nombre.toLocaleLowerCase())){
          this.ntf.push(elemento);
        }
      }
    });
    this.ntf.length = 0;
    }

  finds(nombre:string){
    console.log(nombre);
    this.searchSpecificProductFirebase(nombre);
    this.find = nombre;
    this.estatus = true;
  }
}
