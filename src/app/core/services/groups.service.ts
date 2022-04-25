import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import {
  GroupCreationModel,
  GroupUserActionModel,
} from '../models/groupCreation.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  //OBSERVABLE - GROUP
  private groupsListBehaviourSubject: BehaviorSubject<Array<any> | null>;
  public groupsList: Observable<Array<any> | null>;

  //OBSERVABLE -  GROUP ID
  private groupIDBehaviourSubject: BehaviorSubject<string | null>;
  public groupID: Observable<string | null>;

  //OBSERVABLE -  GROUP INFO
  private groupInfoBehaviourSubject: BehaviorSubject<any | null>;
  public groupInfo: Observable<any | null>;

  constructor(private http: HttpClient) {
    this.groupsListBehaviourSubject =
      new BehaviorSubject<Array<GroupCreationModel> | null>(
        JSON.parse(<string>localStorage.getItem('groupsArray'))
      );
    this.groupsList = this.groupsListBehaviourSubject.asObservable();

    this.groupIDBehaviourSubject = new BehaviorSubject<string | null>(
      JSON.parse(<string>localStorage.getItem('groupID'))
    );
    this.groupID = this.groupIDBehaviourSubject.asObservable();

    this.groupInfoBehaviourSubject = new BehaviorSubject<any | null>(
      JSON.parse(<string>localStorage.getItem('groupInfo'))
    );
    this.groupInfo = this.groupInfoBehaviourSubject.asObservable();
  }

  /* GROUP CREATION - POST */
  performGroupCreation(entry: GroupCreationModel): Observable<any> {
    let url = `${environment.BASE_URL}/groups`;
    return this.http.post<GroupCreationModel>(url, entry).pipe(
      map((apireturn) => {
        this.groupIDBehaviourSubject.next(apireturn.id);
        return apireturn
      })
    );
  }

  getUserInfo(id: string): Observable<any> {
    let url = `${environment.BASE_URL}/user-data/${id}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        console.log(response);
        this.groupsListBehaviourSubject.next(response.groups);

        if (localStorage.getItem('groupID') == null && response.groups > 0) {
          this.groupIDBehaviourSubject.next(response.groups[0].id);
        }

        return response;
      })
    );
  }

  updateGroupId(id: string): Observable<any> {
    localStorage.setItem('groupID', id);
    this.groupIDBehaviourSubject.next(id);
    return this.groupID;
  }

  updateListOfGroups(groups: any): Observable<any> {
    localStorage.setItem('groupsArray', groups);
    this.groupsListBehaviourSubject.next(groups);
    return this.groupID;
  }

  getGroupInfo(id: string): Observable<any> {
    let url = `${environment.BASE_URL}/groups/${id}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        this.groupInfoBehaviourSubject.next(response);
        return response;
      })
    );
  }

  performAddUserToGroup(entry: GroupUserActionModel): Observable<any> {
    let url = `${environment.BASE_URL}/groups/add-user`;
    return this.http.post<GroupUserActionModel>(url, entry);
  }

  performDeleteUserFromGroup(entry: GroupUserActionModel): Observable<any> {
    let url = `${environment.BASE_URL}/groups/delete-user`;
    return this.http.post<GroupUserActionModel>(url, entry);
  }

  // performDeleteGroup(entry: GroupUserActionModel) {
  //   let url = `${environment.BASE_URL}/groups`;
  //   // const options = {
  //   //   body: {
  //   //     entry
  //   //   }
  //   // }
  //   return this.http.delete<GroupUserActionModel>(url, entry);
  // }

  performLogoutFromGroups(): Observable<any> {
    localStorage.removeItem('groupID');
    localStorage.removeItem('groupsArray');
    localStorage.removeItem('groupInfo');
    this.groupIDBehaviourSubject.next(null);
    this.groupsListBehaviourSubject.next(null);
    this.groupInfoBehaviourSubject.next(null);
    return this.groupID;
  }
}
