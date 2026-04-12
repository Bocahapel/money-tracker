import { Router, Request, Response } from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import { Transaction } from '../data/transactions.model';

const router = Router();
const DB_PATH = join(__dirname, '../data/transactions.json');

const readDB = (): Transaction[] => JSON.parse(readFileSync(DB_PATH, 'utf-8'));

const writeDB = (data: Transaction[]) => writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

//for get all data
router.get('/get/all', (req: Request, res: Response) => {
  res.json(readDB());
});

//for future update (maybe) - get by id
router.get('/get/:id', (req: Request, res: Response) => {
  const transaction = readDB().find((t) => t.id === Number(req.params['id']));
  if (!transaction) res.status(404).json({ message: 'Not found' });
  else res.json(transaction);
});

//post new data
router.post('/create', (req: Request, res: Response) => {
  const data = readDB();
  const newTransaction: Transaction = {
    ...req.body,
    id: data.length ? Math.max(...data.map((t) => t.id)) + 1 : 1,
  };
  data.push(newTransaction);
  writeDB(data);
  res.status(201).json(newTransaction);
});

//put edit data
router.put('/update/:id', (req: Request, res: Response) => {
  const data = readDB();
  const index = data.findIndex((t) => t.id === Number(req.params['id']));
  if (index === -1) res.status(404).json({ message: 'Not found' });
  else {
    data[index] = { ...data[index], ...req.body, id: data[index].id };
    writeDB(data);
    res.json(data[index]);
  }
});

//delete data
router.delete('/delete/:id', (req: Request, res: Response) => {
  const data = readDB();
  const filtered = data.filter((t) => t.id !== Number(req.params['id']));
  if (filtered.length === data.length) res.status(404).json({ message: 'Not found' });
  else {
    writeDB(filtered);
    res.status(204).send();
  }
});

export default router;
