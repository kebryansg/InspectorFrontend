import {Component, OnInit} from '@angular/core';
import {CrudService} from '../../../shared/services/crud.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.scss']
})
export class WebInspeccionComponent implements OnInit {

  lsSeccion: any[];
  Inspeccion: any;

  constructor(private crudService: CrudService,
              private router: Router,
              private route: ActivatedRoute,) {
  }

  ngOnInit() {
    this.route.params.subscribe(async (params) => {
      this.Inspeccion = await this.crudService.SeleccionarAsync('inspeccion/' + params.id);
      let rows = await this.crudService.SeleccionarAsync(`formulario/${this.Inspeccion.IDFormulario}/seccion/config`) as any[];
      for (let row of rows) {
        for (let component of row.componentes) {
          if (component.IDTipoComp == '5') {
            component.Show = false;
          }
        }
      }

      this.lsSeccion = rows;
    });

  }

  ui_switchChange($event, component) {
    component.Atributo = $event;
  }

  ui_switchAcordion($event, component) {
    component.Show = $event;
  }

}
