import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FootballappService } from '../../services/footballapp.service';
import { teamFixtures } from '../../interfaces/teamfixtures';
import { CommonChecksService } from '../../services/common-checks.service';

@Component({
  selector: 'app-team-fixture',
  templateUrl: './team-fixture.component.html',
  styleUrls: ['./team-fixture.component.css']
})
export class TeamFixtureComponent implements OnInit {
  teamfixtures: teamFixtures[];
  loading: boolean;
  errorMessage: string = '';
  teamId: string;
  leagueId: string;

  constructor(
    private footballappService: FootballappService,
    private route: ActivatedRoute,
    private commonCheckService: CommonChecksService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.route.paramMap.subscribe((params) => {
      this.leagueId = params.get('leagueId')!;
      this.teamId = params.get('teamId')!;
    });

    if (this.commonCheckService.isNotNull(this.leagueId)) {
      this.footballappService
        .getfixtures(this.leagueId, this.teamId)
        .subscribe((data) => {
          this.loading = false;
          this.teamfixtures = data['response'];
         
          
        });
    }
  }
}
