import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalBasicComponent} from '../../../../shared/modal-basic/modal-basic.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToolsService} from '../../../../shared/services/tools.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styles: []
})
export class PopupEntidadComponent implements OnInit {

  @Output() result = new EventEmitter<any>();
  @Input() datos: any;
  @Input() modalBasic: ModalBasicComponent;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public tools: ToolsService) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      ID: [this.datos.ID || 0],
      Identificacion: [this.datos.Identificacion || null, Validators.required],
      Nombres: [this.datos.Nombres || null, Validators.required],
      Apellidos: [this.datos.Apellidos || null, Validators.required],
      Email: [this.datos.Email || null],
      Tipo: [this.datos.Tipo || 'P', Validators.required],
      Direccion: [this.datos.Direccion || null, Validators.required],
      Telefono: [this.datos.Telefono || null],
      Celular: [this.datos.Celular || null],
      Estado: [this.datos.Estado || 'ACT', Validators.required],
    });

    if(this.datos.Tipo != 'P'){
      this.form.removeControl('Apellidos');
    }

  }

  events() {
    this.form.controls['Tipo'].valueChanges.subscribe(item => {
      if(item == 'P'){
        this.form.addControl('Apellidos', this.fb.control(null, Validators.required));
      }else{
        this.form.removeControl('Apellidos')
      }

    });

  }

  submit() {
    this.result.emit(this.form.value);
    this.modalBasic.hide();
  }

}
