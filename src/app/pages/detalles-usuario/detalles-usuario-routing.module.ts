import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetallesUsuarioComponent } from './detalles-usuario.component';

const routes: Routes = [{ path: '', component: DetallesUsuarioComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetallesUsuarioRoutingModule { }
