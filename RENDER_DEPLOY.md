# StudySync Render Deployment Guide

This guide will help you deploy StudySync to Render in **one click**.

## Prerequisites

- GitHub account with the repo: `https://github.com/pranithhh376/Internship-Project-2`
- Render account at `https://render.com`

## One-Click Deployment

### Step 1: Connect Render to GitHub

1. Go to **Render Dashboard** → https://dashboard.render.com/signin
2. Sign in with your account
3. Click **"New +"** → **"Web Service"**
4. Select **"Connect a repository"**
5. Choose **"GitHub"** and authorize Render to access your repositories
6. Search for and select: `Internship-Project-2`

### Step 2: Configure the Service

In the "Create a new Web Service" form, fill in:

| Field | Value |
|-------|-------|
| **Name** | `studysync` (or your preferred name) |
| **Region** | `Oregon` (or closest to you) |
| **Branch** | `main` |
| **Runtime** | `Docker` |
| **Dockerfile Path** | `./Dockerfile` |
| **Plan** | `Free` (recommended for internship) |

### Step 3: Environment Variables

Add these environment variables in Render:

```
NODE_ENV=production
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/studysync
```

(For `MONGO_URI`, use a MongoDB Atlas free cluster: https://www.mongodb.com/cloud/atlas)

### Step 4: Deploy

Click **"Create Web Service"** and Render will:

1. Pull your code from GitHub
2. Build the Docker image
3. Deploy your app
4. Give you a live URL (e.g., `https://studysync-xxx.onrender.com`)

---

## To Update Your App After Changes

1. Make your code changes locally
2. Commit and push to GitHub:
   ```
   git push origin main
   ```
3. Render will **automatically redeploy** when you push to the `main` branch

---

## Your Live App URL

Once deployed, your StudySync app will be accessible at a URL like:
```
https://studysync-[random-id].onrender.com
```

**Share this URL with your internship supervisor!**

---

## Troubleshooting

### Build fails: "Dockerfile not found"
- Verify the Dockerfile is in the root directory of the GitHub repo

### Build fails: "MONGO_URI undefined"
- Add the environment variable in Render dashboard → Settings → Environment Variables

### App won't connect to frontend
- The server now serves the built React client automatically
- Ensure the client was built and included in the Docker image

### Need help?
- View build logs in Render dashboard
- Check status at https://dashboard.render.com
