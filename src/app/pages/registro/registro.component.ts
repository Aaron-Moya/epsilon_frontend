import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioCrear } from 'src/app/shared/interfaces/crearUsuario';
import { EnviarCorreoService } from 'src/app/shared/services/enviar-correo.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import Swal from   'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  formData = new FormData();
  form: FormGroup = new FormGroup({
    usuario: new FormControl('', [
      Validators.minLength(4)
    ]),
    email: new FormControl(''),
    passwd: new FormControl('', [
      Validators.minLength(4)
    ]),
  });

  avatar: any = null;

  constructor(private usuarioService: UsuarioService, private enviarCorreo: EnviarCorreoService, private router: Router) { }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target != null) {
      this.avatar = target.files![0];
    }
  }

  onSubmit(): void {
    const usuario = new UsuarioCrear()
    usuario.usuario = this.form.get<string>('usuario')?.value;
    usuario.password = this.form.get<string>('passwd')?.value;
    usuario.correo = this.form.get<string>('email')?.value;

    const json = JSON.stringify(usuario);

    if (this.avatar != null)
      this.formData.append('file', this.avatar);
    this.formData.append('usuario', new Blob([json], { type: 'application/json' }));

    this.usuarioService.obtenerUsuarioPorCorreo(usuario.correo).subscribe(data => {
      Swal.fire({
        icon: 'error',
        title: '¡Ya existe un usuario con ese correo!',
      })
    },err => {
      if (err.status == 404) { // No existe ningún usuario con ese correo
        this.registrar(usuario.correo);
      }
      else {
        Swal.fire({
          icon: 'error',
          title: '¡Error al registrarse!',
        })
      }
    });
  }

  registrar(correoUsuario: string): void {
    this.usuarioService.registrarUsuario(this.formData).subscribe(data => {
      Swal.fire({
        icon: 'success',
        title: '¡Te has registrado correctamente!',
      });
      this.enviarCorreo.enviarCorreoRegistro(correoUsuario);
      this.router.navigate(['/login']);
    },err => {
      Swal.fire({
        icon: 'error',
        title: '¡Error al registrarse!',
      });
      console.log(err);
    });
  }
}
