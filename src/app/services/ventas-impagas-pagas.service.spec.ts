import { TestBed } from '@angular/core/testing';

import { VentasImpagasPagasService } from './ventas-impagas-pagas.service';

describe('VentasImpagasPagasService', () => {
  let service: VentasImpagasPagasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VentasImpagasPagasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
