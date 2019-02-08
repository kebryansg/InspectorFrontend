import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrudService} from '../../../../shared/services/crud.service';
import {ToolsService} from '../../../../shared/services/tools.service';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: [
    '../../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class NewUsuarioComponent implements OnInit {

  form: FormGroup;
  lsColaborador: any;
  lsRol: any;
  colaborador: any;

  constructor(private crudService: CrudService,
              private fb: FormBuilder,
              public tools: ToolsService,
              private router: Router,
              private route: ActivatedRoute,) {

    this.route.params.subscribe(async (params) => {
      let datos = await this.getData(params.id);
      await this.loadUsuario(datos);

      if (datos.IDColaborador) {
        let data: any = await this.crudService.SeleccionarAsync('colaborador/' + datos.IDColaborador);
        this.colaborador = data.ApellidoPaterno + ' ' + data.ApellidoMaterno + ' ' + data.NombrePrimero;
      }


    });

  }

  loadUsuario(datos) {
    this.form = this.fb.group({
      id: [datos.id || 0],
      name: [datos.name || '', Validators.required],
      email: [datos.email || '', Validators.required],
      IDColaborador: [datos.IDColaborador || 0, Validators.required],
      IDRol: [datos.IDRol || '', Validators.required],
    });

    this.form.controls['IDColaborador'].valueChanges.subscribe(item => {
      let colaborador = JSON.parse(item);
      this.form.controls['email'].setValue(colaborador.Email);
    });


  }

  ngOnInit() {
    this.lsColaborador = this.crudService.SeleccionarAsync('colaborador_notuser');
    this.lsRol = this.crudService.SeleccionarAsync('rol_combo');

  }

  async getData(IDUsuario) {
    if (IDUsuario) {
      return await <any>this.crudService.SeleccionarAsync(`usuario/` + IDUsuario).then(response => response);
    }
    return {};
  }

  submit() {
    let data = this.form.value;
    data.IDColaborador = (JSON.parse(data.IDColaborador)).ID;
    console.log(data);
    let exec: any = (data.id == 0) ? this.crudService.Insertar(this.form.value, 'usuario') : this.crudService.Actualizar(this.form.value, 'usuario/' + data.id);

    exec.subscribe(
      response => {
        swal(
          'Exito',
          '',
          'success'
        );
        this.cancel();
      },
      error =>
        swal(
          'Problemas',
          'Hubo problemas en el registro del usuario.',
          'warning'
        )
    );
  }

  cancel() {
    let data = (this.form.value);
    let ruta = (data.id == 0) ? '../../usuario' : '../../../usuario';
    this.router.navigate([ruta], {relativeTo: this.route});
  }


}
