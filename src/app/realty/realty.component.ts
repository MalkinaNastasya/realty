import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";
import { MainService } from "../shared/services/main.service";
import { environment } from "../../environments/environment";
import { Realty } from "../shared/models/realty.model";

@Component({
  selector: "app-realty",
  templateUrl: "./realty.component.html",
  styleUrls: ["./realty.component.css"],
})
export class RealtyComponent implements OnInit {
  // Логическая переменная определяющая наличие или отсуствие кнопки Удалить в карточке
  hide1 = true;
  hide2 = true;
  hide3 = true;
  demonstrateService = true;
  @Input() realty;
  @Output() del = new EventEmitter<number>();
  srcPhoto = environment.baseUrl + "/api/photo/";
  // Логические переменные, авторизирован пользователь или нет
  logOut = true;
  name = "";
  role = "";
  constructor(private router: Router, private mainService: MainService) {}

  async ngOnInit() {
    console.log(this.srcPhoto);
    if (this.realty == undefined) {
      this.demonstrateService = false;
    }
  }

  // Хук жизненного цикла по изменению
  // Проверяет наличие в LocalStorage элемента роли, чтобы понять авторизирован пользователь или нет
  ngDoCheck() {
    this.name = "";
    this.role = "";
    if (localStorage.getItem("role") !== null) {
      if (localStorage.getItem("role") == "owner") {
        this.role = "Владелец";
      } else {
        if (localStorage.getItem("role") == "realtor") {
          this.role = "Риелтор";
        } else {
          if (localStorage.getItem("role") == "customer") {
            this.role = "Покупатель";
          }
        }
        if (localStorage.getItem("role") == "customer") {
          this.role = "Покупатель";
        }
        if (localStorage.getItem("role") == "admin") {
          this.role = "Администратор";
        }
      }
      this.name = localStorage.getItem("name");
      // console.log("Роль: ", this.role);
      // console.log("Имя: ", this.name);
      this.logOut = false;
    }
  }

  // Функция удаления товара из БД
  async deleteRealty(id_realty) {
    try {
      let result = await this.mainService.delete(
        `/deleteRealty/${id_realty}`
      );
    } catch (error) {
      console.log(error);
    }
    this.del.emit(id_realty);
  }
}
