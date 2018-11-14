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
export class PopupClasificaconComponent implements OnInit {

  @Output() result = new EventEmitter<any>();
  @Input() datos: any;
  @Input() modalBasic: ModalBasicComponent;

  form: FormGroup;
  ActEconomica: any;

  constructor(
    private fb: FormBuilder,
    private crudService: CrudService,
    protected tools: ToolsService
  ) { }

  async ngOnInit() {


    this.form = this.fb.group({
      ID: [ this.datos.ID || 0 ],
      Descripcion: [ this.datos.Descripcion || '', Validators.required],
      IDActEconomica: [ this.datos.IDActEconomica || '', Validators.required],
      Estado: [ this.datos.Estado || 'ACT', Validators.required]
    });

    this.ActEconomica = await this.crudService.SeleccionarAsync('acteconomica_combo');

  }

  submit(){
    this.result.emit( this.form.value );
    this.modalBasic.hide();
  }

}
