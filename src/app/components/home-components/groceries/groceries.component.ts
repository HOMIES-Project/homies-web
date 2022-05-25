import { UsersService } from 'src/app/core/services/users.service';
import { UserData } from './../../../core/models/user-data.model';
import { GroceriesService } from './../../../core/services/Lists/groceries.service';
import { TasksService } from 'src/app/core/services/Lists/tasks.service';
import { GroupsService } from 'src/app/core/services/groups.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-groceries',
  templateUrl: './groceries.component.html',
  styleUrls: ['./groceries.component.css']
})
export class GroceriesComponent implements OnInit {

  isEditting: boolean = true;
  isCreating: boolean = true;

  noGroceries: boolean = true;

  groceryList: Array<any> = [];
  
  groupID!: string | null;

  constructor(
    private groceriesService: GroceriesService,
    private groupsService: GroupsService
  ) { 
  }

  ngOnInit(): void {
    this.groupsService.groupID.subscribe((response) => {
      this.groupID = response;
      console.log(this.groupID)
    });
    console.log("LONGITUD " + this.groceryList.length)
    this.groceriesService.getGroceryList(this.groupID!).subscribe((response) => {
      this.groceryList = response.grocery;
      console.log(this.groceryList);
      if (this.groceryList.length == 0) {
        this.noGroceries = true;
      } else {
        this.noGroceries = false;
      }
      console.log(this.groupID);
    });
  
  }

}
