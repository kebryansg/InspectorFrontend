import { Component, OnInit } from '@angular/core';
import {CrudService} from '../../../shared/services/crud.service';
import {ToolsService} from '../../../shared/services/tools.service';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: [
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class GrupoComponent implements OnInit {

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
    private tools: ToolsService) {
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
    this.paginate = await this.crudService.SeleccionarAsync('grupo', this.params_dt);
  }

  delete(row) {
    this.crudService.Eliminar(`grupo/${ row.ID }`)
      .subscribe(data => {
        this.reload();
      });

  }

}
