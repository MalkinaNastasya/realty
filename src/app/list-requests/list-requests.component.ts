import { Component, OnInit } from "@angular/core";
import { MainService } from "../shared/services/main.service";
import { Request } from "../shared/models/request.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-list-requests",
  templateUrl: "./list-requests.component.html",
  styleUrls: ["./list-requests.component.css"],
})
export class ListRequestsComponent implements OnInit {
  filter_status = "0";
  filter_abc = "0";
  hideAdmin = true;
  hideManager = true;
  hideClient = true;
  editOrNot = true;
  form: FormGroup;
  loading = false;
  requests: Request[] = [];
  res;
  role;
  logOut = true;
  request: any;
  constructor(private mainService: MainService) {}

  async ngOnInit() {
    // Получение списка всех заявок на обратный звонок,  имеющихся в БД
    this.loading = true;
    try {
      let result = await this.mainService.get("/getRequestCalls");
      if (typeof result !== "undefined") {
        console.log(result);
        for (const one in result) {
          this.requests.push(
            new Request(
              result[one].id_call,
              result[one].fio,
              result[one].phone,
              result[one].status
            )
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
    this.loading = false;
  }

  // Хук жизненного цикла по изменению
  // Проверяет наличие в LocalStorage элемента роли, чтобы понять авторизирован пользователь или нет
  ngDoCheck() {
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
      console.log("Роль: ", this.role);
      // console.log("Имя: ", this.name);
      this.logOut = false;
    }
  }
}
