import { Component, computed, inject, OnInit, signal } from '@angular/core';
// import { MOCK_TRANSACTIONS, Transaction } from '../../shared/transaction-data';
import { Transaction } from '../../shared/transaction-data';
import { NgClass, NgIf, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

//component
import { TransactionDialog } from './transaction-dialog/transaction-dialog';
import { SummaryCard } from '../../shared/summary-card/summary-card';
import { TransactionFacade } from '../../core/transaction.facade';

@Component({
  selector: 'app-dashboard',
  imports: [NgClass, NgIf, CurrencyPipe, DatePipe, FormsModule, TransactionDialog, SummaryCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  public facade = inject(TransactionFacade);

  readonly transactions = this.facade.transactions;
  readonly totalIncome = this.facade.totalIncome;
  readonly totalExpense = this.facade.totalExpense;
  readonly balance = this.facade.balance;
  readonly loading = this.facade.loading;

  todayDate = new Date();

  // Modal state
  showModal = false;
  showDelModal = false;
  isEditing = false;
  deletingId: number | null = null;
  form: Transaction = this.emptyForm();

  ngOnInit(): void {
    this.facade.loadAll();
    console.log(this.transactions);
  }

  emptyForm(): Transaction {
    return {
      id: 0,
      type: 'income',
      category: '',
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      source: '',
      note: '',
    };
  }

  openAdd() {
    this.isEditing = false;
    this.form = this.emptyForm();
    this.showModal = true;
  }

  openEdit(tx: Transaction) {
    this.isEditing = true;
    this.form = { ...tx };
    this.showModal = true;
  }

  save(form: Transaction) {
    if (!form.category || !form.amount || !form.date) return;

    if (this.isEditing) {
      this.facade.update(form.id, form);
    } else {
      const { id, ...newTransaction } = form;
      this.facade.create(newTransaction);
    }
    this.showModal = false;
  }

  onCancel() {
    this.showModal = false;
  }

  openDelete(id: number) {
    this.deletingId = id;
    this.showDelModal = true;
  }

  confirmDelete() {
    if (this.deletingId !== null) {
      this.facade.delete(this.deletingId);
    }
    this.showDelModal = false;
    this.deletingId = null;
  }
}
