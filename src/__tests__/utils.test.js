const { addTransaction, calculateTotals } = require('./utils');

describe('Personal Finance Tracker Utils', () => {
    let transactions;

    beforeEach(() => {
        transactions = [];
    });

    test('addTransaction should add a transaction to the transactions array', () => {
        const transaction = { description: 'Salary', amount: 1000, category: 'income' };
        transactions = addTransaction(transactions, transaction);
        expect(transactions).toHaveLength(1);
        expect(transactions[0]).toEqual(transaction);
    });

    test('calculateTotals should correctly calculate income and expenses', () => {
        transactions = [
            { description: 'Salary', amount: 1000, category: 'income' },
            { description: 'Groceries', amount: 200, category: 'expense' },
            { description: 'Freelance', amount: 500, category: 'income' },
            { description: 'Rent', amount: 700, category: 'expense' },
        ];

        const totals = calculateTotals(transactions);
        expect(totals.income).toBe(1500);
        expect(totals.expense).toBe(900);
    });
});
