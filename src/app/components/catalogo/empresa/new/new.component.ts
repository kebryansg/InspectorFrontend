import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrudService} from '../../../../shared/services/crud.service';
import {ToolsService} from '../../../../shared/services/tools.service';
import {ActivatedRoute, Router} from '@angular/router';
import {animate, style, transition, trigger} from '@angular/animations';
import swal from 'sweetalert2';
import {ModalBasicComponent} from '../../../../shared/modal-basic/modal-basic.component';
import {ModalService} from '../../../../shared/services/modal.service';
import {ModalEntidadComponent} from '../../entidad/modal/modal.component';
import {PopupActividadEconomicaComponent} from '../../actividad-economica/popup/popup.component';
import {PopupTipoEmpresaComponent} from '../../tipo-empresa/popup/popup.component';
import {PopupActividadComponent} from '../../grupo/actividad/popup/popup.component';
import {PopupCategoriaComponent} from '../../categoria/popup/popup.component';
import {PopupGrupoComponent} from '../../grupo/popup/popup.component';
import {AsignGrupoComponent} from '../../categoria/asign-grupo/asign-grupo.component';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: [
    '../../../../../assets/icon/icofont/css/icofont.scss'
  ],
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({opacity: 0}),
        animate('400ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translate(0)'}),
        animate('400ms ease-in-out', style({opacity: 0}))
      ])
    ])
  ]
})


export class NewEmpresaComponent implements OnInit {

  form: FormGroup;

  @ViewChild('modalForm') modalForm: ModalBasicComponent;
  @ViewChild('container', {read: ViewContainerRef}) entry: ViewContainerRef;

  /* Maps */
  lat: number = -0.8948968;
  lng: number = -79.4903393;

  lsMarcardoresMaps: any[] = [];

  lsActEconomica: any[] = [];
  lsTipoEmpresa: any[] = [];


  lsGrupo: any[] = [];
  lsActividad: any[] = [];
  lsCategoria: any[] = [];

  lsProvincias: any[] = [];
  lsParroquia: any[] = [];
  lsCanton: any[] = [];
  lsSector: any[] = [];
  datos: any;
  entidad: any = {};
  titleModal: string = '';
  cssModal: string = '';

  constructor(private fb: FormBuilder,
              protected crudService: CrudService,
              private modalService: ModalService,
              protected tools: ToolsService,
              private router: Router,
              private route: ActivatedRoute,) {
  }

  async ngOnInit() {

    let combine = await Promise.all([
      this.crudService.SeleccionarAsync('acteconomica_combo'),
      this.crudService.SeleccionarAsync('tipoempresa_combo'),
      this.crudService.SeleccionarAsync('location_combo_sector'),
      this.crudService.SeleccionarAsync('grupo_combo')
    ]);

    this.lsActEconomica = combine[0] as any[];
    this.lsTipoEmpresa = combine[1] as any[];
    this.lsProvincias = combine[2] as any[];
    this.lsGrupo = combine[3] as any[];

    this.route.params.subscribe(async (params) => {
      let datos = await this.getData(params.id);
      await this.loadEmpresa(datos);
    });

    // this.lsEntidad = this.crudService.SeleccionarAsync('entidad_combo') as any[];
  }

  cancel() {
    let data = (this.form.value);
    let ruta = (data.ID == 0) ? '../../empresa' : '../../../empresa';
    this.router.navigate([ruta], {relativeTo: this.route});
  }

  async getData(IDEmpresa) {
    if (IDEmpresa) {
      return await <any>this.crudService.SeleccionarAsync(`empresa/` + IDEmpresa).then(response => response);
    }
    return {};
  }

