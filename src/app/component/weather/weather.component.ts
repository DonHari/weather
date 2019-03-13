import {Component, Input, OnInit} from '@angular/core';
import {WeatherService} from '../../service/weather/weather.service';
import {DarkskyWeatherService} from '../../service/darksky/darksky-weather.service';
import {FormControl} from "@angular/forms";
import {interval, Observable} from "rxjs";
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

  private currentGradVal1 = 6;
  private currentGradVal2 = 12;

  styleNames: any = {
    background: 'linear-gradient(to bottom, hsl(' + this.currentGradVal1 + ' ,96%,42%) 0%, hsl(' + this.currentGradVal2 + ', 100%,55%) 100%)'
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
    console.log(this.styleNames);
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


  getStyles() {
    return this.styleNames;
  }

  private updateResult(response: any) {
    if (response.status !== 0 ) {
      console.log('result', typeof parseFloat(response).toFixed(0));
      this.result = parseFloat(response).toFixed(0);
      this.setStylesName(parseFloat(response));
    } else {
      this.result = 'Error happened, try again later';
    }
    this.enableSend = true;
  }

  private calcValues(val1, val2){
    return val1 - val2;
  }


  private intervalSetStyles(val1, val2){
    let maxIteratorSteps = 20;
    let step1 = +(this.calcValues(this.currentGradVal1, val1) / maxIteratorSteps).toFixed(0);
    let step2 = +(this.calcValues(this.currentGradVal2, val2) / maxIteratorSteps).toFixed(0);

    let currentInterval = setInterval(() => {


    if (step1 < 0){
      this.currentGradVal1 = this.currentGradVal1 + Math.abs(step1);
      this.currentGradVal2 = this.currentGradVal2 + Math.abs(step2);

      if (this.currentGradVal1 >= val1 || this.currentGradVal2 >= val2){
        this.currentGradVal1 = val1;
        this.currentGradVal2 = val2;
        clearInterval(currentInterval);
      }
    }
    else{
      this.currentGradVal1 = this.currentGradVal1 - Math.abs(step1);
      this.currentGradVal2 = this.currentGradVal2 - Math.abs(step2);

      if (this.currentGradVal1 <= val1 || this.currentGradVal2 <= val2){
        this.currentGradVal1 = val1;
        this.currentGradVal2 = val2;
        clearInterval(currentInterval);
      }
    }
      this.setStyles();

    }, 50);
  }

  private setStyles(){
    this.styleNames = {
      background: 'linear-gradient(to bottom, hsl(' + this.currentGradVal1 + ' ,96%,42%) 0%, hsl(' + this.currentGradVal2 + ', 100%,55%) 100%)'
    };
  }


  private setStylesName(temp): void {
    if (temp <= 0) {
      this.intervalSetStyles(195, 210);
    } else if (temp >= 25) {
      this.intervalSetStyles(330, 345);
    } else {
      this.intervalSetStyles(30, 45);
    }
  }

}
