import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Validators, FormGroup, FormControl} from '@angular/forms';
import {CrudService} from '../../../../shared/services/crud.service';
import {Router} from '@angular/router';
import {ToastData, ToastOptions, ToastyService} from 'ng2-toasty';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-basic-login',
  templateUrl: './basic-login.component.html',
  styleUrls: [
    './basic-login.component.scss',
    '../../../../../../node_modules/ng2-toasty/style-bootstrap.css',
    '../../../../../../node_modules/ng2-toasty/style-default.css',
    '../../../../../../node_modules/ng2-toasty/style-material.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class BasicLoginComponent implements OnInit {

  @ViewChild('email') email: ElementRef;

  position = 'bottom-right';
  signinForm: FormGroup;

  constructor(
    private crudService: CrudService,
    private router: Router,
    private toastyService: ToastyService,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit() {
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');

    this.email.nativeElement.focus();

    this.signinForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  signin() {
    const signinData = this.signinForm.value;

    this.crudService.login('oauth/token', {
      grant_type: 'password',
      scope: '*',
      client_id: '2',
      client_secret: '6tFEw0OqQ5K4kbRK1v2jhLqJmhhxvZgzevi9j280',
      username: signinData.email,
      password: signinData.password
    }).subscribe(data => {
        if (data['access_token']) {
          localStorage.setItem('authToken', data['access_token']);
          localStorage.setItem('tokenType', data['token_type']);
          this.router.navigate(['/dashboard']);

        }
      },
      error => {
        const toastOptions: ToastOptions = {
          title: 'Credenciales Invalidas',
          msg: 'Las credenciales de usuario son incorrectas.',
          // showClose: false,
          timeout: 5000,
          theme: 'bootstrap'
        };


        this.toastyService.error(toastOptions);

        // this.snack.open('Credenciales Incorrectas!', 'OK', {duration: 4000});
        // this.submitButton.disabled = false;
        // this.progressBar.mode = 'determinate';
      });

    return;
  }

}
