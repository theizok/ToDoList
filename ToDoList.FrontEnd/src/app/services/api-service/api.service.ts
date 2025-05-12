import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  
})
export class ApiService {
  private apiUrl = 'https://localhost:7169/api/';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}Auth/login`, { email, password });
  };

  add(assignment: any): Observable<any> {
    console.log(assignment);
    const token = localStorage.getItem('jwt');
    if (!token) {
      console.log('No hay token JWT disponible.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.apiUrl}assignment`, assignment, { headers });
  }

  get(): Observable<any[]> {
    const token = localStorage.getItem('jwt');
    if (!token) {
      console.log('No hay token JWT disponible.');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>(`${this.apiUrl}assignment`, { headers });
  }

  delete(id: number): Observable<any> {
    const token = localStorage.getItem('jwt');
    if (!token) {
      console.log('No hay token JWT disponible.');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<any>(`${this.apiUrl}assignment/${id}`, { headers });
  }

  update(assignment: any, id: number): Observable<any> {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put(`${this.apiUrl}assignment/${id}`, assignment, { headers });
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}Auth/register`,user);
  }

}
