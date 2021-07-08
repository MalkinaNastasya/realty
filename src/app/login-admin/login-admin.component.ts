import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from '../shared/services/main.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  // Логическая переменная, определяющая наличие или отсутсвие сообщения о неправильном логине или пароле 
  notExistLoginOrPassword=true;
  // Логическая переменная, определяющая наличие или отсутсвие сообщения о незаполненных обязательных полях 
  isEmpty=true;
  form: FormGroup;
  admin = {
    id: "",
    name: "",
    login: "",
    password: "",
  }

  constructor(private api: MainService, private router: Router) { }

  ngOnInit() {
    // Инициализация FormGroup, создание FormControl, и назанчение Validators
    this.form = new FormGroup({
      'login': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required]) 
    });
  }

  // Функция входа, отправляющая данные, полученные с формы на сервер, и реагирующая на ответ с сервера
  async onLogin() {
    localStorage.clear();
    if ((this.form.value.login=="")||(this.form.value.password=="")) {
      this.isEmpty=false;
    } else
    {
      this.isEmpty=true;
      let infoAboutUser;
      infoAboutUser = {
      login: this.form.value.login,
      password: this.form.value.password,
      }
      console.log(infoAboutUser);
      try {
        let ExistOrNot = await this.api.post(JSON.stringify(infoAboutUser), "/login-admin");
        this.form.reset();  
        if (ExistOrNot != "not exist") {
          this.admin.id = ExistOrNot[0].id_admin;
          this.admin.name = ExistOrNot[0].name;
          this.admin.login = ExistOrNot[0].login; 
          this.admin.password = ExistOrNot[0].password; 
          console.log(this.admin);       
          this.notExistLoginOrPassword = true;
          localStorage.setItem("role", "admin");
          localStorage.setItem("id", this.admin.id);
          localStorage.setItem('name', this.admin.name);
          console.log(localStorage);
          this.router.navigate(['/']);
    
        } else {
          this.notExistLoginOrPassword = false;
          console.log("Неверный логин или пароль");
        } 
      } catch (error) {
        console.log(error);
      }
    }
  }

   // Функция, убирает сообщения о неправильном логине или пароле и о незаполненных полях
  onFlag(){
    this.notExistLoginOrPassword=true;  
    this.isEmpty=true;
  } 

}
