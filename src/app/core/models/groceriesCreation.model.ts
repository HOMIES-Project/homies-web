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