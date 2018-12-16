import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalBasicComponent} from '../../../../shared/modal-basic/modal-basic.component';
import {ToolsService} from '../../../../shared/services/tools.service';
import {CrudService} from '../../../../shared/services/crud.service';

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
  lsActEconomica: any;

  constructor(
    private fb: FormBuilder,
    private crudService: CrudService,
    public tools: ToolsService
  ) { }

  ngOnInit() {
    this.lsActEconomica = this.crudService.SeleccionarAsync('acteconomica_combo');
    this.form = this.fb.group({
      ID: [ this.datos.ID || 0 ],
      Descripcion: [this.datos.Descripcion || '', Validators.required],
      IDActEconomica: [this.datos.IDActEconomica || null, Validators.required],
      Estado: [this.datos.Estado || 'ACT', Validators.required]
    });



  }

  submit(){
    this.result.emit( this.form.value );
    this.modalBasic.hide();
  }

}
