import { TestBed } from '@angular/core/testing';

import { AddNewApplicationDialogService } from './add-new-application-dialog.service';

describe('AddNewApplicationDialogService', () => {
  let service: AddNewApplicationDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddNewApplicationDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
