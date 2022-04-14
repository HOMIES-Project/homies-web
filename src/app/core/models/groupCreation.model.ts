export class GroupCreationModel {
  public user: number;
  public groupName: string;
  public groupRelation: string;

  constructor(user: number, groupName: string, groupRelation: string) {
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
