# EmailJS Troubleshooting Guide

## Common Error: 400 Bad Request

If you're seeing a **400 error** when submitting the contact form, it usually means one of these issues:

### 1. EmailJS Credentials Not Set Up

**Problem:** The `.env` file doesn't exist or has placeholder values.

**Solution:**
1. Create a `.env` file in the `my-portfolio` directory
2. Add your EmailJS credentials:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxx
```

3. **Restart your dev server** after creating/updating the `.env` file:
   - Stop the server (Ctrl+C)
   - Run `npm run dev` again

### 2. Invalid Service ID or Template ID

**Problem:** The Service ID or Template ID doesn't exist or is incorrect.

**How to check:**
1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/admin)
2. Check your **Service ID** in "Email Services" section
3. Check your **Template ID** in "Email Templates" section
4. Make sure they match exactly what's in your `.env` file

**Solution:** Update your `.env` file with the correct IDs.

### 3. Template Variables Don't Match

**Problem:** The template variables in your EmailJS template don't match what the form is sending.

**What the form sends:**
- `{{from_name}}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{message}}` - The message content
- `{{to_email}}` - Your email address

**Solution:**
1. Go to your EmailJS template
2. Make sure your template uses these exact variable names:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{message}}`
   - `{{to_email}}` (optional, if you want to include it)

### 4. Public Key is Incorrect

**Problem:** The Public Key is wrong or expired.

**How to check:**
1. Go to EmailJS Dashboard → **Account** → **General**
2. Find your **Public Key**
3. Copy it exactly (no spaces, no extra characters)

**Solution:** Update the `VITE_EMAILJS_PUBLIC_KEY` in your `.env` file.

### 5. Email Service Not Connected

**Problem:** Your email service (Gmail, Outlook, etc.) isn't properly connected.

**Solution:**
1. Go to EmailJS Dashboard → **Email Services**
2. Make sure your service shows as "Connected" or "Active"
3. If not, reconnect it following the setup instructions

## Quick Setup Checklist

- [ ] Created EmailJS account at https://www.emailjs.com/
- [ ] Added an email service (Gmail, Outlook, etc.)
- [ ] Created an email template with variables: `{{from_name}}`, `{{from_email}}`, `{{message}}`
- [ ] Got your Service ID, Template ID, and Public Key
- [ ] Created `.env` file in `my-portfolio` directory
- [ ] Added all three credentials to `.env` file
- [ ] Restarted the dev server after creating `.env`
- [ ] Tested the form submission

## Testing Your Setup

1. **Check browser console** (F12) for detailed error messages
2. The form will now show specific error messages:
   - "EmailJS credentials not configured" - Missing `.env` file
   - "Invalid EmailJS configuration" - Wrong IDs or keys
   - "Unauthorized" - Wrong Public Key
   - "Service or Template not found" - Wrong Service ID or Template ID

## Still Having Issues?

1. **Check the browser console** (F12 → Console tab) for detailed error messages
2. **Verify your EmailJS dashboard** - Make sure everything is set up correctly
3. **Test your template** - Use EmailJS's "Test" button in the template editor
4. **Check EmailJS status** - Visit https://status.emailjs.com/ to see if there are any service issues

## Example .env File

```env
# EmailJS Configuration
# Get these from https://dashboard.emailjs.com/admin

VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=abcdefghijklmnopqrstuvwxyz123456
```

**Important:** 
- No quotes around the values
- No spaces before or after the `=`
- Restart dev server after changes

