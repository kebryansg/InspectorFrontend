import {Component, OnInit, ViewChild} from '@angular/core';
import {CrudService} from '../../../../shared/services/crud.service';
import {ToolsService} from '../../../../shared/services/tools.service';
import {ViewContainerRef} from '@angular/core';
import {ModalBasicComponent} from '../../../../shared/modal-basic/modal-basic.component';
import {PopupComponenteComponent} from './popup/popup.component';
import {ModalService} from '../../../../shared/services/modal.service';

@Component({
  selector: 'app-componente',
  templateUrl: './componente.component.html',
  styleUrls: [
    '../../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class ComponenteComponent implements OnInit {

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
  titleModal: string;

  constructor(
    private crudService: CrudService,
    private modalService: ModalService,
    private tools: ToolsService
  ) {
  }

  async ngOnInit() {
    this.paginate = await this.crudService.SeleccionarAsync('componente', {page: 1, psize: this.selPageSize});
  }

  async setPage(event) {
    this.paginate = await this.crudService.SeleccionarAsync('componente', {page: event.offset + 1, psize: this.selPageSize});
  }

  async reload() {
    this.paginate = await this.crudService.SeleccionarAsync('componente', { page: 1, psize: this.selPageSize });
  }

  async edit(row?) {
    let data = {};
    this.titleModal = 'Nuevo';
    if (row)
    {
      data = await this.crudService.SeleccionarAsync(`componente/${ row.ID }`);
      this.titleModal = 'Editar';
    }

    this.modalService.setRootViewContainerRef( this.entry );
    this.modalService.addDynamicComponent( PopupComponenteComponent , {
      datos: data,
      modal: this.modalForm,
      result: (data => {
        if (data.ID == 0)
          this.crudService.Insertar(data, 'componente').subscribe(data => {
            this.reload();
          });
        else
          this.crudService.Actualizar(data, `componente/${ data.ID }`).subscribe(data => {
            this.reload();
          });
      })
    });

    this.modalForm.show();

  }

  delete(row) {
    this.crudService.Eliminar(`componente/${ row.ID }`)
      .subscribe(data => {
        this.reload();
      });
  }

}
