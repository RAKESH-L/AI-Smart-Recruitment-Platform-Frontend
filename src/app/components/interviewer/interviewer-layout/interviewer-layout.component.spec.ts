import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewerLayoutComponent } from './interviewer-layout.component';

describe('InterviewerLayoutComponent', () => {
  let component: InterviewerLayoutComponent;
  let fixture: ComponentFixture<InterviewerLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterviewerLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InterviewerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
