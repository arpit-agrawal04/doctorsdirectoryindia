import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookApointmentsComponent } from './book-apointments.component';

describe('BookApointmentsComponent', () => {
  let component: BookApointmentsComponent;
  let fixture: ComponentFixture<BookApointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookApointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookApointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
