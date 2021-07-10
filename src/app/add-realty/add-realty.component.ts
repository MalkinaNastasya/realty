import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../shared/services/main.service';

@Component({
  selector: "app-add-realty",
  templateUrl: "./add-realty.component.html",
  styleUrls: ["./add-realty.component.css"],
})
export class AddRealtyComponent implements OnInit {
  form: FormGroup;
  // Логическая переменная, определяющая наличие или отсутсвие прелоадера
  loading = false;
  // Логическая переменная, определяющая наличие или отсутсвие сообщения о незаполненных обязательных полях
  isEmpty = true;
  // Логическая переменная, определяющая наличие или отсутсвие сообщения об успешном добавлении товара
  succes = false;

  constructor(private mainService: MainService) {}

  ngOnInit() {
    // Инициализация FormGroup, создание FormControl, и назанчение Validators
    this.form = new FormGroup({
      address: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required]),
    });
  }

  // Функция добавления информации о товаре, полученной с формы, в базу данных
  async onAdd() {
    if (this.form.value.address == "" || this.form.value.price == "") {
      this.isEmpty = false;
    } else {
      this.loading = true;
      this.isEmpty = true;
      let realty = {
        image: "картинка",
        address: this.form.value.address,
        id_type_realty: "1",
        price: this.form.value.price,
        id_owner: localStorage.getItem("id"),
      };
      console.log(realty);
      try {
        let result = await this.mainService.post(
          JSON.stringify(realty),
          "/addRealty"
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
