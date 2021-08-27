import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasImpagasPagasComponent } from './ventas-impagas-pagas.component';

describe('VentasImpagasPagasComponent', () => {
  let component: VentasImpagasPagasComponent;
  let fixture: ComponentFixture<VentasImpagasPagasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentasImpagasPagasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasImpagasPagasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
