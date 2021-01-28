import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheIndicacaoComponent } from './detalhe-indicacao.component';

describe('DetalheIndicacaoComponent', () => {
  let component: DetalheIndicacaoComponent;
  let fixture: ComponentFixture<DetalheIndicacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalheIndicacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheIndicacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
