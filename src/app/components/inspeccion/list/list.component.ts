import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {CrudService} from '../../../shared/services/crud.service';
import {ToolsService} from '../../../shared/services/tools.service';
import swal from 'sweetalert2';
import {ModalService} from '../../../shared/services/modal.service';
import {ModalBasicComponent} from '../../../shared/modal-basic/modal-basic.component';
import {AsignColaboradorComponent} from './asign/asign.component';
import {ExportService} from '../../../shared/services/export.service';
import {NgbDateStruct, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;

declare var configuracion: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: [
    './list.component.css',
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class ListComponent implements OnInit {

  /* Date */
  hoveredDate: NgbDateStruct;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);

  pageSize: number[] = this.tools.pagSize();
  params_dt: any = {
    page: 1,
    psize: this.pageSize[0],
    search: '',
    other: {
      Estado: '*',
      Desde: '*',
      Hasta: '*'
    }
  };
  paginate: any = {
    data: [],
    page: 1,
    total: 0,
    per_page: 0
  };
  urlHost: string;
  show: boolean = false;

  @ViewChild('modalForm') modalForm: ModalBasicComponent;
  @ViewChild('container', {read: ViewContainerRef}) entry: ViewContainerRef;

  constructor(
    private crudService: CrudService,
    private modalService: ModalService,
    public tools: ToolsService,
    private exportService: ExportService,
    public parserFormatter: NgbDateParserFormatter) {
  }

  ngOnInit() {
    this.urlHost = configuracion.url;
    this.reload();
  }

  setPage(event) {
    this.reload(event.offset + 1);
  }

  validVerResultados(row) {
    return row.Estado == 'APR' || row.Estado == 'REP';
  }

  onEnter(value: string) {
    this.params_dt.search = value;
    this.reload();
  }

  async reload(page: number = 1) {
    this.params_dt.page = page;

    this.params_dt.other.Desde = this.parserFormatter.format(this.fromDate) || '*';
    this.params_dt.other.Hasta = this.parserFormatter.format(this.toDate) || '*';
    console.log(this.params_dt.other);

    this.params_dt.other = JSON.stringify(this.params_dt.other);
    this.paginate = await this.crudService.SeleccionarAsync('inspeccion', this.params_dt);
    this.params_dt.other = JSON.parse(this.params_dt.other);
  }

  async edit(row?) {
    let data = {};
    if (row)
      data = await this.crudService.SeleccionarAsync(`inspeccion/${row.ID}`);
  }

  asign_colaborador(row) {
    let data = {
      NombreComercial: row.empresa.NombreComercial
    };

    this.modalService.setRootViewContainerRef(this.entry);
    this.modalService.addDynamicComponent(AsignColaboradorComponent, {
      datos: data,
      modal: this.modalForm,
      result: (data => {
        this.crudService.Actualizar({}, `inspeccion/${row.ID}/coladorador/${data}`)
          .subscribe(res => {
            swal(
              'Exito!',
              'Se asigno un colaborador para esta inspección.',
              'success'
            );
            this.reload();
          });
      })
    });

    this.modalForm.show();

  }

  delete(row) {

    swal({
      title: 'Esta seguro?',
      text: 'Esta seguro de eliminar esta inspección.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.crudService.Eliminar(`inspeccion/${row.ID}`)
          .subscribe(
            data => {
              swal(
                'Inactivo!',
                'La Inspección fue eliminada.',
                'success'
              );
              this.reload();
            });
      }
    });


  }

  async synchronize(row) {
    await this.crudService.SeleccionarAsync(`inspeccion/${row.ID}/async`);
    swal(
      'Exito!',
      'Se sincronizo la inspección.',
      'success'
    );
    this.reload();
  }

  downloadFormulario(row) {
    this.crudService.GetToFile('pdf_download/' + row.ID)
      .subscribe(response => {
        this.exportService.saveAsExcelFile(response, `Inspeccion - ${row.empresa.RazonSocial}`);
      });
  }

  sendMailFormulario(row) {
    this.crudService.SeleccionarAsync(`pdf_send/${row.ID}`)
      .then((response: any) => {
        if (response) {
          swal(
            'Error!',
            response.message,
            'warning'
          );
        } else {
          swal(
            'Exito!',
            'Los resultados fueron reenviados con exito.',
            'success'
          );
        }
      });
  }


  /* DateTimePicker */
  onDateChange(date: NgbDateStruct) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  showFilter() {
    this.show = !this.show;
    if (!this.show) {
      this.params_dt.other = {
        Estado: '*',
        Desde: '*',
        Hasta: '*'
      };
      this.reload();
    }

  }


}
