import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json({ limit: '1mb' }));

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
    res.json({ ok: true, commit: json.commit?.sha });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
