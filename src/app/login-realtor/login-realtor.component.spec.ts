import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRealtorComponent } from './login-realtor.component';

describe('LoginRealtorComponent', () => {
  let component: LoginRealtorComponent;
  let fixture: ComponentFixture<LoginRealtorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginRealtorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRealtorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
