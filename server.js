import express from 'express';
import fetch from 'node-fetch';
import session from 'express-session';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { promises as fs } from 'fs';
import { dbPromise } from './db.js';

dotenv.config();

const app = express();
app.use(express.json({ limit: '1mb' }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'devsecret',
  resave: false,
  saveUninitialized: false
}));

// disable caching so edits show up immediately
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

// Serve static files from the directory where server.js lives
const __dirname = dirname(fileURLToPath(import.meta.url));

function requireAdmin(req, res, next) {
  if (req.session?.admin) return next();
  res.status(401).json({ error: 'unauthorized' });
}

app.get('/admin.php', (req, res) => {
  if (!req.session?.admin) return res.redirect('/login.php');
  res.sendFile(join(__dirname, 'admin.php'));
});

app.use(express.static(__dirname));

// Explicitly handle the root route to send index.html
app.get('/', (_req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

const { GITHUB_TOKEN, REPO_OWNER, REPO_NAME, BRANCH = 'main' } = process.env;

app.post('/api/login', (req, res) => {
  const { password } = req.body || {};
  const adminPass = process.env.ADMIN_PASSWORD || 'admin123';
  if (password === adminPass) {
    req.session.admin = true;
    res.json({ ok: true });
  } else {
    res.status(401).json({ error: 'invalid password' });
  }
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ ok: true });
  });
});

app.get('/api/me', (req, res) => {
  res.json({ admin: !!req.session?.admin });
});

app.post('/api/save', requireAdmin, async (req, res) => {
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

app.get('/api/users', requireAdmin, async (_req, res) => {
  const db = await dbPromise;
  const users = await db.all('SELECT id, username, role FROM users');
  res.json(users);
});

app.post('/api/users', requireAdmin, async (req, res) => {
  const { username, role } = req.body || {};
  if (!username || !role) return res.status(400).json({ error: 'username and role required' });
  const db = await dbPromise;
  const result = await db.run('INSERT INTO users (username, role) VALUES (?, ?)', [username, role]);
  res.json({ id: result.lastID });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
