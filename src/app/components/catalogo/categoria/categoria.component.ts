import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ModalBasicComponent} from '../../../shared/modal-basic/modal-basic.component';
import {CrudService} from '../../../shared/services/crud.service';
import {ModalService} from '../../../shared/services/modal.service';
import {ToolsService} from '../../../shared/services/tools.service';
import {PopupCategoriaComponent} from './popup/popup.component';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: [
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class CategoriaComponent implements OnInit {
  pageSize: number[] = this.tools.pagSize();
  selPageSize: any = this.pageSize[0];
  titleModal: any;
  paginate: any = {
    data: [],
    page: 1,
    total: 0,
    per_page: 0
  };
  @ViewChild('modalForm') modalForm: ModalBasicComponent;
  @ViewChild('container', {read: ViewContainerRef}) entry: ViewContainerRef;

  constructor(
    private crudService: CrudService,
    private modalService: ModalService,
    private tools: ToolsService
  ) {
  }

  async ngOnInit() {

    this.paginate = await this.crudService.SeleccionarAsync('categoria', {page: 1, psize: this.selPageSize});
  }

  async setPage(event) {
    this.paginate = await this.crudService.SeleccionarAsync('categoria', {page: event.offset + 1, psize: this.selPageSize});
  }

  async reload() {
    this.paginate = await this.crudService.SeleccionarAsync('categoria', {page: 1, psize: this.selPageSize});
  }

  async edit(row?) {
    let data = {};
    this.titleModal = 'Nuevo';
    if (row) {
      data = await this.crudService.SeleccionarAsync(`categoria/${row.ID}`);
      this.titleModal = 'Editar';
    }

    this.modalService.setRootViewContainerRef(this.entry);
    this.modalService.addDynamicComponent(PopupCategoriaComponent, {
      datos: data,
      modal: this.modalForm,
      result: (data => {
        let exec = (data.ID == 0) ? this.crudService.Insertar(data, 'categoria') : this.crudService.Actualizar(data, `categoria/${data.ID}`);
        exec.subscribe(data => {
          this.reload();
        });
      })
    });

    this.modalForm.show();

  }

  delete(row) {
    this.crudService.Eliminar(`categoria/${row.ID}`)
      .subscribe(data => {
        this.reload();
      });

  }

}
