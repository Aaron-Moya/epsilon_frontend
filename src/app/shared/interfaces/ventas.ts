import { Usuarios } from "./usuarios";

export class Ventas {

    id!: number;
    usuarioComprador!: Usuarios;
    fechaVenta!: Date;
    total!: number;
    totalProductos!: number;
}