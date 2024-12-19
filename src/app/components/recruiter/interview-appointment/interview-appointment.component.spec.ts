import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewAppointmentComponent } from './interview-appointment.component';

describe('InterviewAppointmentComponent', () => {
  let component: InterviewAppointmentComponent;
  let fixture: ComponentFixture<InterviewAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterviewAppointmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InterviewAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
