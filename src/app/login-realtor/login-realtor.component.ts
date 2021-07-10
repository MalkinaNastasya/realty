import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from '../shared/services/main.service';

@Component({
  selector: 'app-login-realtor',
  templateUrl: './login-realtor.component.html',
  styleUrls: ['./login-realtor.component.css']
})
export class LoginRealtorComponent implements OnInit {

  // Логическая переменная, определяющая наличие или отсутсвие сообщения о неправильном логине или пароле 
  notExistLoginOrPassword=true;
  // Логическая переменная, определяющая наличие или отсутсвие сообщения о незаполненных обязательных полях 
  isEmpty=true;
  form: FormGroup;
  realtor = {
    id: "",
    name: "",
    rating: "",
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
        let ExistOrNot = await this.api.post(JSON.stringify(infoAboutUser), "/login-realtor");
        this.form.reset();  
        if (ExistOrNot != "not exist") {
          this.realtor.id = ExistOrNot[0].id_realtor;
          this.realtor.name = ExistOrNot[0].name;
          this.realtor.rating = ExistOrNot[0].email; 
          this.realtor.login = ExistOrNot[0].login; 
          this.realtor.password = ExistOrNot[0].password; 
          console.log(this.realtor);       
          this.notExistLoginOrPassword = true;
          localStorage.setItem("role", "realtor");
          localStorage.setItem("id", this.realtor.id);
          localStorage.setItem('name', this.realtor.name);
          console.log(localStorage);
          this.router.navigate(["/profile"]);
    
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
