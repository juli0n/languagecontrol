import { TestBed } from '@angular/core/testing';

import { TermusageService } from './termusage.service';

describe('TermusageService', () => {
  let service: TermusageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TermusageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
