import { Component, OnInit } from '@angular/core';
import { MantenimientoService } from '../services/mantenimiento.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { VehiculosService } from '../services/vehiculos.service';
import { Vehiculo } from 'src/interfaces/Vehiculo';
import {
  ActionSheetController,
  AlertController,
  ToastController,
} from '@ionic/angular';

@Component({
  selector: 'app-vehiculodetalle',
  templateUrl: './vehiculodetalle.page.html',
  styleUrls: ['./vehiculodetalle.page.scss'],
})
export class VehiculodetallePage implements OnInit {
  idVehiculo!: string;
  seleccionadoVehiculo!: Vehiculo;
  mantenimientos!: any[];

  constructor(
    private mantenimientoService: MantenimientoService,
    private route: ActivatedRoute,
    private actionSheetCtrl: ActionSheetController,
    private router: Router,
    private vehiculosService: VehiculosService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  async ngOnInit() {
    await this.consultarVehiculo();
    await this.consultarMantenimientos();
  }

  regresar(): void {
    this.router.navigateByUrl('tabs/vehiculos');
  }

  async consultarVehiculo() {
    this.route.params.forEach((params: Params) => {
      this.vehiculosService
        .getVehiculo(params['idVehiculo'])
        .subscribe((seleccionadoVehiculo) => {
          this.seleccionadoVehiculo = seleccionadoVehiculo;
          this.idVehiculo = seleccionadoVehiculo.id;
        });
    });
  }

  async consultarMantenimientos() {
    this.route.params.forEach((params: Params) => {
      this.mantenimientoService
        .getMantenimientosVehiculos(params['idVehiculo'])
        .subscribe((mantenimientos) => {
          this.mantenimientos = mantenimientos;
        });
    });
  }

  validarListaMantenimientos(): boolean {
    return this.mantenimientos.length == 0;
  }

  nuevoMantenimiento() {
    this.router.navigate([
      'tabs/nuevomantenimiento',
      this.seleccionadoVehiculo.id,
    ]);
  }

  async selectMantenimiento(mantenimiento: any) {
    let actionSheet = await this.actionSheetCtrl.create({
      header: 'Seleccione una opción',
      buttons: [
        {
          text: 'Modificar mantenimiento',
          handler: () => {
            this.editarMantenimiento(mantenimiento);
          },
        },
        {
          text: 'Borrar mantenimiento',
          cssClass: 'danger',
          role: 'destructive',
          handler: () => {
            this.borrarMantenimiento(mantenimiento);
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

  async editarMantenimiento(mantenimiento: any) {
    this.router.navigate([
      'tabs/editarmantenimiento',
      this.idVehiculo,
      mantenimiento,
    ]);
  }

  async borrarMantenimiento(mantenimiento: any) {
    const alert = this.alertCtrl.create({
      header: 'Borrar',
      message: '¿Estas seguro que deseas borrar este mantenimiento?',
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
            this.mantenimientoService
              .borrarMantenimiento(mantenimiento)
              .then(() => {
                this.mostrarMensaje('Mantenimiento eliminado con éxito');
              })
              .catch((error) => {
                this.mostrarMensaje('Error al eliminar el mantenimiento');
              });
          },
        },
      ],
    });
    (await alert).present();
  }

  mostrarMensaje(mensaje: string) {
    this.toastCtrl
      .create({
        message: mensaje,
        duration: 2000,
      })
      .then((toast) => toast.present());
  }
}
