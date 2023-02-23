import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseradmindashboardComponent } from './useradmindashboard.component';

describe('UseradmindashboardComponent', () => {
  let component: UseradmindashboardComponent;
  let fixture: ComponentFixture<UseradmindashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseradmindashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseradmindashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
