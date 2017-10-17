import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, BaseRequestOptions, RequestOptionsArgs} from '@angular/http';

@Injectable()
export class HttpServiceService extends BaseRequestOptions{
  constructor(private http: Http) { 
    super();
    this.headers.set('Content-Type', 'application/json');
  }
  
  //Get Schools
  getSchools(keyword: string){
    let start = performance.now();
    let result = this.http.get(`http://52.79.134.200:5959/school-search?key=${keyword}`);
    let end = performance.now();
    console.log("Call to doSomething took " + (end - start) + " milliseconds.")
    return result;
  }

  //Get Meals
  getMeals(code: string, date: string){
    return this.http.get(`http://52.79.134.200:5959/meal/${code}?date=${date}`);
  }
}