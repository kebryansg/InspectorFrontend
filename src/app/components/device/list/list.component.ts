import {Component, OnInit} from '@angular/core';
import {CrudService} from '../../../shared/services/crud.service';
import {ToolsService} from '../../../shared/services/tools.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: [
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

  constructor(
    private crudService: CrudService,
    private tools: ToolsService,) {

  }

  ngOnInit() {
    this.reload();
  }

  setPage(event) {
    this.reload(event.offset + 1);
  }

  async reload(page: number = 1) {
    this.params_dt.page = page;
    this.paginate = await this.crudService.SeleccionarAsync('device', this.params_dt);
  }

  autorizarDevice(row) {
    this.crudService.Actualizar({
      permiso: true
    }, `device/${row.ID}/`)
      .subscribe(res => {
        this.reload();
        swal(
          'Exito!',
          'Dispositivo Aprobado.',
          'success'
        );
      });
  }

  removeDevice(row) {
    swal({
      title: 'Quitar permisos a este dispositivo?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, seguro.',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.crudService.Actualizar({
          permiso: false
        }, `device/${row.ID}/`)
          .subscribe(res => {
            this.reload();
            swal(
              'Exito!',
              'Se quito permisos al dispositivo.',
              'success'
            );
          });


      }
    });
  }

  showKey(row) {
    swal({
      type: 'info',
      title: 'Token - Clave',
      html: row.Token,
      width: '45rem'
    });
  }

}
