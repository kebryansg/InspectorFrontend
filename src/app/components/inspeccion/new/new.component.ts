import {Component, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {CrudService} from '../../../shared/services/crud.service';
import {ModalBasicComponent} from '../../../shared/modal-basic/modal-basic.component';
import {NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import {ModalService} from '../../../shared/services/modal.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {ModalEntidadComponent} from '../../catalogo/entidad/modal/modal.component';
import {ToolsService} from '../../../shared/services/tools.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: [
    './new.component.css',
    '../../../../assets/icon/icofont/css/icofont.scss'
  ],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}],
  encapsulation: ViewEncapsulation.None
})
export class NewInspeccionComponent implements OnInit {


  @ViewChild('modalForm') modalForm: ModalBasicComponent;
  @ViewChild('container', {read: ViewContainerRef}) entry: ViewContainerRef;
  modelPopup: Date;
  toggle = false;
  lsColaborador: any;
  lsEmpresa: any[];

  empresa: any = [];
  entidad: any = [];

  form: FormGroup;

  InspWeb: boolean = false;

  constructor(
    private crudService: CrudService,
    private modalService: ModalService,
    private toolsService: ToolsService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,) {
  }

  async ngOnInit() {

    this.form = this.fb.group({
      ID: [0],
      IDEmpresa: [null, Validators.required],
      IDColaborador: [null],
      FechaTentativa: [null]
    });
    this.lsColaborador = this.crudService.SeleccionarAsync('colaborador_inspector');

  }

  async onEnter(value: string) {
    if (value.length >= 10) {
      this.entidad = await this.crudService.SeleccionarAsync(`entidad_search`, {search: value});
      this.lsEmpresa = this.entidad.empresas;
    }
  }

  async onEnterEmpresa(value: string) {
    if (value) {
      this.lsEmpresa = await this.crudService.SeleccionarAsync(`empresa_search`, {search: value}) as any[];
      this.entidad = null;
    }
  }

  loadmodal(event) {
    event.preventDefault();
    let data = {};
    this.modalService.setRootViewContainerRef(this.entry);
    this.modalService.addDynamicComponent(ModalEntidadComponent, {
      datos: data,
      modal: this.modalForm,
      result: (async (data) => {
        this.entidad = data;
        this.lsEmpresa = await this.crudService.SeleccionarAsync(`entidad/${data.ID}/empresa`) as any[];
        // this.form.controls['IDEmpresa'].setValue(data.ID);
      })
    });

    this.modalForm.show();
  }

  ui_switchChange($event) {
    this.InspWeb = $event;
  }

  onSelect({selected}) {
    this.form.controls['IDEmpresa'].setValue(selected[0].ID);
  }

  clearColaborador() {
    this.form.controls['IDColaborador'].setValue(null);
  }

  save() {
    let data = this.form.value;
    data.FechaTentativa = this.toolsService.getMomentoFormat(data.FechaTentativa);
    data.InspWeb = this.InspWeb;
    if (data.InspWeb) {
      data.FechaTentativa = null;
    }

    this.crudService.Insertar(data, 'inspeccion')
      .subscribe(
        res => {
          this.router.navigate(['../list'], {relativeTo: this.route});
        },
        error => {
          swal({
            title: 'Problemas',
            text: error.error.message,
            type: 'error'
          }).catch(swal.noop);
        }
      );


  }

}
