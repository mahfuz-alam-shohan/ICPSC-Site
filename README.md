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
   The site will now send save requests to `http://localhost:3000/api/save`.

When you edit content on the page and click save, the server commits `index.html` to your repository using the token stored on the server.

## Security
- The GitHub token lives only in the server's environment and never in the HTML.
- `.env` is ignored by Git so the token isn't committed.

## Front-end edit flow
- Click the ✎ icon to log in with the default credentials (`admin123` / `admin456`).
- Edit text and images directly on the page.
- Click the 💾 button to save; the server handles the GitHub commit.
