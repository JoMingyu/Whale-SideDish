import { Component, OnInit, ViewChild, ViewChildren, ElementRef, Injectable, NgModule, QueryList } from '@angular/core';
import { Http, Headers } from '@angular/http'
import { InitialComponent } from '../initial/initial.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { HttpServiceService } from '../services/http-service.service';
import { MainComponent } from '../main/main.component';
import { Meal } from '../model/meal.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  public initialInstance: InitialComponent;
  public schools: any;
  public currentSchool: any;

  @ViewChild('check') check: ElementRef;
  @ViewChildren('search') search: ElementRef;

  constructor(initialInstance: InitialComponent, private httpService: HttpServiceService) {
    this.initialInstance = initialInstance;

    this.httpService.getSchools("대덕").subscribe(
      data => {
        this.schools = data.json();
      },
      error => console.log('parse error'),
      () => {}
    );
  }

  ngOnInit() {
  }

  searchSchoolWithButton(event: any) {
    this.search.nativeElement.classList.add("loading");
  }

  searchSchoolWithKey(event: any) {
    if (event == 13)
      this.search.nativeElement.classList.add("loading");
  }

  selectSchool(school: any){
    let index = this.schools.indexOf(school);

    let svgs = document.getElementsByClassName('check');

    for(let i = 0; i < svgs.length; i++)
      svgs[i].classList.remove('visible');

    this.currentSchool = this.schools[index];
    svgs[index].classList.add('visible');
  }

  showMeal(event: Event){
    this.initialInstance.NavigationStackCount++;

    //new Date().toISOString().slice(0,10)
    this.httpService.getMeals(
      this.currentSchool.code, "2017-10-11")
    .subscribe(
      data => {
        if(data.status == 205){
          console.log("서버에 정보가 없습니다")
        }
        else if(data.status == 204){
          console.log('parse error');
        }
        else{
          let pattern = /\[|\]|\'/g;

          let breakfast = (data.json().breakfast as string).replace(pattern, '');
          let lunch = (data.json().lunch as string).replace(pattern, '');
          let dinner = (data.json().dinner as string).replace(pattern, '');

          Meal.singleton().meals.push(
            breakfast);

          Meal.singleton().meals.push(
            lunch);

          Meal.singleton().meals.push(
            dinner);
        }
      },
      error => console.log('parse error'),
      () => {}
    );
  }
}