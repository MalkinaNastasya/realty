import { Component, OnInit } from '@angular/core';
import { MainService } from '../shared/services/main.service';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  name;
  role;
  logOut = true;
  hideAdmin = true;
  hideManager = true;
  hideClient = true;
  records: Request[] = [];
  loading = false;
  notfound = true;
  id_user = localStorage.getItem("id");
  constructor(private mainService: MainService) {}

  async ngOnInit() {
    // // Получение списка всех записей,  имеющихся в БД
    // this.loading = true;
    // try {
    //   let result = await this.mainService.get(`/records/${this.id_user}`);
    //   if (Object.keys(result).length == 0) {
    //     console.log("пусто");
    //     result = undefined;
    //   }
    //   if (typeof result !== "undefined") {
    //     this.notfound = false;
    //     console.log(result);
    //     for (const one in result) {
    //       this.records.push(
    //         new Request(result[one].id_record, result[one].title)
    //       );
    //     }
    //   } else {
    //     this.notfound = true;
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    // this.loading = false;
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
          this.role = "Риэлтор";
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
  // // Удаление из локального массива товаров определенного товара по id
  // onDeleteRecord(id_record) {
  //   let index = this.records.findIndex((el) => {
  //     // return el.id_record == id_record;
  //   });
  //   this.records.splice(index, 1);
  //   if (this.records.length == 0) {
  //     this.notfound = true;
  //   }
  // }
}
