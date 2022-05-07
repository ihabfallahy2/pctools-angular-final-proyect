export class Usuarios {
    user = "";
    email = "";
    estado = 0;
    identidad = "";

    constructor(user: string, email: string, estado: number,identidad: string) {
        this.user = user;
        this.email = email;
        this.estado = estado;
        this.identidad = identidad;
    }
}
