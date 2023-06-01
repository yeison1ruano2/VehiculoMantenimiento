import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevomantenimientoPage } from './nuevomantenimiento.page';

const routes: Routes = [
  {
    path: '',
    component: NuevomantenimientoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevomantenimientoPageRoutingModule {}
