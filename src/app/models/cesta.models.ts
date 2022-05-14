export class Cesta {

    id: string;
    fecha: any;
    cliente: string;
    producto_cant: any;

    constructor(id: string, fecha: any, cliente:string , producto_cant:any){
        this.id = id;
        this.fecha = fecha;
        this.cliente = cliente;
        this.producto_cant = producto_cant;
    }

}
