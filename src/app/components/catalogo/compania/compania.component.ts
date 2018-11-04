import {Component, OnInit, ViewChild} from '@angular/core';
import {CrudService} from '../../../shared/services/crud.service';
import {ToolsService} from '../../../shared/services/tools.service';
import {ModalBasicComponent} from '../../../shared/modal-basic/modal-basic.component';
import { ViewContainerRef } from '@angular/core';
import { PopupCompaniaComponent } from './popup/popup.component';
import {ModalService} from '../../../shared/services/modal.service';


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
  @ViewChild('modalForm') modalForm: ModalBasicComponent;
  @ViewChild('container', {read: ViewContainerRef}) entry: ViewContainerRef;

  datos: any;

  constructor(
    private crudService: CrudService,
    private modalService: ModalService,
    private tools: ToolsService
  ) {

  }

  async ngOnInit() {

    this.paginate = await this.crudService.SeleccionarAsync('compania', {page: 1, psize: this.selPageSize});
  }

  async setPage(event) {
    this.paginate = await this.crudService.SeleccionarAsync('compania', {page: event.offset + 1, psize: this.selPageSize});
  }

  async edit(row?) {
    let data = {};
    if (row)
      data = await this.crudService.SeleccionarAsync(`compania/${ row.ID }`);

    this.modalService.setRootViewContainerRef( this.entry );
    this.modalService.addDynamicComponent( PopupCompaniaComponent , {
      datos: data,
      modal: this.modalForm,
      result: (data => {
        if (data.ID == 0)
          this.crudService.Insertar(data, 'compania').subscribe(data => {
            this.reload();
          });
        else
          this.crudService.Actualizar(data, `compania/${ data.ID }`).subscribe(data => {
            this.reload();
          });
      })
    });

  }

  delete(row) {
    this.crudService.Eliminar(`compania/${ row.ID }`)
      .subscribe(data => {
        this.reload();
      });

  }

  async reload( ){
    this.paginate = await this.crudService.SeleccionarAsync('compania', { page: 1, psize: this.selPageSize });
  }

}
