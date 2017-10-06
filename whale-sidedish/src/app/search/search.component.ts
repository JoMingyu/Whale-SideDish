import { Component, OnInit, ViewChild, ElementRef, Injectable, NgModule } from '@angular/core';
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

  @ViewChild('search') search: ElementRef;

  constructor(initialInstance: InitialComponent, private httpService: HttpServiceService) {
    this.initialInstance = initialInstance;

    this.httpService.getSchools("대덕").subscribe(
      data => console.log(data.json()),
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
    if (event == 13)
      this.search.nativeElement.classList.add("loading");

    this.initialInstance.NavigationStackCount++;
  }
}