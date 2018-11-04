import {Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {ModalBasicComponent} from '../../../../shared/modal-basic/modal-basic.component';
import {CrudService} from '../../../../shared/services/crud.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styles: []
})
export class PopupCompaniaComponent implements OnInit {

  @Output() result = new EventEmitter<any>();
  @Input() datos: any;
  @Input() modalBasic: ModalBasicComponent;

  form: FormGroup;

  constructor(
    private crudService: CrudService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      ID: [ this.datos.ID || 0 ],
      Nombre: [this.datos.Nombre || '', Validators.required],
      Direccion: [this.datos.Direccion || '', Validators.required],
      Telefono: [this.datos.Telefono || '', Validators.required],
      Estado: [this.datos.Estado || 'ACT', Validators.required]
    });

    this.modalBasic.show();
  }

  submit() {
    this.result.emit(this.form.value);
    this.modalBasic.hide();
  }

}
