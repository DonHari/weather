import {Component, Input, OnInit} from '@angular/core';
import {WeatherService} from '../../service/weather/weather.service';
import {DarkskyWeatherService} from '../../service/darksky/darksky-weather.service';
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";



@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  cityControl = new FormControl();
  countryControl = new FormControl();
  cities: string[] = ['Dnipro', 'Kyiv', 'Lviv', 'Odessa', 'NY', 'LA', 'California', 'Ottawa'];
  countries: string[] = ['Ukraine', 'USA', 'Canada'];
  filteredCityOptions: Observable<string[]>;
  filteredCountryOptions: Observable<string[]>;


  private city = 'Dnipro';
  private country = 'UA';
  private result: string;
  private enableSend = true;

  @Input()
  classNames: any = {
    cold: false,
    hot: false,
    normal: false
  };

  showLoader = false;
  changeService = 'openWeather';

  ngOnInit(): void {
    localStorage.clear();

    this.filteredCityOptions = this.cityControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, this.cities))
      );

    this.filteredCountryOptions = this.countryControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, this.countries))
      );
  }

  constructor(
    private weatherService: WeatherService,
    private anotherWeatherService: DarkskyWeatherService) {
  }


  private _filter(value: string, array): string[] {
    const filterValue = value.toLowerCase();
    
    return array.filter(option => option.toLowerCase().includes(filterValue));
  }
  
  private checkForNewData(value, array){
    if (array.indexOf(value) < 0){
        array.push(value);
    }
  }

  getWeather() {
    
    if (this.enableSend) {
      this.enableSend = false;
      this.checkForNewData(this.city, this.cities);
      this.checkForNewData(this.country, this.countries);
      switch (this.changeService) {
        case 'openWeather' : {
          this.weatherService.getWeather(this.country, this.city, (response) => {
            this.updateResult(response);
          });
          break;
        }
        case 'darkSky' : {
          this.anotherWeatherService.getWeather(this.country, this.city, (response) => {
            this.updateResult(response);
          });
          break;
        }
        default: {
          break;
        }
      }

    }
  }


  getClassNames() {
    return this.classNames;
  }

  private updateResult(response: any) {
    this.defaultClassNames();
    if (response.status !== 0 ) {
      console.log('result', typeof parseFloat(response).toFixed(0));
      this.result = parseFloat(response).toFixed(0);
      this.setClassName(parseFloat(response));
    } else {
      this.result = 'Error happened, try again later';
    }
    this.enableSend = true;
  }


  private defaultClassNames(): void {

    for (const className in this.classNames) {
      if (this.classNames.hasOwnProperty(className)) {
        this.classNames[className] = false;
      }
    }

  }

  private setClassName(temp): void {
    if (temp <= 0) {
      this.classNames.cold = true;
    } else if (temp >= 25) {
      this.classNames.hot = true;
    } else {
      this.classNames.normal = true;
    }
  }


}
