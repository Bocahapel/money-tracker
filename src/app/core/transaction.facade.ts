import { inject, Injectable } from '@angular/core';
import { TransactionApiService } from './transaction-api.service';
import { TransactionState } from './transaction.state';
import { Transaction } from '../shared/transaction-data';

@Injectable({ providedIn: 'root' })
export class TransactionFacade {
  private state = inject(TransactionState);
  private api = inject(TransactionApiService);

  readonly transactions = this.state.transactions;
  readonly loading = this.state.loading;
  readonly error = this.state.error;
  readonly totalIncome = this.state.totalIncome;
  readonly totalExpense = this.state.totalExpense;
  readonly balance = this.state.balance;

  loadAll() {
    this.state.setLoading(true);
    this.api.getAll().subscribe({
      next: (data) => {
        this.state.setTransactions(data);
        this.state.setLoading(false);
      },
      error: (err) => {
        this.state.setError(err.message);
        this.state.setLoading(false);
      },
    });
  }

  create(transaction: Omit<Transaction, 'id'>) {
    this.state.setLoading(true);
    this.api.create(transaction).subscribe({
      next: (newTransaction) => {
        this.state.addTransaction(newTransaction);
        this.state.setLoading(false);
      },
      error: (err) => {
        this.state.setError(err.message);
        this.state.setLoading(false);
      },
    });
  }

  update(id: number, transaction: Partial<Transaction>) {
    this.state.setLoading(true);
    this.api.update(id, transaction).subscribe({
      next: (updated) => {
        this.state.updateTransaction(updated);
        this.state.setLoading(false);
      },
      error: (err) => {
        this.state.setError(err.message);
        this.state.setLoading(false);
      },
    });
  }

  delete(id: number) {
    this.state.setLoading(true);
    this.api.delete(id).subscribe({
      next: () => {
        this.state.removeTransaction(id);
        this.state.setLoading(false);
      },
      error: (err) => {
        this.state.setError(err.message);
        this.state.setLoading(false);
      },
    });
  }
}
