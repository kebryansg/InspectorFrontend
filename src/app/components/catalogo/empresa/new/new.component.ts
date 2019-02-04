import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrudService} from '../../../../shared/services/crud.service';
import {ToolsService} from '../../../../shared/services/tools.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styles: []
})
export class NewEmpresaComponent implements OnInit {

  form: FormGroup;

  lsEntidad: any[]= [];
  lsActEconomica: any[]= [];
  lsProvincias: any[]= [];

  constructor(private fb: FormBuilder,
              protected crudService: CrudService,
              protected tools: ToolsService,
              private router: Router,
              private route: ActivatedRoute,) {

    this.route.params.subscribe((params) => {
      if (params.id) {
        this.loadEmpresa(params.id);
      }
    });
  }

 async ngOnInit() {
    // this.lsEntidad = this.crudService.SeleccionarAsync('entidad_combo') as any[];
    this.lsActEconomica = await <any> this.crudService.SeleccionarAsync('acteconomica_combo');
    this.lsProvincias = await <any> this.crudService.SeleccionarAsync('location_combo_sector');
  }
  
  async loadEmpresa(IDEmpresa){
    let datos: any = await this.crudService.SeleccionarAsync(`empresa/` + IDEmpresa);
    this.form = this.fb.group({
      ID: [datos.ID || 0],
      RUC: [datos.RUC || null, Validators.required],
      NombreComercial: [datos.NombreComercial || '', Validators.required],
      RazonSocial: [datos.RazonSocial || '', Validators.required],
      Direccion: [datos.Direccion || '', Validators.required],
      Telefono: [datos.Telefono || '', Validators.required],
      Celular: [datos.Celular || '', Validators.required],
      IDEntidad: [datos.IDEntidad || null, Validators.required],
      IDActEconomica: [datos.IDActEconomica || null, Validators.required],
      IDTipoActEcon: [datos.IDTipoActEcon || null, Validators.required],
      IDClasificacion: [datos.IDClasificacion || null, Validators.required],

      IDProvincia: [datos.IDProvincia || null, Validators.required],
      IDCanton: [datos.IDCanton || null, Validators.required],
      IDParroquia: [datos.IDParroquia || null, Validators.required],
      IDSector: [datos.IDSector || null, Validators.required],
      Email: [datos.Email || ''],
      Estado: [datos.Estado || 'ACT', Validators.required]
    });
  }

  events(){
    //#region Events
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
    //#endregion




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
  }

}
