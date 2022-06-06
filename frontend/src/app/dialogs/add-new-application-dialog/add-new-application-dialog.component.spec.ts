import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewApplicationDialogComponent } from './add-new-application-dialog.component';

describe('AddNewApplicationDialogComponent', () => {
  let component: AddNewApplicationDialogComponent;
  let fixture: ComponentFixture<AddNewApplicationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewApplicationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewApplicationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
