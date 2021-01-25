import { Component, OnInit, Input } from '@angular/core';
import { Pessoa } from '../../../../models/pessoa.model';

@Component({
  selector: 'app-card-participant-detail',
  templateUrl: './card-participant-detail.component.html',
  styleUrls: ['./card-participant-detail.component.scss']
})
export class CardParticipantDetailComponent implements OnInit {

  @Input() pessoa: any;

  constructor() { }

  ngOnInit(): void {
  }

}
