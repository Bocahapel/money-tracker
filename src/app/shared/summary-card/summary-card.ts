import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-summary-card',
  imports: [CurrencyPipe],
  templateUrl: './summary-card.html',
  styleUrl: './summary-card.css',
})
export class SummaryCard {
  @Input() label: string = '';
  @Input() value: number = 0;
  @Input() variant: 'primary' | 'default' = 'default';
}
