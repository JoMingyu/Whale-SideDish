import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'

import { AppComponent } from './app.component';
import { InitialComponent } from './initial/initial.component';
import { SearchComponent } from './search/search.component';
import { MainComponent } from './main/main.component';
import { HttpServiceService } from './services/http-service.service';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    InitialComponent,
    SearchComponent,
    MainComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [HttpServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
