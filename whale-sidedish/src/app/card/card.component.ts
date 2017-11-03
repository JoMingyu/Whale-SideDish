import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MainComponent } from '../main/main.component';
import { Meal } from '../model/meal.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CardComponent implements OnInit {
  public meals : Object[] = Meal.singleton().meals;

  constructor() { }

  ngOnInit() {
  }

  getBreakfast(){
    this.meals = Meal.singleton().meals;
    return this.meals[0];
  }

  getLunch(){
    this.meals = Meal.singleton().meals;
    return this.meals[1];
  }

  getDinner(){
    this.meals = Meal.singleton().meals;
    return this.meals[2];
  }
}
