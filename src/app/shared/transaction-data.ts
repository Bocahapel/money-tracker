export interface Transaction {
  id: number;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  date: string;
  source: string;
  note: string;
}

// export const MOCK_TRANSACTIONS: Transaction[] = [
//   {
//     id: 1,
//     type: 'expense',
//     category: 'groceries',
//     amount: 150000,
//     date: '2026-03-25',
//     note: 'Weekly shopping',
//   },
//   {
//     id: 2,
//     type: 'income',
//     category: 'salary',
//     amount: 1500000,
//     date: '2026-03-20',
//     note: 'March salary',
//   },
// ];
