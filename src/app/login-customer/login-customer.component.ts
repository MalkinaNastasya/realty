import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from '../shared/services/main.service';

@Component({
  selector: 'app-login-customer',
  templateUrl: './login-customer.component.html',
  styleUrls: ['./login-customer.component.css']
})
export class LoginCustomerComponent implements OnInit {

// Логическая переменная, определяющая наличие или отсутсвие сообщения о неправильном логине или пароле 
  notExistLoginOrPassword=true;
  // Логическая переменная, определяющая наличие или отсутсвие сообщения о незаполненных обязательных полях 
  isEmpty=true;
  form: FormGroup;
  customer = {
    id: "",
    name: "",
    phone: "",
    email: "",
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
        let ExistOrNot = await this.api.post(JSON.stringify(infoAboutUser), "/login-customer");
        this.form.reset();  
        if (ExistOrNot != "not exist") {
          this.customer.id = ExistOrNot[0].id_customer;
          this.customer.name = ExistOrNot[0].name;
          this.customer.phone = ExistOrNot[0].phone;
          this.customer.email = ExistOrNot[0].email; 
          this.customer.login = ExistOrNot[0].login; 
          this.customer.password = ExistOrNot[0].password; 
          console.log(this.customer);       
          this.notExistLoginOrPassword = true;
          localStorage.setItem("role", "customer");
          localStorage.setItem("id", this.customer.id);
          localStorage.setItem('name', this.customer.name);
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
