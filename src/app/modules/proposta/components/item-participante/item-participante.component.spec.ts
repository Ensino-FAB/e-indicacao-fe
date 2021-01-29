import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemParticipanteComponent } from './item-participante.component';

describe('ItemParticipanteComponent', () => {
  let component: ItemParticipanteComponent;
  let fixture: ComponentFixture<ItemParticipanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemParticipanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
