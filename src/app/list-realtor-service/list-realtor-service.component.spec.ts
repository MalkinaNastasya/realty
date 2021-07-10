import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRealtorServiceComponent } from './list-realtor-service.component';

describe('ListRealtorServiceComponent', () => {
  let component: ListRealtorServiceComponent;
  let fixture: ComponentFixture<ListRealtorServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRealtorServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRealtorServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
