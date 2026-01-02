📊 Expense Tracker Dashboard

A modern, responsive Expense Tracker Web Application built using Vanilla JavaScript, HTML, CSS, and Chart.js.
The app helps users track daily expenses, manage weekly & monthly budgets, and visualize spending patterns with interactive charts — all stored securely using LocalStorage.

🔗 Live Demo:https://kharchameter.netlify.app/

📁 GitHub Repository: https://github.com/neelesbaghel/oops-i-spent


✨ Features
🧾 Expense Management

    Add expenses with amount, category, and date

    View complete expense history

    Reset all expenses with a single click

💰 Budget Management

    Set weekly and monthly budgets

    Real‑time calculation of remaining weekly budget

    Automatic weekly reset based on ISO week logic (no manual reset needed)

📈 Analytics & Insights

    Category-wise expense distribution (Pie Chart)

    Monthly expense analysis (Bar Chart)

    Weekly expense tracking (Bar Chart)

    Daily expense trends (Line Chart)

    Smooth chart animations when switching to Analytics tab

🔍 Filters & Calendar

    Filter expenses by category, month, or week

    Calendar‑based expense lookup by date

💾 Persistent Storage

    Uses Browser LocalStorage

    Data persists across page reloads

    No backend required

🛠️ Tech Stack

    HTML5 – Semantic structure

    CSS3 – Responsive layout & styling

    JavaScript (ES6) – Core logic & state management

    Chart.js – Data visualization

    LocalStorage API – Client‑side persistence

expense-tracker/
│
├── index.html              # Main HTML file
├── analytics.html          # Analytics page (if separated)
│
├── css/
│   └── style.css           # All styles
│
├── js/
│   ├── app.js               # Core logic (expenses, budget, reset)
│   ├── charts.js            # Chart rendering logic
│   ├── analytics.js         # Analytics helpers
│
├── assets/
│   └── images/              # Icons / screenshots (optional)
│
├── README.md                # Project documentation
└── .gitignore
