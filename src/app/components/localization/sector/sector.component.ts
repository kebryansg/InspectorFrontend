import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ModalBasicComponent} from '../../../shared/modal-basic/modal-basic.component';
import {CrudService} from '../../../shared/services/crud.service';
import {ModalService} from '../../../shared/services/modal.service';
import {ToolsService} from '../../../shared/services/tools.service';
import {PopupSectorComponent} from './popup/popup.component';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: [
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class SectorComponent implements OnInit {

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
  ) { }

  async ngOnInit() {

    this.paginate = await this.crudService.SeleccionarAsync('sector', {page: 1, psize: this.selPageSize});
  }

  async setPage(event) {
    this.paginate = await this.crudService.SeleccionarAsync('sector', {page: event.offset + 1, psize: this.selPageSize});
  }

  async reload( ){
    this.paginate = await this.crudService.SeleccionarAsync('sector', { page: 1, psize: this.selPageSize });
  }

  async edit(row?) {
    let data = {};
    this.titleModal = 'Nuevo';
    if (row){
      data = await this.crudService.SeleccionarAsync(`sector/${ row.ID }`);
      this.titleModal = 'Editar';
    }


    this.modalService.setRootViewContainerRef( this.entry );
    this.modalService.addDynamicComponent( PopupSectorComponent , {
      datos: data,
      modal: this.modalForm,
      result: (data => {
        if (data.ID == 0)
          this.crudService.Insertar(data, 'sector').subscribe(data => {
            this.reload();
          });
        else
          this.crudService.Actualizar(data, `sector/${ data.ID }`).subscribe(data => {
            this.reload();
          });
      })
    });

    this.modalForm.show();

  }

  delete(row) {
    this.crudService.Eliminar(`sector/${ row.ID }`)
      .subscribe(data => {
        this.reload();
      });

  }

}
