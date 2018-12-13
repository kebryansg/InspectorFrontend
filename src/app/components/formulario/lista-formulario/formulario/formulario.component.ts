import {Component, OnInit, ViewChild} from '@angular/core';
import {CrudService} from '../../../../shared/services/crud.service';
import {ModalService} from '../../../../shared/services/modal.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToolsService} from '../../../../shared/services/tools.service';
import {WizardComponent} from 'ng2-archwizard/dist';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: [
    './formulario.component.css',
    '../../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class FormularioComponent implements OnInit {

  @ViewChild(WizardComponent) public wizard: WizardComponent;

  search: string = '';
  IDFormulario: number;
  datos: any;
  lsSeccions: Array<any> = [];
  lsFormComps: Array<any> = [];
  lsSeccionComponents: Array<any> = [];

  formulario_seccion: any[];


  constructor(
    private crudService: CrudService,
    private route: ActivatedRoute,
    private router: Router,
    private tools: ToolsService) {

    this.route.params.subscribe((params) => {
      this.IDFormulario = (params.id);
    });

  }

  async ngOnInit() {
    this.datos = await this.crudService.SeleccionarAsync(`formulario/${ this.IDFormulario }`);
    if (this.datos == null)
      this.cancel();

    let seccions = await <any>this.crudService.SeleccionarAsync('seccion_combo');
    this.formulario_seccion = await <any>this.crudService.SeleccionarAsync(`formularios/${ this.IDFormulario }/seccion`);

    this.lsSeccions = seccions.filter(seccion => this.formulario_seccion.indexOf(seccion.ID) == -1);
    this.lsFormComps = seccions.filter(seccion => this.formulario_seccion.indexOf(seccion.ID) != -1);

  }

  cancel() {
    this.router.navigate(['../../list'], {relativeTo: this.route});
  }

  async loadComponents() {
    let data = this.lsFormComps.map(item => item.ID);
    let rows = await <any> this.crudService.SeleccionarAsync('seccions/components/', {
      Seccion: data.join()
    });
    let seccionComponents: any[] = await <any> this.crudService.SeleccionarAsync(`formularios/${ this.IDFormulario }/component`);

    rows.forEach(row => {
      row.status = true;
      let item = seccionComponents.find(item => row.ID == item.ID);
      if ( item ) {
        row.status = (item.Estado == 'ACT');
      }
    });

    this.lsSeccionComponents = this.lsFormComps.map(item => {
      item.components = rows.filter(row => row.IDSeccion == item.ID);
      return item;
    });

    console.log(this.lsSeccionComponents);
  }

  ui_switchChange($event, component) {
    component.status = $event;
  }

  removeSeccion(IDSeccion) {
    this.lsSeccionComponents.splice(this.lsSeccionComponents.findIndex(item => item.ID == IDSeccion), 1);
  }

  finalizeProcs() {
    let rows = [];
    this.lsSeccionComponents.forEach(seccion => {
      seccion.components.forEach(component => {
        rows.push({
          IDSeccionComponente: component.ID,
          Estado: (component.status) ? 'ACT' : 'INA'
        });
      });
    });

    this.crudService.Insertar(rows, `formularios/${ this.IDFormulario }/seccion`)
      .subscribe(res => {
        this.cancel();
      });

  }


}
