import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDraftComponent } from './job-draft.component';

describe('JobDraftComponent', () => {
  let component: JobDraftComponent;
  let fixture: ComponentFixture<JobDraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobDraftComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
