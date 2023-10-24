// Реализуйте функцию applyTransactions и типы Transaction, Wallet. applyTransactions должна принимать аргумент типа Wallet и возвращать число,
// после применения всех транзакций к количеству денег на счету. В случае ошибки в одной из транзакций должно вернуться изначальное число, последующие транзакции не обрабатываются.

// const wallet: Wallet = {
//   transactions: [
//     {
//       apply: (amount) => amount + 1,
//     },
//   ],
//   balance: 0
// }
 
// console.log(applyTransactions(wallet)) // 1

type Transaction = {
  apply: (amount: number) => number
};

type Wallet = {
  transactions: Transaction[],
  balance: number
};

function applyTransactions(wallet: Wallet): number {
  try {
    const { balance, transactions } = wallet;
    let newBalance = balance;
    transactions.forEach(({ apply }) => {
      newBalance = apply(newBalance);
    });
    return newBalance;
  } catch {
    return wallet.balance;
  }
}

export type { Transaction, Wallet };
export default applyTransactions;

/* __tests__ */

import * as ta from 'type-assertions';
import applyTransactions, { Transaction, Wallet } from '../solution';

test('applyTransactions', () => {
  const wallet: Wallet = {
    balance: 100,
    transactions: [
      {
        apply: (amount: number) => amount + 10,
      },
      {
        apply: (amount: number) => amount - 20,
      },
      {
        apply: (amount: number) => amount + 30,
      },
    ],
  };

  expect(applyTransactions(wallet)).toBe(120);
  expect(wallet.balance).toBe(100);

  const wallet2: Wallet = {
    balance: 10,
    transactions: [
      {
        apply: (amount: number) => amount + 10,
      },
      {
        apply: () => {
          throw new Error('Error');
        },
      },
      {
        apply: (amount: number) => amount + 30,
      },
    ],
  };

  expect(applyTransactions(wallet2)).toBe(10);

  ta.assert<ta.Equal<Parameters<Transaction['apply']>, [number]>>();
});
