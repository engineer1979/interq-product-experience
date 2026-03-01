# 🌐 Custom Domain Setup: Vercel → www.interq.online

## 📋 Domain Configuration Guide

### 🎯 **Current Setup:**
- **Vercel Project**: https://vercel.com/imrans-projects-faf1daf5
- **GitHub Repository**: https://github.com/engineer1979/interq-product-experience
- **Target Domain**: www.interq.online

### 🔧 **Step 1: Configure Domain in Vercel Dashboard**

1. **Login to Vercel**: https://vercel.com/login
2. **Go to your project**: https://vercel.com/imrans-projects-faf1daf5
3. **Click "Domains"** in project settings
4. **Add your domain**: www.interq.online
5. **Verify domain ownership** (if required)

### 🔧 **Step 2: DNS Configuration**

**If you own interq.online:**
1. **Go to your domain registrar** (GoDaddy, Namecheap, etc.)
2. **Add CNAME record**:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: Auto or 3600
   ```

**Alternative - Use Vercel nameservers:**
1. **Change nameservers** at your registrar to:
   ```
   ns1.vercel.com
   ns2.vercel.com
   ```

### 🔧 **Step 3: SSL Certificate**
- **Vercel automatically provisions** SSL certificates
- **HTTPS enforced automatically**
- **Certificate auto-renewal** handled by Vercel

### 🔧 **Step 4: Test Domain Configuration**

1. **Check DNS propagation**:
   ```bash
   nslookup www.interq.online
   dig www.interq.online
   ```

2. **Verify in Vercel dashboard** under "Domains"

### 🌟 **Benefits of Custom Domain:**
- **Professional branding**: www.interq.online
- **SSL encryption**: Automatic HTTPS
- **Global CDN**: Fast loading worldwide
- **Auto-deployment**: Updates deploy automatically
- **Performance optimization**: Automatic image optimization

### 🚀 **Auto-Deployment with Custom Domain:**
- Every push to GitHub **main branch** auto-deploys
- Your site updates at: **www.interq.online**
- **Preview deployments** for pull requests
- **Rollback support** to previous versions

### 📊 **Current Status:**
- ✅ Vercel configuration updated for domain redirects
- ✅ GitHub repository ready for auto-deployment
- ✅ Production build optimized for deployment
- ✅ Custom domain configuration guide created

### ⚡ **Next Steps:**
1. **Configure domain** in Vercel dashboard
2. **Update DNS records** at your domain registrar
3. **Test deployment** by pushing any change to GitHub

---

**Support**: If you need help with DNS configuration, Vercel provides excellent documentation and support for custom domain setup.