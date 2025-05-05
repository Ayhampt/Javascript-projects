document.addEventListener("DOMContentLoaded", () => {
  const Balance = document.getElementById("balance");
  const changebalancebtn = document.getElementById("changebalancebtn");
  const inputchangeamount = document.getElementById("inputchangeamount");

  const inputamountbtn = document.getElementById("inputamountbtn");
  const expenceform = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-Amount"); // Fixed variable naming

  const expenseList = document.getElementById("expense-list");
  const totalAmount = document.getElementById("total-amount");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  let total = calculatetotal();
  let balanceAmountarray =
    JSON.parse(localStorage.getItem("balanceAmountarray")) || [];
  renderExpenses();
  updatetotal();

  // Set initial balance display
  Balance.textContent = `$0`;

  changebalancebtn.addEventListener("click", () => {
    showchangebalanceInput();
  });

  inputamountbtn.addEventListener("click", () => {
    const balanceamount = parseFloat(inputchangeamount.value.trim());
    balanceAmountarray.push(balanceamount);

    Balance.textContent = `$${balanceAmountarray[
      balanceAmountarray.length - 1
    ].toFixed(2)}`;
    savebalance();

    hidechangebalanceInput();
  });

  expenceform.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value.trim());
    if (name !== "" && !isNaN(amount) && amount > 0) {
      const newExpense = {
        id: Date.now(),
        name: name,
        amount: amount,
      };
      expenses.push(newExpense);
      saveExpensestoLocalStorage();
      renderExpenses();
      updatetotal();

      //clear input
      expenseNameInput.value = "";
      expenseAmountInput.value = "";
    }
  });

  function calculatetotal() {
    return expenses.reduce((sum, expenses) => sum + expenses.amount, 0);
  }

  function updatetotal() {
    total = calculatetotal();
    totalAmount.textContent = `$${total.toFixed(2)}`;
  }
  function renderExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach((expense) => {
      const expenseElement = document.createElement("div");

      expenseElement.innerHTML = `
      <span>${expense.name}</span>
      <span>$${expense.amount}</span>
      <button data-id ="${expense.id}">Delete</button>
      `;
      expenseList.appendChild(expenseElement);
    });
  }
  function saveExpensestoLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }
  function savebalance() {
    localStorage.setItem("balance", JSON.stringify(balanceAmountarray));
  }

  function showchangebalanceInput() {
    inputchangeamount.classList.remove("hidden");
    inputamountbtn.classList.remove("hidden");
  }

  function hidechangebalanceInput() {
    inputchangeamount.classList.add("hidden");
    inputamountbtn.classList.add("hidden");
  }
  expenseList.addEventListener("click", (e) => {
    if (e.target.tagName === `BUTTON`) {
      const expenseid = parseInt(e.target.getAttribute("data-id"));
      expenses = expenses.filter((expence) => expence.id !== expenseid);
      updatetotal();
      renderExpenses();
      saveExpensestoLocalStorage();
    }
  });
});
