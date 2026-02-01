import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDashboard } from './app-dashboard';

describe('AppDashboard', () => {
  let component: AppDashboard;
  let fixture: ComponentFixture<AppDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
