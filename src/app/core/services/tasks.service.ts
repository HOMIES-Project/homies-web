import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(
    private http: HttpClient,
  ) { }


//POST AÑADIR OFERTAS pasando el token al header
postTask(taskUser:string, taskDescription: string, taskId: number): Observable<any>{
  const headers = {
    'Authorization': `Bearer`,
    'Content-Type': 'application/json',
}
  console.log("Añadida");
  return this.http.post(URL, {taskUser, taskDescription, taskId}, {headers});
}

}
