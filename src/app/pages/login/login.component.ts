import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UsuarioLogueadoService } from 'src/app/shared/services/usuario-logueado.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    passwd: new FormControl(''),
  });

  constructor(private usuarioService: UsuarioService, private usuarioLogueadoService: UsuarioLogueadoService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.form.valid) {
      const email = this.form.get<string>('email')?.value;
      const password = this.form.get<string>('passwd')?.value;

      this.usuarioService.obtenerUsuarioLogin(email, password)
      .pipe(catchError(() => of(null)))
        .subscribe(dato => {
          if (dato != null) {
            // alert("ok"); GUARDAR EL USUARIO Y IR A LA PÁGINA RAIZ
            this.usuarioLogueadoService.updateUsuarioLogueado(dato);
            this.router.navigate(['/']);
          }
          else {
            Swal.fire({
              icon: 'error',
              title: '¡Usuario/contraseña incorrectos!',
            })
          }
        });
    } 
  }
}

