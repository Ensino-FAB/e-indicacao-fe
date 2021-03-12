import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadosComponent } from './indicados.component';

describe('IndicadosComponent', () => {
  let component: IndicadosComponent;
  let fixture: ComponentFixture<IndicadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
