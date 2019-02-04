import { Component, OnInit } from '@angular/core';
import {CrudService} from '../../../shared/services/crud.service';
import {ToolsService} from '../../../shared/services/tools.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: [
    './usuario.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class UsuarioComponent implements OnInit {

  pageSize: number[] = this.tools.pagSize();
  selPageSize: any = this.pageSize[0];
  paginate: any = {
    data: [],
    page: 1,
    total: 0,
    per_page: 0
  };
  constructor(private crudService: CrudService,
              private tools: ToolsService) { }

  ngOnInit() {
    this.reload();
  }

  async setPage(event) {
    this.paginate = await this.crudService.SeleccionarAsync('usuario', {page: event.offset + 1, psize: this.selPageSize});
  }

  delete() {
  }


  async reload() {
    this.paginate = await this.crudService.SeleccionarAsync('usuario', {page: 1, psize: this.selPageSize});
  }

}
