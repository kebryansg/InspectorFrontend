import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ToolsService} from '../../../../../shared/services/tools.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalBasicComponent} from '../../../../../shared/modal-basic/modal-basic.component';

@Component({
  selector: 'app-popup-actividad',
  templateUrl: './popup.component.html',
  styles: []
})
export class PopupActividadComponent implements OnInit {

  @Output() result = new EventEmitter<any>();
  @Input() datos: any;
  @Input() modalBasic: ModalBasicComponent;
  form: FormGroup;

  constructor(
    public tools: ToolsService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      ID: [ this.datos.ID || 0 ],
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
