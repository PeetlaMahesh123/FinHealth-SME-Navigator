# Frontend Integration Guide

## 1. LLM Integration
- Use fetch to POST to `/api/llm` with `{ prompt, provider }`.
- Display the result in the UI for recommendations/narrative.

## 2. Data Processing
- Use fetch to POST to `/api/process-data` with `{ data }` (array of records).
- Display summary/statistics in the dashboard.

## 3. Example Usage (React)
```js
// LLM
const res = await fetch('/api/llm', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt: 'Summarize...', provider: 'openai' })
});
const { result } = await res.json();

// Data Processing
const res2 = await fetch('/api/process-data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ data: [{ amount: 100 }, { amount: -50 }] })
});
const summary = await res2.json();
```

## 4. Next Steps
- Add UI components to trigger these backend calls and display results.
- Use state to manage loading/errors/results.
