import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { TaskCreationModel } from '../../models/tasksCreation.model';

const URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  performTaskCreation(entry: TaskCreationModel): Observable<any> {
    let url = `${environment.BASE_URL}/tasks`;
    return this.http.post<TaskCreationModel>(url, entry).pipe(
      map((response) => {
        console.log(response)
        return response;
      })
    );
  }

  getTasksList(groupID: string): Observable<any> {
    let url = `${environment.BASE_URL}/task-lists/${groupID}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        console.log(response)
        return response;
      })
    );
  }

  getUserTasksList(groupID: string, login:string): Observable<any> {
    let url = `${environment.BASE_URL}/task-lists-user/${groupID}/${login}`;
    return this.http.get<any>(url)
  }

  performEditTask( entry: any): Observable<any> {
    let url = `${environment.BASE_URL}/tasks/update-tasks`;
    return this.http.put(url, entry);
  }

  performDeleteTask(id: number): Observable<any> {
    let url = `${environment.BASE_URL}/task/delete-task/${id}`;
    console.log('borrada')
    return this.http.delete(url);
  }

  asignTaskToUser(){

  }
}
