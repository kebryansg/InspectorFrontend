import {Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {Input} from '@angular/core';
import {ModalBasicComponent} from '../../../../shared/modal-basic/modal-basic.component';
import {CrudService} from '../../../../shared/services/crud.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styles: []
})
export class PopupComponent {

  // @Input() api: string;
  @Output() result = new EventEmitter<any>();
  @Input() datos: any;
  @Input() modalBasic: NgbActiveModal;

  form: FormGroup;

  constructor(
    private crudService: CrudService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({});
  }

  ngOnInit() {
    this.initial();
  }

  submit() {
    this.result.emit(this.form.value);
    this.modalBasic.close();
  }

  initial() {
    this.form = this.fb.group({
      ID: [ this.datos.ID || 0 ],
      Nombre: [this.datos.Nombre || '', Validators.required],
      Direccion: [this.datos.Direccion || '', Validators.required],
      Telefono: [this.datos.Telefono || '', Validators.required],
      Estado: [this.datos.Estado || 'ACT', Validators.required]
    });
  }

}
