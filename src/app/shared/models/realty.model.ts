// Модель класса Недвижимость
export class Realty {
  public id_realty: any;
  public image: any;
  public address: any;
  public id_type_realty: any;
  public price: any;
  public id_owner: any;

  constructor(
    id_realty: any,
    image: any,
    address: any,
    id_type_realty: any,
    price: any,
    id_owner: any
  ) {
    this.id_realty = id_realty;
    this.image = image;
    this.address = address;
    this.id_type_realty = id_type_realty;
    this.price = price;
    this.id_owner = id_owner;
  }
}
