import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarmantenimientoPageRoutingModule } from './editarmantenimiento-routing.module';

import { EditarmantenimientoPage } from './editarmantenimiento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarmantenimientoPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [EditarmantenimientoPage],
})
export class EditarmantenimientoPageModule {}
