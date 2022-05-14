import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cesta } from '../models/cesta.models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cesta:Cesta[] = new Array();
  userLogged = this.auth.getUserLogged();
  user = localStorage.getItem('user');
  cant = 0;

  constructor(private auth:AuthService,private http:HttpClient) {
    // this.user = localStorage.getItem('user');
    console.log(this.user);
   }

  carro(cod:any,number:any){
    console.log("este es el nombre del localsot->"+this.user);

    let productAndCuantity = new Array();
    // productAndCuantity.push("3ds-2","kingston-15","lgsubaru-1","sony-2");
    productAndCuantity.push([{'3ds':2},{'kingston':15},{'lgsubaru':1},{'sony':2}]);

    var nombre = "";

    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    
    //comprobar que el session no esta en firebase antes de Añadir
    if(this.userLogged){
      this.auth.getUserLogged().subscribe(res=>{
        if(res?.displayName != null){
          nombre = res.displayName;
        }
      });
      console.log(nombre)
    }
    // else if(this.user != null && this.user.length > 1){
    //   nombre = this.user;
    //   console.log("console log en ifs -> "+nombre)
    // }

    
    this.http.get<any>("https://dwes-8769d-default-rtdb.firebaseio.com/cestas.json").subscribe((data) => {
      
      if(data.cliente.toLowerCase() == this.user?.toLocaleLowerCase()){        
        console.log(data) 
      }else{
        // console.log(data.cliente+""+nombre);
        console.log("el cliente no existe -> "+data.cliente+"="+nombre);
      }
      
      const obj = new Cesta(cod,hoy,nombre,productAndCuantity);
      // for(let elemento of data){
      //   let str = elemento.cliente.toLowerCase();
      //   if(str.includes(nombre.toLocaleLowerCase())){
      //     console.log(elemento) 
      //   }else{
      //     console.log("el cliente no existe");
      //   }
      // }
    });



    // this.http.put('https://dwes-8769d-default-rtdb.firebaseio.com/cestas.json',obj)
    // .subscribe(data => {
    //   console.log(data);
    // });

    // this.http.get<Cesta>('https://dwes-8769d-default-rtdb.firebaseio.com/cestas.json').subscribe(data=>{ console.log(data)});
  }

}
