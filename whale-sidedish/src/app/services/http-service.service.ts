import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class HttpServiceService {
  private schoolUrl: string = "http://52.79.134.200:5959/school-search?key=";

  constructor(private http: Http) { 
  }
  
  //Get Schools
  getSchools(keyword: string){
    let t0 = performance.now();
    let result = this.http.get(`${this.schoolUrl}${keyword}`);
    let t1 = performance.now();
    console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
    return this.http.get(`${this.schoolUrl}${keyword}`);
  }

  //Get Meals
  getMeals(code: string, date: string){
    return this.http.get(`http://52.79.134.200:5959/meal/${code}?date=${date}`);
  }
}