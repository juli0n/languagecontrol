import { TestBed } from '@angular/core/testing';

import { EditTermDialogService } from './edit-term-dialog.service';

describe('EditTermDialogService', () => {
  let service: EditTermDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditTermDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
