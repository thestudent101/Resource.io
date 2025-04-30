import { TestBed } from '@angular/core/testing';

import { EndPointDataService } from './end-point-data.service';

describe('EndPointDataService', () => {
  let service: EndPointDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EndPointDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
