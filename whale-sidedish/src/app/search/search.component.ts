import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { InitialComponent } from '../initial/initial.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public initialInstance: InitialComponent;

  @ViewChild('search') search: ElementRef;

  constructor(initialInstance: InitialComponent) {
    this.initialInstance = initialInstance;
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
