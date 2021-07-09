// Модель класса Агентство
export class Agency {
  public id_agency: any;
  public name: any;
  public rating: any;
  public year_foundation: any;

  constructor(
    id_agency: any,
    name: any,
    rating: any,
    year_foundation: any,
  ) {
    this.id_agency = id_agency;
    this.name = name;
    this.rating = rating;
    this.year_foundation = year_foundation;
  }
}
