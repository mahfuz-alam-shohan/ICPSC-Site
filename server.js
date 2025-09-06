import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { promises as fs } from 'fs';
import { dbPromise } from './db.js';

dotenv.config();

const app = express();
app.use(express.json({ limit: '1mb' }));

// disable caching so edits show up immediately
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

// Serve static files from the directory where server.js lives
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(__dirname));

// Explicitly handle the root route to send index.html
app.get('/', (_req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

const { GITHUB_TOKEN, REPO_OWNER, REPO_NAME, BRANCH = 'main' } = process.env;

app.post('/api/save', async (req, res) => {
  const { content } = req.body || {};
  if (!content) return res.status(400).json({ error: 'No content provided' });
  try {
    const path = 'index.html';
    const api = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`;
    const get = await fetch(`${api}?ref=${BRANCH}`, {
      headers: { Authorization: `token ${GITHUB_TOKEN}` }
    });
    const data = await get.json();
    const result = await fetch(api, {
      method: 'PUT',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'Update via onsite editor',
        content: Buffer.from(content).toString('base64'),
        sha: data.sha,
        branch: BRANCH
      })
    });
    const json = await result.json();
    if (!result.ok) return res.status(result.status).json(json);
    await fs.writeFile(join(__dirname, path), content, 'utf8');
    res.json({ ok: true, commit: json.commit?.sha });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/users', async (_req, res) => {
  const db = await dbPromise;
  const users = await db.all('SELECT id, username, role FROM users');
  res.json(users);
});

app.post('/api/users', async (req, res) => {
  const { username, role } = req.body || {};
  if (!username || !role) return res.status(400).json({ error: 'username and role required' });
  const db = await dbPromise;
  const result = await db.run('INSERT INTO users (username, role) VALUES (?, ?)', [username, role]);
  res.json({ id: result.lastID });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