  loadEmpresa(datos) {
    this.form = this.fb.group({
      ID: [datos.ID || 0],
      RUC: [datos.RUC || null, Validators.required],
      NombreComercial: [datos.NombreComercial || '', Validators.required],
      RazonSocial: [datos.RazonSocial || '', Validators.required],
      Direccion: [datos.Direccion || '', Validators.required],
      Telefono: [datos.Telefono || '', Validators.required],
      Celular: [datos.Celular || '', Validators.required],
      Email: [datos.Email || ''],
      Referencia: [datos.Referencia || '', Validators.required],
      Estado: [datos.Estado || 'ACT', Validators.required],
      EstadoAplicacion: ['P', Validators.required],
      Latitud: [datos.Latitud || null],
      Longitud: [datos.Longitud || null],

      IDEntidad: [datos.IDEntidad || null, Validators.required],

      IDActEconomica: [datos.IDActEconomica || null, Validators.required],
      IDTipoEmpresa: [datos.IDTipoEmpresa || null, Validators.required],

      IDTarifaGrupo: [datos.IDTarifaGrupo || null, Validators.required],
      IDTarifaActividad: [datos.IDTarifaActividad || null, Validators.required],
      IDTarifaCategoria: [datos.IDTarifaCategoria || null, Validators.required],


      IDProvincia: [null, Validators.required],
      IDCanton: [null, Validators.required],
      IDParroquia: [null, Validators.required],
      IDSector: [datos.IDSector || null, Validators.required],
    });

    this.entidad = datos.entidad;

    this.events();

    if (datos.Latitud)
      this.lsMarcardoresMaps = [{lat: datos.Latitud, lng: datos.Longitud}];

    if (datos.IDTarifaGrupo) {
      this.form.controls['IDTarifaGrupo'].setValue(datos.IDTarifaGrupo);
      this.form.controls['IDTarifaActividad'].setValue(datos.IDTarifaActividad);
      this.form.controls['IDTarifaCategoria'].setValue(datos.IDTarifaCategoria);
    }


    if (datos.IDSector) {
      this.form.controls['IDProvincia'].setValue(datos.sector.parroquium.canton.IDProvincia);
      this.form.controls['IDCanton'].setValue(datos.sector.parroquium.IDCanton);
      this.form.controls['IDParroquia'].setValue(datos.sector.IDParroquia);
      this.form.controls['IDSector'].setValue(datos.IDSector);
    }
  }

  loadmodal(event) {
    event.preventDefault();
    this.titleModal = 'Buscar Entidad';
    this.cssModal = 'modal-lg custom-lg';
    let data = {};
    this.modalService.setRootViewContainerRef(this.entry);
    this.modalService.addDynamicComponent(ModalEntidadComponent, {
      datos: data,
      modal: this.modalForm,
      result: (data => {
        this.entidad = data;
        this.form.controls['IDEntidad'].setValue(data.ID);
      })
    });

    this.modalForm.show();
  }

  events() {

    this.form.controls['IDTarifaGrupo'].valueChanges.subscribe(item => {
      if (item) {
        let grupo = this.lsGrupo.find(row => row.ID == item);
        this.lsActividad = (grupo.acttarifarios) ? [...grupo.acttarifarios] : [];
        this.lsCategoria = (grupo.categorium) ? [...grupo.categorium] : [];

        if (this.lsActividad.length > 0) this.form.controls['IDTarifaActividad'].setValue(this.lsActividad[0].ID);
        if (this.lsCategoria.length > 0) this.form.controls['IDTarifaCategoria'].setValue(this.lsCategoria[0].ID);
      }
    });


    this.form.controls['IDProvincia'].valueChanges.subscribe(item => {
      if (item)
        this.lsCanton = this.lsProvincias.find(row => row.ID == item).cantons;

    });

    this.form.controls['IDCanton'].valueChanges.subscribe(item => {
      if (item)
        this.lsParroquia = [...this.lsCanton.find(row => row.ID == item).parroquia];
    });

    this.form.controls['IDParroquia'].valueChanges.subscribe(item => {
      if (item) {
        this.lsSector = [...this.lsParroquia.find(row => row.ID == item).sectors];
        if (this.lsSector.length > 0) this.form.controls['IDSector'].setValue(this.lsSector[0].ID);
      }

    });

  }

  submit() {
    let data = (this.form.value);
    let exec: any = (data.ID == 0) ? this.crudService.Insertar(this.form.value, 'empresa') : this.crudService.Actualizar(this.form.value, 'empresa/' + data.ID);

    exec.subscribe(response => {
        swal(
          'Exito',
          '',
          'success'
        );
        this.cancel();
      }
    );
  }

  selectMarcador(evento) {
    this.form.controls['Latitud'].setValue(evento.coords.lat);
    this.form.controls['Longitud'].setValue(evento.coords.lng);
    this.lsMarcardoresMaps = [evento.coords];
  }

  modalActividadEconomica() {
    this.titleModal = 'Nueva Actividad Económica';
    this.cssModal = 'modal-lg';
    let data = {};
    this.modalService.setRootViewContainerRef(this.entry);
    this.modalService.addDynamicComponent(PopupActividadEconomicaComponent, {
      datos: data,
      modal: this.modalForm,
      result: (data => {
        this.crudService.Insertar(data, 'acteconomica')
          .subscribe((response: any) => {
            this.lsActEconomica = [...this.lsActEconomica, response];
            this.form.controls['IDActEconomica'].setValue(response.ID);
          });
      })
    });

    this.modalForm.show();
  }

