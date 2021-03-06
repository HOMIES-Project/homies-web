import { UsersService } from 'src/app/core/services/users.service';
import { GroupsService } from '../../core/services/groups.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { windowWhen } from 'rxjs/operators';
import { TasksService } from 'src/app/core/services/Lists/tasks.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  id!: string;
  groups!: Array<any> | null;
  sub: any;
  paramID!: string | null;
  groupName!: string | null;
  groupID!: string | null;

  noGroups!: boolean;

  isCreating: boolean = true;

  constructor(
    private groupsService: GroupsService,
    private usersService: UsersService,
    private tasksService: TasksService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.usersService.userId.subscribe((response) => {
      this.id = response;
    });


    this.groupsService.groupInfo.subscribe( response =>{
      this.groupName = response?.groupName
    })

    this.tasksService.userTasks.subscribe()


    this.groupsService.groupsList.subscribe( response =>{
      this.groups = response
      console.log(this.groups)
    })
  }

  ngOnInit(): void {


  }

  navigateToHomeGroupID(id: string) {

    this.groupsService.updateGroupId(id).subscribe((response) => {
      this.paramID = response;
    });
    this.router.navigate(['home']);

  }

  navigateToTasks() {
    this.groupsService.groupID.subscribe((response) => {
      this.paramID = response;
    });
    this.router.navigate(['/home', 'tasks', this.paramID], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve',
    });

  }
  navigateToGroceries() {
    this.groupsService.groupID.subscribe((response) => {
      this.paramID = response;
    });
    this.router.navigate(['/home', 'groceries', this.paramID], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve',
    });
  }
  navigateToExpenses() {
    this.groupsService.groupID.subscribe((response) => {
      this.paramID = response;
    });
    this.router.navigate(['/home', 'expenses', this.paramID], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve',
    });
  }
}

