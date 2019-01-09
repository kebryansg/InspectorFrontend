import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {CrudService} from '../../../shared/services/crud.service';
import {ToolsService} from '../../../shared/services/tools.service';
import swal from 'sweetalert2';
import {ModalService} from '../../../shared/services/modal.service';
import {ModalBasicComponent} from '../../../shared/modal-basic/modal-basic.component';
import {AsignColaboradorComponent} from './asign/asign.component';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: [
    './list.component.css',
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class ListComponent implements OnInit {

  pageSize: number[] = this.tools.pagSize();
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
    private tools: ToolsService,
    private db: AngularFireDatabase) {
  }

  ngOnInit() {
    this.reload();
  }

  setPage(event) {
    this.reload(event.offset + 1);
  }

  onEnter(value: string) {
    this.params_dt.search = value;
    this.reload();
  }

  async reload(page: number = 1) {
    this.params_dt.page = page;
    this.paginate = await this.crudService.SeleccionarAsync('inspeccion', this.params_dt);
  }

  async edit(row?) {
    let data = {};
    if (row)
      data = await this.crudService.SeleccionarAsync(`inspeccion/${ row.ID }`);
  }

  asign_colaborador(row) {

    this.modalService.setRootViewContainerRef( this.entry );
    this.modalService.addDynamicComponent( AsignColaboradorComponent , {
      modal: this.modalForm,
      result: (data => {
        this.crudService.Actualizar({}, `inspeccion/${ row.ID }/coladorador/${ data }/`)
          .subscribe(res => {
            swal(
              'Exito!',
              'Se asigno un colaborador para esta inspección.',
              'success'
            );
            this.reload();
          });
      })
    });

    this.modalForm.show();

  }

  delete(row) {

    swal({
      title: 'Esta seguro?',
      text: 'Esta seguro de eliminar esta inspección.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.crudService.Eliminar(`inspeccion/${ row.ID }`)
          .subscribe(
            data => {
              swal(
                'Inactivo!',
                'La Inspección fue eliminada.',
                'success'
              );
              this.reload();
            });
      }
    });


  }

  async synchronize(row) {
    await this.crudService.SeleccionarAsync(`inspeccion/${ row.ID }/async`);
    this.reload();
  }

  refreshCloud(){



      /* Traer datos */
    // this.db.list('/files/forms')
    //   .valueChanges()
    //   .subscribe((item)=>{
    //     console.log(item);
    //   });
  }

}
