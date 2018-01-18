// Core modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
// Style modules
import { MDBBootstrapModule } from 'angular-bootstrap-md';
// Components
import { AppComponent } from './app.component';
import { KfCheckInComponent } from './components/kf-check-in/kf-check-in.component';

//
//
@NgModule({
  declarations: [
    AppComponent,
    KfCheckInComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot()
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
