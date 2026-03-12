import { NextResponse } from 'next/server'
import { resend } from '@/lib/resend'
import { contactRatelimit } from '@/lib/ratelimit'

import ReservationEmail from '@/emails/ReservationEmail'
import InformationEmail from '@/emails/InformationEmail'

export async function POST(req: Request) {
  const payload = await req.json()
  const { type, email, message, boxes, date, fax_number } = payload

  console.log('--- NEW CONTACT SUBMISSION ---')
  console.log('Payload:', JSON.stringify(payload, null, 2))

  // 1. Honeypot check
  if (fax_number) {
    console.warn('BOT DETECTED: Honeypot field filled')
    return NextResponse.json({ success: true })
  }

  // 2. Rate limiting check
  if (process.env.UPSTASH_REDIS_REST_URL) {
    // Better IP detection for Docker/Vercel
    const forwarded = req.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : (req.headers.get('x-real-ip') || '127.0.0.1')
    
    console.log('IP Detected for Rate Limit:', ip)
    const { success, limit, reset, remaining } = await contactRatelimit.limit(ip)
    console.log(`Rate Limit Status: ${success ? 'OK' : 'BLOCKED'} (${remaining}/${limit}) - Reset in ${reset}`)

    if (!success) {
      console.warn(`RATE LIMIT EXCEEDED for IP: ${ip}`)
      return NextResponse.json(
        { success: false, error: 'Vous avez envoyer trop de demande réessayer plus tard.' },
        { status: 429 }
      )
    }
  }

  // Validation: Email and Type are always required.
  if (!type || !email) {
    console.error('VALIDATION FAILED: Missing type or email', { type, email })
    return NextResponse.json({ error: 'Champs requis manquants (Email ou Type)' }, { status: 400 })
  }

  try {
    console.log('Sending email via Resend to:', process.env.CONTACT_RECEIVER_EMAIL)
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
          ? ReservationEmail({ email, message: message || '', boxes: boxes || [], date: date || '' })
          : InformationEmail({ email, message: message || '' }),
    })

    if (error) {
      console.error('RESEND API ERROR:', error)
      return Response.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    }

    console.log('Email sent successfully:', data?.id)
    return Response.json({ success: true })

  } catch (err) {
    console.error('UNEXPECTED SERVER ERROR:', err)
    return Response.json({ success: false }, { status: 500 })
  }
}