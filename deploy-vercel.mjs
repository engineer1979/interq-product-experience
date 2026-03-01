// Simple deployment script for Vercel (ES Module version)
// This script helps deploy your application to Vercel

import { execSync } from 'child_process';

console.log('🚀 Preparing Vercel deployment...');

// Check if vercel is installed
try {
  console.log('Checking Vercel CLI...');
  execSync('vercel --version', { stdio: 'inherit' });
  console.log('✅ Vercel CLI is available');
} catch (error) {
  console.log('❌ Vercel CLI not found. Please install it with: npm install -g vercel');
  console.log('Alternatively, you can deploy through:');
  console.log('1. Vercel Dashboard: https://vercel.com/dashboard');
  console.log('2. GitHub integration with auto-deploy');
  console.log('3. Direct git push if Vercel remote is configured');
  process.exit(1);
}

// Try to deploy
try {
  console.log('📦 Deploying to Vercel...');
  execSync('vercel --prod', { stdio: 'inherit' });
  console.log('✅ Deployment successful!');
} catch (error) {
  console.log('❌ Deployment failed. Alternative deployment methods:');
  console.log('1. Visit: https://vercel.com/new and import your GitHub repository');
  console.log('2. Connect GitHub repo for auto-deploy');
  console.log('3. Use Vercel dashboard: https://vercel.com/imrans-projects-faf1daf5/');
}