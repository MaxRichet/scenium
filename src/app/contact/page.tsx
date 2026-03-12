import ContactForm from '@/components/ContactForm'
import Social from '@/components/Social'
import AnimatedBackground from '@/components/AnimatedBackground'
import Line from '@/components/icons/Line';

export default function ContactPage() {
  return (
    <main>
        <section className="relative h-[50vh] w-full px-[125px] max-lg:px-[90px] max-md:px-[60px] max-sm:px-[20px] flex items-end">
            <AnimatedBackground />
            <h1 className='z-1 max-xl:text-[90px]! max-md:text-[60px]! max-sm:text-[45px]!' style={{fontSize: 'var(--h1-desk)'}}>Contactez-nous</h1>
        </section>
        <div className="flex flex-col-reverse lg:flex-row justify-evenly lg:items-start lg:py-[50px] items-center px-[128px] max-lg:px-[90px] max-md:px-[60px] max-sm:px-[20px]">
            <Social />
            <Line className="w-[2px] text-white self-stretch hidden lg:block" />
            <ContactForm />
        </div>
    </main>
  )
}