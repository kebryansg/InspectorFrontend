import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalBasicComponent} from '../../../../shared/modal-basic/modal-basic.component';
import {ToolsService} from '../../../../shared/services/tools.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styles: []
})
export class PopupTipoEmpresaComponent implements OnInit {

  @Output() result = new EventEmitter<any>();
  @Input() datos: any;
  @Input() modalBasic: ModalBasicComponent;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public tools: ToolsService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      ID: [ this.datos.ID || 0 ],
      Nombre: [this.datos.Descripcion || '', Validators.required],
      Descripcion: [this.datos.Descripcion || ''],
      Estado: [this.datos.Estado || 'ACT', Validators.required]
    });

  }

  submit(){
    this.result.emit( this.form.value );
    this.modalBasic.hide();
  }

}
