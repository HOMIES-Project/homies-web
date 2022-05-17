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

  constructor() { }

  ngOnInit(): void {
  }

}
