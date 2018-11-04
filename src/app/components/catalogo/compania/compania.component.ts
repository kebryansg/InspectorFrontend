import {Component, OnInit, ViewChild} from '@angular/core';
import {CrudService} from '../../../shared/services/crud.service';
import {ToolsService} from '../../../shared/services/tools.service';
import {ModalBasicComponent} from '../../../shared/modal-basic/modal-basic.component';
import {ComponentFactoryResolver, ViewContainerRef} from '@angular/core';
import {PopupComponent} from './popup/popup.component';
import {ModalService} from '../../../shared/services/modal.service';

import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-compania',
  templateUrl: './compania.component.html',
  styleUrls: [
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class CompaniaComponent implements OnInit {
  pageSize: number[] = this.tools.pagSize();
  selPageSize: any = this.pageSize[0];
  paginate: any = {
    data: [],
    page: 1,
    total: 0,
    per_page: 0
  };
  @ViewChild('modalForm') modalForm: NgbActiveModal;
  @ViewChild('container', {read: ViewContainerRef}) entry: ViewContainerRef;

  datos: any;
  closeResult: string;

  constructor(
    private crudService: CrudService,
    private modalService: ModalService,
    private tools: ToolsService,
    private modalService2: NgbModal
  ) {

  }

  async ngOnInit() {

    this.paginate = await this.crudService.SeleccionarAsync('compania', {page: 1, psize: this.selPageSize});
  }

  async setPage(event) {
    this.paginate = await this.crudService.SeleccionarAsync('compania', {page: event.offset + 1, psize: this.selPageSize});
  }

  async edit(row?) {

    if (row)
      this.datos = await this.crudService.SeleccionarAsync(`compania/${ row.ID }`);
    else this.datos = {};

    this.modalService2.open(this.modalForm, this.tools.optionsModalCatalogo());

  }

  delete(row) {
    this.crudService.Eliminar(`compania/${ row.ID }`)
      .subscribe(data => {
        this.reload();
      });

  }

  resultModal(data) {
    if (data.ID == 0)
      this.crudService.Insertar(data, 'compania').subscribe(data => {
        this.reload();
      });
    else
      this.crudService.Actualizar(data, `compania/${ data.ID }`).subscribe(data => {
        this.reload();
      });

  }

  async reload( ){
    this.paginate = await this.crudService.SeleccionarAsync('compania', { page: 1, psize: this.selPageSize });
  }

}
