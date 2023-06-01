import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () =>
          import('../tab1/tab1.module').then((m) => m.Tab1PageModule),
      },
      {
        path: 'tab2',
        loadChildren: () =>
          import('../tab2/tab2.module').then((m) => m.Tab2PageModule),
      },
      {
        path: 'tab3',
        loadChildren: () =>
          import('../tab3/tab3.module').then((m) => m.Tab3PageModule),
      },
      {
        path: 'vehiculos',
        loadChildren: () =>
          import('../vehiculos/vehiculos.module').then(
            (m) => m.VehiculosPageModule
          ),
      },
      {
        path: 'nuevovehiculo',
        loadChildren: () =>
          import('../nuevovehiculo/nuevovehiculo.module').then(
            (m) => m.NuevovehiculoPageModule
          ),
      },
      {
        path: 'editarvehiculo/:id',
        loadChildren: () =>
          import('../editarvehiculo/editarvehiculo.module').then(
            (m) => m.EditarvehiculoPageModule
          ),
      },
      {
        path: 'vehiculodetalle/:idVehiculo',
        loadChildren: () =>
          import('../vehiculodetalle/vehiculodetalle.module').then(
            (m) => m.VehiculodetallePageModule
          ),
      },
      {
        path: 'nuevomantenimiento/:idVehiculo',
        loadChildren: () =>
          import('../nuevomantenimiento/nuevomantenimiento.module').then(
            (m) => m.NuevomantenimientoPageModule
          ),
      },
      {
        path: 'editarmantenimiento/:idVehiculo/:idMantenimiento',
        loadChildren: () =>
          import('../editarmantenimiento/editarmantenimiento.module').then(
            (m) => m.EditarmantenimientoPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
