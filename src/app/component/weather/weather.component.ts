import {Component} from '@angular/core';
import {WeatherService} from '../../service/weather/weather.service';
import {AnotherWeatherService} from '../../service/another/another-weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent {
  private city: string;
  private country: string;
  private result: string;

  classNames: any = {
    cold: false,
    hot: false,
    normal: false
  };

  constructor(private weatherService: WeatherService,
              private anotherWeatherService: AnotherWeatherService) {
  }


  getWeather() {
    // this.anotherWeatherService.getWeather(this.country, this.city, (response) => {
    //   this.updateResult(response);
    // });

    this.anotherWeatherService.getWeather(this.country, this.city, (response) => {
      this.updateResult(response);
    });
  }

  getClassNames() {
    return this.classNames;
  }

  private updateResult(response: string) {
    this.defaultClassNames();
    this.result = response;
    this.setClassName(parseFloat(response));
  }

  private defaultClassNames(): void {

    for (const className in this.classNames) {
      if (this.classNames.hasOwnProperty(className)) {
        this.classNames[className] = false;
      }
    }

  }

  private setClassName(temp): void {
    if (temp <= -10) {
      this.classNames.cold = true;
    } else if (temp >= 20) {
      this.classNames.hot = true;
    } else {
      this.classNames.normal = true;
    }
  }


}
