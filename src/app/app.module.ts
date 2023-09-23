import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddKeyInterceptor } from './interceptor/add-key-interceptor.interceptor';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { LeagueStandingComponent } from './components/league-standing/league-standing.component';
import { TeamFixtureComponent } from './components/team-fixture/team-fixture.component';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
 
    HeaderComponent,
    LeagueStandingComponent,
    TeamFixtureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [{ 
      provide: HTTP_INTERCEPTORS, useClass: AddKeyInterceptor , multi:true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
