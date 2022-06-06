import { TestBed } from '@angular/core/testing';

import { AddTermToApplicationService } from './add-term-to-application.service';

describe('AddTermToApplicationService', () => {
  let service: AddTermToApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddTermToApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
