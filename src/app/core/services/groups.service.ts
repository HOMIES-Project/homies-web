
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { GroupCreationModel, GroupUserActionModel } from '../models/groupCreation.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {

  //OBSERVABLE - GROUP
  private groupsListBehaviourSubject: BehaviorSubject<Array<any> | null>;
  public groupsList: Observable<Array<any> | null>;

  //OBSERVABLE -  GROUP ID
  private groupIDBehaviourSubject: BehaviorSubject<string| null>;
  public groupID: Observable<string | null>;


  constructor(private http: HttpClient) {
    this.groupsListBehaviourSubject = new BehaviorSubject<Array<GroupCreationModel> | null>(
      JSON.parse(<string>localStorage.getItem('groupsArray'))
    );
    this.groupsList = this.groupsListBehaviourSubject.asObservable();

    this.groupIDBehaviourSubject = new BehaviorSubject<string | null>(
      JSON.parse(<string>localStorage.getItem('groupID'))
    );
    this.groupID = this.groupIDBehaviourSubject.asObservable();
  }

  /* GROUP CREATION - POST */
  performGroupCreation(entry: GroupCreationModel): Observable<any> {
    let url = `${environment.BASE_URL}/groups`;
    console.log(entry);
    return this.http.post<GroupCreationModel>(url, entry);
  }

  getUserInfo(id: string): Observable<any> {
    let url = `${environment.BASE_URL}/user-data/${id}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        // for (var i=0; i<response.groups.length; i++ ) {
        //   this.getUserInfo(response.groups[i].id).subscribe(response =>{
        //     console.log(response)
        //   })
        // }
        this.groupsListBehaviourSubject.next(response.groups)
        this.groupIDBehaviourSubject.next(response.groups[0])
        return response;
      })
    );
  }

  getGroupInfo(id: string): Observable<any> {
    let url = `${environment.BASE_URL}/groups/${id}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        return response;
      })
    );
  }

  performAddUserToGroup(entry: GroupUserActionModel) {
    let url = `${environment.BASE_URL}/groups/add-user`;
    return this.http.post<GroupUserActionModel>(url, entry)
  }

  performDeleteUserFromGroup(entry: GroupUserActionModel) {
    let url = `${environment.BASE_URL}/groups/delete-user`;
    return this.http.post<GroupUserActionModel>(url, entry)
  }

}
