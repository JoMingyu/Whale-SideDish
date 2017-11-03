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

  private isFinished: boolean = false;

  public static test: boolean = false;

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
    this.isFinished = true;
  }

  searchSchoolWithKey(event: KeyboardEvent) {
    if (event.keyCode == 13) {
      this.search.nativeElement.classList.add("loading");
      this.schools = {};
      this.parseSchools(this.keyword.nativeElement.value);
      this.search.nativeElement.classList.remove("loading");
      this.isFinished = true;
    }
  }

  selectSchool(school: any) {
    let index = this.schools.indexOf(school);

    let svgs = document.getElementsByClassName('check');

    for (let i = 0; i < svgs.length; i++)
      svgs[i].classList.remove('visible');

    Meal.singleton().currentSchool = this.schools[index];
    svgs[index].classList.add('visible');
  }

  showMeal(event: Event) {
    this.initialInstance.NavigationStackCount--;
    this.httpService.parseMeal(new Date());
    Meal.isMain = true;
  }

  searchFinished(){
    return { 'display': this.isFinished ? 'inline' : 'none' };
  }
}