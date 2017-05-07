import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { BlockLibraryComponent } from './block-library.component';
import { BlockLibraryService } from './block-library.service';

@NgModule({ 
  imports:      [ BrowserModule ],
  declarations: [ 
    AppComponent,
    BlockLibraryComponent
],
  providers: [ BlockLibraryService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
