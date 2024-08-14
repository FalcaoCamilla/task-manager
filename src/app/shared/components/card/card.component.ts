import { Component, Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { taskStatus, taskIcons } from '../../../pages/dashboard/constants';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CardModule, CommonModule, FontAwesomeModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  @Input() cardDataEntrie: any;

  protected taskStatus: {[key: string]: string} = taskStatus;
  protected taskIcons: {[key: string]: IconDefinition} = taskIcons;

  ngOnInit(): void {
    console.log(this.cardDataEntrie)
  }
}
