import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {WeatherComponent} from './component/weather/weather.component';
import {WeatherService} from './service/weather/weather.service';
import {GeococdeService} from './service/coordinates/geococde.service';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [WeatherService, HttpClient, GeococdeService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
