import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { VehiculosService } from '../services/vehiculos.service';
import { MantenimientoService } from '../services/mantenimiento.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AlertController, IonInput, ToastController } from '@ionic/angular';
import { Mantenimiento } from 'src/interfaces/Mantenimiento';

@Component({
  selector: 'app-nuevomantenimiento',
  templateUrl: './nuevomantenimiento.page.html',
  styleUrls: ['./nuevomantenimiento.page.scss'],
})
export class NuevomantenimientoPage implements OnInit {
  idVehiculo!: string;
  nuevoForm!: FormGroup;
  mantenimiento!: Mantenimiento;
  repuestos: string[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vehiculosService: VehiculosService,
    private mantenimientoService: MantenimientoService,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    this.nuevoForm = this.formBuilder.group({
      fecha: new FormControl(''),
      descripcion: new FormControl(''),
      repuestos: new FormControl(''),
      valorTotal: new FormControl(''),
      mecanico: new FormControl(''),
      numMecanico: new FormControl(''),
    });
  }

  ngOnInit() {
    this.consultarVehiculo();
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
            this.limpiarListaRepuestos();
            this.router.navigate(['tabs/vehiculodetalle', this.idVehiculo]);
          },
        },
      ],
    });
    (await alert).present();
  }

  consultarVehiculo() {
    this.route.params.forEach((params: Params) => {
      this.vehiculosService
        .getVehiculo(params['idVehiculo'])
        .subscribe((seleccionadoVehiculo) => {
          this.idVehiculo = seleccionadoVehiculo.id;
        });
    });
  }

  crearMantenimiento() {
    if (!this.nuevoForm.valid) {
      this.showToast('Diligenciar todos los campos obligatorios');
    } else {
      this.mantenimiento = this.nuevoForm.value;
      this.mantenimiento.idVehiculo = this.idVehiculo;
      this.mantenimiento.repuestos = this.repuestos;
      this.mantenimientoService.crearMantenimiento(this.mantenimiento).then(
        () => {
          this.showToast('Mantenimiento registrado con éxito');
          this.limpiarFormulario();
          this.limpiarListaRepuestos();
          this.router.navigate(['tabs/vehiculodetalle', this.idVehiculo]);
        },
        (err) => {
          this.showToast('Ocurrio un error al registrar el mantenimiento!');
          console.log(err);
        }
      );
    }
  }

  guardarRepuesto() {
    const repuesto = this.nuevoForm.value.repuestos;
    this.repuestos.push(repuesto);
    this.limpiarRepuestoFormulario();
  }

  limpiarRepuestoFormulario() {
    this.nuevoForm.get('repuestos')?.setValue('');
  }

  eliminarRepuesto(i: number) {
    this.repuestos.splice(i, 1);
  }

  limpiarListaRepuestos() {
    this.repuestos = [];
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
    this.nuevoForm = this.formBuilder.group({
      fecha: [''],
      descripcion: [''],
      repuestos: [''],
      valorTotal: [''],
      mecanico: [''],
      numMecanico: [''],
    });
  }
}
