import { NextResponse } from 'next/server'
import { resend } from '@/lib/resend'
import { contactRatelimit } from '@/lib/ratelimit'

import ReservationEmail from '@/emails/ReservationEmail'
import InformationEmail from '@/emails/InformationEmail'

export async function POST(req: Request) {
  const { type, email, message, boxes, website_url } = await req.json()

  // 1. Honeypot check
  if (website_url) {
    console.warn('Bot detected via Honeypot')
    return NextResponse.json({ success: true }) // Silent fail for bots
  }

  // 2. Rate limiting check
  if (process.env.UPSTASH_REDIS_REST_URL) {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1'
    const { success } = await contactRatelimit.limit(ip)

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Trop de tentatives. Veuillez réessayer plus tard.' },
        { status: 429 }
      )
    }
  }

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