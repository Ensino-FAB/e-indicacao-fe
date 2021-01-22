import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardParticipantDetailComponent } from './card-participant-detail.component';

describe('CardParticipantDetailComponent', () => {
  let component: CardParticipantDetailComponent;
  let fixture: ComponentFixture<CardParticipantDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardParticipantDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardParticipantDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
