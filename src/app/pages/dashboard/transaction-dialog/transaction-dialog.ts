import { Component, Input, OnInit, Output } from '@angular/core';
import { Transaction } from '../../../shared/transaction-data';
import { FormsModule } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-transaction-dialog',
  imports: [FormsModule, CommonModule],
  templateUrl: './transaction-dialog.html',
  styleUrl: './transaction-dialog.css',
})
export class TransactionDialog implements OnInit {
  @Input({ required: true }) initialTransaction!: Transaction;
  @Input({ required: true }) showModal = false;
  @Input({ required: true }) isEditing = false;

  //output
  @Output() cancelDialog = new EventEmitter();

  // get form(): Transaction {
  //   return this.initialTransaction!;
  // }

  // reset form
  // form: Transaction = this.emptyForm();

  // emptyForm(): Transaction {
  //   return {
  //     id: 0,
  //     type: 'income',
  //     category: '',
  //     amount: 0,
  //     date: new Date().toISOString().split('T')[0],
  //     note: '',
  //   };
  // }

  ngOnInit(): void {
    console.log(this.initialTransaction);
    console.log(this.showModal);
    console.log(this.isEditing);
  }

  onCancel() {
    this.cancelDialog.emit();
  }
}
