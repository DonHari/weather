import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {WeatherComponent} from './component/weather/weather.component';
import {WeatherService} from './service/weather/weather.service';
import {GeocodeService} from './service/coordinates/geocode.service';
import { LoaderComponent } from './component/loader/loader.component';
import {HttpRequestService} from "./service/request/http-request.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule, MatFormFieldModule, MatInputModule} from "@angular/material";

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
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  providers: [WeatherService, HttpClient, GeocodeService, HttpRequestService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
