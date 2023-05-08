import { Productos } from './productos';

export class VentasProductosDTO {

    id!: number;
    idVenta!: number;
    fechaVenta!: Date;
    producto!: Productos;
    cantidad!: number;
    total!: number;
}