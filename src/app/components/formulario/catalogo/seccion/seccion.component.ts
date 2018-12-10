import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ModalBasicComponent} from '../../../../shared/modal-basic/modal-basic.component';
import {CrudService} from '../../../../shared/services/crud.service';
import {ModalService} from '../../../../shared/services/modal.service';
import {ToolsService} from '../../../../shared/services/tools.service';
import {PopupSeccionComponent} from './popup/popup.component';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-seccion',
  templateUrl: './seccion.component.html',
  styleUrls: [
    '../../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class SeccionComponent implements OnInit {

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
    private router: Router,
    private tools: ToolsService
  ) {
  }

  async ngOnInit() {
    this.paginate = await this.crudService.SeleccionarAsync('seccion', {page: 1, psize: this.selPageSize});
  }

  async setPage(event) {
    this.paginate = await this.crudService.SeleccionarAsync('seccion', {page: event.offset + 1, psize: this.selPageSize});
  }

  async reload() {
    this.paginate = await this.crudService.SeleccionarAsync('seccion', { page: 1, psize: this.selPageSize });
  }

  async edit(row?) {
    let data = {};
    this.titleModal = 'Nuevo';
    if (row)
    {
      data = await this.crudService.SeleccionarAsync(`seccion/${ row.ID }`);
      this.titleModal = 'Editar';
    }

    this.modalService.setRootViewContainerRef( this.entry );
    this.modalService.addDynamicComponent( PopupSeccionComponent , {
      datos: data,
      modal: this.modalForm,
      result: (data => {
        if (data.ID == 0)
          this.crudService.Insertar(data, 'seccion').subscribe(data => {
            this.reload();
          });
        else
          this.crudService.Actualizar(data, `seccion/${ data.ID }`).subscribe(data => {
            this.reload();
          });
      })
    });

    this.modalForm.show();

  }

  asign( row ){
    this.router.navigate(['./asign']);
  }

  delete(row) {
    this.crudService.Eliminar(`seccion/${ row.ID }`)
      .subscribe(data => {
        this.reload();
      });
  }

}
