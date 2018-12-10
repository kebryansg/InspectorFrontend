import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-asign',
  templateUrl: './asign.component.html',
  styles: []
})
export class AsignSeccionComponent implements OnInit {

  id: any;
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params)
      this.id = params.id;
    });
  }

}
