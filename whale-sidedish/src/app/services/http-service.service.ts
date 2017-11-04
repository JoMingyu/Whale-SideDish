import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, BaseRequestOptions, RequestOptionsArgs} from '@angular/http';
import { Meal } from '../model/meal.model';

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

  parseMeal(date: Date) {
    let start = performance.now();

    let code = localStorage.getItem('code');
    this.getMeals(code, date.toISOString().slice(0, 10))
      .subscribe(
      data => {
        if (data.status == 205) {
          console.log('reload meal');
          this.parseMeal(date);
        }
        else if (data.status == 204) {
          console.log('success but no information');
          this.parseMeal(date);
        }
        else {
          let pattern = /\[|\]|\'/g;

          let breakfast = (data.json().breakfast as string).replace(pattern, '');
          let lunch = (data.json().lunch as string).replace(pattern, '');
          let dinner = (data.json().dinner as string).replace(pattern, '');

          Meal.singleton().meals = [];

          Meal.singleton().meals.push(breakfast);
          Meal.singleton().meals.push(lunch);
          Meal.singleton().meals.push(dinner);
        }
      },
      error => console.log('parse error')
      );
    let end = performance.now();
    console.log("Call to doSomething took " + (end - start) + " milliseconds.");
  }
}