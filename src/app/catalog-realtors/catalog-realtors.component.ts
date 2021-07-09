import { Component, OnInit } from '@angular/core';
import { Realtor } from '../shared/models/realtor.model';
import { MainService } from '../shared/services/main.service';

@Component({
  selector: "app-catalog-realtors",
  templateUrl: "./catalog-realtors.component.html",
  styleUrls: ["./catalog-realtors.component.css"],
})
export class CatalogRealtorsComponent implements OnInit {
  // Логическая переменная, определяющая наличие или отсутсвие сообщения о незаполненных обязательных полях
  loading = false;
  // Логическая переменная, определяющая наличие или отсутсвие сообщения о ненайденных товарах
  notfound = false;
  realtors: Realtor[] = [];
  constructor(private mainService: MainService) {}

  async ngOnInit() {
    // Получение списка всех услуг,  имеющихся в БД
    this.loading = true;
    try {
      let result = await this.mainService.get("/getRealtors");
      if (Object.keys(result).length == 0) {
        console.log("пусто");
        result = undefined;
      }
      if (typeof result !== "undefined") {
        this.notfound = false;
        console.log(result);
        for (const one in result) {
          this.realtors.push(
            new Realtor(
              result[one].id_realtor,
              result[one].name,
              result[one].phone,
              result[one].rating,
              result[one].id_agency
            )
          );
        }
      } else {
        this.notfound = true;
      }
    } catch (error) {
      console.log(error);
    }
    this.loading = false;
  }
}
