import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLanguageDialogComponent } from './edit-language-dialog.component';

describe('TextDialogComponent', () => {
  let component: EditLanguageDialogComponent;
  let fixture: ComponentFixture<EditLanguageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLanguageDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLanguageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
