import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MantenimientoService } from '../services/mantenimiento.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Mantenimiento } from 'src/interfaces/Mantenimiento';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editarmantenimiento',
  templateUrl: './editarmantenimiento.page.html',
  styleUrls: ['./editarmantenimiento.page.scss'],
})
export class EditarmantenimientoPage implements OnInit {
  editarForm!: FormGroup;
  id!: string;
  idVehiculo!: string;
  seleccionado!: Mantenimiento;
  repuestos: string[] = [];
  mantenimiento!: Mantenimiento;
  constructor(
    private route: ActivatedRoute,
    private mantenimientoService: MantenimientoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.mantenimientoService
        .getMantenimiento(params['idMantenimiento'])
        .subscribe((seleccionado) => {
          this.seleccionado = seleccionado;
          this.id = seleccionado.id;
          this.repuestos = seleccionado.repuestos;
          this.rellenarFormulario(seleccionado);
        });
      this.idVehiculo = params['idVehiculo'];
    });
  }

  rellenarFormulario(seleccionado: any) {
    this.editarForm = this.formBuilder.group({
      fecha: [seleccionado.fecha],
      descripcion: [seleccionado.descripcion],
      repuestos: new FormControl(''),
      valorTotal: [seleccionado.valorTotal],
      mecanico: [seleccionado.mecanico],
      numMecanico: [seleccionado.numMecanico],
    });
  }

  async regresar() {
    const alert = this.alertCtrl.create({
      header: 'Confirmación',
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
            this.router.navigate(['tabs/vehiculodetalle', this.idVehiculo]);
          },
        },
      ],
    });
    (await alert).present();
  }

  guardarRepuesto() {
    const repuesto = this.editarForm.value.repuestos;
    this.repuestos.push(repuesto);
    this.limpiarRepuestoFormulario();
  }

  limpiarRepuestoFormulario() {
    this.editarForm.get('repuestos')?.setValue('');
  }
  eliminarRepuesto(i: number) {
    this.repuestos.splice(i, 1);
  }
  editarMantenimiento() {
    if (!this.editarForm.valid) {
      this.showToast('Diligenciar todos los campos obligatorios');
    } else {
      this.mantenimiento = this.editarForm.value;
      this.mantenimiento.id = this.id;
      this.mantenimiento.idVehiculo = this.idVehiculo;
      this.mantenimiento.repuestos = this.repuestos;
      this.mantenimientoService.editarMantenimiento(this.mantenimiento).then(
        () => {
          this.showToast('Mantenimiento editado con éxito');
          this.limpiarFormulario();
          this.limpiarListaRepuestos();
          this.router.navigate(['tabs/vehiculodetalle', this.idVehiculo]);
        },
        (error) => {
          this.showToast('Problema al actualizar el mantenimiento');
          console.log(error);
        }
      );
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
      fecha: [''],
      descripcion: [''],
      repuestos: [''],
      valorTotal: [''],
      mecanico: [''],
      numMecanico: [''],
    });
  }

  limpiarListaRepuestos() {
    this.repuestos = [];
  }
}
