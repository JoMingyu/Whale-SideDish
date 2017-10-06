import { Component, OnInit } from '@angular/core';

import { SearchComponent } from '../search/search.component';
import { HttpServiceService } from '../services/http-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [SearchComponent]
})
export class MainComponent implements OnInit {
  public meals = [
    {
      "time" : "아침",
      "content" : "시래기된장국, 돼지고기산적, 매운맛당면김말이, 케찹, 석박지, 도시락김, 보리밥"
    },
    {
      "time" : "아침",
      "content" : "시래기된장국, 돼지고기산적, 매운맛당면김말이, 케찹, 석박지, 도시락김, 보리밥"
    },
    {
      "time" : "아침",
      "content" : "시래기된장국, 돼지고기산적, 매운맛당면김말이, 케찹, 석박지, 도시락김, 보리밥"
    }];

  constructor(public school: SearchComponent, private httpService: HttpServiceService) { 
    
  }

  ngOnInit() {
  }

  showMeal(){
    var data = this.httpService.getMeals(
      this.school.currentSchool.code, 
      new Date().toISOString().slice(0,10)); 

    console.log(data);
  }
}
