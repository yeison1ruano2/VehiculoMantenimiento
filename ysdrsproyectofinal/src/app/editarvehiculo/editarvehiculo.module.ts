import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarvehiculoPageRoutingModule } from './editarvehiculo-routing.module';

import { EditarvehiculoPage } from './editarvehiculo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarvehiculoPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [EditarvehiculoPage],
})
export class EditarvehiculoPageModule {}
