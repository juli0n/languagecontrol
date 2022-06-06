import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTermToApplicationComponent } from './add-term-to-application.component';

describe('AddTermToApplicationComponent', () => {
  let component: AddTermToApplicationComponent;
  let fixture: ComponentFixture<AddTermToApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTermToApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTermToApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
