import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from '../../../shared/transaction-data';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-transaction-dialog',
  imports: [FormsModule],
  templateUrl: './transaction-dialog.html',
  styleUrl: './transaction-dialog.css',
})
export class TransactionDialog implements OnInit {
  @Input() initialTransaction: Transaction[] = [];
  @Input() showModal = false;
  @Input() isEditing = false;

  ngOnInit(): void {
    console.log(this.initialTransaction);
    console.log(this.showModal);
    console.log(this.isEditing);
  }
}
