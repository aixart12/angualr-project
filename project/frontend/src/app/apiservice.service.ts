import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';import { Observable } from 'rxjs';
 '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor( private _http:HttpClient) { }

  // connect fontend to backend

  // apiUrl = 'http://localhost:3000/user';

  getAllData():Observable<any>{
    return this._http.get('/user');
  }

  // create data

  createData(data:any):Observable<any>{
    console.log(data , 'createapi =>')
    return this._http.post('/user' , data);
  }


}
