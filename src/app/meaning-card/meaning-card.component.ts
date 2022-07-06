import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-meaning-card',
  templateUrl: './meaning-card.component.html',
  styleUrls: ['./meaning-card.component.scss']
})
export class MeaningCardComponent implements OnInit {
  @Input() meaning;

  constructor() { }

  ngOnInit(): void { }

}
