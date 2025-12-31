




document.addEventListener("DOMContentLoaded", () => {
  ////

////
  function syncExpensesToStorage() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}
/////



  function getBudget() {
  return JSON.parse(localStorage.getItem("budget")) || {
    weekly: 0,
    monthly: 0
  };
}

function saveBudget(budget) {
  localStorage.setItem("budget", JSON.stringify(budget));
}
function getCurrentWeekExpense() {
  const expenses = getExpenses();
  const now = new Date();
  const currentWeek = Math.ceil(now.getDate() / 7);

  return expenses.reduce((sum, e) => {
    const d = new Date(e.date);
    const week = Math.ceil(d.getDate() / 7);
    return week === currentWeek ? sum + e.amount : sum;
  }, 0);
}
////




    function getExpenses() {
  return JSON.parse(localStorage.getItem("expenses")) || [];
}

  /* ================== NAVIGATION ================== */
  const pages = document.querySelectorAll(".page");
  const navItems = document.querySelectorAll(".sidebar li[data-page]");

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      const page = item.dataset.page;
      pages.forEach(p => p.classList.remove("active"));
      document.getElementById(page).classList.add("active");
//changes made

      if (page === "analytics") {
  renderCategoryChart();
  renderMonthlyChart();
  renderWeeklyChart();
  renderDailyChart();
}
//

    });
  });

  /* ================== SINGLE SOURCE OF TRUTH ================== */
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  /* ================== DASHBOARD + HISTORY ================== */
  const expenseForm = document.getElementById("expense-form");
  const totalExpenseEl = document.getElementById("totalExpense");
  const expenseList = document.getElementById("expense-list");

  ////
  const resetExpensesBtn = document.getElementById("reset-expenses-btn");
////

  function renderDashboardAndHistory() {
    // Dashboard total
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    if (totalExpenseEl) totalExpenseEl.textContent = total;
    ////
    const budget = getBudget();
const weeklyExpense = getCurrentWeekExpense();
const remaining = budget.weekly - weeklyExpense;

const weeklyBudgetEl = document.getElementById("weeklyBudgetValue");
const remainingEl = document.getElementById("remainingBudget");

if (weeklyBudgetEl) weeklyBudgetEl.textContent = budget.weekly;
if (remainingEl) remainingEl.textContent = remaining < 0 ? 0 : remaining;

////
    // History
    if (expenseList) {
      expenseList.innerHTML = "";
      expenses.forEach(e => {
        const li = document.createElement("li");
        li.textContent = `${e.category} - ₹${e.amount} (${e.date})`;
        expenseList.appendChild(li);
      });
    }
  }

  renderDashboardAndHistory();
  ////


  // 🔥 Load saved budget on page load
(function initBudgetUI() {
  const budget = getBudget();
  const weeklyBudgetEl = document.getElementById("weeklyBudgetValue");
  const remainingEl = document.getElementById("remainingBudget");

  if (weeklyBudgetEl) weeklyBudgetEl.textContent = budget.weekly || 0;
  if (remainingEl) remainingEl.textContent = budget.weekly || 0;
})();

////

  /* ================== ADD EXPENSE ================== */
  if (expenseForm) {
    expenseForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const amount = Number(document.getElementById("amount").value);
      const category = document.getElementById("category").value;
      const date = document.getElementById("date").value;

      if (!amount || !category || !date) return;

      expenses.push({ amount, category, date });
      

      // 🔥 SYNC
      localStorage.setItem("expenses", JSON.stringify(expenses));

      renderDashboardAndHistory();

      renderCategoryChart();
    renderMonthlyChart();

    //changes made
    renderWeeklyChart();
renderDailyChart();
//

      expenseForm.reset();
    });
  }
  if (resetExpensesBtn) {
  resetExpensesBtn.addEventListener("click", () => {
    const confirmReset = confirm(
      "Are you sure you want to reset all expenses?"
    );

    if (!confirmReset) return;

    // 1️⃣ Clear expenses array
    expenses = [];

    // 2️⃣ Clear localStorage expenses
    localStorage.setItem("expenses", JSON.stringify([]));

    // 3️⃣ Update dashboard & history
    renderDashboardAndHistory();

    // 4️⃣ Reset charts safely
    if (categoryChart) categoryChart.destroy();
    if (monthlyChart) monthlyChart.destroy();
    if (weeklyChart) weeklyChart.destroy();
    if (dailyChart) dailyChart.destroy();

    alert("All expenses have been reset successfully!");
  });
}




  /* ================== ADD BUDGET ================== */
const budgetForm = document.getElementById("budget-form");

if (budgetForm) {
  budgetForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const weekly = Number(document.getElementById("weeklyBudget").value);
    const monthly = Number(document.getElementById("monthlyBudget").value);

    if (!weekly && !monthly) return;

    saveBudget({ weekly, monthly });

    renderDashboardAndHistory();

    budgetForm.reset();
  });
}

// const budgetForm = document.getElementById("budget-form");

// if (budgetForm) {
//   budgetForm.addEventListener("submit", (e) => {
//     e.preventDefault();

//     const weekly = Number(document.getElementById("weekly-budget").value);
//     const monthly = Number(document.getElementById("monthly-budget").value);

//     saveBudget({ weekly, monthly });

//     renderDashboardAndHistory();

//     budgetForm.reset();
//   });
// }

  /* ================== FILTERS ================== */
  const filterCategory = document.getElementById("filter-category");
  const filterMonth = document.getElementById("filter-month");
  const filterWeek = document.getElementById("filter-week");

const applyFiltersBtn = document.getElementById("apply-filters");
const filterResults = document.getElementById("filter-results");

