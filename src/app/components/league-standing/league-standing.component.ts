import { Component, OnInit } from '@angular/core';
import { FootballappService } from '../../services/footballapp.service';
import { CountryData } from '../../interfaces/countryData';
import { leagueStandings } from '../../interfaces/Leaguestandings';
import { TopEuropeanLeagues, StandingsConst } from '../../../assets/constant';
import { CommonChecksService } from '../../services/common-checks.service';

@Component({
  selector: 'app-league-standing',
  templateUrl: './league-standing.component.html',
  styleUrls: ['./league-standing.component.css']
})
export class LeagueStandingComponent implements OnInit {
  allcountriesList: CountryData[] = [];
  selectedCountryName: string;
  leagueId: number;
  errorMessage = '';
  standingsList: leagueStandings[] = [];
  selectedCountry: CountryData;
loading:boolean=false;
  readonly STANDING_CONSTANT = StandingsConst;
  currentSeason: string = (new Date().getFullYear()).toString();

  constructor(
    private footballappService: FootballappService,
    private commonChecksService: CommonChecksService
  ) { }

  ngOnInit(): void {
    let countrySelected = JSON.parse(sessionStorage.getItem('selectedCountry') || '[]');
    if (this.commonChecksService.isNotNullOrUndefined(countrySelected)) {
      this.selectedCountryName = countrySelected.name;
         this.getLeagueId(countrySelected);
    }
    this.getLeagueCountries();
  }

  getLeagueCountries() {
    let allcountries = JSON.parse(sessionStorage.getItem('countries') || 'null');
    if (this.commonChecksService.isPopulatedArray(allcountries)) {
      this.allcountriesList = allcountries;
    } else {

      this.footballappService.getCountries().subscribe((data) => {
        if (this.commonChecksService.isPopulatedArray(data['response'])) {
          this.allcountriesList = data['response'].filter((country: CountryData) => {
            return Object.keys(TopEuropeanLeagues).indexOf(country.name) !== -1;
          });
          sessionStorage.setItem('countries', JSON.stringify(this.allcountriesList));
          this.getLeagueId(this.allcountriesList[0]);
        } else {
          this.errorMessage = data['errors']?.requests;
        }
      });
    }
  }


  getSelectedCountryData(country: CountryData) {
   
    this.selectedCountryName = country.name;
    this.selectedCountry = country;
    this.getLeagueId(country);
  }


  getLeagueId(country: CountryData) {

this.loading=true;
    sessionStorage.setItem('selectedCountry', JSON.stringify(country));
    let leagueName = TopEuropeanLeagues[country.name];
    this.footballappService
      .getLeaguesId(country.code, this.currentSeason, leagueName, country.name)
      .subscribe((data) => {
        if (this.commonChecksService.isPopulatedArray(data['response'])) {
          this.leagueId = data['response'][0]?.league.id;
          this.getStandings((this.leagueId).toString(), this.currentSeason);
        } else {
          this.errorMessage = data['errors']?.requests;
        }
      });
  }


  getStandings(leagueId: string, currentSeason: string) {

    this.footballappService
      .getStandings(leagueId, currentSeason)
      .subscribe((data) => {
        this.loading=false;
        if (this.commonChecksService.isPopulatedArray(data['response'])) {
          this.standingsList =
            data['response'][0]?.league?.standings[0];
         
        }
      });
  }
}

