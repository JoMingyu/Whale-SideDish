import { Component, OnInit } from '@angular/core';

import { SearchComponent } from '../search/search.component';
import { HttpServiceService } from '../services/http-service.service';
import { Meal } from '../model/meal.model';
import { InitialComponent } from '../initial/initial.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [SearchComponent]
})
export class MainComponent implements OnInit {
  public initialInstance: InitialComponent;
  public meals : Object[] = Meal.singleton().meals;

  public month: string;
  public date: string;

  public days: string[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  public day: string;

  constructor(public school: SearchComponent, 
    private httpService: HttpServiceService,
    initialInstance: InitialComponent) {

    this.initialInstance = initialInstance;
  }

  ngOnInit() {
    let today = new Date();
    this.month = (today.getMonth() + 1).toString();
    this.date = today.getDate().toString();
    this.day = this.days[today.getDay()];
  }

  goToPrevious(){
    this.initialInstance.NavigationStackCount--;
  }  
}
