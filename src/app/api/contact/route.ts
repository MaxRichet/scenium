import { NextRequest, NextResponse } from 'next/server'
import { resend } from '@/lib/resend'
import { contactRatelimit } from '@/lib/ratelimit'
import { isReservationPayload, isInformationPayload } from '@/types/contact'
import ReservationEmail from '@/lib/emails/ReservationEmail'
import InformationEmail from '@/lib/emails/InformationEmail'

import ReservationEmail from '@/emails/ReservationEmail'
import InformationEmail from '@/emails/InformationEmail'

export async function POST(req: Request) {
  const rawPayload = await req.json()
  
  const sanitize = (val: unknown, maxLen: number): string => 
    typeof val === 'string' ? val.trim().slice(0, maxLen) : ''

  interface ContactPayload {
    type: 'reservation' | 'information'
    email: string
    message: string
    boxes: string[]
    date: string
    fax_number: string
  }

  const payload: ContactPayload = {
    type: rawPayload.type === 'reservation' ? 'reservation' : 'information',
    email: sanitize(rawPayload.email, 255),
    message: sanitize(rawPayload.message, 5000),
    boxes: Array.isArray(rawPayload.boxes) ? rawPayload.boxes.map((b: unknown) => sanitize(b, 50)) : [],
    date: sanitize(rawPayload.date, 20),
    fax_number: sanitize(rawPayload.fax_number, 255)
  }

  const { type, email, message, boxes, date, fax_number } = payload

  console.log('--- NEW CONTACT SUBMISSION ---')
  console.log('Payload:', JSON.stringify(payload, null, 2))

  if (fax_number) {
    console.warn('BOT DETECTED: Honeypot field filled')
    return NextResponse.json({ success: true })
  }

  if (process.env.UPSTASH_REDIS_REST_URL) {
    const forwarded = req.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : (req.headers.get('x-real-ip') || '127.0.0.1')
    
    console.log('IP Detected for Rate Limit:', ip)
    const { success, limit, reset, remaining } = await contactRatelimit.limit(ip)
    console.log(`Rate Limit Status: ${success ? 'OK' : 'BLOCKED'} (${remaining}/${limit}) - Reset in ${reset}`)

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Trop de tentatives. Veuillez réessayer plus tard.' },
        { status: 429 }
      )
    }
  }

  if (!email) {
    console.error('VALIDATION FAILED: Missing email')
    return NextResponse.json({ error: 'Email requis' }, { status: 400 })
  }

  try {
    const { error } = await resend.emails.send({
      from: 'Contact <onboarding@resend.dev>',
      to: process.env.CONTACT_RECEIVER_EMAIL!,
      replyTo: body.email,
      subject:
        body.type === 'reservation'
          ? 'Nouvelle demande de réservation'
          : 'Nouvelle demande de renseignement',
      react:
        type === 'reservation'
          ? ReservationEmail({ email, message, boxes, date })
          : InformationEmail({ email, message }),
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
