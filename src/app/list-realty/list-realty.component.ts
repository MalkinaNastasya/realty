import { Component, OnInit } from '@angular/core';
import { Realty } from '../shared/models/realty.model';
import { MainService } from '../shared/services/main.service';

@Component({
  selector: "app-list-realty",
  templateUrl: "./list-realty.component.html",
  styleUrls: ["./list-realty.component.css"],
})
export class ListRealtyComponent implements OnInit {
  loading = false;
  id_realty; //?
  realties: Realty[] = [];
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
        "/getOwnerRealty"
      );
      if (typeof result !== "undefined") {
        console.log(result);
        for (const one in result) {
          this.realties.push(
            new Realty(
              result[one].id_realty,
              result[one].image,
              result[one].address,
              result[one].id_type_realty,
              result[one].price,
              result[one].id_owner
            )
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
    this.loading = false;
  }

  async onDelete(id_realty) {
    try {
      let result = await this.mainService.delete(`/deleteRealty/${id_realty}`);
    } catch (error) {
      console.log(error);
    }
    let index = this.realties.findIndex((el) => {
      return el.id_realty == id_realty;
    });
    this.realties.splice(index, 1);
  }
}
