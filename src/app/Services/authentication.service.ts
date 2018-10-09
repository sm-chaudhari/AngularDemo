import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private url = environment.API_URL;
  constructor(private http: HttpClient) { }

  login(data:any)
  {
    return this.http.post(`${this.url}/login`,data);
  }
}
