import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogRealtorsComponent } from './catalog-realtors.component';

describe('CatalogRealtorsComponent', () => {
  let component: CatalogRealtorsComponent;
  let fixture: ComponentFixture<CatalogRealtorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogRealtorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogRealtorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
