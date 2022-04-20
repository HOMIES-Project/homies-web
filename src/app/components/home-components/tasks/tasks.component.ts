import { Component, OnInit } from '@angular/core';
import { GroupsService } from 'src/app/core/services/groups.service';
import { TasksService } from 'src/app/core/services/tasks.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  open: boolean = true;
  groupID!: string | null;

  constructor(
    private tasksService: TasksService,
    private groupsService: GroupsService,
    private usersService: UsersService,
  ) { }

  ngOnInit(): void {
    this.groupsService.groupID.subscribe((groupID) => {
      this.groupID = groupID;})
  }
   /* ESTO ESTÁ A MEDIO HACER Y LO COMENTO PARA QUE NO DE ERRORES Y MIERDAS
   
   getTasks(){
    this.tasksService.getTasks(this.groupID!).subscribe((groupInfo) => {
      this.groupName = groupInfo.groupName;
      this.groupRelationName = groupInfo.groupRelationName;
      this.groupUsers = groupInfo.userData;
      this.adminID = groupInfo.userAdmin.id;
      this.checkIsAdmin();
      this.getUsersInfo();
    })
  }
  */

  openNewTarea(){
   this.open = !this.open;
   console.log(this.open)
  }
  


}
