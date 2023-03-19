import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Usuarios } from 'src/app/shared/interfaces/usuarios';
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

  @ViewChild("file") file!: ElementRef;

  constructor(private usuarioService: UsuarioService, private router: Router) {

   }

  ngOnInit(): void {
    const idUsuario = localStorage.getItem('idUsuarioLogueado');
    if (idUsuario != null) {
      this.usuarioService.obtenerUsuarioPorId(parseInt(idUsuario)).subscribe(data => {
        this.usuario = data;
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

}
