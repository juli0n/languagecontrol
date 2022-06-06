import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermusageComponent } from './termusage.component';

describe('TermusageComponent', () => {
  let component: TermusageComponent;
  let fixture: ComponentFixture<TermusageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermusageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermusageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
