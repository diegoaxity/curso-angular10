import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deberia sumar dos numeros 1 y 2, y regresar como resultado 3', () => {
    const res = service.suma(1, 3);
    expect(res).toBe(4);
  });

  it('profile 1 debe ser rojo', () => {
    const res = service.getUserColor(1);
    expect(res).toBe('rojo');
  });

  it('profile 2 debe ser azul', () => {
    const res = service.getUserColor(2);
    expect(res).toBe('azul');
  });

  it('profile 3 debe ser verde', () => {
    const res = service.getUserColor(3);
    expect(res).toBe('verde');
  });

  it('profile 10 debe ser vacio', () => {
    const res = service.getUserColor(10);
    expect(res).toBe('');
  });

  it('validar set message', () => {
    service.getMessage().subscribe(msg => {
      expect(msg).toBe('hola');
    });

    service.setMessage('hola');
  });

  it('validar token', () => {
    sessionStorage.clear();
    let token = service.getToken();
    expect(token).toBeNull();
    service.setToken('12345');
    token = service.getToken();
    expect(token).toBe('12345');
  });

  it('user is not auth', () => {
    sessionStorage.clear();
    const res = service.userIsAuthenticated();
    expect(res).toBeFalsy();
  });

  it('user is auth', () => {
    sessionStorage.clear();
    service.setToken('12345');
    const res = service.userIsAuthenticated();
    expect(res).toBeTruthy();
  });

  it('validar loading', () => {
    service.getLoading().subscribe(res => {
      expect(res).toBeTruthy();
    });

    service.setLoading(true);
  });

  it('validar loading false', () => {
    service.getLoading().subscribe(res => {
      expect(res).toBeFalsy();
    });

    service.setLoading(false);
  });
});
