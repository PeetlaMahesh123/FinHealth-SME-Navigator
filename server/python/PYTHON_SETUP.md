# Python Data Processing Integration Guide

## 1. Install Python & dependencies
- Ensure Python 3.x is installed.
- From `server/python/`, run:
```
pip install -r requirements.txt
```

## 2. Usage
- POST to `/api/process-data` with JSON body:
  - `data`: a list of dicts (records)

Example:
```
POST /api/process-data
{
  "data": [
    {"amount": 100, "category": "income"},
    {"amount": -50, "category": "expense"}
  ]
}
```
- Returns summary statistics using pandas.

## 3. Security
- Validate and sanitize all input data.
- Restrict Python script execution to trusted sources only.
