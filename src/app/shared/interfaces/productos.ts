import { Categorias } from "./categorias";
import { Usuarios } from "./usuarios";

export class Productos {

  constructor() {
    this.usuarios = new Usuarios();
  }

    id!: number;
    nombre!: string;
    descripcion!: string;
    estado!: string;
    precio!: number;
    descuento!: number;
    stock!: number;
    categorias!: Categorias;
    fechaCreacion!: Date;
    imagen!: string;
    usuarios!: Usuarios;
    borrado!: boolean;
}
