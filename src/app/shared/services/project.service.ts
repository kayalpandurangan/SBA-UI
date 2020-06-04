import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { Project } from '../models/Project';
import { Observable, of } from 'rxjs';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private rootUrl = "http://localhost:8081"+"/project";

  constructor(private http: HttpClient) { }


   getProjectDeatils (): Observable<Project[]> {
      return this.http.get<Project[]>(this.rootUrl + "/viewProjects")
      .pipe(
        catchError(this.handleError('getProjectDeatils', []))
      );
  }

  createProject(project: Project): Observable<Project> {
    
    return this.http.post<Project>(this.rootUrl+"/addProject", project, httpOptions).pipe(
      catchError(this.handleError<Project>('addProject'))
    );
  }

  deleteProject(projectId: number): any {
    return this.http.delete<any>(this.rootUrl + "/deleteProject/"+projectId, httpOptions).pipe(
      catchError(this.handleError<any>('deleteproject'))
    );
  }

  updateProject (project: Project): Observable<any> {
    return this.http.put(this.rootUrl+"/updateProject", project, {responseType: 'text'}).pipe(
      catchError(this.handleError<any>('updateProject'))
    );
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      return of(result as T);
    };
 
  }

}
