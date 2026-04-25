// Phase 2: This will handle form submissions via Node.js
// For now, forms post directly to FormSubmit.co
export async function POST(request) {
  const body = await request.json()
  // TODO: Phase 2 — save to MongoDB + send email via Nodemailer
  return Response.json({ success: true })
}
