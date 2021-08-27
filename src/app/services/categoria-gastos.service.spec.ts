import { TestBed } from '@angular/core/testing';

import { CategoriaGastosService } from './categoria-gastos.service';

describe('CategoriaGastosService', () => {
  let service: CategoriaGastosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaGastosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
