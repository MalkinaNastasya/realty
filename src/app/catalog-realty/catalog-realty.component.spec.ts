import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogRealtyComponent } from './catalog-realty.component';

describe('CatalogRealtyComponent', () => {
  let component: CatalogRealtyComponent;
  let fixture: ComponentFixture<CatalogRealtyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogRealtyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogRealtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
