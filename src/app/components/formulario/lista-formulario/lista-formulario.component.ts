import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ModalBasicComponent} from '../../../shared/modal-basic/modal-basic.component';
import {CrudService} from '../../../shared/services/crud.service';
import {ModalService} from '../../../shared/services/modal.service';
import {ToolsService} from '../../../shared/services/tools.service';
import {PopupFormularioComponent} from './popup/popup.component';
import {PopupSeccionComponent} from '../catalogo/seccion/popup/popup.component';
import swal from 'sweetalert2';

@Component({
  selector: 'app-lista-formulario',
  templateUrl: './lista-formulario.component.html',
  styleUrls: [
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class ListaFormularioComponent implements OnInit {

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
    this.paginate = await this.crudService.SeleccionarAsync('formulario', {page: 1, psize: this.selPageSize});
  }

  async setPage(event) {
    this.paginate = await this.crudService.SeleccionarAsync('formulario', {page: event.offset + 1, psize: this.selPageSize});
  }

  async reload() {
    this.paginate = await this.crudService.SeleccionarAsync('formulario', {page: 1, psize: this.selPageSize});
  }

  async edit(row?) {
    let data = {};
    this.titleModal = 'Nuevo';
    if (row) {
      data = await this.crudService.SeleccionarAsync(`formulario/${row.ID}`);
      this.titleModal = 'Editar';
    }

    this.modalService.setRootViewContainerRef(this.entry);
    this.modalService.addDynamicComponent(PopupFormularioComponent, {
      datos: data,
      modal: this.modalForm,
      result: (data => {
        if (data.ID == 0)
          this.crudService.Insertar(data, 'formulario').subscribe(data => {
            this.reload();
          });
        else
          this.crudService.Actualizar(data, `formulario/${data.ID}`).subscribe(data => {
            this.reload();
          });
      })
    });

    this.modalForm.show();

  }

  synchronize(row) {
    this.crudService.SeleccionarAsync(`formulario_async`, {
      ID: row.ID
    }).then((result: any) => {
      if (result.status)
        swal(
          'Exito!',
          'Se sincronizo el Formulario.',
          'success'
        );
      else
        swal(
          'Error!',
          result.message,
          'warning'
        );
      this.reload();
    });

  }

  delete(row) {
    this.crudService.Eliminar(`formulario/${row.ID}`)
      .subscribe(data => {
        this.reload();
      });

  }

}
