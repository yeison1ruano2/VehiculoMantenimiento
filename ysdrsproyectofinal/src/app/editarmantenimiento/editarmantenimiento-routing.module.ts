import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarmantenimientoPage } from './editarmantenimiento.page';

const routes: Routes = [
  {
    path: '',
    component: EditarmantenimientoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarmantenimientoPageRoutingModule {}
