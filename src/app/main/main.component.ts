import { Component, OnInit } from '@angular/core';
import { Agency } from '../shared/models/agency.model';
import { MainService } from '../shared/services/main.service';

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"],
})
export class MainComponent implements OnInit {
  // Логическая переменная, определяющая наличие или отсутсвие сообщения о незаполненных обязательных полях
  loading = false;

  // Логическая переменная, определяющая наличие или отсутсвие сообщения о ненайденных агентствах
  notfound = false;
  agencies: Agency[] = [];
  constructor(private mainService: MainService) {}

  async ngOnInit() {
    // Получение агенств с рейтингом = 5
    this.loading = true;
    try {
      let result = await this.mainService.get("/getAgencyFive");
      if (Object.keys(result).length == 0) {
        console.log("пусто");
        result = undefined;
      }
      if (typeof result !== "undefined") {
        this.notfound = false;
        console.log(result);
        for (const one in result) {
          this.agencies.push(
            new Agency(
              result[one].id_agency,
              result[one].name,
              result[one].rating,
              result[one].year_foundation
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
