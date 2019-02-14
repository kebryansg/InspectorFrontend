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
export class PopupCategoriaComponent implements OnInit {

  @Output() result = new EventEmitter<any>();
  @Input() datos: any;
  @Input() modalBasic: ModalBasicComponent;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public tools: ToolsService,
    public crudService: CrudService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      ID: [ this.datos.ID || 0 ],
      IDGrupo: [ this.datos.IDGrupo || null, Validators.required],
      Nombre: [ this.datos.Nombre || '', Validators.required],
      Descripcion: [ this.datos.Descripcion || ''],
      Estado: [ this.datos.Estado || 'ACT', Validators.required]
    });
  }

  submit(){
    this.modalBasic.hide();
    this.result.emit( this.form.value );
  }

}
