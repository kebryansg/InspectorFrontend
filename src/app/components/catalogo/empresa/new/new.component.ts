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

      IDActEconomica: [datos.IDActEconomica || null],
      IDTipoEmpresa: [datos.IDTipoEmpresa || null],

      IDTarifaGrupo: [datos.IDTarifaGrupo || null],
      IDTarifaActividad: [datos.IDTarifaActividad || null],
      IDTarifaCategoria: [datos.IDTarifaCategoria || null],


      IDProvincia: [null, Validators.required],
      IDCanton: [null, Validators.required],
      IDParroquia: [null, Validators.required],
      IDSector: [datos.IDSector || null, Validators.required],
    });

    this.entidad = datos.entidad;

    this.events();

    if (datos.Latitud)
      this.lsMarcardoresMaps = [{lat: datos.Latitud, lng: datos.Longitud}];

    // if(datos.IDTarifaGrupo){
    //   this.form.controls['IDTarifaActividad'].setValue(this.lsActividad[0].ID);
    //   this.form.controls['IDTarifaCategoria'].setValue(this.lsCategoria[0].ID);
    // }


    if (datos.IDSector) {
      this.form.controls['IDProvincia'].setValue(datos.sector.parroquium.canton.IDProvincia);
      this.form.controls['IDCanton'].setValue(datos.sector.parroquium.IDCanton);
      this.form.controls['IDParroquia'].setValue(datos.sector.IDParroquia);
      this.form.controls['IDSector'].setValue(datos.IDSector);
    }
  }

  loadmodal(event) {
    event.preventDefault();
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
        this.lsActividad = [...this.lsGrupo.find(row => row.ID == item).acttarifarios];
        this.lsCategoria = [...this.lsGrupo.find(row => row.ID == item).grupocategorium];

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


}