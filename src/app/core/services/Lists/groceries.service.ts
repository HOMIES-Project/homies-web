import { map } from 'rxjs/operators';
import { GroceryCreationModel } from './../../models/groceriesCreation.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

const URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class GroceriesService {

  // OBSERVABLE - PRODUCTS
  private userGroceriesBehaviourSubject: BehaviorSubject<Array<any> | null>;
  public userGroceries: Observable<Array<any> | null>;

  constructor(private http: HttpClient) {
    this.userGroceriesBehaviourSubject =
      new BehaviorSubject<Array<any> | null>(
        JSON.parse(<string>localStorage.getItem('userGroceries'))
      );
    this.userGroceries = this.userGroceriesBehaviourSubject.asObservable();
  }

  /* SHOPPING LIST - GET */
  getGroceryList(id: string): Observable<any> {
    let url = `${environment.BASE_URL}/shopping-lists/${id}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        console.log(response)
        return response;
      })
    );
  }

  /* CREATE PRODUCT - POST */
  performGroceryCreation(entry: GroceryCreationModel): Observable<any> {
    let url = `${environment.BASE_URL}/products`;
    return this.http.post<GroceryCreationModel>(url, entry).pipe(
      map((response) => {
        console.log(response)
        return response;
      })
    );
  }

  /* EDIT PRODUCT - PUT */
  performEditGrocery( entry: any): Observable<any> {
    let url = `${environment.BASE_URL}/products/update-products`;
    return this.http.put(url, entry);
  }

  /* DELETE PRODUCT - DELETE */
  performDeleteGrocery(id: number): Observable<any> {
    let url = `${environment.BASE_URL}/products/${id}`;
    return this.http.delete(url);
  }

  /* PURCHASED PRODUCT - PUT */
  performPurchaseGrocery(entry: any) {
    let url = `${environment.BASE_URL}/product/cancel`;
    return this.http.put(url, entry);
  }
}
