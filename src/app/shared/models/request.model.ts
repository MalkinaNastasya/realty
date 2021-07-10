// Модель класса Недвижимость
export class Request {
  public id_call: any;
  public fio: any;
  public phone: any;
  public status: any;

  constructor(id_call: any, fio: any, phone: any, status: any) {
    this.id_call = id_call;
    this.fio = fio;
    this.phone = phone;
    this.status = status;
  }
}
