import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CrudService} from '../../../../../shared/services/crud.service';
import {ViewEncapsulation} from '@angular/core';
import {DragulaService} from 'ng2-dragula';

@Component({
  selector: 'app-asign',
  templateUrl: './asign.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './asign.component.css',
    '../../../../../../assets/icon/icofont/css/icofont.scss'
  ],

})
export class AsignSeccionComponent implements OnInit {

  lsSeccionComponents: any = [ ];
  lsComponents: any = [];
  datos: any;
  search: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private crudService: CrudService
  ) { }

   async ngOnInit() {
    let seccion;
    this.route.params.subscribe( (params) => {
      seccion = params.id;

    });

     this.datos = await this.crudService.SeleccionarAsync((`seccion/${ seccion }`));

     let rows: any = await this.crudService.SeleccionarAsync(`components/seccion`);

     this.lsComponents = rows.filter( item => item.IDSeccion != seccion );
     this.lsSeccionComponents = rows.filter( item => item.IDSeccion == seccion );

  }
  filterLs(){

  }

  save(){
    // console.log(this.lsSeccionComponents)
    let rows: any = this.lsSeccionComponents.map(item => {
      return item.ID;
    });
    this.crudService.Insertar(rows, `components/seccion/${ this.datos.ID }`)
      .subscribe(res => {
        this.router.navigate(['../'], { relativeTo: this.route });

      });

  }
  cancel(){
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
