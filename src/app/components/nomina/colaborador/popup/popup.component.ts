import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalBasicComponent} from '../../../../shared/modal-basic/modal-basic.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrudService} from '../../../../shared/services/crud.service';
import {ToolsService} from '../../../../shared/services/tools.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styles: []
})
export class PopupColaboradorComponent implements OnInit {

  @Output() result = new EventEmitter<any>();
  @Input() datos: any;
  @Input() modalBasic: ModalBasicComponent;

  form: FormGroup;
  lsCompania: any;
  lsCargo: any;
  lsArea: any;

  constructor(
    private fb: FormBuilder,
    protected crudService: CrudService,
    protected tools: ToolsService
  ) { }

  ngOnInit() {
    this.lsCompania = this.crudService.SeleccionarAsync('compania_combo');
    this.lsCargo = this.crudService.SeleccionarAsync('cargo_combo');
    this.lsArea = this.crudService.SeleccionarAsync('area_combo');


    this.form = this.fb.group({
      ID: [ this.datos.ID || 0 ],
      NombrePrimero: [this.datos.NombrePrimero || '', Validators.required],
      NombreSegundo: [this.datos.NombreSegundo || '', Validators.required],
      ApellidoPaterno: [this.datos.ApellidoPaterno || '', Validators.required],
      ApellidoMaterno: [this.datos.ApellidoMaterno || '', Validators.required],
      Cedula: [this.datos.Cedula || '', Validators.required],
      IDCompania: [this.datos.IDCompania || '', Validators.required],
      IDCargo: [this.datos.IDCargo || '', Validators.required],
      IDArea: [this.datos.IDArea || '', Validators.required],
      Estado: [this.datos.Estado || 'ACT', Validators.required]
    });

  }

  submit(){
    this.result.emit( this.form.value );
    this.modalBasic.hide();
  }

}
