import { Injectable } from '@angular/core';
import {NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import swal from "sweetalert2";
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor() { }

  pagSize(): number[]{
    let sizes = [ 5, 10, 15, 20 ];
    return sizes;
  }

  listEstados() {
    let items = [
      { value: 'ACT', label: "Activo" },
      { value: 'INA', label: "Inactivo" },
      { value: 'ANU', label: "Anulado" },
    ];
    return items;
  }

  listTipoEntidad(){
    return [
      { value: 'P', label: "Persona" },
      { value: 'E', label: "Empresa" },
    ];
  }

  getMomentoFormat(value){
    return moment(value).format('YYYY-MM-DD');
  }

  optionsModalCatalogo(): NgbModalOptions{
    return {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
      centered: true
    };
  }
}
