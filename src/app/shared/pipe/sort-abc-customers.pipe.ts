import { Pipe, PipeTransform } from "@angular/core";
import { Customer } from "../models/customer.model";
import { isNullOrUndefined } from "util";

@Pipe({
  name: "sortAbcCustomers",
})
export class SortAbcCustomersPipe implements PipeTransform {
  transform(customers: Customer[], sort: string) {
    if (!isNullOrUndefined(customers) && (sort || "").trim() !== "") {
      if (sort === "1") {
        let sort_customers = customers.sort((a: any, b: any) => {
          if (a.fio < b.fio) {
            return -1;
          } else if (a.fio > b.fio) {
            return 1;
          } else {
            return 0;
          }
        });
        return sort_customers;
      } else if (sort === "2") {
        let sort_customers = customers.sort((a: any, b: any) => {
          if (a.fio > b.fio) {
            return -1;
          } else if (a.fio < b.fio) {
            return 1;
          } else {
            return 0;
          }
        });
        return sort_customers;
      } else {
        return customers;
      }
    }
    return customers;
  }
}
