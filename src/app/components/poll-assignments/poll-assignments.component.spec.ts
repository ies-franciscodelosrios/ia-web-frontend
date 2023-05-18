import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollAssignmentsComponent } from './poll-assignments.component';

describe('PollAssignmentsComponent', () => {
  let component: PollAssignmentsComponent;
  let fixture: ComponentFixture<PollAssignmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollAssignmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
