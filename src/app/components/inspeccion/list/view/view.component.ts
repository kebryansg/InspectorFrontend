import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CrudService} from '../../../../shared/services/crud.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {IAlbum, IEvent, Lightbox, LIGHTBOX_EVENT, LightboxConfig, LightboxEvent} from 'angular2-lightbox';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: [
    './view.component.scss',
    '../../../../../../node_modules/angular2-lightbox/lightbox.css'
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

  constructor(
    private crudService: CrudService,
    private _lightbox: Lightbox,
    private _lightboxEvent: LightboxEvent,
    private _lighboxConfig: LightboxConfig,) {
    this.albums = [];
    this._options = {};

    this.crudService.SeleccionarAsync('inspeccion/1/anexos')
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
