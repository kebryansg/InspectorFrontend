import {Component, OnInit} from '@angular/core';
import {ToolsService} from '../../../shared/services/tools.service';
import {CrudService} from '../../../shared/services/crud.service';

@Component({
  selector: 'app-asign',
  templateUrl: './asign.component.html',
  styleUrls: [
    './asign.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class AsignFormularioComponent implements OnInit {

  slCategoria: number = null;
  slActEconomica: number = null;
  slFormulario: number = null;

  lsActEconomica: any[];
  lsCategoria: any[];
  lsClasificacion: any[] = [];
  lsFilterClasificacion: any[] = [];

  lsFormulario: any[];
  selected: any[] = [];

  constructor(private crudService: CrudService,
              private tools: ToolsService) {

  }

  async ngOnInit() {
    this.lsActEconomica = await <any> this.crudService.SeleccionarAsync('acteconomica_combo');
    this.lsFormulario = <any> this.crudService.SeleccionarAsync('formulario_combo');

  }

  loadCategoria() {
    this.filter();
    this.lsCategoria = <any> this.lsActEconomica.find(item => item.ID == this.slActEconomica).tipoacteconomicas;
  }

  async filter() {
    this.lsFilterClasificacion = this.lsClasificacion = await <any>this.crudService.SeleccionarAsync('clasificacion_ls_asign', {
      IDActEconomica: this.slActEconomica
    });
  }

  filterClasificacion() {
    if (this.slCategoria)
      this.lsFilterClasificacion = this.lsClasificacion.filter(item => item.IDTipoActEcon == this.slCategoria);
    else
      this.lsFilterClasificacion = this.lsClasificacion;
    this.selected = [];
  }

  onSelect({selected}) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  save() {
    let items = this.selected.map(item => item.ID);
    this.crudService.Insertar(items, `clasificacion_ls_asign/${ this.slFormulario }/`)
      .subscribe(res => {
        this.selected = this.lsFilterClasificacion = [];
        this.slActEconomica = this.slCategoria = this.slFormulario = null;
      });

  }

  clearCategoria() {
    this.slCategoria = null;
    this.filterClasificacion();
  }

}
