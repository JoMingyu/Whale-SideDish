import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'

import { AppComponent } from './app.component';
import { InitialComponent } from './initial/initial.component';
import { SearchComponent } from './search/search.component';
import { MainComponent } from './main/main.component';
import { HttpServiceService } from './services/http-service.service';

@NgModule({
  declarations: [
    AppComponent,
    InitialComponent,
    SearchComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [HttpServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
