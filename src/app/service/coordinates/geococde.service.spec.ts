import { TestBed } from '@angular/core/testing';

import { GeococdeService } from './geococde.service';

describe('GeococdeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeococdeService = TestBed.get(GeococdeService);
    expect(service).toBeTruthy();
  });
});
