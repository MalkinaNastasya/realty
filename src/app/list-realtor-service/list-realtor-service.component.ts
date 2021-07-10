import { Component, OnInit } from "@angular/core";
import { Service } from "../shared/models/service.model";
import { MainService } from "../shared/services/main.service";

@Component({
  selector: "app-list-realtor-service",
  templateUrl: "./list-realtor-service.component.html",
  styleUrls: ["./list-realtor-service.component.css"],
})
export class ListRealtorServiceComponent implements OnInit {
  loading = false;
  servicies: Service[] = [];
  item: {
    id: string;
  };
  id = localStorage.getItem("id");
  // this.item.id = this.id;
  // console.log(this.item);
  constructor(private mainService: MainService) {}

  async ngOnInit() {
    // Получение списка всех cотрудников,  имеющихся в БД
    this.loading = true;
    try {
      let item;
      item = {
        id: this.id,
      };
      console.log(item);
      let result = await this.mainService.post(
        JSON.stringify(item),
        "/getOneRealtorService"
      );
      if (typeof result !== "undefined") {
        console.log(result);
        for (const one in result) {
          this.servicies.push(
            new Service(
              result[one].id_service,
              result[one].title,
              result[one].price,
              result[one].id_realtor
            )
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
    this.loading = false;
  }

  async onDelete(id_service) {
    try {
      let result = await this.mainService.delete(
        `/deleteRealtorService/${id_service}`
      );
    } catch (error) {
      console.log(error);
    }
    let index = this.servicies.findIndex((el) => {
      return el.id_service == id_service;
    });
    this.servicies.splice(index, 1);
  }
}
