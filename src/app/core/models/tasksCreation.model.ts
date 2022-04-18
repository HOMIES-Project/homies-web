export class TaskCreationModel {
    public taskUser: number;
    public taskDescription: string;
    public taskId: number;

  
    constructor(user: number, taskName: string, id: number) {
      this.taskUser = user
      this.taskDescription = taskName
      this.taskId = id
    }
  
  }
  
  