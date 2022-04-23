import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    console.log('Añadida');
    return this.http.post<TaskCreationModel>(url, entry);
  }

  getTasksList(): Observable<any> {
    let url = `${environment.BASE_URL}/tasks`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        console.log(response);
        return response;
      })
    );
  }

  performEditTask(id: string, entry: any): Observable<any> {
    let url = `${environment.BASE_URL}/tasks/${id}`;
    return this.http.put(url, entry);
  }

  performDeleteTask(id: number): Observable<any> {
    let url = `${environment.BASE_URL}/task/delete-task/?id=${id}`;
    return this.http.post(url, '');
  }
}
