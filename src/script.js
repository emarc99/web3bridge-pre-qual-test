const { addTransaction, calculateTotals } = require('./utils');

document.addEventListener('DOMContentLoaded', function () {
    const transactionForm = document.getElementById('transaction-form');
    const transactionsList = document.getElementById('transactions-list');
    const incomeExpenseChartCtx = document.getElementById('incomeExpenseChart').getContext('2d');
    const resetButton = document.getElementById('reset-button');

    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    function updateLocalStorage() {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }


    function renderTransactions() {
        transactionsList.innerHTML = '';
        transactions.forEach(transaction => {
            const li = document.createElement('li');
            li.classList.add(transaction.category);
            li.innerHTML = `${transaction.description}: ${transaction.amount}`;
            transactionsList.appendChild(li);
        });
    }



    function updateChart() {
        const { income, expense } = calculateTotals();
        incomeExpenseChart.data.datasets[0].data = [income, expense];
        incomeExpenseChart.update();
    }

    transactionForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const category = document.getElementById('category').value;
        const transaction = { description, amount, category };
        transactions = addTransaction(transactions, transaction);
        updateLocalStorage();
        renderTransactions();
        updateChart();
        transactionForm.reset();
    });

    resetButton.addEventListener('click', function () {
        transactions = [];
        updateLocalStorage();
        renderTransactions();
        updateChart();
    });

    const incomeExpenseChart = new Chart(incomeExpenseChartCtx, {
        type: 'pie',
        data: {
            labels: ['Income', 'Expenses'],
            datasets: [{
                data: [0, 0],
                backgroundColor: ['#28a745', '#dc3545']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Income vs Expenses'
                }
            }
        }
    });

    renderTransactions();
    updateChart();
});