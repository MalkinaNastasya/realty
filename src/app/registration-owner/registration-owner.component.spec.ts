import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationOwnerComponent } from './registration-owner.component';

describe('RegistrationOwnerComponent', () => {
  let component: RegistrationOwnerComponent;
  let fixture: ComponentFixture<RegistrationOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
