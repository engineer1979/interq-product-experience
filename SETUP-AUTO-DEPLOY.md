# 🚀 Auto-Deployment Setup: GitHub → Vercel

## 📋 Prerequisites
- GitHub repository: `engineer1979/interq-product-experience`
- Vercel account: `https://vercel.com/imrans-projects-faf1daf5`
- Node.js project with working build

## 🔧 Step 1: Get Vercel Credentials

1. **Login to Vercel**: https://vercel.com/login
2. **Go to Account Settings** → **Tokens**
3. **Create New Token** (name it "GitHub Actions")
4. **Copy the token** - this is your `VERCEL_TOKEN`

## 🔧 Step 2: Get Project & Org IDs

1. **Install Vercel CLI** (on your local machine):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel CLI**:
   ```bash
   vercel login
   ```

3. **Link your project and get IDs**:
   ```bash
   vercel link
   ```
   - This will show your `ORG_ID` and `PROJECT_ID`

## 🔧 Step 3: Configure GitHub Secrets

1. **Go to your GitHub repository**: https://github.com/engineer1979/interq-product-experience
2. **Settings** → **Secrets and variables** → **Actions**
3. **Add these secrets**:
   - `VERCEL_TOKEN` - Your Vercel authentication token
   - `VERCEL_ORG_ID` - Your Vercel organization ID
   - `VERCEL_PROJECT_ID` - Your Vercel project ID

## 🔧 Step 4: Test Auto-Deployment

1. **Push changes to main branch**:
   ```bash
   git add .
   git commit -m "Test auto-deployment"
   git push origin main
   ```

2. **Check GitHub Actions**:
   - Go to your repo → **Actions** tab
   - Watch the deployment workflow run

3. **Verify Vercel Deployment**:
   - Check your Vercel dashboard: https://vercel.com/imrans-projects-faf1daf5
   - Your site should be automatically deployed

## ✅ Auto-Deployment Features

- **On every push to main**: Automatic production deployment
- **Pull requests**: Preview deployments for code review
- **Build verification**: Tests run before deployment
- **Rollback support**: Easy version management

## 🛠️ Troubleshooting

### If deployment fails:
1. Check GitHub Actions logs for errors
2. Verify Vercel token has correct permissions
3. Ensure project builds locally: `npm run build`

### If build fails:
1. Run locally: `npm run build` to identify issues
2. Check Node.js version compatibility
3. Verify all dependencies are installed

## 🌟 Benefits
- **Zero-config deployment**: Just push to GitHub
- **Global CDN**: Automatic SSL and fast loading
- **Preview URLs**: Every PR gets its own deployment
- **Rollback**: Easy to revert to previous versions
- **Performance**: Optimized builds and caching

---

**Next**: Push this configuration to GitHub and add your Vercel secrets to enable auto-deployment!