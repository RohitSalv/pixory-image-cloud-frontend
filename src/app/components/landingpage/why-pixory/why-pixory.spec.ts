import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyPixory } from './why-pixory';

describe('WhyPixory', () => {
  let component: WhyPixory;
  let fixture: ComponentFixture<WhyPixory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhyPixory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhyPixory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
