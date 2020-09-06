import { TestBed } from '@angular/core/testing';

import { ProprietairesService } from './proprietaires.service';

describe('ProprietairesService', () => {
  let service: ProprietairesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProprietairesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
