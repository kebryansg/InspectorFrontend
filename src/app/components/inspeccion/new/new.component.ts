import {Component, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {CrudService} from '../../../shared/services/crud.service';
import {ModalBasicComponent} from '../../../shared/modal-basic/modal-basic.component';
import {NgbCalendar, NgbDateParserFormatter, NgbDateStruct, NgbDateNativeAdapter, NgbDateAdapter} from '@ng-bootstrap/ng-bootstrap';
import {ModalService} from '../../../shared/services/modal.service';
import {ModalEmpresaComponent} from '../../catalogo/empresa/modal/modal.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterLinkActive} from '@angular/router';
import swal from 'sweetalert2';
import {catchError} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';

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
  lsColaborador: any[];
  empresa: any;

  form: FormGroup;

  constructor(
    private crudService: CrudService,
    private modalService: ModalService,
    private router: Router,
    private route: ActivatedRoute,
    // private afs: AngularFirestore,
    private fb: FormBuilder,
  ) {
  }

  async ngOnInit() {

    this.form = this.fb.group({
      ID: [0],
      IDEmpresa: [null, Validators.required],
      IDColaborador: [null],
      FechaTentativa: [null],
      // Estado: ['ACT'],
      // Observacion: ['']
    });

    let now = new Date();
    // this.modelPopup = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    this.lsColaborador = await <any> this.crudService.SeleccionarAsync('colaborador_inspector');


  }

  loadmodal(event) {
    event.preventDefault();
    let data = {};
    this.modalService.setRootViewContainerRef(this.entry);
    this.modalService.addDynamicComponent(ModalEmpresaComponent, {
      datos: data,
      modal: this.modalForm,
      result: (data => {
        this.empresa = data;
        this.form.controls['IDEmpresa'].setValue(data.ID);
      })
    });

    this.modalForm.show();
  }

  clearColaborador(){
    this.form.controls["IDColaborador"].setValue(null);
  }

  save() {
    let data = this.form.value;
    console.log(data);
    this.crudService.Insertar(data, 'inspeccion')
      .subscribe(
        res => {

          console.log(res);
          // this.afs.collection('inspeccion').doc(res.ID)

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
