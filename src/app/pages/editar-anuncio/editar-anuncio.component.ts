import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    precio: new FormControl('')
  });
  categorias!: Categorias[];
  imagen: any = null;

  idUsuarioLogueado!: string;
  usuario!: Usuarios;
  constructor(private categoriaService: CategoriaService, private productoService: ProductoService,
    private usuarioService: UsuarioService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.categoriaService.obtenerCategorias().subscribe(categorias => {
      this.categorias = categorias;
    });

    this.productoService.obtenerProductoPorId(this.route.snapshot.params['idProducto']).subscribe(data => {
      this.producto = data;
      console.log(this.producto);
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

    this.form.get<string>('categoria')?.setValue(this.producto.categorias.id);

  }

  onSubmit(): void {
  }

}
