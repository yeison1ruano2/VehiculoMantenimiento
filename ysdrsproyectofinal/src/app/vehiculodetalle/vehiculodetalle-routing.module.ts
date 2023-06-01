import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehiculodetallePage } from './vehiculodetalle.page';

const routes: Routes = [
  {
    path: '',
    component: VehiculodetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehiculodetallePageRoutingModule {}
