// Encryption utilities (AES-256)
const crypto = require('crypto');


const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY ? Buffer.from(process.env.ENCRYPTION_KEY, 'hex') : null; // 32 bytes
const IV_LENGTH = 16;

function encrypt(text) {
  if (!ENCRYPTION_KEY) throw new Error('ENCRYPTION_KEY not set');
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(text, 'utf8');
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
  if (!ENCRYPTION_KEY) throw new Error('ENCRYPTION_KEY not set');
  const parts = text.split(':');
  const iv = Buffer.from(parts.shift(), 'hex');
  const encryptedText = Buffer.from(parts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString('utf8');
}
const { spawn } = require('child_process');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// LLM clients


// Endpoint to process data using Python (pandas)
app.post('/api/process-data', async (req, res) => {
  const inputData = req.body.data;
  if (!inputData) return res.status(400).json({ error: 'Missing data' });
  try {
    const py = spawn('python', ['python/process_data.py'], { cwd: __dirname });
    let output = '';
    let error = '';
    py.stdout.on('data', (data) => { output += data.toString(); });
    py.stderr.on('data', (data) => { error += data.toString(); });
    py.on('close', (code) => {
      if (code !== 0 || error) {
        return res.status(500).json({ error: error || 'Python script error' });
      }
      try {
        const result = JSON.parse(output);
        res.json(result);
      } catch (e) {
        res.status(500).json({ error: 'Invalid output from Python script' });
      }
    });
    py.stdin.write(JSON.stringify(inputData));
    py.stdin.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// LLM dependencies


const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;
const anthropic = process.env.CLAUDE_API_KEY ? new Anthropic({ apiKey: process.env.CLAUDE_API_KEY }) : null;
// LLM endpoint for recommendations/narrative (OpenAI GPT-5 or Claude)
app.post('/api/llm', async (req, res) => {
  const { prompt, provider } = req.body;
  if (!prompt || !provider) {
    return res.status(400).json({ error: 'Missing prompt or provider' });
  }
  try {
    let result;
    if (provider === 'openai') {
      if (!openai) return res.status(500).json({ error: 'OpenAI API key not set' });
      // Example for GPT-4/5, update model as needed
      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 512
      });
      result = completion.choices[0].message.content;
    } else if (provider === 'claude') {
      if (!anthropic) return res.status(500).json({ error: 'Claude API key not set' });
      // Example for Claude, update model as needed
      const completion = await anthropic.messages.create({
        model: 'claude-3-opus-20240229',
        max_tokens: 512,
        messages: [{ role: 'user', content: prompt }]
      });
      result = completion.content[0].text;
    } else {
      return res.status(400).json({ error: 'Invalid provider' });
    }
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PostgreSQL connection setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/finhealth',
});

app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Example endpoint to test DB connection
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ time: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
