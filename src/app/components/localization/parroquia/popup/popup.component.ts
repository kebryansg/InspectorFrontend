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
export class PopupParroquiaComponent implements OnInit {

  @Output() result = new EventEmitter<any>();
  @Input() datos: any;
  @Input() modalBasic: ModalBasicComponent;

  form: FormGroup;
  lsProvincias: any;
  slProvincia: any;
  lsCanton: any;

  constructor(
    private fb: FormBuilder,
    public tools: ToolsService,
    private crudService: CrudService
  ) { }

  async ngOnInit() {


    this.form = this.fb.group({
      ID: [ this.datos.ID || 0 ],
      Descripcion: [this.datos.Descripcion || '', Validators.required],
      IDCanton: [this.datos.IDCanton || '', Validators.required],
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
  }

  submit(){
    this.result.emit( this.form.value );
    this.modalBasic.hide();
  }

}
