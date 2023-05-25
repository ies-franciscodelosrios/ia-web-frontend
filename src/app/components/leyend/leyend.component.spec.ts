import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeyendComponent } from './leyend.component';

describe('LeyendComponent', () => {
  let component: LeyendComponent;
  let fixture: ComponentFixture<LeyendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeyendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeyendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
