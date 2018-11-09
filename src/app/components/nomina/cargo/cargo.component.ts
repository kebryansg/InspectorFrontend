import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {CrudService} from '../../../shared/services/crud.service';
import {ModalService} from '../../../shared/services/modal.service';
import {ToolsService} from '../../../shared/services/tools.service';
import {ModalBasicComponent} from '../../../shared/modal-basic/modal-basic.component';
import {PopupDepartamentoComponent} from '../../catalogo/departamento/popup/popup.component';

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styles: []
})
export class CargoComponent implements OnInit {

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

  constructor(
    private crudService: CrudService,
    private modalService: ModalService,
    private tools: ToolsService
  ) { }

  async ngOnInit() {

    this.paginate = await this.crudService.SeleccionarAsync('cargo', {page: 1, psize: this.selPageSize});
  }

  async setPage(event) {
    this.paginate = await this.crudService.SeleccionarAsync('cargo', {page: event.offset + 1, psize: this.selPageSize});
  }

  async reload( ){
    this.paginate = await this.crudService.SeleccionarAsync('cargo', { page: 1, psize: this.selPageSize });
  }

  async edit(row?) {
    let data = {};
    if (row)
      data = await this.crudService.SeleccionarAsync(`cargo/${ row.ID }`);

    this.modalService.setRootViewContainerRef( this.entry );
    this.modalService.addDynamicComponent( PopupDepartamentoComponent , {
      datos: data,
      modal: this.modalForm,
      result: (data => {
        if (data.ID == 0)
          this.crudService.Insertar(data, 'cargo').subscribe(data => {
            this.reload();
          });
        else
          this.crudService.Actualizar(data, `cargo/${ data.ID }`).subscribe(data => {
            this.reload();
          });
      })
    });

    this.modalForm.show();

  }

  delete(row) {
    this.crudService.Eliminar(`cargo/${ row.ID }`)
      .subscribe(data => {
        this.reload();
      });

  }

}
