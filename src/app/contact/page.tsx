import ContactForm from '@/components/forms/ContactForm'
import Title from '@/components/ui/Title'
import Social from '@/components/ui/Social'
import AnimatedBackground from '@/components/background/AnimatedBackground'
import Line from '@/components/icons/Line';

export default function ContactPage() {
  return (
    <main>
        <section className="relative h-[50vh] w-full px-[125px] max-lg:px-[90px] max-md:px-[60px] max-sm:px-[20px] flex items-end">
            <AnimatedBackground />
            <Title as="h1" className='z-1'>Contactez-nous</Title>
        </section>
        <div className="flex flex-col-reverse lg:flex-row justify-evenly lg:items-start lg:py-[50px] items-center px-[128px] max-lg:px-[90px] max-md:px-[60px] max-sm:px-[20px]">
            <Social />
            <Line className="w-[2px] text-white self-stretch hidden lg:block" />
            <ContactForm />
        </div>
    </main>
  )
}
