import { Categorias } from "./categorias";
import { Usuarios } from "./usuarios";

export class ProductoBibliotecaDTO {

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
    cantidad!: number;
}