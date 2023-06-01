import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Observable, map, take } from 'rxjs';
import { Vehiculo } from 'src/interfaces/Vehiculo';

@Injectable({
  providedIn: 'root',
})
export class VehiculosService {
  private vehiculos!: Observable<Vehiculo[]>;
  private vehiculosCollection!: AngularFirestoreCollection<Vehiculo>;

  constructor(private afs: AngularFirestore) {
    this.vehiculosCollection = this.afs.collection<Vehiculo>('vehiculos');
    let snap = this.vehiculosCollection.snapshotChanges();
    this.vehiculos = this.vehiculosCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc['id'];
          return { ...data, id };
        });
      })
    );
  }

  crearVehiculo(vehiculo: any): Promise<DocumentReference> {
    return this.vehiculosCollection.add(vehiculo);
  }

  getVehiculos(): Observable<Vehiculo[]> {
    return this.vehiculos;
  }

  getVehiculo(id: string): Observable<any> {
    return this.vehiculosCollection
      .doc<Vehiculo>(id)
      .valueChanges()
      .pipe(
        take(1),
        map((vehiculo) => {
          vehiculo!.id = id;
          return vehiculo;
        })
      );
  }

  borrarVehiculo(vehiculo: any) {
    this.afs
      .doc(`vehiculos/${vehiculo}`)
      .delete()
      .then(() => console.log(`Vehiculo eliminado: "${vehiculo}"`))
      .catch((err) => console.log(err));
  }

  editarVehiculo(vehiculo: any): Promise<void> {
    return this.vehiculosCollection.doc(vehiculo.id).update({
      nombre: vehiculo.nombre,
      placa: vehiculo.placa,
      tipoVehiculo: vehiculo.tipoVehiculo,
      anio: vehiculo.anio,
      color: vehiculo.color,
      marca: vehiculo.marca,
    });
  }
}
