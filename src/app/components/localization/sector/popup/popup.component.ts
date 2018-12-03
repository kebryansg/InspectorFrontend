import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalBasicComponent} from '../../../../shared/modal-basic/modal-basic.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToolsService} from '../../../../shared/services/tools.service';
import {CrudService} from '../../../../shared/services/crud.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styles: []
})
export class PopupSectorComponent implements OnInit {

  @Output() result = new EventEmitter<any>();
  @Input() datos: any;
  @Input() modalBasic: ModalBasicComponent;

  form: FormGroup;
  lsProvincias: any;
  slProvincia: any;
  lsCanton: any;
  slCanton: any;
  lsParroquia: any;

  constructor(
    private fb: FormBuilder,
    protected tools: ToolsService,
    private crudService: CrudService
  ) { }

  async ngOnInit() {

    this.form = this.fb.group({
      ID: [ this.datos.ID || 0 ],
      Descripcion: [this.datos.Descripcion || '', Validators.required],
      IDParroquia: [this.datos.IDParroquia || null, Validators.required],
      Estado: [this.datos.Estado || 'ACT', Validators.required]
    });

    this.lsProvincias = await this.crudService.SeleccionarAsync('location_combo_parroquia');

    if( this.datos.Provincia ){
      this.slProvincia = this.datos.Provincia;
      this.loadCanton();
    }

  }

  loadCanton(){
    let provincia =  this.lsProvincias.find(item => item.ID == this.slProvincia );
    this.lsCanton = provincia.cantons;
    // this.lsCanton = this.crudService.SeleccionarAsync('canton_combo',{
    //   Provincia: this.slProvincia
    // });
  }

  loadParroquia(){
    let canton =  this.lsCanton.find(item => item.ID == this.slCanton );
    this.lsParroquia = canton.parroquia;
    // this.lsParroquia = this.crudService.SeleccionarAsync('parroquia_combo',{
    //   Canton: this.slCanton
    // });
  }

  submit(){
    this.result.emit( this.form.value );
    this.modalBasic.hide();
  }

}
