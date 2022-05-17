import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-groceries-modal',
  templateUrl: './groceries-modal.component.html',
  styleUrls: ['./groceries-modal.component.css']
})
export class GroceriesModalComponent implements OnInit {

  @Input() isCreating!: boolean
  @Input() isEditting!: boolean

  newGroceryForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.newGroceryForm = this.formBuilder.group({
      groceryName: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
      ],
      groceryType: [
        '',
        [Validators.required],
      ]
    });
  }

  ngOnInit(): void {
  }

}
