import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UseCases } from './use-cases';

describe('UseCases', () => {
  let component: UseCases;
  let fixture: ComponentFixture<UseCases>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UseCases, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UseCases);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
