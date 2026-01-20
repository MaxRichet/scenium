import ContactForm from '@/components/ContactForm'
import AnimatedBackground from '@/components/AnimatesBackground'

export default function ContactPage() {
  return (
    <main className='h-full'>
        <section className="relative h-[50%] w-full pl-[125px] flex items-end">
            <AnimatedBackground />
            <h1 className='z-1' style={{fontSize: 'var(--h1-desk)'}}>Contactez-nous</h1>
        </section>
        <p>
            Pour toute demande de réservation ou de renseignement,
            merci de remplir le formulaire ci-dessous.
        </p>
        <ContactForm />
    </main>
  )
}