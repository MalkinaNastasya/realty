import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from '../shared/services/main.service';

@Component({
  selector: "app-registration-owner",
  templateUrl: "./registration-owner.component.html",
  styleUrls: ["./registration-owner.component.css"],
})
export class RegistrationOwnerComponent implements OnInit {
  // Логическая переменная, определяющая наличие или отсутсвие сообщения о неправильном логине или пароле
  existLogin = true;
  // Логическая переменная, определяющая наличие или отсутсвие сообщения о незаполненных обязательных полях
  isEmpty = true;
  form: FormGroup;
  user = {
    id_owner: "",
    login: "",
    password: "",
    name: "",
    phone: "",
    email: "",
  };

  constructor(private api: MainService, private router: Router) {}

  ngOnInit() {
    // Инициализация FormGroup, создание FormControl, и назанчение Validators
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      login: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }
  public mask = [
    "(",
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    ")",
    " ",
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    "-",
    /[0-9]/,
    /[0-9]/,
    "-",
    /[0-9]/,
    /[0-9]/,
  ];

  // Функция входа, отправляющая данные, полученные с формы на сервер, и реагирующая на ответ с сервера
  async onRegistr() {
    localStorage.clear();
    if (
      this.form.value.email == "" ||
      this.form.value.phone == "" ||
      this.form.value.login == "" ||
      this.form.value.name == "" ||
      this.form.value.password == ""
    ) {
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
      let infoAboutUser;
      infoAboutUser = {
        name: this.form.value.name,
        phone: this.form.value.phone,
        email: this.form.value.email,
        login: this.form.value.login,
        password: this.form.value.password,
      };
      console.log(infoAboutUser);
      try {
        let ExistOrNot = await this.api.post(
          JSON.stringify(infoAboutUser),
          "/registrationOwner"
        );
        this.form.reset();
        if (ExistOrNot != "exist") {
          console.log(ExistOrNot);
          this.user.id_owner = ExistOrNot[0].id_owner;
          this.user.name = ExistOrNot[0].name;
          this.user.phone = ExistOrNot[0].phone;
          this.user.email = ExistOrNot[0].email;
          this.user.login = ExistOrNot[0].login;
          this.user.password = ExistOrNot[0].password;
          console.log(this.user);
          localStorage.setItem("role", "owner");
          localStorage.setItem("id", this.user.id_owner);
          localStorage.setItem("name", this.user.name);
          this.router.navigate(["/profile"]);
        } else {
          this.existLogin = false;
          console.log("Логин уже существует");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  // Функция, убирает сообщения о неправильном логине или пароле и о незаполненных полях
  onFlag() {
    this.existLogin = true;
    this.isEmpty = true;
  }
}
