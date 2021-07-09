import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRealtorsComponent } from './list-realtors.component';

describe('ListRealtorsComponent', () => {
  let component: ListRealtorsComponent;
  let fixture: ComponentFixture<ListRealtorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRealtorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRealtorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