  modalTipoEmpresa() {
    this.titleModal = 'Nuevo Tipo Empresa';
    this.cssModal = 'modal-lg';
    let data = {};
    this.modalService.setRootViewContainerRef(this.entry);
    this.modalService.addDynamicComponent(PopupTipoEmpresaComponent, {
      datos: data,
      modal: this.modalForm,
      result: (data => {
        this.crudService.Insertar(data, 'tipoempresa')
          .subscribe((response: any) => {
            this.lsTipoEmpresa = [...this.lsTipoEmpresa, response];
            this.form.controls['IDTipoEmpresa'].setValue(response.ID);
          });
      })
    });

    this.modalForm.show();
  }

  modalGrupo() {
    this.titleModal = 'Nuevo Grupo';
    this.cssModal = 'modal-lg';
    let data = {};
    this.modalService.setRootViewContainerRef(this.entry);
    this.modalService.addDynamicComponent(PopupGrupoComponent, {
      datos: data,
      modal: this.modalForm,
      result: (data => {
        this.crudService.Insertar(data, 'grupo')
          .subscribe((response: any) => {
            this.lsGrupo = [...this.lsGrupo, response];
            this.form.controls['IDTarifaGrupo'].setValue(response.ID);
            this.form.controls['IDTarifaActividad'].setValue(null);
            this.form.controls['IDTarifaCategoria'].setValue(null);
          });
      })
    });

    this.modalForm.show();
  }

  modalActividadTarifario() {
    this.titleModal = 'Nuevo Grupo - Actividad';
    this.cssModal = 'modal-lg';
    let data = {IDGrupo: this.form.controls['IDTarifaGrupo'].value};
    this.modalService.setRootViewContainerRef(this.entry);
    this.modalService.addDynamicComponent(PopupActividadComponent, {
      datos: data,
      modal: this.modalForm,
      result: (data => {
        this.crudService.Insertar(data, 'acttarifario')
          .subscribe((response: any) => {
            this.lsActividad = [...this.lsActividad, response];
            this.form.controls['IDTarifaActividad'].setValue(response.ID);
          });
      })
    });

    this.modalForm.show();
  }

  modalCategoria() {
    this.titleModal = 'Nuevo Grupo - Categoría';
    this.cssModal = 'modal-lg';
    let data = {};
    this.modalService.setRootViewContainerRef(this.entry);
    this.modalService.addDynamicComponent(PopupCategoriaComponent, {
      datos: data,
      modal: this.modalForm,
      result: (data => {
        this.crudService.Insertar(data, 'categoria/' + this.form.controls['IDTarifaGrupo'].value)
          .subscribe((response: any) => {
            this.lsCategoria = [...this.lsCategoria, response];
            this.form.controls['IDTarifaCategoria'].setValue(response.ID);
          });
      })
    });

    this.modalForm.show();
  }

  asignCategoria(){
    this.titleModal = 'Asignar Categorias';
    this.cssModal = 'modal-lg';
    let data = {IDGrupo: this.form.controls['IDTarifaGrupo'].value};
    this.modalService.setRootViewContainerRef(this.entry);
    this.modalService.addDynamicComponent(AsignGrupoComponent, {
      datos: data,
      modal: this.modalForm,
      result: (data => {
        this.lsCategoria = [...this.lsCategoria, ...data];
      })
    });

    this.modalForm.show();
  }

  async reloadCombo(combo) {
    switch (combo) {
      case 'TipoEmpresa':
        this.lsTipoEmpresa = await this.crudService.SeleccionarAsync('tipoempresa_combo') as any[];
        break;
      case 'ActEco':
        this.lsActEconomica = await this.crudService.SeleccionarAsync('acteconomica_combo') as any[];
        break;
      case 'Grupo':
        this.lsGrupo = await this.crudService.SeleccionarAsync('grupo_combo') as any[];
        break;
      case 'Location':
        this.lsProvincias = await this.crudService.SeleccionarAsync('location_combo_sector') as any[];
        this.lsCanton = [];
        this.lsParroquia = [];
        this.lsSector = [];
        break;
      default:
        break;
    }
  }


}
