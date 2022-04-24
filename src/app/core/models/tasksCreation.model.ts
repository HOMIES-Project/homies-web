export class TaskCreationModel {
    public user: string;
    public idGroup: string;
    public taskName: string;
    public description: string;

    constructor(user: string, idGroup: string, taskName: string, description: string) {
      this.user = user   
      this.idGroup= idGroup;   
      this.taskName = taskName
      this.description = description

    }
  
  }
  
  