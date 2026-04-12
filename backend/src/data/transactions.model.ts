export interface Transaction {
  id: number;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  date: string;
  note: string;
}
