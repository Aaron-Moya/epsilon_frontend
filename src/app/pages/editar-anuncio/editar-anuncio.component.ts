import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorias } from 'src/app/shared/interfaces/categorias';
import { Productos } from 'src/app/shared/interfaces/productos';
import { Usuarios } from 'src/app/shared/interfaces/usuarios';
import { CategoriaService } from 'src/app/shared/services/categoria.service';
import { ProductoService } from 'src/app/shared/services/producto.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-anuncio',
  templateUrl: './editar-anuncio.component.html',
  styleUrls: ['./editar-anuncio.component.css']
})
export class EditarAnuncioComponent implements OnInit {

  producto!: Productos;
  
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
    precio: new FormControl(''),
    descuento: new FormControl('')
  });
  categorias!: Categorias[];
  imagen: any = null;

  idUsuarioLogueado!: string;
  usuario!: Usuarios;
  constructor(private categoriaService: CategoriaService, private productoService: ProductoService,
    private usuarioService: UsuarioService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.categoriaService.obtenerCategorias().subscribe(categorias => {
      this.categorias = categorias;
    });

    this.productoService.obtenerProductoPorId(this.route.snapshot.params['idProducto']).subscribe(data => {
      this.producto = data;
      this.rellenarCampos();
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

  rellenarCampos() {
    this.form.get<string>('nombre')?.setValue(this.producto.nombre);
    this.form.get<string>('descripcion')?.setValue(this.producto.descripcion);
    this.form.get<string>('estado')?.setValue(this.producto.estado);
    this.form.get<string>('stock')?.setValue(this.producto.stock);
    this.form.get<string>('precio')?.setValue(this.producto.precio);
    this.form.get<string>('descuento')?.setValue(this.producto.descuento);

    this.form.get<string>('categoria')?.setValue(this.producto.categorias.id);

  }

  onSubmit(): void {
    if (this.form.valid) {
      this.producto.nombre = this.form.get<string>('nombre')?.value;
      this.producto.descripcion = this.form.get<string>('descripcion')?.value;
      this.producto.estado = this.form.get<string>('estado')?.value;
      this.producto.stock = this.form.get<string>('stock')?.value;
      this.producto.precio = this.form.get<string>('precio')?.value;
      if (this.form.get<string>('descuento')?.value != null)
        this.producto.descuento = this.form.get<string>('descuento')?.value;
      else
        this.producto.descuento = 0;
      this.producto.categorias = this.categorias.find(cat => cat.id == this.form.get<string>('categoria')?.value) as Categorias;
      this.producto.usuarios = this.usuario;

      const json = JSON.stringify(this.producto);

      if (this.imagen != null) {
        this.formData.append('file', this.imagen);
      }
      this.formData.append('producto', new Blob([json], { type: 'application/json' }));

      this.productoService.modificarAnuncio(this.formData).subscribe(data => {
        Swal.fire({
          icon: 'success',
          title: '¡Anuncio modificado correctamente!',
        });
        this.router.navigate(['/']);
      }, err => {
        Swal.fire({
          icon: 'error',
          title: '¡Error al modificar el anuncio!',
        });
        console.log(err);
      });
    }
    
  }

}
