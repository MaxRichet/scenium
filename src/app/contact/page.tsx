import ContactForm from '@/components/ContactForm'
import Social from '@/components/Social'
import AnimatedBackground from '@/components/AnimatedBackground'
import Line from '@/components/icons/Line';

export default function ContactPage() {
  return (
    <main>
        <section className="relative h-[50vh] w-full pl-[125px] flex items-end">
            <AnimatedBackground />
            <h1 className='z-1' style={{fontSize: 'var(--h1-desk)'}}>Contactez-nous</h1>
        </section>
        <div className="flex justify-evenly items-stretch">
            <Social />
            <Line className="w-[2px] text-white self-stretch" />
            <ContactForm />
        </div>
    </main>
  )
}