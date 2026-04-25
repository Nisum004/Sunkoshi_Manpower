import nodemailer from 'nodemailer'

export async function POST(request) {
  const data = await request.json()
  const { full_name, phone, dob, email, district, education, preferred_country,
    job_category, applying_for_job, experience, passport_status, experience_details } = data

  if (!full_name || !phone || !preferred_country) {
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

  const row = (label, value) =>
    `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;background:#f9f9f9;width:180px">${label}</td><td style="padding:8px;border:1px solid #ddd">${value || '—'}</td></tr>`

  await transporter.sendMail({
    from: `"Sunkoshi Manpower Website" <${process.env.SMTP_USER}>`,
    to: process.env.MAIL_TO,
    replyTo: email || undefined,
    subject: `Job Seeker Registration – ${full_name} | ${preferred_country}`,
    html: `
      <h2 style="color:#2B3675">New Job Seeker Registration</h2>
      <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
        <tr><td colspan="2" style="padding:10px 8px;background:#2B3675;color:#fff;font-weight:700">Personal Information</td></tr>
        ${row('Full Name', full_name)}
        ${row('Date of Birth', dob)}
        ${row('Phone / WhatsApp', phone)}
        ${row('Email', email)}
        ${row('District / Province', district)}
        ${row('Education', education)}
        <tr><td colspan="2" style="padding:10px 8px;background:#2B3675;color:#fff;font-weight:700">Work Preference</td></tr>
        ${row('Preferred Country', preferred_country)}
        ${row('Job Category', job_category)}
        ${row('Applying For (Job ID)', applying_for_job || 'General Registration')}
        ${row('Experience', experience)}
        ${row('Passport Status', passport_status)}
        ${row('Skills / Experience Details', `<div style="white-space:pre-wrap">${experience_details || '—'}</div>`)}
      </table>
    `,
  })

  return Response.json({ success: true })
}
