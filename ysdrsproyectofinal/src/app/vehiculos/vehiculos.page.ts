import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehiculo } from 'src/interfaces/Vehiculo';
import { VehiculosService } from '../services/vehiculos.service';
import {
  ActionSheetController,
  AlertController,
  ToastController,
} from '@ionic/angular';
import { Router } from '@angular/router';
import { MantenimientoService } from '../services/mantenimiento.service';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.page.html',
  styleUrls: ['./vehiculos.page.scss'],
})
export class VehiculosPage implements OnInit {
  public vehiculos!: Observable<Vehiculo[]>;
  public vehiculosVerificacion: Vehiculo[] = [];

  constructor(
    private vehiculosService: VehiculosService,
    private mantenimientoService: MantenimientoService,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.listarVehiculos();
  }

  listarVehiculos() {
    this.vehiculos = this.vehiculosService.getVehiculos();
  }

  async selectVehiculo(vehiculo: any) {
    let actionSheet = await this.actionSheetCtrl.create({
      header: 'Seleccione una opción',
      buttons: [
        {
          text: 'Modificar vehiculo',
          handler: () => {
            this.editar(vehiculo);
          },
        },
        {
          text: 'Borrar vehiculo',
          cssClass: 'danger',
          role: 'destructive',
          handler: () => {
            this.borrar(vehiculo);
          },
        },
        {
          text: 'Mantenimientos',
          handler: () => {
            this.verMantenimientos(vehiculo);
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelado');
          },
        },
      ],
    });
    await actionSheet.present();
  }

  async editar(vehiculo: any) {
    this.router.navigate(['tabs/editarvehiculo', vehiculo]);
  }

  async verMantenimientos(vehiculo: any) {
    this.router.navigate(['tabs/vehiculodetalle', vehiculo]);
  }

  mostrarMensaje(mensaje: string) {
    this.toastCtrl
      .create({
        message: mensaje,
        duration: 2000,
      })
      .then((toast) => toast.present());
  }

  async borrar(vehiculo: any) {
    const alert = this.alertCtrl.create({
      header: 'Borrar',
      message: '¿Estas seguro que deseas borrar este contacto?',
      buttons: [
        {
          text: 'No',
          role: 'Cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log(`Cancelado confirmado: ${blah}`);
          },
        },
        {
          text: 'Si',
          handler: () => {
            this.vehiculosService.borrarVehiculo(vehiculo);
            this.mantenimientoService.eliminarMantenimientoVehiculo(vehiculo);
            this.mostrarMensaje('Vehiculo eliminado con éxito');
          },
        },
      ],
    });
    (await alert).present();
  }
}
