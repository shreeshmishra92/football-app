import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GeneralConstant } from '../../assets/constant';
import { CountryData } from '../interfaces/countryData';
import { Observable } from 'rxjs';
import { leagueStandings } from '../interfaces/Leaguestandings';
import { teamFixtures } from '../interfaces/teamfixtures';

@Injectable({
  providedIn: 'root'
})
export class FootballappService {
  constructor(private http: HttpClient) {}

  getCountries(): Observable<CountryData> {
    return this.http.get<CountryData>(
      `${environment.API_HOST_URL}/teams/countries`
    );
  }

  getLeaguesId(
    countryCode: string,
    season: string,
    leagueName: string,
    countryName: string
  ): Observable<Object> {
    const params = new HttpParams()
      .set('code', countryCode)
      .set('season', season)
      .set('name', leagueName)
      .set('country', countryName);
    return this.http.get(`${environment.API_HOST_URL}/leagues`, {
      params: params,
    });
  }

  getStandings(leagueId: string, season: string): Observable<leagueStandings> {
    const params = new HttpParams()
      .set('league', leagueId)
      .set('season', season);
    return this.http.get<leagueStandings>(`${environment.API_HOST_URL}/standings`, {
      params: params,
    });
  }

  getfixtures(leagueId: string, teamId: string): Observable<teamFixtures> {
    const params = new HttpParams()
      .set('league', leagueId)
      .set('team', teamId)
      .set('last', GeneralConstant.TEN);
    return this.http.get<teamFixtures>(`${environment.API_HOST_URL}/fixtures`, {
      params: params,
    });
  }
}
