import { UsersService } from './../../../../core/services/users.service';
import { GroupsService } from './../../../../core/services/groups.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GroceriesService } from './../../../../core/services/Lists/groceries.service';
import { GroceryCreationModel } from './../../../../core/models/groceriesCreation.model';
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
  @Input() groceryFromChild!: any;


  newGroceryForm: FormGroup;
  idUser!: string;
  idGroup!: string | null;
  nameProduct!: string;
  typeUnit!: string;
  sent: boolean = false;
  units: string = "1";

  closeResult = '';

  constructor(
    private formBuilder: FormBuilder,
    private groceriesService: GroceriesService,
    private modalService: NgbModal,
    private groupsService: GroupsService,
    private usersService: UsersService
  ) {
    this.newGroceryForm = this.formBuilder.group({
      nameProduct: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
      ],
      typeUnit: [
        null,
        [Validators.required],
      ]
    });
  }

  ngOnInit(): void {
    this.groupsService.groupID.subscribe((response) => {
      this.idGroup = response;
      console.log(this.idGroup)
    });
    this.usersService.userId.subscribe((response) => {
      this.idUser = response;
    });
    console.log(this.groceryFromChild)


    if(this.isEditting) {

      this.newGroceryForm.patchValue({
        nameProduct: this.groceryFromChild.nameProduct,
        productType: this.groceryFromChild.typeUnit,
        // login: this.groceryFromChild.login
      });
    }
  }

  openAddProduct(addProduct: any) {
    this.modalService.open(addProduct, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then(
      (result)=>{

        this.closeResult = `Closed width: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)} `
      }
    )
  }

  openEditProduct(idProduct: string, editProduct: any) {
    this.modalService.open(editProduct, { ariaLabelledBy: 'modal-basic-title' , size: 'lg'}).result.then(
      (result)=>{

        this.closeResult = `Closed width: ${result}`;

      },
      (reason) => {

        this.closeResult = `Dismissed ${this.getDismissReason(reason)} `
      }
    )
  }

  submitProductForm() {

    if(this.isCreating) {
      console.log("CREANDO")
      this.performCreateProduct()
    } else {
      console.log("EDITANDO")
      this.performEditProduct()
    }
  }

  performCreateProduct() {
    console.log("click")
    let grocery: GroceryCreationModel = new GroceryCreationModel(
      this.idGroup!,
      this.idUser,
      this.newGroceryForm.controls.nameProduct.value,
      this.units,
      this.newGroceryForm.controls.typeUnit.value
    );
    console.log(grocery)
    // this.sent = true;
    this.groceriesService.performGroceryCreation(grocery).subscribe((response) => {
      console.log(grocery)
      console.log(response)
      console.log('producto creado')
      // window.location.reload()
      // this.modalService.dismissAll()
    },
    (error) => {
      console.log("ERROR " + JSON.stringify(error))
    }
    );
  }

  performEditProduct() {
    let grocery: GroceryCreationModel = new GroceryCreationModel(
      this.idGroup!,
      this.groceryFromChild.id,
      this.newGroceryForm.controls.nameProduct.value,
      this.units,
      this.newGroceryForm.controls.typeUnit.value
    );
    console.log(grocery)
    this.sent = true;
    this.groceriesService.performEditGrocery(grocery).subscribe((response) => {
      console.log(response)
      window.location.reload()
    },
    (error) => {
      console.log(error);
    }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {

      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {

      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
