import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Agency } from '../shared/models/agency.model';
import { MainService } from '../shared/services/main.service';

@Component({
  selector: "app-registration-realtor",
  templateUrl: "./registration-realtor.component.html",
  styleUrls: ["./registration-realtor.component.css"],
})
export class RegistrationRealtorComponent implements OnInit {
  // Логическая переменная, определяющая наличие или отсутсвие сообщения о неправильном логине или пароле
  existLogin = true;
  // Логическая переменная, определяющая наличие или отсутсвие сообщения о незаполненных обязательных полях
  isEmpty = true;
  form: FormGroup;
  id_agency;
  user = {
    id_realtor: "",
    login: "",
    password: "",
    name: "",
    phone: "",
  };
  loading = false;
  agencies: Agency[] = [];

  constructor(private api: MainService, private router: Router) {}

  async ngOnInit() {
    this.loading = true;
    try {
      let result = await this.api.get("/getAgencyRealtors");
      if (typeof result !== "undefined") {
        console.log(result);
        for (const one in result) {
          this.agencies.push(
            new Agency(
              result[one].id_agency,
              result[one].name,
              result[one].rating,
              result[one].year_foundation
            )
          );
        }
        this.id_agency = result[0].id_agency;
      }
    } catch (error) {
      console.log(error);
    }
    this.loading = false;
    // Инициализация FormGroup, создание FormControl, и назанчение Validators
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required]),
      login: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      id_agency: new FormControl("", [Validators.required]),
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
        id_agency: this.id_agency,
        login: this.form.value.login,
        password: this.form.value.password,
      };
      console.log(infoAboutUser);
      try {
        let ExistOrNot = await this.api.post(
          JSON.stringify(infoAboutUser),
          "/registrationRealtor"
        );
        this.form.reset();
        if (ExistOrNot != "exist") {
          console.log(ExistOrNot);
          this.user.id_realtor = ExistOrNot[0].id_realtor;
          this.user.name = ExistOrNot[0].name;
          this.user.phone = ExistOrNot[0].phone;
          this.user.login = ExistOrNot[0].login;
          this.user.password = ExistOrNot[0].password;
          console.log(this.user);
          localStorage.setItem("role", "realtor");
          localStorage.setItem("id", this.user.id_realtor);
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
