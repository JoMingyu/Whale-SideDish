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
  @ViewChild('search') search: ElementRef;
  @ViewChild('keyword') keyword: ElementRef;

  constructor(initialInstance: InitialComponent, private httpService: HttpServiceService) {
    this.initialInstance = initialInstance;
  }

  ngOnInit() {
  }

  parseSchools(text: string) {
    this.httpService.getSchools(text).subscribe(
      data => {
        this.schools = data.json();
      },
      error => console.log('parse error'),
      () => { }
    );
  }

  searchSchoolWithButton(event: MouseEvent) {
    this.search.nativeElement.classList.add("loading");
    this.schools = {};
    this.parseSchools(this.keyword.nativeElement.value);
    this.search.nativeElement.classList.remove("loading");
  }

  searchSchoolWithKey(event: KeyboardEvent) {
    if (event.keyCode == 13) {
      this.search.nativeElement.classList.add("loading");
      this.schools = {};
      this.parseSchools(this.keyword.nativeElement.value);
      this.search.nativeElement.classList.remove("loading");
    }
  }

  selectSchool(school: any) {
    let index = this.schools.indexOf(school);

    let svgs = document.getElementsByClassName('check');

    for (let i = 0; i < svgs.length; i++)
      svgs[i].classList.remove('visible');

    this.currentSchool = this.schools[index];
    svgs[index].classList.add('visible');
  }

  showMeal(event: Event) {
    this.initialInstance.NavigationStackCount--;
    this.parseMeal();
    Meal.isMain = true;
  }

  parseMeal() {
    let start = performance.now();

    this.httpService.getMeals(this.currentSchool.code, new Date().toISOString().slice(0, 10))
      .subscribe(
      data => {
        if (data.status == 205) {
          console.log('reload meal');
          setTimeout(this.parseMeal(), 2000);
        }
        else if (data.status == 204) {
          console.log('success but no information');
          setTimeout(this.parseMeal(), 2000);
        }
        else {
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
      () => { }
      );
    let end = performance.now();
    console.log("Call to doSomething took " + (end - start) + " milliseconds.");
  }
}