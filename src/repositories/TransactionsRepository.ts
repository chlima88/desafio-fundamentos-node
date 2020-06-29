import Transaction from '../models/Transaction';
import Balance from '../models/Balance';

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .map(transaction =>
        transaction.type === 'income' ? transaction.value : 0,
      )
      .reduce((sum, currentValue) => sum + currentValue, 0);

    const outcome = this.transactions
      .map(transaction =>
        transaction.type === 'outcome' ? transaction.value : 0,
      )
      .reduce((sum, currentValue) => sum + currentValue, 0);

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create(transaction: Transaction): Transaction {
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
