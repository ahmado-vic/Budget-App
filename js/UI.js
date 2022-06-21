export default class UI {
  constructor() {
    this.budgetFeedback = document.querySelector('.budget-feedback');
    this.expenseFeedback = document.querySelector('.expense-feedback');
    this.budgetForm = document.getElementById('budget-form');
    this.budgetInput = document.getElementById('budget-input');
    this.budgetAmount = document.getElementById('budget-amount');
    this.expenseAmount = document.getElementById('expense-amount');
    this.balance = document.getElementById('balance');
    this.balanceAmount = document.getElementById('balance-amount');
    this.expenseForm = document.getElementById('expense-form');
    this.expenseInput = document.getElementById('expense-input');
    this.amountInput = document.getElementById('amount-input');
    this.expenseList = document.getElementById('expense-list');
    this.singleExpense = document.getElementById('single-expense');
    this.BUDGET_LOCAL_STORAGE = 'BUDGET_LOCAL_STORAGE';
    this.EXPENSE_LOCAL_STORAGE = 'EXPENSE_LOCAL_STORAGE';
    this.storageBudget = UI.getValue(this.BUDGET_LOCAL_STORAGE) || 0;
    this.itemList = JSON.parse(UI.getValue(this.EXPENSE_LOCAL_STORAGE)) || [];
    this.init();
    this.calcBalance();
    this.expenseData();
  }
  //Initialize Budget and Expense Data.
  init() {
    let value = this.budgetInput.value;
    this.budgetAmount.textContent = this.storageBudget;
    this.balanceAmount.textContent = this.calcBalance();
    this.expenseAmount.textContent = this.expenses();
  }
  //Calculate Total Expenses
  expenses() {
    let expenses = JSON.parse(UI.getValue(this.EXPENSE_LOCAL_STORAGE)) || [];
    expenses = expenses.reduce((total, expense) => {
      return parseFloat(total) + parseFloat(expense.amount);
    }, 0);
    return expenses;
  }
  // Calculate Balance.
  calcBalance() {
    let budget = UI.getValue(this.BUDGET_LOCAL_STORAGE);
    let balance;
    balance = budget - this.expenses();
    return balance;
  }
  // Expense Template DOM.
  expenseData() {
    const expenseText = this.expenseInput.value;
    const value = this.amountInput.value;
    this.singleExpense.innerHTML = '';
    this.itemList.forEach(item => {
      this.singleExpense.insertAdjacentHTML(
        'beforeend',
        `
          <!-- single expense -->

          <div class="expense" data-id = ${item.id}>
          <div
            class="expense-item d-flex justify-content-between align-items-baseline"
          >
            <h6 class="expense-title mb-0 text-uppercase list-item">
              ${item.expense}
            </h6>
            <h5 class="expense-amount mb-0 list-item">$${item.amount}</h5>

            <div class="expense-icons list-item">
              <a
                href="#"
                class="edit-icon mx-2"
              >
                <i class="fas fa-edit"></i>
              </a>
              <a href="#" class="delete-icon">
                <i class="fas fa-trash"></i>
              </a>
            </div>
          </div>
        </div> 

        <!-- end of single expense -->

      `
      );
    });
  }
  // Save Data On Local Storage.
  static save(key, value) {
    localStorage.setItem(key, value);
  }
  // Get Data From Local Storage.
  static getValue(key) {
    return localStorage.getItem(key);
  }
  //Update.
  static update(element, fun) {
    element.textContent = fun;
  }
  //Remove Expense.
  remove(e) {
    const id = parseFloat(e.target.closest('.expense').dataset.id);
    const listItem = this.itemList.find((item, index) => item.id === id);
    const index = this.itemList.indexOf(listItem);
    this.itemList.splice(index, 1);
  }
  //Edit Expense
  edit(e) {
    const id = parseFloat(e.target.closest('.expense').dataset.id);
    const listItem = this.itemList.find((item, index) => item.id === id);
    const index = this.itemList.indexOf(listItem);
    const expense = (this.expenseInput.value = listItem.expense);
    const amount = (this.amountInput.value = listItem.amount);
    this.expenseInput.setAttribute('data-id', `${id}`);
  }
}
