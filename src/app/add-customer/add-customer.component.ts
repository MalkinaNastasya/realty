import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../shared/services/main.service';

@Component({
  selector: "app-add-customer",
  templateUrl: "./add-customer.component.html",
  styleUrls: ["./add-customer.component.css"],
})
export class AddCustomerComponent implements OnInit {
  form: FormGroup;
  // Логическая переменная, определяющая наличие или отсутсвие прелоадера
  loading = false;
  // Логическая переменная, определяющая наличие или отсутсвие сообщения о незаполненных обязательных полях
  isEmpty = true;
  // Логическая переменная, определяющая наличие или отсутсвие сообщения об успешном добавлении товара
  succes = false;

  constructor(private mainService: MainService) {}
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

  // Функция добавления информации о товаре, полученной с формы, в базу данных
  async onAdd() {
    if (
      this.form.value.name == "" ||
      this.form.value.phone == "" ||
      this.form.value.email == "" ||
      this.form.value.login == "" ||
      this.form.value.password == ""
    ) {
      this.isEmpty = false;
    } else {
      this.loading = true;
      this.isEmpty = true;
      let user = {
        name: this.form.value.name,
        phone: this.form.value.phone,
        email: this.form.value.email,
        role: this.form.value.role,
        login: this.form.value.login,
        password: this.form.value.password,
      };
      console.log(user);
      try {
        let result = await this.mainService.post(
          JSON.stringify(user),
          "/addCustomer"
        );
      } catch (err) {
        console.log(err);
      }
      this.form.reset();
      this.loading = false;
      this.succes = true;
    }
  }
  // Функция, скрывающая сообщения о незаполненности полей и успешном добавлении товара (вызвается при фокусировке на одном из полей формы)
  onSucces() {
    this.succes = false;
    this.isEmpty = true;
  }
}
