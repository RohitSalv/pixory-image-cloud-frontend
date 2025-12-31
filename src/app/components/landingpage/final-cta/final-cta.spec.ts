import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalCTA } from './final-cta';

describe('FinalCTA', () => {
  let component: FinalCTA;
  let fixture: ComponentFixture<FinalCTA>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalCTA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalCTA);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
