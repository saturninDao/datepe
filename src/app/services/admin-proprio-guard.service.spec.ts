import { TestBed } from '@angular/core/testing';

import { AdminProprioGuardService } from './admin-proprio-guard.service';

describe('AdminProprioGuardService', () => {
  let service: AdminProprioGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminProprioGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
