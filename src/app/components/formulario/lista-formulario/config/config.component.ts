import { Component, OnInit } from '@angular/core';
import {CrudService} from '../../../../shared/services/crud.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './config.component.scss',
    '../../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class ConfigFormularioComponent implements OnInit {
  datos: any;
  IDFormulario: number;
  lsSeccion: any[];

  constructor(
    private crudService: CrudService,
    private route: ActivatedRoute,
    private router: Router,) {
    this.route.params.subscribe((params) => {
      this.IDFormulario = (params.id);
    });
  }

  async ngOnInit() {
    this.datos = await this.crudService.SeleccionarAsync(`formulario/${ this.IDFormulario }`);
    if (this.datos == null)
      this.cancel();

    let seccions: any[] = await <any>this.crudService.SeleccionarAsync(`formulario/${ this.IDFormulario }/seccion/config/`);
    this.lsSeccion = seccions.map(item => {
      item.componentes.forEach(row => {
        row.Obligatorio = (row.Obligatorio == 1);
        // console.log(row);
        // row.Atributo = JSON.parse(row.Atributo);
        row.Atributo = (row.Atributo);
      });
      return item;
    });

  }

  ui_switchChange($event, component) {
    component.Obligatorio = $event;
  }

  cancel() {
    this.router.navigate(['../../list'], {relativeTo: this.route});
  }

  save(){
    let rows : any[] = [];
    this.lsSeccion.forEach(seccion => {
      seccion.componentes.forEach(component => {
        rows.push( component );
      });
    });

    this.crudService.Insertar(rows, `formulario/${ this.IDFormulario }/seccion/config/`).subscribe(res => {
      this.cancel();
    });
  }

}
