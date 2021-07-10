import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MainService } from "../shared/services/main.service";
import { Request } from "../shared/models/request.model";

@Component({
  selector: "app-request",
  templateUrl: "./request.component.html",
  styleUrls: ["./request.component.css"],
})
export class RequestComponent implements OnInit {
  @Input() request;

  loading = false;
  requests: any;
  res;
  hideAdmin = true;
  hideManager = true;
  hideClient = true;
  editOrNot = true;
  role;
  logOut = true;

  constructor(private mainService: MainService) {}

  async ngOnInit() {}

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
      this.logOut = false;
    }
  }

  async onRequestInfoOne(request) {
    // Отправка на сервер запроса для получения карточки товара по id
    try {
      this.res = await this.mainService.post(
        JSON.stringify(request),
        "/getOneRequestCall"
      );
    } catch (error) {
      console.log(error);
    }
    this.request = this.res[0];
    console.log(request);
  }

  // Оправляет запрос изменения информации в заявку на сервер или включает режим редактирования
  async onChangeRequest(request, status) {
    this.onRequestInfoOne(request);
    if (!this.editOrNot) {
      let newRequest = new Request(
        request.id_call,
        request.fio,
        request.phone,
        status
      );
      console.log(newRequest);
      try {
        let res = await this.mainService.put(
          JSON.stringify(newRequest),
          `/updateRequestCall/${newRequest.id_call}`
        );
      } catch (error) {
        console.log(error);
      }
      request.status = status;
    }
    this.editOrNot = !this.editOrNot;
  }
}
