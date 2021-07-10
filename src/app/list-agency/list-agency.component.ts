import { Component, OnInit } from '@angular/core';
import { Agency } from '../shared/models/agency.model';
import { MainService } from '../shared/services/main.service';

@Component({
  selector: "app-list-agency",
  templateUrl: "./list-agency.component.html",
  styleUrls: ["./list-agency.component.css"],
})
export class ListAgencyComponent implements OnInit {
  loading = false;
  id_agency; //?
  id;
  agencies: Agency[] = [];
  constructor(private mainService: MainService) {}

  async ngOnInit() {
    // Получение списка всех cотрудников,  имеющихся в БД
    this.loading = true;
    this.id = localStorage.getItem("id");
    try {
      let result = await this.mainService.get("/getAgencyRealtors");
      if (typeof result !== "undefined") {
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
      }
    } catch (error) {
      console.log(error);
    }
    this.loading = false;
  }

  async onDelete(id_agency) {
    try {
      let result = await this.mainService.delete(
        `/deleteAgencyRealtors/${id_agency}`
      );
    } catch (error) {
      console.log(error);
    }
    let index = this.agencies.findIndex((el) => {
      return el.id_agency == id_agency;
    });
    this.agencies.splice(index, 1);
  }
}
