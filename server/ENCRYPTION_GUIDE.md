# Encryption Best Practices for Financial Data

## 1. Encryption in Transit
- Use HTTPS for all frontend-backend and backend-external API communication.
- Enforce HTTPS in production (e.g., via reverse proxy or cloud settings).

## 2. Encryption at Rest (Node.js + PostgreSQL)
- Use strong encryption (e.g., AES-256) for sensitive fields before storing in the database.
- Store encryption keys securely (environment variables, key vaults, not in code).

## 3. Example: Encrypting Data in Node.js
- Install: `npm install crypto`
- Example usage:
```js
const crypto = require('crypto');
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // 32 bytes for AES-256
const IV_LENGTH = 16;

function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
  const parts = text.split(':');
  const iv = Buffer.from(parts.shift(), 'hex');
  const encryptedText = Buffer.from(parts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
```
- Use `encrypt()` before storing sensitive data, and `decrypt()` when reading.

## 4. PostgreSQL Native Encryption (Optional)
- Use `pgcrypto` extension for column-level encryption if preferred.

## 5. Key Management
- Never hardcode keys in code or commit to version control.
- Rotate keys periodically.
- Use a secrets manager or environment variables.

## 6. Compliance
- Ensure compliance with regulations (PCI DSS, GDPR, etc.) for financial data.
