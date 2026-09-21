# Billuu — Restaurant Billing System

Billuu is a calm, fast restaurant billing and point-of-sale (POS) workspace, built to make order entry and bill generation quick and simple for restaurant staff. It supports three roles — Admin, Manager, and Staff — each with different levels of access.

Built as a personal project to practice building a full-stack web app with Next.js and modern UI tooling.

## Features

- Role-based login (Admin / Manager / Staff)
- Add and manage menu items
- Create orders and add items to them
- Generate and print/download bills
- Dashboard with sales and order history
- Role-based access — e.g. Staff can only bill, while Admin can manage the menu and view all orders

> **Note:** Data is currently held in local/mock state and does not persist to a database yet — this is on the roadmap.

## Tech Stack

- **Framework:** Next.js (App Router) + TypeScript
- **UI:** shadcn/ui + Tailwind CSS
- **Package Manager:** pnpm

## Getting Started

Clone the repo and install dependencies:

\`\`\`bash
git clone https://github.com/gaurav-codes-prog/billuu-restaurant-billing-system.git
cd billuu-restaurant-billing-system
pnpm install
\`\`\`

Run the development server:

\`\`\`bash
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Live Demo

[Billuu on Vercel](https://billuu-restaurant-billing-system.vercel.app)

## Roadmap

- [ ] Persist data with a real database
- [ ] Add real authentication (currently uses mock login credentials)
- [ ] Split the dashboard into smaller, reusable components

## Author

Built by [Gaurav](https://github.com/gaurav-codes-prog)
