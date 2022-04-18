export class TaskCreationModel {
    public taskUser: string;
    public taskDescription: string;
    public taskId: number;

  
    constructor(user: string, taskName: string, id: number) {
      this.taskUser = user
      this.taskDescription = taskName
      this.taskId = id
    }
  
  }
  
  