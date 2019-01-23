import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styles: [
    'agm-map { height: 450px; }'
  ]
})
export class UbicacionComponent implements OnInit {

  lsDispositivos: any[] = [
    {
      lat: -1.0234771,
      lng: -79.4655461,
      label: 'BuhoCorp'
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
