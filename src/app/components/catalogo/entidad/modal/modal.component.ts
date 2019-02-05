import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CrudService} from '../../../../shared/services/crud.service';
import {ToolsService} from '../../../../shared/services/tools.service';
import {ModalBasicComponent} from '../../../../shared/modal-basic/modal-basic.component';

@Component({
  selector: 'app-modalentidad',
  templateUrl: './modal.component.html',
  styleUrls: [
    '../../../../../assets/icon/icofont/css/icofont.scss'
  ],
})
export class ModalEntidadComponent implements OnInit {

  /* Modal Propery */
  @Output() result = new EventEmitter<any>();
  @Input() datos: any;
  @Input() modalBasic: ModalBasicComponent;

  pageSize: number[] = this.tools.pagSize();
  params_dt: any = {
    page: 1,
    psize: this.pageSize[0],
    search: ''
  };
  paginate: any = {
    data: [],
    page: 1,
    total: 0,
    per_page: 0
  };
  selected: any = [];

  constructor(private crudService: CrudService,
              private tools: ToolsService) { }

  ngOnInit() {
    this.reload();
  }

  setPage(event) {
    this.reload(event.offset + 1);
  }

  onSelect({selected}) {
  }

  onEnter(value: string) {
    this.params_dt.search = value;
    this.reload();
  }

  async reload(page: number = 1) {
    this.params_dt.page = page;
    this.paginate = await this.crudService.SeleccionarAsync('entidad', {...this.params_dt, modal: true});
  }

  returnSelect() {
    this.result.emit(this.selected[0]);
    this.modalBasic.hide();
  }

}
