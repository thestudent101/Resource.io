import { TestBed } from '@angular/core/testing';

import { ContractorProfileRepositoryService } from './contractor-profile-repository.service';

describe('ContractorProfileRepositoryService', () => {
  let service: ContractorProfileRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(ContractorProfileRepositoryService);
  });

});
