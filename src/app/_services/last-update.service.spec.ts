import { TestBed } from '@angular/core/testing';

import { LastUpdateService } from './last-update.service';

describe('LastUpdateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LastUpdateService = TestBed.get(LastUpdateService);
    expect(service).toBeTruthy();
  });
});
