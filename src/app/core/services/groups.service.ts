import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { GroupCreationModel } from '../models/groupCreation.model';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {


  constructor(private http: HttpClient) { }

  performGroupCreation(entry: GroupCreationModel): Observable<any> {
    let url =  `${environment.BASE_URL}/groups`;
    console.log(entry)
    return this.http.post<GroupCreationModel>(url, entry)
  }


}
