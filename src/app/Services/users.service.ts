import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = environment.API_URL;
  private user : any = '';
  private headers : any = '';

  constructor(private http: HttpClient) { 
    this.user = JSON.parse(localStorage.getItem('user'));
    this.headers = new HttpHeaders({ 'x-access-token' : this.user['data']['token'] });  
  }

  public getUsers()
  {
    return this.http.get(`${this.url}/getAllUsers/${this.user['data']['_id']}`);
  }

  public addUser(data: any = {})
  {
    var obj = {
      name : data.name,
      address : data.address,
      email : data.email,
      password : data.password
    }
    return this.http.post(`${this.url}/addUser/${this.user['data']['_id']}`,obj);
  }

  public getUserById(id : any)
  {
    return this.http.get(`${this.url}/getUserById/${id}`);
  }

  public editUser(data:any,id : any,)
  {
    return this.http.post(`${this.url}/editUser/${id}`,data);
  }

  public deleteUser(id : any,)
  {
    return this.http.get(`${this.url}/deleteUser/${id}`);
  }
}
