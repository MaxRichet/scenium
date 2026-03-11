export type ContactType = 'reservation' | 'information'

export type ReservationPayload = {
  type: 'reservation'
  email: string
  eventType: string
  date: string
  boxes: string[]
  message?: string
}

export type InformationPayload = {
  type: 'information'
  email: string
  message: string
}

export type ContactPayload = ReservationPayload | InformationPayload

export function isReservationPayload(body: unknown): body is ReservationPayload {
  if (typeof body !== 'object' || body === null) return false
  const p = body as Record<string, unknown>
  return (
    p.type === 'reservation' &&
    typeof p.email === 'string' && p.email.length > 0 &&
    typeof p.eventType === 'string' && p.eventType.length > 0 &&
    typeof p.date === 'string' && p.date.length > 0 &&
    Array.isArray(p.boxes) && p.boxes.every((b) => typeof b === 'string')
  )
}

export function isInformationPayload(body: unknown): body is InformationPayload {
  if (typeof body !== 'object' || body === null) return false
  const p = body as Record<string, unknown>
  return (
    p.type === 'information' &&
    typeof p.email === 'string' && p.email.length > 0 &&
    typeof p.message === 'string' && p.message.length > 0
  )
}
