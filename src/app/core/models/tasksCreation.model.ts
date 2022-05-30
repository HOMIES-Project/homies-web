export class TaskCreationModel {
    public user: string;
    public idGroup: string;
    public taskName: string;
    public description: string;
    public login: string;

    constructor(user: string, idGroup: string, taskName: string, description: string, login: string) {
      this.user = user
      this.idGroup= idGroup;
      this.taskName = taskName
      this.description = description
      this.login = login

    }

  }

  export class TaskEditionModel {
    public login: string;
    public idGroup: string;
    public idTask: string;
    public taskName: string;
    public description: string;

    constructor(login: string, idGroup: string, idTask:string, taskName: string, description: string) {
      this.login = login
      this.idGroup= idGroup;
      this.idTask = idTask;
      this.taskName = taskName
      this.description = description

    }

  }

  export class TaskModel {
    public login: string;
    public taskName: string;
    public description: string;

    constructor(login: string, taskName: string, description: string) {
      this.login = login
      this.taskName = taskName
      this.description = description

    }
  }

  export class TaskCancelModel {
    public idTask: number;
    public idGroup: string;
    public login: string;
    public cancel: boolean;

    constructor(idTask: number, idGroup: string,login: string, cancel: boolean) {
      this.idTask = idTask,
      this.idGroup = idGroup,
      this.login = login,
      this.cancel = cancel
    }

  }

  export class TaskUserAddModel {
    public idTask: number;
    public login: string;
    public idList: string;

    constructor(idTask: number, idList: string,login: string, ) {
      this.idTask = idTask,
      this.idList = idList,
      this.login = login
    }

  }
