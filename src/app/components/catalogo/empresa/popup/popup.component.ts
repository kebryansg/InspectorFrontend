import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalBasicComponent} from '../../../../shared/modal-basic/modal-basic.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToolsService} from '../../../../shared/services/tools.service';
import {CrudService} from '../../../../shared/services/crud.service';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: [
    '../../../../../assets/icon/icofont/css/icofont.scss'
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
export class PopupEmpresaComponent implements OnInit {

  @Output() result = new EventEmitter<any>();
  @Input() datos: any;
  @Input() modalBasic: ModalBasicComponent;

  form: FormGroup;
  lsTipoEmpresa: any;
  lsClasificacion: any;
  lsEntidad: any;
  lsActEconomica: any;
  slActEconomica: any;

  constructor(
    private fb: FormBuilder,
    protected crudService: CrudService,
    protected tools: ToolsService
  ) {
  }

  ngOnInit() {

    this.lsTipoEmpresa = this.crudService.SeleccionarAsync('tipoempresa_combo');
    this.lsEntidad = this.crudService.SeleccionarAsync('entidad_combo');
    this.lsActEconomica = this.crudService.SeleccionarAsync('acteconomica_combo');

    this.form = this.fb.group({
      ID: [this.datos.ID || 0],
      Descripcion: [ this.datos.Descripcion , Validators.required],
      RUC: [this.datos.RUC || null, Validators.required],
      NombreComercial: [this.datos.NombreComercial || '', Validators.required],
      RazonSocial: [this.datos.RazonSocial || '', Validators.required],
      Direccion: [this.datos.Direccion || '', Validators.required],
      Telefono: [this.datos.Telefono || '', Validators.required],
      Celular: [this.datos.Celular || '', Validators.required],
      IDEntidad: [this.datos.IDEntidad || null, Validators.required],
      IDTipoEmpresa: [this.datos.IDTipoEmpresa || null, Validators.required],
      IDClasificacion: [this.datos.IDClasificacion || null, Validators.required],
      Email: [this.datos.Email || '', Validators.required],
      Estado: [this.datos.Estado || 'ACT', Validators.required]
    });
    if (this.datos.ActEconomica) {
      this.slActEconomica = this.datos.ActEconomica;
      this.loadClasificacion();
    }



  }

  loadClasificacion() {
    this.lsClasificacion = this.crudService.SeleccionarAsync('clasificacion_combo', {
      ActEconomica: this.slActEconomica
    });
  }

  submit() {
    this.result.emit(this.form.value);
    this.modalBasic.hide();
  }

}
