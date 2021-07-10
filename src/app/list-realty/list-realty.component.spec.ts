import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRealtyComponent } from './list-realty.component';

describe('ListRealtyComponent', () => {
  let component: ListRealtyComponent;
  let fixture: ComponentFixture<ListRealtyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRealtyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRealtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
