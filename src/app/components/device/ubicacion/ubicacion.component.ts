import {Component, OnInit} from '@angular/core';
import {AngularFirestoreCollection, AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {CrudService} from '../../../shared/services/crud.service';
import * as moment from 'moment';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: [
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class UbicacionComponent implements OnInit {

  lsDispositivos: any[] = [];
  lsDeviceNombre: any[] = [];

  position: any = {
    Latitud: 0,
    Longitud: 0
  };

  constructor(private firestoreCollection: AngularFirestore,
              private crudService: CrudService) {

  }

  async ngOnInit() {
    this.lsDeviceNombre = await this.crudService.SeleccionarAsync('list_device') as any[];
    this.firestoreCollection.collection('ubicacion')
      .valueChanges()
      .pipe(
        map((rows: any[]) => {

          let rowsFilter = rows.filter(position => this.lsDeviceNombre.findIndex(device => device.MAC == position.id) != -1 );

          return rowsFilter.map(row => {
            let device = this.lsDeviceNombre.find(device => device.MAC == row.id);
            return {
              ID: device.MAC,
              lat: row.GPS.Latitud,
              lng: row.GPS.Longitud,
              label: `${ device.Nombre } (${ moment(row.Fecha).format('YYYY-MM-DD h:mm:ss') })`
            };
          })
        })
      )
      .subscribe((response: any) => {
        this.lsDispositivos = [...response];
        this.position.Latitud = this.lsDispositivos[0].lat;
        this.position.Longitud = this.lsDispositivos[0].lng;
      });
  }

  seguirDevices(MAC){
    let positionGPS = this.lsDispositivos.find(position => MAC == position.ID);
    this.position.Latitud = positionGPS.lat;
    this.position.Longitud = positionGPS.lng;
  }

}
