import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDetailPageComponent } from './patient-detail-page.component';

describe('PatientDetailPageComponent', () => {
  let component: PatientDetailPageComponent;
  let fixture: ComponentFixture<PatientDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientDetailPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
