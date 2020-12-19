import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { StorageService } from '../services/storage.service';

const USER_KEY = 'user-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {  
  credentials: FormGroup;
  submitted = false;
  msgError: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private storage: StorageService) { }

  ngOnInit() {    
    this.credentials = this.fb.group({
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.credentials.invalid) {
        return;
    }
    this.authenticationService.login(this.credentials.value)
    .then(      
      async res => {
        if(res && res.status == 401) this.msgError = 'Usuário, não encontrado.'
        else if(res && res.status == 200 && res.data.hasOwnProperty('apiToken')) {
          await this.storage.setObject(USER_KEY, res.data);
          this.router.navigateByUrl('/welcome', { replaceUrl:true });            
        }
        else this.msgError = 'Error, no servidor.'
      },
      err => this.msgError = 'Usuário, não encontrado.'
    )    
  }

  get cpf() {
    return this.credentials.get('cpf');
  }
  
  get password() {
    return this.credentials.get('password');
  }
}
