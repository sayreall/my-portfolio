# GitHub Pages Setup for EmailJS Contact Form

This guide will help you configure your EmailJS credentials for GitHub Pages deployment.

## Why GitHub Secrets?

GitHub Pages is a static site hosting service, which means it doesn't support server-side environment variables. To make your contact form work on GitHub Pages, we use **GitHub Secrets** to securely store your EmailJS credentials and inject them during the build process.

## Step-by-Step Setup

### Step 1: Get Your EmailJS Credentials

Make sure you have:
- **Service ID**: From EmailJS Dashboard → Email Services
- **Template ID**: From EmailJS Dashboard → Email Templates  
- **Public Key**: From EmailJS Dashboard → Account → General

### Step 2: Add GitHub Secrets

1. **Go to your GitHub repository**
   - Navigate to: `https://github.com/sayreall/my-portfolio`

2. **Open Repository Settings**
   - Click on **Settings** (top menu)
   - In the left sidebar, click **Secrets and variables** → **Actions**

3. **Add Three Secrets**
   - Click **New repository secret** for each one:

   **Secret 1:**
   - Name: `EMAILJS_SERVICE_ID`
   - Value: Your EmailJS Service ID (e.g., `service_ojzcxnb`)
   - Click **Add secret**

   **Secret 2:**
   - Name: `EMAILJS_TEMPLATE_ID`
   - Value: Your EmailJS Template ID (e.g., `template_xxxxxxxxx`)
   - Click **Add secret**

   **Secret 3:**
   - Name: `EMAILJS_PUBLIC_KEY`
   - Value: Your EmailJS Public Key (e.g., `sYh-Fcja8HRORHTFu`)
   - Click **Add secret**

### Step 3: Verify Secrets Are Added

You should now see three secrets in your repository:
- ✅ `EMAILJS_SERVICE_ID`
- ✅ `EMAILJS_TEMPLATE_ID`
- ✅ `EMAILJS_PUBLIC_KEY`

### Step 4: Trigger a New Deployment

After adding the secrets, you need to trigger a new build:

**Option A: Push a new commit**
```bash
git commit --allow-empty -m "Trigger deployment with EmailJS secrets"
git push
```

**Option B: Manual workflow trigger**
1. Go to **Actions** tab in your repository
2. Click on **Build and deploy Vite site to GitHub Pages**
3. Click **Run workflow** → **Run workflow**

### Step 5: Verify It Works

1. Wait for the deployment to complete (check the Actions tab)
2. Visit your GitHub Pages site
3. Test the contact form
4. Check your email inbox for the message

## How It Works

1. **During Build**: GitHub Actions creates a `.env` file using the secrets
2. **Vite Build**: Reads the environment variables from `.env`
3. **Production**: The built site includes the EmailJS credentials
4. **Contact Form**: Uses the credentials to send emails via EmailJS

## Security Notes

- ✅ GitHub Secrets are encrypted and only accessible during workflow runs
- ✅ Secrets are never exposed in logs or the repository
- ✅ EmailJS Public Keys are designed to be public (safe to use in client-side code)
- ✅ The `.env` file is created during build and not committed to the repository

## Troubleshooting

### Contact form still doesn't work after deployment

1. **Check if secrets are set:**
   - Go to Settings → Secrets and variables → Actions
   - Verify all three secrets exist

2. **Check the build logs:**
   - Go to Actions tab
   - Click on the latest workflow run
   - Check if the build step completed successfully
   - Look for any errors in the "Create .env file" step

3. **Verify EmailJS configuration:**
   - Make sure your EmailJS template uses the correct variable names:
     - `{{from_name}}`
     - `{{from_email}}`
     - `{{message}}`

4. **Test locally first:**
   - Make sure your `.env` file works locally
   - Test the form in development mode
   - Then deploy to GitHub Pages

### Build fails with "secret not found"

- Make sure you added all three secrets
- Check that the secret names match exactly:
  - `EMAILJS_SERVICE_ID` (not `EMAILJS_SERVICE` or `SERVICE_ID`)
  - `EMAILJS_TEMPLATE_ID` (not `EMAILJS_TEMPLATE` or `TEMPLATE_ID`)
  - `EMAILJS_PUBLIC_KEY` (not `EMAILJS_KEY` or `PUBLIC_KEY`)

### Form works locally but not on GitHub Pages

- The secrets might not be set correctly
- Try triggering a new deployment after verifying secrets
- Check the browser console on the live site for error messages

## Quick Reference

**Secret Names (must match exactly):**
- `EMAILJS_SERVICE_ID`
- `EMAILJS_TEMPLATE_ID`
- `EMAILJS_PUBLIC_KEY`

**Where to find EmailJS credentials:**
- Dashboard: https://dashboard.emailjs.com/admin
- Service ID: Email Services section
- Template ID: Email Templates section
- Public Key: Account → General

## Need Help?

If you're still having issues:
1. Check the GitHub Actions logs for detailed error messages
2. Verify your EmailJS account is active
3. Make sure your email service is connected in EmailJS
4. Test your EmailJS template using the "Test" button in the dashboard

