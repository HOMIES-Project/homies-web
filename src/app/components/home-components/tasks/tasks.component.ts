import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  open: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  openNewTarea(){
   this.open = !this.open;
   console.log(this.open)
  }


}
