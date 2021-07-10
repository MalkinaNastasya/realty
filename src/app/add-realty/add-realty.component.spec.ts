import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRealtyComponent } from './add-realty.component';

describe('AddRealtyComponent', () => {
  let component: AddRealtyComponent;
  let fixture: ComponentFixture<AddRealtyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRealtyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRealtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
