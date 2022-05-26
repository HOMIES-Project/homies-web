export class GroceryCreationModel {
    public idGroup: string;
    public idUserData: string;
    public nameProduct: string;
    public units: string
    public typeUnit: string;
    // public login: string;

    constructor(idGroup: string, idUserData: string, nameProduct: string, units: string, typeUnit: string, /*login: string*/) {
      this.idGroup= idGroup;
      this.idUserData = idUserData
      this.nameProduct = nameProduct
      this.units = units
      this.typeUnit = typeUnit
      // this.login = login
    }

  }

  export class GroceryEditionModel {
    public units: string
    public login: string;
    public idGroup: string;
    public idProduct: string;
    public name: string;
    public typeUnit: string;

    constructor(login: string, idGroup: string, idProduct:string, name: string, typeUnit: string, units: string) {
      this.units = units
      this.idGroup= idGroup;
      this.idProduct = idProduct;
      this.name = name
      this.typeUnit = typeUnit
      this.login = login
    }

}

export class GroceryCancelModel {
  public idProduct: number;
  public idGroup: string;
  public login: string;
  public purchased: boolean;

  constructor(idProduct: number, idGroup: string,login: string, purchased: boolean) {
    this.idProduct = idProduct,
    this.idGroup = idGroup,
    this.login = login,
    this.purchased = purchased
  }

}