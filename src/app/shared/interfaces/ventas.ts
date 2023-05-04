import { Usuarios } from "./usuarios";

export class Ventas {

    id!: number;
    usuarioComprador!: Usuarios;
    usuarioVendedor!: Usuarios;
    fechaVenta!: Date;
    total!: number;
}