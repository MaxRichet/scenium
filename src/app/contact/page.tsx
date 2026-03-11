import ContactForm from '@/components/forms/ContactForm'
import Title from '@/components/ui/Title'
import Social from '@/components/ui/Social'
import AnimatedBackground from '@/components/background/AnimatedBackground'
import Line from '@/components/icons/Line';

export default function ContactPage() {
  return (
    <main>
        <section className="relative h-[50vh] w-full pl-[125px] flex items-end">
            <AnimatedBackground />
            <Title as="h1" className='z-1'>Contactez-nous</Title>
        </section>
        <div className="flex justify-evenly items-stretch">
            <Social />
            <Line className="w-[2px] text-white self-stretch" />
            <ContactForm />
        </div>
    </main>
  )
}