import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Categorias } from 'src/app/shared/interfaces/categorias';
import { Productos } from 'src/app/shared/interfaces/productos';
import { CategoriaService } from 'src/app/shared/services/categoria.service';
import { ProductoService } from 'src/app/shared/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'crear-anuncio',
  templateUrl: './crear-anuncio.component.html',
  styleUrls: ['./crear-anuncio.component.css']
})
export class CrearAnuncioComponent implements OnInit {
  formData = new FormData();
  form: FormGroup = new FormGroup({
    nombre: new FormControl('', [
      Validators.minLength(3)
    ]),
    descripcion: new FormControl('', [
      Validators.minLength(50)
    ]),
    estado: new FormControl(''),
    categoria: new FormControl(''),
    stock: new FormControl(''),
    precio: new FormControl(''),
  });
  categorias!: Categorias[];
  imagen: any = null;

  constructor(private categoriaService: CategoriaService, private productoService: ProductoService) { }

  ngOnInit(): void {
     this.categoriaService.obtenerCategorias().subscribe(categorias => {
      this.categorias = categorias;
    });
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target != null) {
      this.imagen = target.files![0];
    }
  }

  onSubmit(): void {
    const producto = new Productos()
    producto.nombre = this.form.get<string>('nombre')?.value;
    producto.descripcion = this.form.get<string>('descripcion')?.value;
    producto.precio = this.form.get<any>('precio')?.value;
    producto.stock = this.form.get<any>('stock')?.value;
    producto.estado = this.form.get<string>('estado')?.value;
    this.categoriaService.obtenerCategoriaPorId(this.form.value.categoria).subscribe(data => {
        producto.categorias = data;
      console.log(producto.categorias);

    });
    const json = JSON.stringify(producto);

    console.log(producto);
    console.log(producto.categorias);
    console.log(json);

    this.formData.append('file', this.imagen);
    this.formData.append('producto', new Blob([json], { type: 'application/json' }));

    this.productoService.crearAnuncio(this.formData).subscribe(data => {
      Swal.fire({
        icon: 'success',
        title: '¡Anuncio creado correctamente!',
      });
      // this.router.navigate(['/login']);
    },err => {
      Swal.fire({
        icon: 'error',
        title: '¡Error al crear el anuncio!',
      })
    });
  }
}
