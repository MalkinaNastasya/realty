import { Pipe, PipeTransform } from "@angular/core";
import { isNullOrUndefined } from "util";
import { Realty } from "../models/Realty.model";

@Pipe({
  name: "filterRealty",
})
export class FilterRealty implements PipeTransform {
  transform(realties: Realty[], search: string) {
    if (!isNullOrUndefined(realties) && search.trim() !== "") {
      console.log(search);
      let filter_realties = realties.filter(
        (Realty) =>
          Realty.address.toLowerCase().indexOf(search.toLowerCase()) === 0
      );
      return filter_realties;
    }
    return realties;
  }
}
