import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CrudService} from '../../../../shared/services/crud.service';
import {ModalService} from '../../../../shared/services/modal.service';
import {ToolsService} from '../../../../shared/services/tools.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: [
    '../../../../../assets/icon/icofont/css/icofont.scss'
  ],
})
export class NewGrupoComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              protected crudService: CrudService,
              private modalService: ModalService,
              protected tools: ToolsService,
              private router: Router,
              private route: ActivatedRoute,) { }

  ngOnInit() {
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

  loadGrupo(datos){

  }

  submit(){

  }
  cancel(){
    let data = (this.form.value);
    let ruta = (data.ID == 0) ? '../../empresa' : '../../../empresa';
    this.router.navigate([ruta], {relativeTo: this.route});
  }

}
