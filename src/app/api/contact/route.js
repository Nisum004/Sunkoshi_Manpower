import nodemailer from 'nodemailer'

export async function POST(request) {
  const { name, phone, email, subject, message } = await request.json()

  if (!name || !phone || !message) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE !== 'false',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  await transporter.sendMail({
    from: `"Sunkoshi Manpower Website" <${process.env.SMTP_USER}>`,
    to: process.env.MAIL_TO,
    replyTo: email || undefined,
    subject: `Contact: ${subject || 'New Message'} – ${name}`,
    html: `
      <h2 style="color:#2B3675">New Contact Form Submission</h2>
      <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;background:#f9f9f9">Name</td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;background:#f9f9f9">Phone</td><td style="padding:8px;border:1px solid #ddd">${phone}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;background:#f9f9f9">Email</td><td style="padding:8px;border:1px solid #ddd">${email || '—'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;background:#f9f9f9">Subject</td><td style="padding:8px;border:1px solid #ddd">${subject || '—'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;background:#f9f9f9">Message</td><td style="padding:8px;border:1px solid #ddd;white-space:pre-wrap">${message}</td></tr>
      </table>
    `,
  })

  return Response.json({ success: true })
}
