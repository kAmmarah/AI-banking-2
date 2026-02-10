## AI Banking Dashboard

Interactive AI-powered banking dashboard with fraud analytics, CSV data integration, and an inline AI chatbot.

### Features

- **Logo animation**: Branded AI Banking logo with subtle glow/float animation.
- **Dashboard tabs**: Customers, Transactions, Fraud Cases, and an AI Assistant tab – all using a consistent dark blue theme.
- **Data integration**:
  - `customers.csv` – customer profiles and risk levels.
  - `transactions_sales.csv` – all transactions with fraud flags.
  - `fraud_cases.csv` – confirmed fraud transactions.
- **AI chatbot**:
  - Floating chat icon on every page (bottom-right).
  - Opens the AI Assistant tab and chat window.
  - Answers common questions about counts, totals, fraud statistics, and customer details using the loaded CSV data (no external API).

### Getting Started

1. **Clone the repo**

```bash
git clone https://github.com/kAmmarah/AI-banking.git
cd AI-banking
```

2. **Run a live server (simple option)**

Using Python 3:

```bash
python3 -m http.server 8000
```

Open in your browser:

```text
http://localhost:8000
```

The main dashboard is served from `index.html` and automatically loads all CSV files.

### Usage

- **Tabs**
  - **Customers**: Browse customers and risk profiles; search with the top search bar.
  - **Transactions**: View all transactions, amounts, and fraud status.
  - **Fraud Cases**: See only confirmed fraud with totals and averages.
  - **AI Assistant**: Chat interface for natural-language questions about the data.

- **Chatbot**
  - Floating chat icon on the bottom-right is visible on all tabs.
  - Clicking it focuses the AI Assistant tab and opens the chat.

### Tech Stack

- Pure **HTML/CSS/JavaScript** for the main dashboard.
- Additional **React + TypeScript** frontend and **Node/TypeScript** backend boilerplate in `ai-fraud-detection/` for future expansion.

