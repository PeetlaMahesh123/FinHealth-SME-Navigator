# Banking/Payment API Integration Guide

## 1. Choose APIs
- Select up to 2 banking/payment APIs (e.g., Plaid, Yodlee, Stripe, Razorpay).
- Sign up for developer accounts and obtain API keys/secrets.

## 2. Backend Integration
- Use Node.js libraries (e.g., `plaid`, `stripe`) in `server/`.
- Store API keys in `.env` (never commit to version control).

## 3. Example: Plaid (Banking Data)
- Install: `npm install plaid`
- Add to `.env`:
```
PLAID_CLIENT_ID=
PLAID_SECRET=
PLAID_ENV=sandbox
```
- Example endpoint in `server/index.js`:
```js
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
const plaidConfig = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});
const plaidClient = new PlaidApi(plaidConfig);
// Add endpoints to link accounts, fetch transactions, etc.
```

## 4. Example: Stripe (Payments)
- Install: `npm install stripe`
- Add to `.env`:
```
STRIPE_SECRET_KEY=
```
- Example endpoint in `server/index.js`:
```js
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
// Add endpoints to create charges, handle webhooks, etc.
```

## 5. Security
- Always validate and sanitize user input.
- Use HTTPS for all API calls.
- Never expose secrets to the frontend.
