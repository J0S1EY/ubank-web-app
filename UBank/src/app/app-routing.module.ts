import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { DepositeComponent } from './dashboard/deposite/deposite.component';
import { SendmoneyComponent } from './dashboard/sendmoney/sendmoney.component';
import { CreditcardComponent } from './dashboard/creditcard/creditcard.component';
import { HistoryComponent } from './dashboard/history/history.component';
import { StatementComponent } from './dashboard/statement/statement.component';
import { EventsComponent } from './dashboard/events/events.component';
import { Page404Component } from './dashboard/page404/page404.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path:'', component:LoginComponent,
  },
  {
    path:'dashboard', component:DashboardComponent
  },
  {
    path:'register',component:RegisterComponent
  },
  {
    path:'sendmoney',component:SendmoneyComponent
  },
  {
   path:'deposit',component:DepositeComponent
  },
  {
    path:'creditcard',component:CreditcardComponent
  },
  {
    path:'history',component:HistoryComponent
  },
  {
    path:'statement',component:StatementComponent
  },
  {
    path:'events',component:EventsComponent
  },
  {
    path:'page404',component:Page404Component
  }, 
  {
    path:'**',component:PageNotFoundComponent
  }
 

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
