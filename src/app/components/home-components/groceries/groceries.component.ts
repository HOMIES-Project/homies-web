import { GroceryCancelModel } from './../../../core/models/groceriesCreation.model';
import Swal from 'sweetalert2';
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
  isCancelled!: boolean
  login!: string;

  delete: boolean = false;
  edit: boolean = false;

  constructor(
    private groceriesService: GroceriesService,
    private groupsService: GroupsService,
    private usersService: UsersService
  ) { 
  }

  ngOnInit(): void {
    this.groupsService.groupID.subscribe((response) => {
      this.groupID = response;
    });
    this.usersService.user.subscribe((response) => {
      this.login = response?.user.login;
    });
    
    this.groceriesService.getGroceryList(this.groupID!).subscribe((response) => {
      this.groceryList = response.products;
      if (this.groceryList.length == 0) {
        this.noGroceries = true;
      } else {
        this.noGroceries = false;
      }
    });
  
  }

  deleteProduct(productID: string) {
    Swal.fire({
      title: '¡Cuidado! Vas a eliminar un producto',
      text: '¿Estás seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34ade7',
      confirmButtonText: 'Confirmar',
      cancelButtonText: `Cancelar`,
      cancelButtonColor: '#df4759',
    }).then((result) => {
      if (result.isConfirmed) {
        this.groceriesService.performDeleteGrocery(productID).subscribe(
          (response) => {
            window.location.reload();
            console.log("BORRADA " + response)
            // window.location.reload()
          },
          (error) => {
            console.log("ID " + productID)
            console.log("ERROR " + JSON.stringify(error))
          }
        );
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }

  cancelProduct(idProduct: number, isCancelled: boolean) {
    this.isCancelled = !isCancelled;
    let productToCancel = new GroceryCancelModel(
      idProduct,
      this.groupID!,
      this.login,
      this.isCancelled
    );
    console.log(productToCancel);
    this.groceriesService.performPurchaseGrocery(productToCancel).subscribe(
      (response) => {
        window.location.reload()
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  changeDelete() {
    this.delete = !this.delete;
  }

  editProduct() {
    this.edit = !this.edit;
  }

}
