import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SoinsService {

  private apiUrl = 'http://localhost:3005/soins';

  constructor(private http: HttpClient) { }

  getSoins(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  addSoin(soin: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, soin);
  }
}
