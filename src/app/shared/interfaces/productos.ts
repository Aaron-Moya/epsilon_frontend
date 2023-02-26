import { Categorias } from "./categorias";

export class Productos {

    id!: number;
    nombre!: string;
    descripcion!: string;
    estado!: string;
    precio!: number;
    stock!: number;
    categorias!: Categorias;
    fechaCreacion!: Date;
    imagen!: string;

}