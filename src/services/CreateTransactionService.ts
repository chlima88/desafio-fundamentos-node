import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}
class CreateTransactionService {
  private transactionsRepository = new TransactionsRepository();

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: RequestDTO): Transaction {
    if (type !== 'income' && type !== 'outcome') {
      throw Error('Invalid transaction type');
    }

    if (value <= 0) {
      throw Error(`Invalid value ${value} for transaction type ${type}`);
    }

    if (
      type === 'outcome' &&
      this.transactionsRepository.getBalance().total < value
    ) {
      throw Error('Invalid balance to outcome transaction');
    }

    const transaction = this.transactionsRepository.create(
      new Transaction({
        title,
        type,
        value,
      }),
    );

    return transaction;
  }
}

export default CreateTransactionService;
