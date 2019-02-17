import { TestBed } from '@angular/core/testing';

import { AnotherWeatherService } from './another-weather.service';

describe('AnotherWeatherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnotherWeatherService = TestBed.get(AnotherWeatherService);
    expect(service).toBeTruthy();
  });
});
