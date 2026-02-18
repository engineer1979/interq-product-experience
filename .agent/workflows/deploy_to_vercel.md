---
description: How to deploy the application to Vercel
---

# Deploy to Vercel

This workflow guides you through deploying the application to Vercel.

## Prerequisites
- A Vercel account
- Vercel CLI installed (`npm i -g vercel`) or access to the Vercel dashboard

## Steps

1.  **Login to Vercel** (if using CLI)
    ```bash
    vercel login
    ```

2.  **Deploy**
    Run the deploy command from the project root:
    ```bash
    vercel
    ```
    - Set up and deploy: `Y`
    - Which scope: Select your team/account (e.g., `imrans-projects-faf1daf5`)
    - Link to existing project: `N` (or `Y` if you already created one)
    - Project name: `interq-product-experience` (or your preferred name)
    - In which directory is your code located: `./`
    - Auto-detect settings: `Y` (Vite should be detected)

3.  **Production Deployment**
    Once you are happy with the preview, deploy to production:
    ```bash
    vercel --prod
    ```

## Alternative: Git Integration
1.  Push your code to a GitHub repository.
2.  Go to the [Vercel Dashboard](https://vercel.com/new).
3.  Import your GitHub repository.
4.  Vercel will automatically detect Vite and configure the build settings.
5.  Click **Deploy**.
