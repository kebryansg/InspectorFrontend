import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CrudService} from '../../../shared/services/crud.service';

@Component({
  selector: 'app-institucion',
  templateUrl: './institucion.component.html',
  styleUrls: [
    '../../../../assets/icon/icofont/css/icofont.scss'
  ],
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({opacity: 0}),
        animate('400ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translate(0)'}),
        animate('400ms ease-in-out', style({opacity: 0}))
      ])
    ])
  ]
})
export class InstitucionComponent implements OnInit {

  editProfile = true;
  editProfileIcon = 'icofont-edit';
  form: FormGroup;
  datos: any;
  constructor(
    private crudService: CrudService
  ) { }

  async ngOnInit() {
    this.datos = await this.crudService.SeleccionarAsync('institucion');
  }

  submit(){
    let data = this.form.value;
    this.crudService.Actualizar(data, `institucion/${ this.datos.ID }`)
      .subscribe(row => {
        this.datos = row;
        this.editProfileIcon = (this.editProfileIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
        this.editProfile = !this.editProfile;

      });
  }

  toggleEditProfile() {
    this.editProfileIcon = (this.editProfileIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editProfile = !this.editProfile;

    this.form = new FormGroup({
      Nombre: new FormControl(this.datos.Nombre || '', Validators.required),
      Ruc: new FormControl(this.datos.Ruc || '', Validators.required),
      Direccion: new FormControl(this.datos.Direccion || '', Validators.required),
      Telefono: new FormControl(this.datos.Telefono || '', Validators.required),
      Email: new FormControl(this.datos.Email || '', Validators.required)
    });
  }

}
