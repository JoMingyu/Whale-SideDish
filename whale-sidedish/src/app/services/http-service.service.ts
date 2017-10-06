import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class HttpServiceService {
  private schoolUrl: string = "http://52.79.134.200:5959/school-search?key=";

  constructor(private http: Http) { 
  }
  
  //Get Schools
  getSchools(keyword: string){
    return this.http.get(`${this.schoolUrl}${keyword}`);
  }
}
