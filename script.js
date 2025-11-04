let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById("category-select");
const amountInput = document.getElementById("amount-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-button");
const expensesTableBody = document.getElementById("expenses-tbody");
const totalAmountDisplay = document.getElementById("total-amount");

function renderExpenses() {
  expensesTableBody.innerHTML = "";
  totalAmount = 0;

  expenses.forEach((expense, idx) => {
    totalAmount += expense.amount;
    const newRow = expensesTableBody.insertRow();
    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const actionCell = newRow.insertCell();

    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("click", function () {
      // remove this expense and re-render
      expenses.splice(idx, 1);
      renderExpenses();
    });
    actionCell.appendChild(deleteButton);
  });

  totalAmountDisplay.textContent = totalAmount.toString();
}

addButton.addEventListener("click", function () {
  const category = categorySelect.value;
  const amount = parseFloat(amountInput.value);
  const date = dateInput.value;

  // validation
  if (!category) {
    alert("Please select a category.");
    return;
  }
  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount greater than zero.");
    return;
  }
  if (!date) {
    alert("Please select a date.");
    return;
  }

  expenses.push({ category, amount, date });
  renderExpenses();

  amountInput.value = "";
  dateInput.value = "";
});

renderExpenses();
