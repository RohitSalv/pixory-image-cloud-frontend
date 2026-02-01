import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Search } from './search';
import { SearchService } from '../../services/search.service';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('Search', () => {
  let component: Search;
  let fixture: ComponentFixture<Search>;
  let searchServiceMock: any;
  let authServiceMock: any;

  beforeEach(async () => {
    searchServiceMock = {
      searchFiles: jasmine.createSpy('searchFiles')
    };
    authServiceMock = {
      getAuthHeaders: jasmine.createSpy('getAuthHeaders'),
      isAuthenticated: jasmine.createSpy('isAuthenticated').and.returnValue(false),
      isAuthenticated$: of(false)
    };

    await TestBed.configureTestingModule({
      imports: [Search, HttpClientTestingModule, NoopAnimationsModule, RouterTestingModule],
      providers: [
        { provide: SearchService, useValue: searchServiceMock },
        { provide: AuthService, useValue: authServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Search);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
