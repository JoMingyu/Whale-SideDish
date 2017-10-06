import { Component, OnInit, ViewChild, ViewChildren, ElementRef, Injectable, NgModule, QueryList } from '@angular/core';
import { Http, Headers } from '@angular/http'
import { InitialComponent } from '../initial/initial.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpServiceService } from '../services/http-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})

export class SearchComponent implements OnInit {
  public initialInstance: InitialComponent;
  public schools: any;

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
    this.initialInstance.NavigationStackCount++;
  }

  searchSchoolWithKey(event: any) {
    if (event == 13){
      this.search.nativeElement.classList.add("loading");
      this.initialInstance.NavigationStackCount++;
    }
  }

  selectSchool(school: any){
    let index = this.schools.indexOf(school);

    //아 ㅜㅜㅜ 이러고 싶지 않은데 :(
    let svgs = document.getElementsByClassName('check');

    for(let i = 0; i < svgs.length; i++)
      svgs[i].classList.remove('visible');

    svgs[index].classList.add('visible');
  }
}