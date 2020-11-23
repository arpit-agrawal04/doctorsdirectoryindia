import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyHistoryReportsComponent } from './monthly-history-reports.component';

describe('MonthlyHistoryReportsComponent', () => {
  let component: MonthlyHistoryReportsComponent;
  let fixture: ComponentFixture<MonthlyHistoryReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyHistoryReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyHistoryReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
