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
