import { Component, computed, signal } from '@angular/core';
import { MOCK_TRANSACTIONS, Transaction } from '../../shared/transaction-data';
import { NgClass, NgIf, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

//prime
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dashboard',
  imports: [NgClass, NgIf, CurrencyPipe, DatePipe, FormsModule, ButtonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  transactions = signal<Transaction[]>(MOCK_TRANSACTIONS);

  totalIncome = computed(() =>
    this.transactions()
      .filter((t) => t.type === 'income')
      .reduce((s, t) => s + t.amount, 0),
  );
  totalExpense = computed(() =>
    this.transactions()
      .filter((t) => t.type === 'expense')
      .reduce((s, t) => s + t.amount, 0),
  );
  balance = computed(() => this.totalIncome() - this.totalExpense());

  // Modal state
  showModal = false;
  showDelModal = false;
  isEditing = false;
  deletingId: number | null = null;
  nextId = 3;

  form: Transaction = this.emptyForm();

  emptyForm(): Transaction {
    return {
      id: 0,
      type: 'income',
      category: '',
      amount: 0,
      date: new Date().toISOString().split('T')[0],
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

  save() {
    if (!this.form.category || !this.form.amount || !this.form.date) return;
    if (this.isEditing) {
      this.transactions.update((list) =>
        list.map((t) => (t.id === this.form.id ? { ...this.form } : t)),
      );
    } else {
      this.transactions.update((list) => [...list, { ...this.form, id: this.nextId++ }]);
    }
    this.showModal = false;
  }

  openDelete(id: number) {
    this.deletingId = id;
    this.showDelModal = true;
  }

  confirmDelete() {
    this.transactions.update((list) => list.filter((t) => t.id !== this.deletingId));
    this.showDelModal = false;
    this.deletingId = null;
  }
}
