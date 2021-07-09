// Модель класса Риэлтор
export class Realtor {
  public id_realtor: any;
  public name: any;
  public phone: any;
  public rating: any;
  public id_agency: any;

  constructor(id_realtor: any, name: any, phone: any, rating: any, id_agency: any) {
    this.id_realtor = id_realtor;
    this.name = name;
    this.phone = phone;
    this.rating = rating;
    this.id_agency = id_agency;
  }
}
