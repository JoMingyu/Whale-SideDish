import { Component, OnInit } from '@angular/core';

import { SearchComponent } from '../search/search.component';
import { HttpServiceService } from '../services/http-service.service';
import { Meal } from '../model/meal.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [SearchComponent]
})
export class MainComponent implements OnInit {
  public meals : Object[] = Meal.singleton().meals;

  constructor(public school: SearchComponent, 
    private httpService: HttpServiceService) {
  }

  ngOnInit() {
  }
}
