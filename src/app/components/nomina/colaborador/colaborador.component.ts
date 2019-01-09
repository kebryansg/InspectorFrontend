import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {CrudService} from '../../../shared/services/crud.service';
import {ModalService} from '../../../shared/services/modal.service';
import {ToolsService} from '../../../shared/services/tools.service';
import {ModalBasicComponent} from '../../../shared/modal-basic/modal-basic.component';
import {PopupColaboradorComponent} from './popup/popup.component';

@Component({
  selector: 'app-colaborador',
  templateUrl: './colaborador.component.html',
  styleUrls: [
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class ColaboradorComponent implements OnInit {

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

    this.paginate = await this.crudService.SeleccionarAsync('colaborador', {page: 1, psize: this.selPageSize});
  }

  async setPage(event) {
    this.paginate = await this.crudService.SeleccionarAsync('colaborador', {page: event.offset + 1, psize: this.selPageSize});
  }

  async reload( ){
    this.paginate = await this.crudService.SeleccionarAsync('colaborador', { page: 1, psize: this.selPageSize });
  }

  async edit(row?) {
    let data = {};
    if (row)
      data = await this.crudService.SeleccionarAsync(`colaborador/${ row.ID }`);

    this.modalService.setRootViewContainerRef( this.entry );
    this.modalService.addDynamicComponent( PopupColaboradorComponent , {
      datos: data,
      modal: this.modalForm,
      result: (data => {
        if (data.ID == 0)
          this.crudService.Insertar(data, 'colaborador').subscribe(data => {
            this.reload();
          });
        else
          this.crudService.Actualizar(data, `colaborador/${ data.ID }`).subscribe(data => {
            this.reload();
          });
      })
    });

    this.modalForm.show();

  }

  async synchronize(row) {
    await this.crudService.SeleccionarAsync(`colaborador/${ row.ID }/async`);
    this.reload();
  }

  delete(row) {
    this.crudService.Eliminar(`colaborador/${ row.ID }`)
      .subscribe(data => {
        this.reload();
      });

  }

}
