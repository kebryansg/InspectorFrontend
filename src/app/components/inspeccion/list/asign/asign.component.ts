import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalBasicComponent} from '../../../../shared/modal-basic/modal-basic.component';
import {CrudService} from '../../../../shared/services/crud.service';

@Component({
  selector: 'app-asign',
  templateUrl: './asign.component.html',
  styles: []
})
export class AsignColaboradorComponent implements OnInit {

  @Output() result = new EventEmitter<any>();
  @Input() datos: any;
  @Input() modalBasic: ModalBasicComponent;
  lsColaborador: any[] = [];
  slColaborador: number;

  constructor(
    private crudService: CrudService
    ) {
    this.lsColaborador = <any> this.crudService.SeleccionarAsync('colaborador_inspector');
  }

  ngOnInit() {
  }

  submit(){
    this.result.emit( this.slColaborador );
    this.modalBasic.hide();
  }

}
