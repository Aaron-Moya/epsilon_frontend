import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarAnuncioComponent } from './editar-anuncio.component';

const routes: Routes = [{ path: '', component: EditarAnuncioComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditarAnuncioRoutingModule { }
