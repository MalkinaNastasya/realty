import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";
import { MainService } from "../shared/services/main.service";
import { environment } from "../../environments/environment";
import { Service } from "../shared/models/service.model";

@Component({
  selector: "app-realtor",
  templateUrl: "./realtor.component.html",
  styleUrls: ["./realtor.component.css"],
})
export class RealtorComponent implements OnInit {
  // Логическая переменная определяющая наличие или отсуствие кнопки Удалить в карточке
  hide1 = true;
  hide2 = true;
  hide3 = true;
  demonstrateService = true;
  @Input() realtor;
  // Логические переменные, авторизирован пользователь или нет
  logOut = true;
  name = "";
  role = "";
  constructor(private router: Router, private mainService: MainService) {}

  ngOnInit() {
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
      this.logOut = false;
    }
  }
}
