import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {CrudService} from '../../../shared/services/crud.service';
import {ModalService} from '../../../shared/services/modal.service';
import {ToolsService} from '../../../shared/services/tools.service';
import {PopupTipoEmpresaComponent} from './popup/popup.component';
import {ModalBasicComponent} from '../../../shared/modal-basic/modal-basic.component';

@Component({
  selector: 'app-tipo-empresa',
  templateUrl: './tipo-empresa.component.html',
  styleUrls: [
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class TipoEmpresaComponent implements OnInit {
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

    this.paginate = await this.crudService.SeleccionarAsync('tipoempresa', {page: 1, psize: this.selPageSize});
  }

  async setPage(event) {
    this.paginate = await this.crudService.SeleccionarAsync('tipoempresa', {page: event.offset + 1, psize: this.selPageSize});
  }

  async reload() {
    this.paginate = await this.crudService.SeleccionarAsync('tipoempresa', {page: 1, psize: this.selPageSize});
  }

  async edit(row?) {
    let data = {};
    this.titleModal = 'Nuevo';
    if (row) {
      data = await this.crudService.SeleccionarAsync(`tipoempresa/${row.ID}`);
      this.titleModal = 'Editar';
    }

    this.modalService.setRootViewContainerRef(this.entry);
    this.modalService.addDynamicComponent(PopupTipoEmpresaComponent, {
      datos: data,
      modal: this.modalForm,
      result: (data => {
        let exec = (data.ID == 0) ? this.crudService.Insertar(data, 'tipoempresa') : this.crudService.Actualizar(data, `tipoempresa/${data.ID}`);
        exec.subscribe(data => {
          this.reload();
        });
      })
    });

    this.modalForm.show();

  }

  delete(row) {
    this.crudService.Eliminar(`tipoempresa/${row.ID}`)
      .subscribe(data => {
        this.reload();
      });

  }

}
