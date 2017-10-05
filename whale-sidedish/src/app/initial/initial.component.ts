import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.css']
})
export class InitialComponent{
  public isSink: boolean = false;
  public isHide: boolean = false;

  @ViewChild('registerLabel') registerLabel : ElementRef
  @ViewChild('lowerArrow') lowerArrow : ElementRef
  @ViewChild('img') image : ElementRef

  constructor(elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }

  addSink(){
    this.isSink = true;
  }

  removeSink(){
    this.isSink = false;
  }

  hideSection(){
    this.isHide = true;
  }
}
