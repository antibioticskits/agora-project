import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ExperimentsComponent } from './components/experiments/experiments.component';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { HttpModule } from '@angular/http';



@NgModule({
  imports:      [ BrowserModule, DragulaModule, HttpModule],
  declarations: [ AppComponent, ExperimentsComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
