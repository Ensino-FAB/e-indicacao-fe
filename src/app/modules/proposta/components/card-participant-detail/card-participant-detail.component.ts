import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-participant-detail',
  templateUrl: './card-participant-detail.component.html',
  styleUrls: ['./card-participant-detail.component.scss']
})
export class CardParticipantDetailComponent implements OnInit {

  @Input() pessoaSelecionada: any;

  constructor() { }

  ngOnInit(): void {
  }

}