if (applyFiltersBtn) {
  applyFiltersBtn.addEventListener("click", () => {

    filterResults.innerHTML = "";

    const category = document.getElementById("filter-category").value;
    const month = document.getElementById("filter-month").value;
    const week = document.getElementById("filter-week").value;

    const allExpenses = JSON.parse(localStorage.getItem("expenses")) || [];

    let filtered = allExpenses;

    // CATEGORY FILTER
    if (category) {
      filtered = filtered.filter(e => e.category === category);
    }

    // MONTH FILTER
    if (month !== "") {
      filtered = filtered.filter(e =>
        new Date(e.date).getMonth() === Number(month)
      );
    }

    // WEEK FILTER
    if (week !== "") {
      filtered = filtered.filter(e => {
        const day = new Date(e.date).getDate();
        return Math.ceil(day / 7) === Number(week);
      });
    }

    if (filtered.length === 0) {
      filterResults.innerHTML = "<li>No expenses found</li>";
      return;
    }

    filtered.forEach(e => {
      const li = document.createElement("li");
      li.textContent = `${e.category} - ₹${e.amount} (${e.date})`;
      filterResults.appendChild(li);
    });
  });
}

  //analytics
  function getExpenses() {
  return JSON.parse(localStorage.getItem("expenses")) || [];
}

function getCategoryData() {
  const expenses = getExpenses();
  const categoryMap = {};

  expenses.forEach(e => {
    categoryMap[e.category] =
      (categoryMap[e.category] || 0) + e.amount;
  });

  return {
    labels: Object.keys(categoryMap),
    values: Object.values(categoryMap)
  };
}
function getMonthlyData() {
  const expenses = getExpenses();
  const months = Array(12).fill(0);

  expenses.forEach(e => {
    const m = new Date(e.date).getMonth();
    months[m] += e.amount;
  });

  return months;
}
let categoryChart;

function renderCategoryChart() {
  const ctx = document.getElementById("categoryChart");
  if (!ctx) return;

  const { labels, values } = getCategoryData();

  if (categoryChart) categoryChart.destroy();

  categoryChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: [
         "#c08282ff",
          "#7b443cff",
          "#f2caa3ff",
          "#3a2a24",
          "#f17c6aff"
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // 🔥 REQUIRED
      plugins: {
        legend: {
          position: "bottom"
        }
      }
    },
    options: {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    animateScale: true,
    animateRotate: true,
    duration: 1200,
    easing: "easeOutCirc"
  },
  plugins: {
    legend: {
      position: "bottom"
    }
  }
}

  });
}
let monthlyChart;

function renderMonthlyChart() {
  const ctx = document.getElementById("monthlyChart");
  if (!ctx) return;

  const data = getMonthlyData();

  if (monthlyChart) monthlyChart.destroy();

  monthlyChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        "Jan","Feb","Mar","Apr","May","Jun",
        "Jul","Aug","Sep","Oct","Nov","Dec"
      ],
      datasets: [{
        label: "Monthly Expenses",
        data,
        backgroundColor: "#74b9ff"
      }]
    },
    options: {  // ⬅ ADD HERE
    responsive: true,
    animation: {
      duration: 1200,
      easing: "easeOutQuart"
    }
  }
   
   

   
  });
}

// changes made
/* ================== WEEKLY CHART ================== */

function getWeeklyData() {
  const expenses = getExpenses();
  const weeks = Array(5).fill(0);

  expenses.forEach(e => {
    const day = new Date(e.date).getDate();
    const week = Math.ceil(day / 7) - 1;
    weeks[week] += e.amount;
  });

  return weeks;
}

let weeklyChart;

function renderWeeklyChart() {
  const ctx = document.getElementById("weeklyChart");
  if (!ctx) return;

  const data = getWeeklyData();

  if (weeklyChart) weeklyChart.destroy();

  weeklyChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
      datasets: [{
        label: "Weekly Expenses",
        data,
        backgroundColor: "#55efc4"
      }]
    },
    options: {
  responsive: true,
  animation: {
    duration: 1000,
    easing: "easeOutBack"
  }
}
  });
}

/* ================== DAILY CHART ================== */

function getDailyData() {
  const expenses = getExpenses();
  const map = {};

  expenses.forEach(e => {
    map[e.date] = (map[e.date] || 0) + e.amount;
  });

  return {
    labels: Object.keys(map),
    values: Object.values(map)
  };
}

let dailyChart;

function renderDailyChart() {
  const ctx = document.getElementById("dailyChart");
  if (!ctx) return;

  const { labels, values } = getDailyData();

  if (dailyChart) dailyChart.destroy();

  dailyChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Daily Expenses",
        data: values,
        borderColor: "#ffeaa7",
        fill: false,
        tension: 0.3
      }]
    },
    options: {
  responsive: true,
  animation: {
    duration: 1500,
    easing: "easeInOutCubic"
  },
  elements: {
    line: {
      tension: 0.4
    }
  }
}

  });
}
////
/* ================== CALENDAR FEATURE ================== */

const calendarSaveBtn = document.getElementById("calendar-save");
const calendarResults = document.getElementById("calendar-results");

if (calendarSaveBtn) {
  calendarSaveBtn.addEventListener("click", () => {
    const selectedDate = document.getElementById("calendar-date").value;

    calendarResults.innerHTML = "";

    if (!selectedDate) {
      calendarResults.innerHTML = "<li>Please select a date</li>";
      return;
    }

    const allExpenses = JSON.parse(localStorage.getItem("expenses")) || [];

    const filtered = allExpenses.filter(
      e => e.date === selectedDate
    );

    if (filtered.length === 0) {
      calendarResults.innerHTML = "<li>No expenses found for this date</li>";
      return;
    }

    filtered.forEach(e => {
      const li = document.createElement("li");
      li.textContent = `${e.category} - ₹${e.amount}`;
      calendarResults.appendChild(li);
    });
  });
}

})