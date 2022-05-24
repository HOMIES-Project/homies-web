export class GroupCreationModel {
  public id: string;
  public user: number;
  public groupName: string;
  public groupRelation: string;

  constructor(id: string, user: number, groupName: string, groupRelation: string) {
    this.id = id
    this.user = user
    this.groupName = groupName
    this.groupRelation = groupRelation
  }

}

export class GroupUserActionModel {
  public idAdminGroup: string;
  public login: string;
  public idGroup: string;

  constructor(idAdminGroup: string, login: string, idGroup: string) {
    this.idAdminGroup = idAdminGroup
    this.login = login
    this.idGroup = idGroup
  }

}

export class GroupUserModel {
  public id: string;
  public login: string;
  public photo: string;
  public firstName: string;
  public lastName: string;
  public admin: boolean;

  constructor(id: string, login: string, photo: string,  firstName: string, lastName: string, admin: boolean) {
    this.id = id
    this.login = login
    this.photo = photo
    this.firstName = firstName
    this.lastName = lastName
    this.admin = admin
  }

}

export class GroupEditModel {
  public groupName: string;
  public groupRelation: string;

  constructor( groupName: string, groupRelation: string) {
    this.groupName = groupName
    this.groupRelation = groupRelation
  }

}

// export class GroupInfoModel {
//   public id: string;
//   public groupRelationName: string;
//   public groupName: string;
//   public firstName: string;
//   public lastName: string;
//   public admin: boolean;

//   constructor(id: string, groupRelationName: string, groupName: string,  firstName: string, lastName: string, admin: boolean) {
//     this.id = id
//     this.groupRelationName = groupRelationName
//     this.groupName = groupName
//     this.firstName = firstName
//     this.lastName = lastName
//     this.admin = admin
//   }

// }
