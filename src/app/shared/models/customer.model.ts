// Модель класса Покупатель
export class Customer {
  public id_customer: any;
  public name: any;
  public phone: any;
  public email: any;
  public login: any;
  public password: any;

  constructor(
    id_customer: any,
    name: any,
    phone: any,
    email: any,
    login: any,
    password: any
  ) {
    this.id_customer = id_customer;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.login = login;
    this.password = password;
  }
}
