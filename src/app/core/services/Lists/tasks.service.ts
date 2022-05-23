import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { TaskCreationModel } from '../../models/tasksCreation.model';

const URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  //OBSERVABLE - TASKS
  private userTasksBehaviourSubject: BehaviorSubject<Array<any> | null>;
  public userTasks: Observable<Array<any> | null>;

  constructor(private http: HttpClient) {
    this.userTasksBehaviourSubject = new BehaviorSubject<Array<any> | null>(
      JSON.parse(<string>localStorage.getItem('userTasks'))
    );
    this.userTasks = this.userTasksBehaviourSubject.asObservable();
  }

  performTaskCreation(entry: TaskCreationModel): Observable<any> {
    let url = `${environment.BASE_URL}/tasks`;
    return this.http.post<TaskCreationModel>(url, entry).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getTasksList(groupID: string): Observable<any> {
    let url = `${environment.BASE_URL}/task-lists/${groupID}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getUserTasksList(groupID: string, login: string): Observable<any> {
    let url = `${environment.BASE_URL}/task-lists-user/${groupID}/${login}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        localStorage.setItem('userTasks', JSON.stringify(response));
        this.userTasksBehaviourSubject.next(response);
        return response;
      })
    );
  }

  performEditTask(entry: any): Observable<any> {
    let url = `${environment.BASE_URL}/tasks/update-tasks`;
    return this.http.put(url, entry);
  }

  performDeleteTask(id: number): Observable<any> {
    let url = `${environment.BASE_URL}/tasks/${id}`;

    return this.http.delete(url);
  }

  performCancelTask(entry: any) {
    let url = `${environment.BASE_URL}/tasks/cancel`;
    return this.http.put(url, entry);
  }

  asignTaskToUser() {}

  performLogoutFromTasks() {
    localStorage.removeItem('userTasks')
    this.userTasksBehaviourSubject.next(null);
  }
}
