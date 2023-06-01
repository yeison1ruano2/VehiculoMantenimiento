import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { VehiculosService } from '../services/vehiculos.service';
import { Vehiculo } from 'src/interfaces/Vehiculo';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editarvehiculo',
  templateUrl: './editarvehiculo.page.html',
  styleUrls: ['./editarvehiculo.page.scss'],
})
export class EditarvehiculoPage implements OnInit {
  editarForm!: FormGroup;
  id!: string;
  vehiculo!: Vehiculo;
  seleccionado!: Vehiculo;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private vehiculosService: VehiculosService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.vehiculosService
        .getVehiculo(params['id'])
        .subscribe((seleccionado) => {
          this.seleccionado = seleccionado;
          this.id = seleccionado.id;
          this.rellenarFormulario(seleccionado);
        });
    });
  }

  rellenarFormulario(seleccionado: any) {
    this.editarForm = this.formBuilder.group({
      nombre: [seleccionado.nombre],
      placa: [seleccionado.placa],
      tipoVehiculo: [seleccionado.tipoVehiculo],
      anio: [seleccionado.anio],
      color: [seleccionado.color],
      marca: [seleccionado.marca],
    });
  }

  async regresar() {
    const alert = this.alertCtrl.create({
      header: 'Confrimación',
      message: '¿Estas seguro que deseas salir sin guardar tus cambios?',
      buttons: [
        {
          text: 'No',
          role: 'Cancel',
          cssClass: 'danger',
          handler: (blah) => {
            console.log(`Cancelado confirmado: ${blah}`);
          },
        },
        {
          text: 'Si',
          cssClass: 'secondary',
          handler: () => {
            this.router.navigateByUrl('tabs/vehiculos');
          },
        },
      ],
    });
    (await alert).present();
  }

  editar() {
    if (!this.editarForm.valid) {
      this.showToast('Diligenciar todos los campos obligatorios');
    } else {
      this.seleccionado = this.editarForm.value;
      this.seleccionado.id = this.id;
      this.vehiculosService.editarVehiculo(this.seleccionado).then(
        () => {
          this.showToast('Vehiculo actualizado con éxito');
        },
        (err) => {
          this.showToast('Problema al actualizar');
          console.log(err);
        }
      );
      this.regresar();
      this.limpiarFormulario();
    }
  }

  showToast(mensaje: string) {
    this.toastCtrl
      .create({
        message: mensaje,
        duration: 2000,
      })
      .then((toast) => toast.present());
  }

  limpiarFormulario() {
    this.editarForm = this.formBuilder.group({
      nombre: [''],
      placa: [''],
      tipoVehiculo: [''],
      anio: [''],
      color: [''],
      marca: [''],
    });
  }
}
