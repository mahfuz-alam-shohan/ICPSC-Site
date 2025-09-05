# ICPSC Site

This repository contains the school website and a small server for saving edits back to GitHub without exposing a personal access token in the browser.

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Create a `.env` file** based on `.env.example` and fill in your GitHub details:
   ```env
   GITHUB_TOKEN=ghp_your_token
   REPO_OWNER=your_username
   REPO_NAME=ICPSC-Site
   BRANCH=main
   ```
3. **Run the server**
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser. The page is served from the same server and save requests go to `/api/save`.

When you edit content on the page and click save, the server commits `index.html` to your repository using the token stored on the server.




- Click the ✎ icon to log in with the default credentials (`admin123` / `admin456`).
- Edit text and images directly on the page.
- Click the 💾 button to save; the server handles the GitHub commit.



- `logo-placeholder.png.txt` - site logo
- `leader-1.png.txt`, `leader-2.png.txt`, `leader-3.png.txt` - leadership cards
- `achievement-placeholder.png.txt` - achievements banner
- `gallery-1.png.txt` ... `gallery-12.png.txt` - gallery tiles

After cloning, rename them to end with `.png` so the HTML references work.

Leadership names and messages are loaded from `leader-1.txt`, `leader-2.txt`, and `leader-3.txt` inside `assets/`. Replace the placeholder text in these files with real content.
=======

