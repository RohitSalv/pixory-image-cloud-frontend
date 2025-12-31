import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseCases } from './use-cases';

describe('UseCases', () => {
  let component: UseCases;
  let fixture: ComponentFixture<UseCases>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UseCases]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UseCases);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
