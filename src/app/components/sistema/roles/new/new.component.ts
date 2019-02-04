import {Component, OnInit} from '@angular/core';
import {CrudService} from '../../../../shared/services/crud.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToolsService} from '../../../../shared/services/tools.service';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: [
    './new.component.scss',
    '../../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class NewRolComponent implements OnInit {

  lsSubModulos: any[];
  selected: any[] = [];

  form: FormGroup;

  constructor(private crudService: CrudService,
              private fb: FormBuilder,
              public tools: ToolsService,
              private router: Router,
              private route: ActivatedRoute,) {

    this.form = this.fb.group({
      ID: [0],
      Descripcion: ['', Validators.required],
      Observacion: [''],
      Estado: ['ACT', Validators.required]
    });

    this.route.params.subscribe((params) => {
      if (params.id) {
        this.loadRol(params.id);
      }
    });

  }

  async ngOnInit() {
    this.lsSubModulos = await this.crudService.SeleccionarAsync('menu_items/submodulos') as any[];
  }

  submit() {
    let data = (this.form.value);
    data.modulos = this.getSelection();
    let exec: any = (data.ID == 0) ? this.crudService.Insertar(this.form.value, 'rol') : this.crudService.Actualizar(this.form.value, 'rol/' + data.ID);

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

  cancel() {
    let data = (this.form.value);
    let ruta = (data.ID == 0) ? '../../roles' : '../../../roles';
    this.router.navigate([ruta], {relativeTo: this.route});
  }

  onSelect({selected}) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  async loadRol(id) {
    let datos: any = await this.crudService.SeleccionarAsync(`rol/` + id);
    this.form = this.fb.group({
      ID: [datos.ID],
      Descripcion: [datos.Descripcion, Validators.required],
      Observacion: [datos.Observacion || ''],
      Estado: [datos.Estado, Validators.required]
    });
    this.selected = [...datos.Modulos];
  }

  getID( row ){
    return row.ID;
  }

  getSelection() {
    return this.selected.map(row => row.ID);
  }

}
