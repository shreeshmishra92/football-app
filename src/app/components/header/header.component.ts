import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CountryData } from '../../interfaces/countryData';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input()
  topLeagueCountries: CountryData[];
  @Input()
  currentActiveCountry: string;
  @Output('getCountriesData') getCountriesData = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  emitCountriesEvent(country: CountryData) {
    this.getCountriesData.emit(country);
  }
}
