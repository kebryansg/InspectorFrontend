import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
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
  lsTipoActEcon: any[];
  lsClasificacion: any[];
  lsEntidad: any[];
  lsActEconomica: any[];

  lsProvincias: any;
  slProvincia: any;
  lsCanton: any;
  slCanton: any;
  lsParroquia: any;
  slParroquia: any;
  lsSector: any;

  constructor(
    private fb: FormBuilder,
    protected crudService: CrudService,
    protected tools: ToolsService
  ) {
  }

  async ngOnInit() {


    this.form = this.fb.group({
      ID: [this.datos.ID || 0],
      Descripcion: [this.datos.Descripcion, Validators.required],
      RUC: [this.datos.RUC || null, Validators.required],
      NombreComercial: [this.datos.NombreComercial || '', Validators.required],
      RazonSocial: [this.datos.RazonSocial || '', Validators.required],
      Direccion: [this.datos.Direccion || '', Validators.required],
      Telefono: [this.datos.Telefono || '', Validators.required],
      Celular: [this.datos.Celular || '', Validators.required],
      IDEntidad: [this.datos.IDEntidad || null, Validators.required],
      IDActEconomica: [this.datos.IDActEconomica || null, Validators.required],
      IDTipoActEcon: [this.datos.IDTipoActEcon || null, Validators.required],
      IDClasificacion: [this.datos.IDClasificacion || null, Validators.required],


      IDProvincia: [this.datos.IDProvincia || null, Validators.required],
      IDCanton: [this.datos.IDCanton || null, Validators.required],
      IDParroquia: [this.datos.IDParroquia || null, Validators.required],
      IDSector: [this.datos.IDSector || null, Validators.required],
      Email: [this.datos.Email || ''],
      Estado: [this.datos.Estado || 'ACT', Validators.required]
    });

    // Events
    this.form.controls['IDActEconomica'].valueChanges.subscribe(item => {
      if (item)
        this.lsTipoActEcon = this.lsActEconomica.find(row => row.ID == item).tipoacteconomicas;

    });

    this.form.controls['IDTipoActEcon'].valueChanges.subscribe(item => {
      if (item) {
        this.lsClasificacion = this.lsTipoActEcon.find(row => row.ID == item).clasificacions;
        this.form.controls['IDClasificacion'].setValue(this.lsClasificacion[0].ID);
      }
    });

    this.form.controls['IDProvincia'].valueChanges.subscribe(item => {
      if (item)
        this.lsCanton = this.lsProvincias.find(row => row.ID == item).cantons;

    });

    this.form.controls['IDCanton'].valueChanges.subscribe(item => {
      if (item)
        this.lsParroquia = this.lsCanton.find(row => row.ID == item).parroquia;

    });

    this.form.controls['IDParroquia'].valueChanges.subscribe(item => {
      if (item) {
        this.lsSector = this.lsParroquia.find(row => row.ID == item).sectors;
        this.form.controls['IDSector'].setValue(this.lsSector[0].ID);
      }

    });


    this.lsEntidad = <any> this.crudService.SeleccionarAsync('entidad_combo');
    this.lsActEconomica = await <any> this.crudService.SeleccionarAsync('acteconomica_combo');
    this.lsProvincias = await <any> this.crudService.SeleccionarAsync('location_combo_sector');

    if (this.datos.IDClasificacion) {
      this.form.controls['IDActEconomica'].setValue(this.datos.IDActEconomica);
      this.form.controls['IDTipoActEcon'].setValue(this.datos.IDTipoActEcon);
      this.form.controls['IDClasificacion'].setValue(this.datos.IDClasificacion);
    }
    if (this.datos.IDSector) {
      this.form.controls['IDProvincia'].setValue(this.datos.IDProvincia);
      this.form.controls['IDCanton'].setValue(this.datos.IDCanton);
      this.form.controls['IDParroquia'].setValue(this.datos.IDParroquia);
      this.form.controls['IDSector'].setValue(this.datos.IDSector);
    }


  }

  submit() {
    this.result.emit(this.form.value);
    this.modalBasic.hide();
  }

}
