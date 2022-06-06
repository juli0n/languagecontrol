import { TestBed } from '@angular/core/testing';

import { EditLanguageDialogService } from './edit-language-dialog.service';

describe('TextDialogService', () => {
  let service: EditLanguageDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditLanguageDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
