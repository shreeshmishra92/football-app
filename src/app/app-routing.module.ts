import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamFixtureComponent } from './components/team-fixture/team-fixture.component';
import { LeagueStandingComponent } from './components/league-standing/league-standing.component';

const routes: Routes = [
  {
    path: '',
    component: LeagueStandingComponent,
  },
  {
    path: 'teamFixture/:leagueId/:teamId',
    component: TeamFixtureComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
