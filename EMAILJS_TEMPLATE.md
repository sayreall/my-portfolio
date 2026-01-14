# EmailJS Email Template

Copy and paste this template into your EmailJS dashboard when creating a new email template.

## Template Settings

- **Template Name**: Portfolio Contact Form
- **Subject**: New Contact Form Message from {{from_name}}

## Email Template Content

```
Subject: New Contact Form Message from {{from_name}}

---

Hello!

You have received a new message from your portfolio contact form.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

From: {{from_name}}
Email: {{from_email}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Message:
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This message was sent from your portfolio contact form.
Reply directly to: {{from_email}}

```

## HTML Version (More Styled)

If you want a more styled HTML version, use this:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px;
      border-radius: 8px 8px 0 0;
      text-align: center;
    }
    .content {
      background: #f9f9f9;
      padding: 30px;
      border: 1px solid #ddd;
      border-top: none;
    }
    .info-box {
      background: white;
      padding: 20px;
      border-left: 4px solid #667eea;
      margin: 20px 0;
      border-radius: 4px;
    }
    .message-box {
      background: white;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
      border: 1px solid #e0e0e0;
    }
    .footer {
      background: #f5f5f5;
      padding: 15px;
      text-align: center;
      color: #666;
      font-size: 12px;
      border-radius: 0 0 8px 8px;
      border: 1px solid #ddd;
      border-top: none;
    }
    .label {
      font-weight: bold;
      color: #667eea;
      display: inline-block;
      min-width: 80px;
    }
    .divider {
      height: 2px;
      background: linear-gradient(to right, #667eea, #764ba2);
      margin: 20px 0;
      border-radius: 2px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h2 style="margin: 0;">📧 New Contact Form Message</h2>
  </div>
  
  <div class="content">
    <p>Hello!</p>
    <p>You have received a new message from your portfolio contact form.</p>
    
    <div class="divider"></div>
    
    <div class="info-box">
      <p style="margin: 10px 0;">
        <span class="label">From:</span> {{from_name}}
      </p>
      <p style="margin: 10px 0;">
        <span class="label">Email:</span> 
        <a href="mailto:{{from_email}}" style="color: #667eea; text-decoration: none;">{{from_email}}</a>
      </p>
    </div>
    
    <div class="message-box">
      <h3 style="margin-top: 0; color: #333;">Message:</h3>
      <p style="white-space: pre-wrap; color: #555;">{{message}}</p>
    </div>
    
    <div class="divider"></div>
    
    <p style="color: #666; font-size: 14px;">
      <strong>💡 Tip:</strong> Reply directly to this email to respond to {{from_name}}.
    </p>
  </div>
  
  <div class="footer">
    <p style="margin: 0;">
      This message was sent from your portfolio contact form<br>
      <a href="mailto:{{from_email}}" style="color: #667eea;">Reply to: {{from_email}}</a>
    </p>
  </div>
</body>
</html>
```

## Plain Text Version (Simple)

If you prefer a simple plain text version:

```
Subject: New Contact Form Message from {{from_name}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEW CONTACT FORM MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

From: {{from_name}}
Email: {{from_email}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MESSAGE:
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Reply to: {{from_email}}

This message was sent from your portfolio contact form.
```

## How to Use This Template

1. **Log in to EmailJS**: Go to [https://www.emailjs.com/](https://www.emailjs.com/) and log in
2. **Go to Email Templates**: Click on "Email Templates" in the sidebar
3. **Create New Template**: Click "Create New Template"
4. **Fill in the details**:
   - Template Name: `Portfolio Contact Form` (or any name you prefer)
   - Subject: `New Contact Form Message from {{from_name}}`
   - Content: Copy and paste one of the templates above (HTML version recommended)
5. **Save the template**: Click "Save"
6. **Copy the Template ID**: You'll need this for your `.env` file

## Template Variables Used

- `{{from_name}}` - The sender's name
- `{{from_email}}` - The sender's email address
- `{{message}}` - The message content

These variables match what we're sending from the contact form in `App.jsx`.

## Testing

After setting up the template:
1. Test it using EmailJS's "Test" button in the template editor
2. Use these test values:
   - `from_name`: Test User
   - `from_email`: test@example.com
   - `message`: This is a test message
3. Check your email inbox to see how it looks

