# LLM Integration Guide

## 1. Install dependencies
From the `server/` directory, run:
```
npm install openai anthropic
```

## 2. Set API Keys
Edit `server/.env` and add your API keys:
```
OPENAI_API_KEY=your-openai-key
CLAUDE_API_KEY=your-claude-key
```

## 3. Usage
- POST to `/api/llm` with JSON body:
  - `prompt`: The user prompt
  - `provider`: `openai` or `claude`

Example:
```
POST /api/llm
{
  "prompt": "Summarize this financial report.",
  "provider": "openai"
}
```

## 4. Security
- Never commit API keys to version control.
- Use environment variables for all secrets.
- Rate limit and validate input to the endpoint in production.
