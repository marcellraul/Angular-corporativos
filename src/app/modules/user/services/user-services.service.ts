import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  api = environment.apiURL;
  options: any;
  
  constructor(private http: HttpClient) {
  }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    Authorization : `Bearer ${localStorage.getItem('tokenscloud')}`  
  });

  getCorporativos(): Observable<any> {
    return this.http.get<any>(this.api+'/corporativos' , {headers: this.headers} );
  }

  actCorporativo(data): Observable<any> {
    return this.http.put<any>(this.api+'/corporativos/'+data.id , data ,{headers: this.headers} );
  }
  
  getCorporativosById(id): Observable<any> {
    return this.http.get<any>(`${this.api}/corporativos/${id}`, {headers: this.headers} );
  }

  deleteContactById(id): Observable<any> {
    return this.http.delete<any>(`${this.api}/contactos/${id}`, {headers: this.headers} );
  }

  updateContactById(data): Observable<any> {
    return this.http.put<any>(`${this.api}/contactos/${data.id}`, data, {headers: this.headers} );
  }

  createContact(data): Observable<any> {
    return this.http.post<any>(`${this.api}/contactos`, data, {headers: this.headers} );
  }

}
