import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categorias } from 'src/app/shared/interfaces/categorias';
import { Productos } from 'src/app/shared/interfaces/productos';
import { Usuarios } from 'src/app/shared/interfaces/usuarios';
import { CategoriaService } from 'src/app/shared/services/categoria.service';
import { ProductoService } from 'src/app/shared/services/producto.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
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
      Validators.minLength(30)
    ]),
    estado: new FormControl(''),
    categoria: new FormControl(''),
    stock: new FormControl(''),
    precio: new FormControl('')
  });
  categorias!: Categorias[];
  imagen: any = null;

  idUsuarioLogueado!: string;
  usuario!: Usuarios; // Mejorable

  constructor(private categoriaService: CategoriaService, private productoService: ProductoService,
    private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.categoriaService.obtenerCategorias().subscribe(categorias => {
      this.categorias = categorias;
    });
    const idUsuarioLogueado = localStorage.getItem('idUsuarioLogueado');
    if (idUsuarioLogueado != null)
      this.usuarioService.obtenerUsuarioPorId(parseInt(idUsuarioLogueado)).subscribe(usuario => this.usuario = usuario);
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target != null) {
      this.imagen = target.files![0];
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.imagen == null) {
        Swal.fire({
          icon: 'info',
          title: '¡Tienes que subir una imagen!',
        })
      }
      else {
        const producto = new Productos()
        producto.nombre = this.form.get<string>('nombre')?.value;
        producto.descripcion = this.form.get<string>('descripcion')?.value;
        producto.precio = this.form.get<any>('precio')?.value;
        producto.stock = this.form.get<any>('stock')?.value;
        producto.estado = this.form.get<string>('estado')?.value;
        producto.categorias = this.categorias.find(c => c.id == this.form.value.categoria) as Categorias;
        producto.usuarios = this.usuario;

        const json = JSON.stringify(producto);

        this.formData.append('file', this.imagen);
        this.formData.append('producto', new Blob([json], { type: 'application/json' }));

        this.productoService.crearAnuncio(this.formData).subscribe(data => {
          Swal.fire({
            icon: 'success',
            title: '¡Anuncio creado correctamente!',
          });
          this.router.navigate(['/']);
        }, err => {
          Swal.fire({
            icon: 'error',
            title: '¡Error al crear el anuncio!',
          });
          console.log(err);
        });
      }
    }
  }
}
