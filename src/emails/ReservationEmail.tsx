import { Html, Text } from '@react-email/components'

type Props = {
  email: string
  message: string
  boxes: string[]
  date: string
}

export default function ReservationEmail({ email, message, boxes, date }: Props) {
  return (
    <Html>
      <Text>📅 Demande de réservation</Text>
      <Text>Email client : {email}</Text>
      <Text>Date souhaitée : {date}</Text>

      <Text>Box souhaitée :</Text>
      {boxes.map((box, index) => (
        <Text key={index}>- {box}</Text>
      ))}

      <Text>Message :</Text>
      <Text>{message}</Text>
    </Html>
  )
}