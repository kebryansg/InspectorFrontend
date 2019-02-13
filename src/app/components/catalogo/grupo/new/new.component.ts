import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrudService} from '../../../../shared/services/crud.service';
import {ModalService} from '../../../../shared/services/modal.service';
import {ToolsService} from '../../../../shared/services/tools.service';
import {ActivatedRoute, Router} from '@angular/router';
import {animate, style, transition, trigger} from '@angular/animations';

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
export class NewGrupoComponent implements OnInit {

  form: FormGroup;
  lsCategoria: any;
  lsActividad: any[] = [];
  selected: any[] = [];


  constructor(private fb: FormBuilder,
              protected crudService: CrudService,
              private modalService: ModalService,
              protected tools: ToolsService,
              private router: Router,
              private route: ActivatedRoute,) {
  }

  ngOnInit() {

    this.lsCategoria = this.crudService.SeleccionarAsync('categoria_combo');

    this.route.params.subscribe(async (params) => {
      let datos = await this.getData(params.id);
      await this.loadGrupo(datos);
    });
  }

  async getData(IDGrupo) {
    if (IDGrupo) {
      return await <any>this.crudService.SeleccionarAsync(`grupo/` + IDGrupo).then(response => response);
    }
    return {};
  }

  loadGrupo(datos) {
    this.form = this.fb.group({
      ID: [datos.ID || 0],
      Nombre: [datos.Nombre || null, Validators.required],
      Descripcion: [datos.Descripcion || ''],
      Estado: [datos.Estado || 'ACT'],
    });

    if (datos.grupocategorium) {
      this.selected = [...datos.grupocategorium];
    }
    if (datos.acttarifarios)
      this.lsActividad = datos.acttarifarios;

  }

  submit() {

  }

  cancel() {
    let data = (this.form.value);
    let ruta = (data.ID == 0) ? '../../grupo' : '../../../grupo';
    this.router.navigate([ruta], {relativeTo: this.route});
  }

  modalActividad(row = {}){

  }

  delete(row){
    row.Estado = 'INA';
  }

  getID(row) {
    return row.ID;
  }

  onSelect({selected}) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  getSelection() {
    return this.selected.map(row => row.ID);
  }

}
