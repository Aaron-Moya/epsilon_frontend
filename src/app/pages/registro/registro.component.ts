import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Usuarios } from 'src/app/shared/interfaces/usuarios';
import { UsuarioCrear } from 'src/app/shared/interfaces/crearUsuario';
import { UsuarioLogueadoService } from 'src/app/shared/services/usuario-logueado.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  formData = new FormData();
  form: FormGroup = new FormGroup({
    usuario: new FormControl(''),
    email: new FormControl(''),
    passwd: new FormControl(''),
  });
  avatar:any = null;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  onFileSelected(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target != null) {
        this.avatar = target.files![0];
      }
  }

  onSubmit(): void {
    const usuario = new UsuarioCrear()
    usuario.usuario = this.form.get<string>('usuario')?.value;
    usuario.password =  this.form.get<string>('passwd')?.value;
    usuario.correo =  this.form.get<string>('email')?.value;

    const json = JSON.stringify(usuario);

    this.formData.append('file', this.avatar);
    this.formData.append('usuario', new Blob([json], {type: 'application/json'}));

    console.log(this.formData);

    this.usuarioService.registrarUsuario(this.formData).subscribe(data => {
      console.log(data);
    })
  }
}
