import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { Direcciones } from 'src/app/shared/interfaces/direcciones';
import { Usuarios } from 'src/app/shared/interfaces/usuarios';
import { DireccionService } from 'src/app/shared/services/direccion.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  formData = new FormData();
  usuario: Usuarios = new Usuarios();
  imagen: any = null;

  editarDireccion = false;
  editarDireccionFormulario = false;

  formDireccion: FormGroup = new FormGroup({
    calle: new FormControl('', [
      Validators.minLength(5)
    ]),
    numero: new FormControl('', [
      Validators.minLength(1)
    ]),
    ciudad: new FormControl('', [
      Validators.minLength(3)
    ])
  });

  @ViewChild("file") file!: ElementRef;

  constructor(private usuarioService: UsuarioService, private direccionService: DireccionService, private router: Router) {

   }

  ngOnInit(): void {
    const idUsuario = localStorage.getItem('idUsuarioLogueado');
    if (idUsuario != null) {
      this.usuarioService.obtenerUsuarioPorId(parseInt(idUsuario)).subscribe(data => {
        this.usuario = data;

        if (this.usuario.direccion != null) {
          this.editarDireccion = true;
          this.rellenarCamposFormDireccion();
        }
        this.desactivarCamposDireccion();
      });
    }
  }

  abrirDialogoImagen() {
    this.file.nativeElement.click(); 
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target != null) {
      this.imagen = target.files![0];

      this.formData.append('file', this.imagen);
      this.formData.append('idUsuario', this.usuario.id.toString());

      this.usuarioService.cambiarAvatar(this.formData).subscribe(data => {
        window.location.reload();
      }, err => {
        Swal.fire({
          icon: 'error',
          title: '¡Error al cambiar el avatar!',
        });
        console.log(err);
      });
    }
  }

  rellenarCamposFormDireccion() : void {
    this.formDireccion.controls['calle'].setValue(this.usuario.direccion.calle);
    this.formDireccion.controls['numero'].setValue(this.usuario.direccion.numero);
    this.formDireccion.controls['ciudad'].setValue(this.usuario.direccion.ciudad);

  }

  desactivarCamposDireccion() : void {
    this.formDireccion.controls['calle'].disable();
    this.formDireccion.controls['numero'].disable();
    this.formDireccion.controls['ciudad'].disable();
  }

  activarCamposDireccion() : void {
    this.editarDireccionFormulario = true;
    this.formDireccion.controls['calle'].enable();
    this.formDireccion.controls['numero'].enable();
    this.formDireccion.controls['ciudad'].enable();
  }

  editarFormularioDireccion(): void {
    this.activarCamposDireccion();
  }

  guardarDireccion(): void {
    if (!this.editarDireccionFormulario) return;

    let direccion: Direcciones = new Direcciones();
    direccion.calle = this.formDireccion.controls['calle'].value;
    direccion.numero = this.formDireccion.controls['numero'].value;
    direccion.ciudad = this.formDireccion.controls['ciudad'].value;
    if (this.formDireccion.valid) {
      if (!this.editarDireccion) {
          const json = JSON.stringify(direccion);
          this.direccionService.crearDireccion(json, 35).subscribe(data => {
            console.log("direccion creada correctamente");
          }, err => console.log)
      }
      else {
        direccion.id = this.usuario.direccion.id;
        const json = JSON.stringify(direccion);
        console.log(direccion);
        this.direccionService.actualizarDireccion(json).subscribe(data => {
          console.log("direccion modificada correctamente");
        }, err => console.log)
      }
    }
  }

}
