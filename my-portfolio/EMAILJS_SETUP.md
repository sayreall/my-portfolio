# EmailJS Setup Guide

This guide will help you set up EmailJS to enable the contact form to send emails to your inbox.

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (free tier includes 200 emails/month)

## Step 2: Add an Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email account
5. Note down your **Service ID** (e.g., `service_xxxxxxx`)

## Step 3: Create an Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template structure:

```
Subject: New Contact Form Message from {{from_name}}

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Save the template and note down your **Template ID** (e.g., `template_xxxxxxx`)

## Step 4: Get Your Public Key

1. Go to **Account** > **General**
2. Find your **Public Key** (e.g., `xxxxxxxxxxxxx`)

## Step 5: Configure Your Project

### Option A: Using Environment Variables (Recommended)

1. Create a `.env` file in the `my-portfolio` directory
2. Add the following variables:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

3. Replace the placeholder values with your actual EmailJS credentials
4. **Important**: Add `.env` to your `.gitignore` file to keep your keys secure

### Option B: Direct Configuration

If you prefer not to use environment variables, you can directly edit `src/App.jsx`:

1. Open `my-portfolio/src/App.jsx`
2. Find the `handleSubmit` function
3. Replace the placeholder values:
   - `YOUR_SERVICE_ID` → Your Service ID
   - `YOUR_TEMPLATE_ID` → Your Template ID
   - `YOUR_PUBLIC_KEY` → Your Public Key

## Step 6: Test the Contact Form

1. Start your development server: `npm run dev`
2. Navigate to the contact section
3. Fill out and submit the form
4. Check your email inbox for the message

## Security Notes

- Never commit your `.env` file to version control
- The `.env` file is already in `.gitignore`
- EmailJS public keys are safe to use in client-side code
- For production, always use environment variables

## Troubleshooting

- **"Failed to send message"**: Check that all your EmailJS credentials are correct
- **No email received**: Check your spam folder and verify your email service is connected
- **CORS errors**: Make sure your domain is added to EmailJS allowed origins (if using a custom domain)

## Need Help?

- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Support: [https://www.emailjs.com/support/](https://www.emailjs.com/support/)

