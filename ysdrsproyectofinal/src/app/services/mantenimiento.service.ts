import { Mantenimiento } from './../../interfaces/Mantenimiento';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MantenimientoService {
  private mantenimientosCollection!: AngularFirestoreCollection<Mantenimiento>;
  private mantenimientos!: Observable<Mantenimiento[]>;
  constructor(private afs: AngularFirestore) {
    this.mantenimientosCollection =
      this.afs.collection<Mantenimiento>('mantenimientos');
    this.mantenimientos = this.mantenimientosCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc['id'];
          return { ...data, id };
        });
      })
    );
  }

  crearMantenimiento(mantenimiento: any): Promise<DocumentReference> {
    return this.mantenimientosCollection.add(mantenimiento);
  }

  getMantenimientosVehiculos(idVehiculo: string): Observable<Mantenimiento[]> {
    return this.mantenimientosCollection
      .valueChanges({ idField: 'id' })
      .pipe(
        map((mantenimientos) =>
          mantenimientos.filter((m) => m.idVehiculo == idVehiculo)
        )
      );
  }

  getMantenimiento(id: string): Observable<any> {
    return this.mantenimientosCollection
      .doc<Mantenimiento>(id)
      .valueChanges()
      .pipe(
        take(1),
        map((mantenimiento) => {
          mantenimiento!.id = id;
          return mantenimiento;
        })
      );
  }

  async eliminarMantenimientoVehiculo(idVehiculo: string) {
    return this.afs
      .collection('mantenimientos', (ref) =>
        ref.where('idVehiculo', '==', idVehiculo)
      )
      .get()
      .toPromise()
      .then((querySnapshot) => {
        querySnapshot?.forEach((doc) => {
          doc.ref.delete();
        });
      })
      .catch((error) => {
        console.log('Error al eliminar los mantenimientos:', error);
      });
  }

  borrarMantenimiento(mantenimiento: any) {
    return this.afs
      .collection('mantenimientos')
      .doc(mantenimiento)
      .delete()
      .then(() => {
        console.log('Mantenimiento eliminado correctamente');
      })
      .catch((error) => {
        console.log('Error al eliminar el mantenimiento', error);
      });
  }

  editarMantenimiento(mantenimiento: any): Promise<void> {
    return this.mantenimientosCollection.doc(mantenimiento.id).update({
      fecha: mantenimiento.fecha,
      descripcion: mantenimiento.descripcion,
      idVehiculo: mantenimiento.idVehiculo,
      repuestos: mantenimiento.repuestos,
      valorTotal: mantenimiento.valorTotal,
      mecanico: mantenimiento.mecanico,
      numMecanico: mantenimiento.numMecanico,
    });
  }
}
