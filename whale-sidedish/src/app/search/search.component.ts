import { Component, OnInit, ViewChild, ViewChildren, ElementRef, Injectable, NgModule, QueryList } from '@angular/core';
import { Http, Headers } from '@angular/http'
import { InitialComponent } from '../initial/initial.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpServiceService } from '../services/http-service.service';
import { MainComponent } from '../main/main.component';

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

    //아 ㅜㅜㅜ 이러고 싶지 않은데 :(
    let svgs = document.getElementsByClassName('check');

    for(let i = 0; i < svgs.length; i++)
      svgs[i].classList.remove('visible');

    this.currentSchool = this.schools[index];
    svgs[index].classList.add('visible');
  }

  showMeal(event: Event){
    this.initialInstance.NavigationStackCount++;

    //new Date().toISOString().slice(0,10)
    var data = this.httpService.getMeals(
      this.currentSchool.code, 
      "2017-10-11")
      .subscribe(
        data => {
          if(data.status == 205){
            console.log("서버에 정보가 없습니다")
          }
          else if(data.status == 204){
           console.log('parse error');
          }
          else{
            console.log(data.json());
          }
        },
        error => console.log('parse error'),
        () => {}
      );
  }
}