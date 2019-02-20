import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CrudService} from '../../../../shared/services/crud.service';
import {ModalBasicComponent} from '../../../../shared/modal-basic/modal-basic.component';

@Component({
  selector: 'app-asign-grupo',
  templateUrl: './asign-grupo.component.html',
  styleUrls: [
    '../../../../../assets/icon/icofont/css/icofont.scss'
  ],
})
export class AsignGrupoComponent implements OnInit {
  /* Modal Propery */
  @Output() result = new EventEmitter<any>();
  @Input() datos: any;
  @Input() modalBasic: ModalBasicComponent;


  lsCategoria: any[] = [];
  selected: any[] = [];

  constructor(private crudService:CrudService) { }

  async ngOnInit() {
    this.lsCategoria = await this.crudService.SeleccionarAsync('categoria_combo', {
      grupo: this.datos.IDGrupo
    }) as any[];
  }

  onSelect({selected}) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  getID(row) {
    return row.ID;
  }

  asignarCategoria(){
    let selection = this.getSelection();
    this.crudService.Actualizar(selection, 'asign_grupocategoria/' + this.datos.IDGrupo)
      .subscribe( response => {
        this.result.emit(this.selected);
        this.modalBasic.hide();
      });
  }

  getSelection() {
    return this.selected.map(row => ({ IDCategoria : row.ID}));
  }

}
