import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { DepositeComponent } from './dashboard/deposite/deposite.component';
import { SendmoneyComponent } from './dashboard/sendmoney/sendmoney.component';
import { CreditcardComponent } from './dashboard/creditcard/creditcard.component';
import { HistoryComponent } from './dashboard/history/history.component';
import { StatementComponent } from './dashboard/statement/statement.component';
import { DeleteacComponent } from './dashboard/deleteac/deleteac.component';
import { FilterPipe } from './pipes/filter.pipe';
import { EventsComponent } from './dashboard/events/events.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { Page404Component } from './dashboard/page404/page404.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';







@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    DepositeComponent,
    SendmoneyComponent,
    CreditcardComponent,
    HistoryComponent,
    StatementComponent,
    DeleteacComponent,
    FilterPipe,
    EventsComponent,
    Page404Component,
    PageNotFoundComponent,
   
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
   
 
   
    

    
    
   

  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
