import { Direcciones } from "./direcciones";

export class Usuarios {

    id!: number;
    usuario!: string;
    password!: string;
    correo!: string;
    fechaCreacion!: Date;
    avatar!: string;
    direccion!: Direcciones;
    accessToken!: string;
}