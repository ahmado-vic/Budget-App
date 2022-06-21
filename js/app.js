import UI from './UI.js';

const ui = new UI();

// Event Handler
document.addEventListener('click', e => {
  e.preventDefault();
  const budgetSubmit = e.target.closest('#budget-submit');
  const expenseSubmit = e.target.closest('#expense-submit');
  const removeBtn = e.target.closest('.delete-icon');
  const editBtn = e.target.closest('.edit-icon');

  if (budgetSubmit) {
    if (
      parseFloat(UI.getValue(ui.BUDGET_LOCAL_STORAGE)) &&
      ui.budgetInput.value === ''
    )
      return;

    if (ui.budgetInput.value === '') {
      ui.budgetFeedback.style.display = 'block';
      setTimeout(() => (ui.budgetFeedback.style.display = 'none'), 3000);
      return;
    }

    ui.storageBudget = ui.budgetInput.value;

    UI.save(ui.BUDGET_LOCAL_STORAGE, ui.storageBudget);

    UI.update(ui.budgetAmount, UI.getValue(ui.BUDGET_LOCAL_STORAGE));
    UI.update(
      ui.balanceAmount,
      parseFloat(UI.getValue(ui.BUDGET_LOCAL_STORAGE) - ui.expenses())
    );

    ui.budgetInput.value = '';
  }

  if (expenseSubmit) {
    if (ui.expenseInput.value === '' && ui.amountInput.value === '') return;

    const id = parseFloat(ui.expenseInput.dataset.id);
    const existingItem = ui.itemList.find(item => item.id === id);

    if (existingItem) {
      existingItem.expense = ui.expenseInput.value;
      existingItem.amount = ui.amountInput.value;

      ui.expenseInput.dataset.id = '';

      ui.expenseData();
    } else {
      ui.itemList.push({
        id: new Date().getMilliseconds(),
        expense: ui.expenseInput.value,
        amount: ui.amountInput.value,
      });
    }

    UI.save(ui.EXPENSE_LOCAL_STORAGE, JSON.stringify(ui.itemList));

    UI.update(ui.expenseAmount, ui.expenses());
    UI.update(ui.balanceAmount, ui.calcBalance());

    ui.expenseInput.value = '';
    ui.amountInput.value = '';

    ui.expenseData();
  }

  if (removeBtn) {
    ui.remove(e);

    UI.save(ui.EXPENSE_LOCAL_STORAGE, JSON.stringify(ui.itemList));

    ui.singleExpense.innerHTML = '';

    ui.expenseData();

    UI.update(ui.expenseAmount, ui.expenses());
    UI.update(ui.balanceAmount, ui.calcBalance());
  }

  if (editBtn) {
    ui.edit(e);
  }
});
