import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalBasicComponent} from '../../../../shared/modal-basic/modal-basic.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styles: []
})
export class PopupDepartamentoComponent implements OnInit {

  @Output() result = new EventEmitter<any>();
  @Input() datos: any;
  @Input() modalBasic: ModalBasicComponent;

  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      ID: [ this.datos.ID || 0 ],
      Descripcion: [this.datos.Descripcion || '', Validators.required],
      Estado: [this.datos.Estado || 'ACT', Validators.required]
    });

  }

  submit(){
    this.result.emit( this.form.value );
    this.modalBasic.hide();
  }

}
