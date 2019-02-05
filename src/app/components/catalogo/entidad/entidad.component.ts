import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ModalBasicComponent} from '../../../shared/modal-basic/modal-basic.component';
import {CrudService} from '../../../shared/services/crud.service';
import {ModalService} from '../../../shared/services/modal.service';
import {ToolsService} from '../../../shared/services/tools.service';
import {PopupEntidadComponent} from './popup/popup.component';

@Component({
  selector: 'app-entidad',
  templateUrl: './entidad.component.html',
  styleUrls: [
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class EntidadComponent implements OnInit {

  pageSize: number[] = this.tools.pagSize();
  selPageSize: any = this.pageSize[0];
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
  @ViewChild('modalForm') modalForm: ModalBasicComponent;
  @ViewChild('container', {read: ViewContainerRef}) entry: ViewContainerRef;

  constructor(
    private crudService: CrudService,
    private modalService: ModalService,
    private tools: ToolsService
  ) { }

  async ngOnInit() {
    this.reload();

    // this.paginate = await this.crudService.SeleccionarAsync('entidad', {page: 1, psize: this.selPageSize});
  }

  async setPage(event) {
    this.reload(event.offset + 1);
  }

  async reload(page: number = 1){
    this.params_dt.page = page;
    this.paginate = await this.crudService.SeleccionarAsync('entidad', this.params_dt);
    // this.paginate = await this.crudService.SeleccionarAsync('entidad', { page: 1, psize: this.selPageSize });
  }

  async edit(row?) {
    let data = {};
    if (row)
      data = await this.crudService.SeleccionarAsync(`entidad/${ row.ID }`);

    this.modalService.setRootViewContainerRef( this.entry );
    this.modalService.addDynamicComponent( PopupEntidadComponent , {
      datos: data,
      modal: this.modalForm,
      result: (data => {
        if (data.ID == 0)
          this.crudService.Insertar(data, 'entidad').subscribe(data => {
            this.reload();
          });
        else
          this.crudService.Actualizar(data, `entidad/${ data.ID }`).subscribe(data => {
            this.reload();
          });
      })
    });

    this.modalForm.show();
  }

  onEnter(value: string) {
    this.params_dt.search = value;
    this.reload();
  }

  delete(row) {
    this.crudService.Eliminar(`entidad/${ row.ID }`)
      .subscribe(data => {
        this.reload();
      });

  }

}
