import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ToolsService} from '../../../../shared/services/tools.service';
import {CrudService} from '../../../../shared/services/crud.service';
import {ModalBasicComponent} from '../../../../shared/modal-basic/modal-basic.component';
import {ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: [
    '../../../../../assets/icon/icofont/css/icofont.scss'
  ],
  encapsulation: ViewEncapsulation.None,
})
export class ModalEmpresaComponent implements OnInit {

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

  constructor(
    private crudService: CrudService,
    private tools: ToolsService
  ) {
  }

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
    this.paginate = await this.crudService.SeleccionarAsync('empresa', this.params_dt);
  }

  returnSelect() {
    this.result.emit(this.selected[0]);
    this.modalBasic.hide();
  }

}
