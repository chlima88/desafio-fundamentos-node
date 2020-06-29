import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import Balance from '../models/Balance';

interface TransactionsHistory {
  transactions: Transaction[];
  balance: Balance;
}

class GetStatementService {
  private transactionsRepository = new TransactionsRepository();

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): TransactionsHistory {
    const balance = this.transactionsRepository.getBalance();
    const transactions = this.transactionsRepository.all();

    return { balance, transactions };
  }
}

export default GetStatementService;
