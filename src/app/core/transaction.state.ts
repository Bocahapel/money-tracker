import { Injectable, signal, computed } from '@angular/core';
import { Transaction } from '../shared/transaction-data';

@Injectable({ providedIn: 'root' })
export class TransactionState {
  private _transactions = signal<Transaction[]>([]);
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);

  readonly transactions = this._transactions.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  readonly totalIncome = computed(() =>
    this._transactions()
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0),
  );

  readonly totalExpense = computed(() =>
    this._transactions()
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0),
  );

  readonly balance = computed(() => this.totalIncome() - this.totalExpense());

  setTransactions(data: Transaction[]) {
    this._transactions.set(data);
  }
  setLoading(val: boolean) {
    this._loading.set(val);
  }
  setError(msg: string | null) {
    this._error.set(msg);
  }

  addTransaction(t: Transaction) {
    this._transactions.update((prev) => [...prev, t]);
  }

  updateTransaction(updated: Transaction) {
    this._transactions.update((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  }

  removeTransaction(id: number) {
    this._transactions.update((prev) => prev.filter((t) => t.id !== id));
  }
}
