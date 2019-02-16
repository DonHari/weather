import {Component, OnInit} from '@angular/core';
import {WeatherService} from "../../service/weather/weather.service";
import {AnotherWeatherService} from "../another/another-weather.service";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  private city: string;
  private country: string;
  private result: string;

  constructor(private weatherService: WeatherService,
              private anotherWeatherService: AnotherWeatherService) {
  }

  ngOnInit() {
  }

  getWeather() {
    this.anotherWeatherService.getWeather(this.country, this.city, (response) => {
      this.updateResult(response);
    });
    // this.weatherService.getWeather(this.country, this.city, (response) => {
    //   this.updateResult(response);
    // });
  }

  private updateResult(response: string) {
    this.result = response;
  }


}
