import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MainService } from "../shared/services/main.service";

@Component({
  selector: "app-add-agency",
  templateUrl: "./add-agency.component.html",
  styleUrls: ["./add-agency.component.css"],
})
export class AddAgencyComponent implements OnInit {
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
      name: new FormControl("", [Validators.required]),
      rating: new FormControl("", [Validators.required]),
      year_foundation: new FormControl("", [Validators.required]),
    });
  }

  // Функция добавления информации о товаре, полученной с формы, в базу данных
  async onAdd() {
    if (
      this.form.value.name == "" ||
      this.form.value.rating == "" ||
      this.form.value.year_foundation == ""
    ) {
      this.isEmpty = false;
    } else {
      this.loading = true;
      this.isEmpty = true;
      try {
        let agency = {
          name: this.form.value.name,
          rating: this.form.value.rating,
          year_foundation: this.form.value.year_foundation,
        };
        console.log(agency);
        let result = await this.mainService.post(
          JSON.stringify(agency),
          "/addAgencyRealtors"
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
