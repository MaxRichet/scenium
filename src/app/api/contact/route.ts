import { NextResponse } from 'next/server'
import { resend } from '@/lib/resend'

import ReservationEmail from '@/emails/ReservationEmail'
import InformationEmail from '@/emails/InformationEmail'

export async function POST(req: Request) {
  const { type, email, message, boxes } = await req.json()

  if (!type || !email || !message) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }
  try {
    const { data, error } = await resend.emails.send({
      from: 'Contact <onboarding@resend.dev>',
      to: process.env.CONTACT_RECEIVER_EMAIL!,
      replyTo: email,
      subject:
        type === 'reservation'
          ? 'Nouvelle demande de réservation'
          : 'Nouvelle demande de renseignement',
      react:
        type === 'reservation'
          ? ReservationEmail({ email, message, boxes })
          : InformationEmail({ email, message }),
    })

    if (error) {
      console.error('RESEND ERROR:', error)
      return Response.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    }
    return Response.json({ success: true })

  } catch (err) {
    console.error('UNEXPECTED ERROR:', err)
    return Response.json({ success: false }, { status: 500 })
  }
}