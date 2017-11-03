import { Component, OnInit, ViewChild, ElementRef, ComponentFactoryResolver, Injector, ApplicationRef, ViewContainerRef, EmbeddedViewRef, ComponentFactory } from '@angular/core';

import { SearchComponent } from '../search/search.component';
import { HttpServiceService } from '../services/http-service.service';
import { Meal } from '../model/meal.model';
import { InitialComponent } from '../initial/initial.component';
import { CardComponent } from '../card/card.component';

export enum Direction{
  Yesterday = 0,
  Today = 1,
  Tomorrow = 2
};

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [SearchComponent],
  entryComponents: [CardComponent]
})

export class MainComponent implements OnInit {
  public initialInstance: InitialComponent;
  public meals : Object[] = Meal.singleton().meals;

  public month: string;
  public date: string;

  public days: string[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  public day: string;

  public isMain: boolean = false;

  private currentDate: Date = new Date();
  private currentDirection : number = 0;

  private factory: ComponentFactory<CardComponent>;

  @ViewChild('elMonth') elMonth : ElementRef;
  @ViewChild('dateDay') elDateDay : ElementRef;
  @ViewChild('cardContainer') cardContainer: ElementRef;

  @ViewChild('cards', { read : ViewContainerRef }) cards : ViewContainerRef;

  constructor(public school: SearchComponent, 
    private httpService: HttpServiceService,
    initialInstance: InitialComponent,
    private resolver: ComponentFactoryResolver,
    private injector: Injector,) {
    this.initialInstance = initialInstance;
    this.factory = this.resolver.resolveComponentFactory(CardComponent);
  }

  ngOnInit() {
    this.month = (this.currentDate.getMonth() + 1).toString();
    this.date = this.currentDate.getDate().toString();
    this.day = this.days[this.currentDate.getDay()];
  }

  goToPrevious(){
    this.initialInstance.NavigationStackCount++;
  }

  setStyles() {
    let styles = {
        'position': 'absolute', 
        'top': '0',
        'z-index': Meal.isMain ? '1' : '-1'
    };
    return styles;
  }

  showYesterday(){
    this.currentDate.setDate(this.currentDate.getDate() - 1);
    
    this.month = (this.currentDate.getMonth() + 1).toString();
    this.date = this.currentDate.getDate().toString();
    this.day = this.days[this.currentDate.getDay()];
    
    this.httpService.parseMeal(this.currentDate);

    // this.cards.createComponent(this.factory);
    // let container = this.cardContainer.nativeElement;
    
    // container.removeChild(container.children[1]);

    //this.currentDirection += 1/3;
  }

  showTomorrow(){
    this.currentDate.setDate(this.currentDate.getDate() + 1);
    
    this.month = (this.currentDate.getMonth() + 1).toString();
    this.date = this.currentDate.getDate().toString();
    this.day = this.days[this.currentDate.getDay()];
    
    this.httpService.parseMeal(this.currentDate);

    // this.cards.createComponent(this.factory);
    // let container = this.cardContainer.nativeElement;

    // container.removeChild(container.children[1]);

    //this.currentDirection -= 1/3;
  }

  setTransform(){
    return {'transform':`translate(${this.currentDirection*100}%, 15vh)`};
  }
}