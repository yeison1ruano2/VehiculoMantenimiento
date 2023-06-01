import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Vehiculo } from 'src/interfaces/Vehiculo';
import { VehiculosService } from '../services/vehiculos.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-nuevovehiculo',
  templateUrl: './nuevovehiculo.page.html',
  styleUrls: ['./nuevovehiculo.page.scss'],
})
export class NuevovehiculoPage implements OnInit {
  nuevoVehiculo!: Vehiculo[];
  tipoVehiculo!: string;
  nuevoForm: FormGroup;

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private vehiculosService: VehiculosService,
    private formBuilder: FormBuilder
  ) {
    this.nuevoForm = this.formBuilder.group({
      nombre: [''],
      placa: [''],
      tipoVehiculo: [''],
      anio: [''],
      color: [''],
      marca: [''],
    });
  }

  ngOnInit() {}

  regresar(): void {
    console.log('regresar');
    this.router.navigateByUrl('tabs/vehiculos');
  }

  mostrarMensaje(mensaje: string) {
    this.toastCtrl
      .create({
        message: mensaje,
        duration: 2000,
      })
      .then((toast) => toast.present());
  }

  nuevo() {
    if (!this.nuevoForm.valid) {
      this.mostrarMensaje('Diligenciar todos los campos obligatorios');
    } else {
      this.mostrarMensaje('Guardando...');
      this.nuevoVehiculo = this.nuevoForm.value;
      this.vehiculosService.crearVehiculo(this.nuevoVehiculo).then(
        () => {
          this.mostrarMensaje('Vehiculo registrado con éxito');
          this.router.navigate(['tabs/vehiculos']);
          this.limpiarFormulario();
        },
        (err) => {
          this.mostrarMensaje('Hubo un error al crear el vehiculo');
        }
      );
    }
  }
  limpiarFormulario() {
    this.nuevoForm = this.formBuilder.group({
      nombre: [''],
      placa: [''],
      tipoVehiculo: [''],
      anio: [''],
      color: [''],
      marca: [''],
    });
  }
}
