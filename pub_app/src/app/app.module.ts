import { UsersService } from "./providers/users.service";
import { LoginService } from "./providers/login.service";
import { LandingComponent } from "./components/landing/landing.component";
// Core modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Style modules
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// Components
import { AppComponent } from './app.component';
import { KfCheckInComponent } from './components/kf-check-in/kf-check-in.component';
import { FormsModule } from '@angular/forms';

import { KfTabComponent } from './components/kf-tab/kf-tab.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
import { KfIconLink } from './components/kf-icon-link/kf-icon-link.component';
import { ChatComponent } from './components/chat/chat.component';
@NgModule({
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ]
})
export class DemoMaterialModule {}

const appRoutes: Routes = [
  { path: 'landing', component: LandingComponent},
  { path: '', component: KfTabComponent},
  { path: 'chat', component: ChatComponent},
  { path: 'check-in', component: KfCheckInComponent}
]
//
//
@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    KfCheckInComponent,
    KfTabComponent,
    KfIconLink,
    ChatComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    DemoMaterialModule,
    BrowserAnimationsModule,
      FormsModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [LoginService, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
