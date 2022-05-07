import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cesta = new Array();
  cant = 0;

  constructor(private http:HttpClient) { }

  carro(cod:any,number:any){

    sessionStorage.setItem('cod', cod);
    sessionStorage['cantidad'] = number;

    this.http.get<any>('http://localhost/apis/select.php?cod=' + cod)
    .subscribe(data=>{
      
      for (let elemento of data) {
        
        sessionStorage.setItem('nombre_corto',elemento.nombre_corto),
        sessionStorage.setItem('pvp',elemento.pvp)

        const obj = {
          cod:sessionStorage.getItem('cod'),
          cantidad:sessionStorage.getItem('cantidad'),
          nombre_corto:sessionStorage.getItem('nombre_corto'),
          pvp:sessionStorage.getItem('pvp')
        }

        this.cesta.push(obj);
      }

    });
    

    this.cant += Number(sessionStorage.getItem('cantidad'));

  }

}
