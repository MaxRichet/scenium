import { NextRequest, NextResponse } from 'next/server'
import { resend } from '@/lib/resend'
import { contactRatelimit } from '@/lib/ratelimit'
import { isReservationPayload, isInformationPayload } from '@/types/contact'
import ReservationEmail from '@/lib/emails/ReservationEmail'
import InformationEmail from '@/lib/emails/InformationEmail'

export async function POST(req: NextRequest) {
  const body: unknown = await req.json()

  // 1. Honeypot check
  if (typeof body === 'object' && body !== null && 'website_url' in body && (body as Record<string, unknown>).website_url) {
    console.warn('Bot detected via Honeypot')
    return NextResponse.json({ success: true }) // Silent fail for bots
  }

  // 2. Rate limiting check
  if (process.env.UPSTASH_REDIS_REST_URL) {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? '127.0.0.1'
    const { success } = await contactRatelimit.limit(ip)

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Trop de tentatives. Veuillez réessayer plus tard.' },
        { status: 429 }
      )
    }
  }

  if (!isReservationPayload(body) && !isInformationPayload(body)) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Contact <onboarding@resend.dev>',
      to: process.env.CONTACT_RECEIVER_EMAIL!,
      replyTo: body.email,
      subject:
        body.type === 'reservation'
          ? 'Nouvelle demande de réservation'
          : 'Nouvelle demande de renseignement',
      react:
        body.type === 'reservation'
          ? ReservationEmail({ email: body.email, message: body.message ?? '', boxes: body.boxes })
          : InformationEmail({ email: body.email, message: body.message }),
    })

    if (error) {
      console.error('RESEND ERROR:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('UNEXPECTED ERROR:', err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
