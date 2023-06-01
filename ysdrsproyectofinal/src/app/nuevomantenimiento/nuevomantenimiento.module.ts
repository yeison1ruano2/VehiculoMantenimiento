import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevomantenimientoPageRoutingModule } from './nuevomantenimiento-routing.module';

import { NuevomantenimientoPage } from './nuevomantenimiento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevomantenimientoPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [NuevomantenimientoPage],
})
export class NuevomantenimientoPageModule {}
