import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaGastosComponent } from './categoria-gastos.component';

describe('CategoriaGastosComponent', () => {
  let component: CategoriaGastosComponent;
  let fixture: ComponentFixture<CategoriaGastosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaGastosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
