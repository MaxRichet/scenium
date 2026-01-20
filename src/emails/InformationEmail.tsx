import { Html, Text } from '@react-email/components'

type Props = {
  email: string
  message: string
}

export default function InformationEmail({ email, message }: Props) {
  return (
    <Html>
      <Text>ℹ️ Demande de renseignement</Text>
      <Text>Email client : {email}</Text>
      <Text>Message :</Text>
      <Text>{message}</Text>
    </Html>
  )
}