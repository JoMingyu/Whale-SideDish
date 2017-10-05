import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InitialComponent } from './initial/initial.component';
import { SearchComponent } from './search/search.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    InitialComponent,
    SearchComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
