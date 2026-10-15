// netlify/functions/contact.js
// Receives the contact form from the site and emails it to you using Resend.
// The Resend API key stays here on the server and is never sent to the browser.

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const json = (statusCode, message) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message }),
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, 'Method not allowed.');
  }

  let data;
  try {
    data = JSON.parse(event.body || '{}');
  } catch {
    return json(400, 'Invalid request.');
  }

  const name = String(data.name || '').trim();
  const email = String(data.email || '').trim();
  // Remove line breaks from the subject so it can't be used to inject email headers
  const subject = String(data.subject || '').replace(/[\r\n]+/g, ' ').trim();
  const message = String(data.message || '').trim();

  // Validation
  if (!name || !email || !subject || !message) {
    return json(400, 'Please fill in all fields.');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json(400, 'Please enter a valid email address.');
  }
  if (name.length > 100 || subject.length > 150 || email.length > 200) {
    return json(400, 'One of the fields is too long.');
  }
  if (message.length < 10 || message.length > 5000) {
    return json(400, 'Message must be between 10 and 5000 characters.');
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL) {
    console.error('Missing RESEND_API_KEY or CONTACT_TO_EMAIL environment variable.');
    return json(500, 'Email service is not configured yet.');
  }

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#111;">
      <h2 style="margin:0 0 16px;color:#ef6c35;">New message from your portfolio</h2>
      <p style="margin:4px 0;"><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p style="margin:4px 0;"><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p style="margin:4px 0;"><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <hr style="border:none;border-top:1px solid #ddd;margin:16px 0;" />
      <p style="white-space:pre-wrap;line-height:1.6;margin:0;">${escapeHtml(message)}</p>
      <p style="margin-top:24px;font-size:12px;color:#888;">Hit Reply to answer ${escapeHtml(name)} directly.</p>
    </div>
  `;

  const text = `New message from your portfolio\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Without your own domain, Resend only allows this sender address
        from: CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>',
        to: [CONTACT_TO_EMAIL],
        reply_to: email, // pressing Reply in Gmail answers the visitor
        subject: `Portfolio: ${subject}`,
        html,
        text,
      }),
    });

    if (!response.ok) {
      console.error('Resend error:', response.status, await response.text());
      return json(502, 'Could not send your message. Please try again later.');
    }

    return json(200, "Message sent successfully! I'll get back to you soon.");
  } catch (err) {
    console.error('Contact function error:', err);
    return json(500, 'Something went wrong. Please try again.');
  }
};