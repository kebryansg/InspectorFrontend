import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {CrudService} from '../../../../shared/services/crud.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ViewEncapsulation} from '@angular/core';
import {PopupSeccionComponent} from '../../catalogo/seccion/popup/popup.component';
import {ModalBasicComponent} from '../../../../shared/modal-basic/modal-basic.component';
import {ModalService} from '../../../../shared/services/modal.service';
import {PopupComponenteComponent} from '../../catalogo/componente/popup/popup.component';

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

  @ViewChild('modalForm') modalForm: ModalBasicComponent;
  @ViewChild('container', {read: ViewContainerRef}) entry: ViewContainerRef;

  datos: any;
  IDFormulario: number;
  lsSeccion: any[] = [];

  constructor(
    private crudService: CrudService,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private router: Router,) {
    this.route.params.subscribe((params) => {
      this.IDFormulario = (params.id);
    });
  }

  async ngOnInit() {

    this.datos = await this.crudService.SeleccionarAsync(`formulario/${ this.IDFormulario }`);
    if (this.datos == null)
      this.cancel();

    this.crudService.SeleccionarAsync(`formulario/${ this.IDFormulario }/seccion/config/`).then((rows: any) => this.lsSeccion = rows);

  }

  deleteSeccion(idx: number) {
    if (this.lsSeccion[idx].ID == 0)
      this.lsSeccion.splice(idx, 1);
    else
      this.lsSeccion[idx].Estado = 'INA';
  }

  activeSeccion(idx: number) {
    this.lsSeccion[idx].Estado = 'ACT';
  }

  newSeccion(row: number = -1) {
    let data = (row != -1) ? this.lsSeccion[row] : {};
    this.titleModal = (row != -1) ? 'Editar Sección' : 'Nuevo Sección';

    this.modalService.setRootViewContainerRef(this.entry);
    this.modalService.addDynamicComponent(PopupSeccionComponent, {
      datos: data,
      modal: this.modalForm,
      result: (data => {
        if (row != -1)
          this.lsSeccion[row] = data;
        else
          this.lsSeccion.push(data);
      })
    });

    this.modalForm.show();
  }

  addComponente(idx: number) {
    this.titleModal = 'Nuevo Componente';
    this.modalService.setRootViewContainerRef(this.entry);
    this.modalService.addDynamicComponent(PopupComponenteComponent, {
      datos: {},
      modal: this.modalForm,
      result: (data => this.lsSeccion[idx].componentes.push(data))
    });

    this.modalForm.show();
  }

  deleteComponent(idxSeccion: number, idxComponent: number) {

    if (this.lsSeccion[idxSeccion].componentes[idxComponent].ID == 0)
      this.lsSeccion[idxSeccion]
        .componentes.splice(idxComponent, 1);
    else
      this.lsSeccion[idxSeccion].componentes[idxComponent].Estado = 'INA';
  }
  activeComponent(idxSeccion: number, idxComponent: number) {
    this.lsSeccion[idxSeccion].componentes[idxComponent].Estado = 'ACT';
  }

  ui_switchChange($event, component) {
    component.Obligatorio = $event;
  }

  cancel() {
    this.router.navigate(['../../list'], {relativeTo: this.route});
  }

  save() {
    this.crudService.Insertar(this.lsSeccion, `formulario/${ this.IDFormulario }/seccion/config/`)
      .subscribe(res => {
        this.cancel();
      });
  }

}
