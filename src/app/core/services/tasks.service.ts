import { TaskCreationModel } from './../models/tasksCreation.model';
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
postTask(entry: TaskCreationModel): Observable<any>{
  let url = `${environment.BASE_URL}/tasks`;
  console.log("Añadida");
  return this.http.post<TaskCreationModel>(url, entry);  
}  
}

