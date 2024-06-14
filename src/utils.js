function addTransaction(transaction) {
    transactions.push(transaction);
}

function calculateTotals() {
    let income = 0;
    let expense = 0;
    transactions.forEach(transaction => {
        if (transaction.category === 'income') {
            income += transaction.amount;
        } else {
            expense += transaction.amount;
        }
    });
    return { income, expense };
}


module.exports = { addTransaction, calculateTotals };