import { TestBed } from '@angular/core/testing';

import { DarkskyWeatherService } from './darksky-weather.service';

describe('DarkskyWeatherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DarkskyWeatherService = TestBed.get(DarkskyWeatherService);
    expect(service).toBeTruthy();
  });
});
