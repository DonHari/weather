import {Component, ViewChild} from '@angular/core';
import {WeatherComponent} from './component/weather/weather.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'weather-app';

  @ViewChild(WeatherComponent)
  weatherBlock: WeatherComponent;

  getCurrentClassNames() {
    return this.weatherBlock.getClassNames();
  }

}

