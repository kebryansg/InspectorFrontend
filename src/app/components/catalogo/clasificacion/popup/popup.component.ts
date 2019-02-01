import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
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
  lsActEconomica: any;
  lsTipoActEconomica: any[] = [];

  constructor(
    private fb: FormBuilder,
    private crudService: CrudService,
    public tools: ToolsService) {

  }

  async ngOnInit() {

    this.form = this.fb.group({
      ID: [this.datos.ID || 0],
      Descripcion: [this.datos.Descripcion || '', Validators.required],
      Precio: [this.datos.Precio || 0, Validators.required],
      IDActEconomica: [this.datos.IDActEconomica || null, Validators.required],
      IDTipoActEcon: [this.datos.IDTipoActEcon || null, Validators.required],
      Estado: [this.datos.Estado || 'ACT', Validators.required]
    });

    this.lsActEconomica = await this.crudService.SeleccionarAsync('acteconomica_combo');

    this.form.get('IDActEconomica').valueChanges.subscribe(ID => {
      if (ID)
        this.lsTipoActEconomica = this.lsActEconomica.find(item => item.ID == ID).tipoacteconomicas;
    });
    if (this.datos.IDActEconomica)
      this.form.get('IDActEconomica').setValue(this.datos.IDActEconomica);

  }

  submit() {
    this.result.emit(this.form.value);
    this.modalBasic.hide();
  }

}
