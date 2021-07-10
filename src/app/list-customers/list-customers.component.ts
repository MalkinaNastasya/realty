import { Component, OnInit } from '@angular/core';
import { Customer } from '../shared/models/customer.model';
import { MainService } from '../shared/services/main.service';

@Component({
  selector: "app-list-customers",
  templateUrl: "./list-customers.component.html",
  styleUrls: ["./list-customers.component.css"],
})
export class ListCustomersComponent implements OnInit {
  loading = false;
  id;
  id_customer; //?
  customers: Customer[] = [];
  constructor(private mainService: MainService) {}

  async ngOnInit() {
    // Получение списка всех cотрудников,  имеющихся в БД
    this.loading = true;
    this.id = localStorage.getItem("id");
    try {
      let result = await this.mainService.get("/getCustomers");
      if (typeof result !== "undefined") {
        console.log(result);
        for (const one in result) {
          this.customers.push(
            new Customer(
              result[one].id_customer,
              result[one].name,
              result[one].phone,
              result[one].email,
              result[one].login,
              result[one].password
            )
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
    this.loading = false;
  }

  async onDelete(id_customer) {
    try {
      let result = await this.mainService.delete(
        `/deleteCustomer/${id_customer}`
      );
    } catch (error) {
      console.log(error);
    }
    let index = this.customers.findIndex((el) => {
      return el.id_customer == id_customer;
    });
    this.customers.splice(index, 1);
  }
}
