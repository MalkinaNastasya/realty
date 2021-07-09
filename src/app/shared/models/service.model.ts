// Модель класса Услуга
export class Service {
  public id_service: any;
  public title: any;
  public price: any;
  public id_realtor: any;
  constructor(id_service: any, title: any, price: any, id_realtor: any) {
    this.id_service = id_service;
    this.title = title;
    this.price = price;
    this.id_realtor = id_realtor;
  }
}
