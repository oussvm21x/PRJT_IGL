import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class PatientService {
  
  private apiUrl = 'http://localhost:3000/patients'; 

  constructor(private http: HttpClient) {}

  getPatients(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addPatient(patient: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, patient);
  }

  deletePatient(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
  

  updatePatient(patient: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${patient.nss}`, patient);
  }
  

  getPatient(nss: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((patients) => patients.find((patient) => patient.nss === nss))
    );
  }
  
}