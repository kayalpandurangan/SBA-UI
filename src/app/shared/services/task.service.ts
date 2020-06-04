import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { catchError } from 'rxjs/operators';

import { Task } from '../models/Task';
import { ParentTask } from '../models/Parent-Task';
import { Observable, of } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
}) 
export class TaskService {

  private rootUrl = "http://localhost:8081"+"/task";

  private rootParentUrl = "http://localhost:8081"+"/parentTask";

  public task = null;
  public editTaskFlag = false;

  constructor(private http: HttpClient) { }

  createTask (task: Task): Observable<void> {
    let addUrl = this.rootUrl + "/addTask";
    return this.http.post<any>(addUrl, task,{ headers: new HttpHeaders({ responseType: 'text' })}).pipe(
      catchError(this.handleError('addTask'))
    );
  }

  getParentTasks(): Observable<ParentTask[]>{
	return this.http.get<ParentTask[]>(this.rootParentUrl+"/viewParentTask")
      .pipe(catchError(this.handleError('getParentTask', []))
      );
  }

  getTasksByProjectId(id: number): Observable<Task[]>{
  return this.http.get<Task[]>(this.rootUrl+"/project/"+id)
      .pipe( catchError(this.handleError('getTasksbyid', []))
      );
  }

  updateTask (task: Task): Observable<any> {
    return this.http.put(this.rootUrl + "/updateTask", task, httpOptions).pipe(
      catchError(this.handleError<any>('updateTask'))
    );
  }

  endTask (task: Task): Observable<any> {
    return this.http.put(this.rootUrl + "/endTask", task, httpOptions).pipe(
      catchError(this.handleError<any>('endTask'))
    );
  }

  getTaskDetails(): Observable<Task[]>{
	return this.http.get<Task[]>(this.rootUrl+"/viewTask")
      .pipe(
        catchError(this.handleError('getTasks', []))
      );
  }

  deleteTask(TaskId: number): any {

    const url = this.rootUrl+"/task/" + TaskId;

   return this.http.delete<any>(url, httpOptions).pipe(
     catchError(this.handleError<any>('deleteTask'))
   );
 }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };

  }

}
