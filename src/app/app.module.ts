import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {WeatherComponent} from './component/weather/weather.component';
import {WeatherService} from './service/weather/weather.service';
import {GeocodeService} from './service/coordinates/geocode.service';
import { LoaderComponent } from './component/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [WeatherService, HttpClient, GeocodeService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
