import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { mainRoute } from './main.routes';
import { TestComponent } from 'src/modules/Test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(mainRoute),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
