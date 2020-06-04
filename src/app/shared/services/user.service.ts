import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/User';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private rootUrl = "http://localhost:8081"+"/user";
  private userUrl = this.rootUrl+"/viewUser";

 constructor(private http: HttpClient) { }


 getUserDetails (): Observable<User[]> {
     return this.http.get<User[]>(this.userUrl)
     .pipe(
       catchError(this.handleError('getUsers', []))
     );
 }



 /** POST: add a new user to the server */
 addUser (user: User): Observable<User> {

   var addUrl = this.rootUrl+"/addUser";

   return this.http.post<User>(addUrl, user, httpOptions);
  
 }

 deleteUser(userId: number): any {

    const url = this.rootUrl+"/deleteUser/" + userId;

   return this.http.delete<any>(url, httpOptions).pipe(
     catchError(this.handleError<any>('deleteuser'))
   );
 }

  /** PUT: update the user on the server */
 updateUser (user: User): Observable<User> {
   return this.http.put(this.rootUrl + "/updateUser", user, httpOptions).pipe(
     catchError(this.handleError<any>('updateUser'))
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


