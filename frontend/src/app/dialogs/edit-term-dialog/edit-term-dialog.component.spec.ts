import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTermDialogComponent } from './edit-term-dialog.component';

describe('EditTermDialogComponent', () => {
  let component: EditTermDialogComponent;
  let fixture: ComponentFixture<EditTermDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTermDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTermDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
