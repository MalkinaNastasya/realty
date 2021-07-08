import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationRealtorComponent } from './registration-realtor.component';

describe('RegistrationRealtorComponent', () => {
  let component: RegistrationRealtorComponent;
  let fixture: ComponentFixture<RegistrationRealtorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationRealtorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationRealtorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
