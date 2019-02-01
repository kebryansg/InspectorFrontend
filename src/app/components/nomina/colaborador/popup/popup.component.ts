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
export class PopupColaboradorComponent implements OnInit {

  @Output() result = new EventEmitter<any>();
  @Input() datos: any;
  @Input() modalBasic: ModalBasicComponent;

  form: FormGroup;
  lsCompania: any;
  lsCargo: any;
  lsDepartamento: any;
  slDepartamento: any;
  lsArea: any;

  constructor(
    private fb: FormBuilder,
    public crudService: CrudService,
    public tools: ToolsService
  ) { }

  async ngOnInit() {



    this.form = this.fb.group({
      ID: [ this.datos.ID || 0 ],
      NombrePrimero: [this.datos.NombrePrimero || '', Validators.required],
      NombreSegundo: [this.datos.NombreSegundo || '', Validators.required],
      ApellidoPaterno: [this.datos.ApellidoPaterno || '', Validators.required],
      ApellidoMaterno: [this.datos.ApellidoMaterno || '', Validators.required],
      Cedula: [this.datos.Cedula || '', Validators.required],
      Email: [this.datos.Email || '', Validators.required],
      IDCompania: [this.datos.IDCompania || '', Validators.required],
      IDCargo: [this.datos.IDCargo || '', Validators.required],
      IDArea: [this.datos.IDArea || '', Validators.required],
      Estado: [this.datos.Estado || 'ACT', Validators.required]
    });

    this.lsCompania = this.crudService.SeleccionarAsync('compania_combo');
    this.lsCargo = this.crudService.SeleccionarAsync('cargo_combo');
    this.lsDepartamento = await this.crudService.SeleccionarAsync('departamento_combo');
    if( this.datos.Departamento ){
      this.slDepartamento = this.datos.Departamento;
      this.loadAreas();
    }
    // this.lsArea = await this.crudService.SeleccionarAsync('area_combo');

  }

  loadAreas(){
    let departamento = this.lsDepartamento.find(item => item.ID == this.slDepartamento);
    this.lsArea = departamento.areas;
  }

  submit(){
    this.result.emit( this.form.value );
    this.modalBasic.hide();
  }

}
