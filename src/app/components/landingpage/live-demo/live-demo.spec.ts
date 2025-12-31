import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveDemo } from './live-demo';

describe('LiveDemo', () => {
  let component: LiveDemo;
  let fixture: ComponentFixture<LiveDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
