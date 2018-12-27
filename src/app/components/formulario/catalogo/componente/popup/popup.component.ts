import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalBasicComponent} from '../../../../../shared/modal-basic/modal-basic.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToolsService} from '../../../../../shared/services/tools.service';
import {CrudService} from '../../../../../shared/services/crud.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styles: []
})
export class PopupComponenteComponent implements OnInit {

  @Output() result = new EventEmitter<any>();
  @Input() datos: any;
  @Input() modalBasic: ModalBasicComponent;

  form: FormGroup;
  lsTipo: any;

  constructor(
    private fb: FormBuilder,
    private crudService: CrudService,
    public tools: ToolsService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      ID: [ this.datos.ID || 0 ],
      Descripcion: [this.datos.Descripcion || '', Validators.required],
      IDTipoComp: [this.datos.IDTipoComp || '', Validators.required],
      Estado: [this.datos.Estado || 'ACT', Validators.required]
    });

    this.lsTipo = this.crudService.SeleccionarAsync('tipocomp_combo');

  }

  submit(){
    this.result.emit( this.form.value );
    this.modalBasic.hide();
  }

}