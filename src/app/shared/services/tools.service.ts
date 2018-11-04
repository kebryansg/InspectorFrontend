import { Injectable } from '@angular/core';
import {NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor() { }

  pagSize(): number[]{
    let sizes = [ 5, 10, 15, 20 ];
    return sizes;
  }

  optionsModalCatalogo(): NgbModalOptions{
    return {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
      centered: true
    };
  }
}
