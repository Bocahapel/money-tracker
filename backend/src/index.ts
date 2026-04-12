import express from 'express';
import cors from 'cors';
import mainTransactionRoutes from './routes/mainTransactions';

const app = express();
const PORT = process.env['PORT'] || 3000;

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

app.use('/api/transactions/main-transactions', mainTransactionRoutes);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
