import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login/login.service';
import { StorageService } from '../../services/storage/storage.service';

const USER_KEY = 'user-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {  
  credentials: FormGroup;
  msgError: string;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private storage: StorageService,
    private navController: NavController) { }

  ngOnInit() {    
    this.credentials = this.fb.group({
      cpf: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.credentials.invalid) {
        return;
    }
    this.loginService.login(this.credentials.value)
    .then(      
      async res => {
        if(res && res.status == 401) this.msgError = 'Usuário, não encontrado.'
        else if(res && res.status == 200 && res.body.hasOwnProperty('apiToken')) {
          await this.storage.setObject(USER_KEY, res.body);
          this.navController.navigateBack('welcome');          
        }
        else this.msgError = 'Error, no servidor.'
      },
      () => this.msgError = 'Usuário, não encontrado.'
    )    
  }

  maskCpf(event){
    const cpf = event.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/);
    this.credentials.get('cpf')
    .setValue(!cpf[2] ? cpf[1] : cpf[1] + '.' + cpf[2] + (cpf[3] ? '.' + cpf[3] : '') + (cpf[4] ? '-' + cpf[4] : ''));
  }

  get cpf() {
    return this.credentials.get('cpf');
  }
  
  get password() {
    return this.credentials.get('password');
  }
}
