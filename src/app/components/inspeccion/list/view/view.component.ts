import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Location } from '@angular/common';
import {CrudService} from '../../../../shared/services/crud.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {IAlbum, IEvent, Lightbox, LIGHTBOX_EVENT, LightboxConfig, LightboxEvent} from 'angular2-lightbox';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';
import swal from "sweetalert2";
import {ExportService} from '../../../../shared/services/export.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: [
    './view.component.scss',
    '../../../../../../node_modules/angular2-lightbox/lightbox.css',
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
  ],
  encapsulation: ViewEncapsulation.None
})
export class ViewInspeccionComponent implements OnInit {

  public albums: Array<IAlbum>;
  private _options: Object;
  private _subscription: Subscription;
  IDInspeccion: number;
  dataInspeccion: any;

  seccions = [];

  constructor(
    private route: ActivatedRoute,
    private crudService: CrudService,
    private location: Location,
    private exportService: ExportService,
    private _lightbox: Lightbox,
    private _lightboxEvent: LightboxEvent,
    private _lighboxConfig: LightboxConfig,) {
    this.albums = [];
    this._options = {};

    this.route.params.subscribe((params) => {
      this.IDInspeccion = (params.id);
    });

    // dataInspeccion

    this.crudService.SeleccionarAsync(`inspeccion/${ this.IDInspeccion }/result`)
      .then((data: any[]) => this.seccions = (data));

    this.crudService.SeleccionarAsync(`inspeccion/${ this.IDInspeccion }/anexos`)
      .then((data: string[]) => {

        this.albums = data.map(row => {
          let url = this.crudService.getURLServer();
          return {
            src: url + row,
            caption: '',
            thumb: url + row
          };
        });

      });

    _lighboxConfig.fadeDuration = 1;
  }

  ngOnInit() {
    this.loadInspeccion();
  }

  goBack(){
    this.location.back();
  }

  async loadInspeccion(){
    this.dataInspeccion = await this.crudService.SeleccionarAsync(`inspeccion/${ this.IDInspeccion }/`);
  }

  downloadFormulario(){
    this.crudService.GetToFile('pdf_download/' + this.IDInspeccion)
      .subscribe(response => {
        this.exportService.saveAsExcelFile(response, `Inspeccion - ${ this.dataInspeccion.empresa.RazonSocial }`);
      });
  }

  sendMailFormulario(){
    this.crudService.SeleccionarAsync(`pdf_send/${ this.IDInspeccion }`)
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

  open(index: number): void {
    this._subscription = this._lightboxEvent.lightboxEvent$.subscribe((event: IEvent) => this._onReceivedEvent(event));

    // override the default config
    this._lightbox.open(this.albums, index, {wrapAround: true, showImageNumberLabel: true});
  }

  private _onReceivedEvent(event: IEvent): void {
    if (event.id === LIGHTBOX_EVENT.CLOSE) {
      this._subscription.unsubscribe();
    }
  }

}
