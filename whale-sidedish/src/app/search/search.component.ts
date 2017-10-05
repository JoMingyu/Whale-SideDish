import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @ViewChild('search') search : ElementRef;
  constructor() { }

  ngOnInit() {
  }

  searchSchoolWithButton(event: any){
    this.search.nativeElement.classList.add("loading");
  }

  searchSchoolWithKey(event: any){
    if(event == 13)
      this.search.nativeElement.classList.add("loading");
  }
}
