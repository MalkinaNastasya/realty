import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  // Логическая переменная, авторизирован пользователь или нет
  logOut = true;
  name = "";
  role = "";
  constructor(private router: Router) {}

  ngOnInit() {}

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

  // Функция, срабатывающая при выходе из аккаунта, очищает LocalStorage и переводит на каталог товаров
  onLogOut() {
    this.logOut = true;
    localStorage.clear();
    this.router.navigate(["/"]);
  }
}
