import {Component, Input} from '@angular/core';
import {WeatherService} from '../../service/weather/weather.service';
import {DarkskyWeatherService} from '../../service/darksky/darksky-weather.service';



@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent {
  private city: string;
  private country: string;
  private result: string;

  private enableSend = true;


  @Input()
  classNames: any = {
    cold: false,
    hot: false,
    normal: false
  };


  changeService = 'openWeather';

  constructor(
    private weatherService: WeatherService,
    private anotherWeatherService: DarkskyWeatherService) {
  }


  getWeather() {
    if (this.enableSend) {
      this.enableSend = false;
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

  private updateResult(response: string) {
    this.defaultClassNames();
    
    if (response !== '404') {
      this.result = response;
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
