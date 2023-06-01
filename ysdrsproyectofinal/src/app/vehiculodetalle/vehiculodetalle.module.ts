import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehiculodetallePageRoutingModule } from './vehiculodetalle-routing.module';

import { VehiculodetallePage } from './vehiculodetalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehiculodetallePageRoutingModule
  ],
  declarations: [VehiculodetallePage]
})
export class VehiculodetallePageModule {}
