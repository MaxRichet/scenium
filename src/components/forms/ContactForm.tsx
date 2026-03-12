'use client'

import React, { useRef, useState } from 'react'
import DatePicker from './DatePicker'
import Image from 'next/image'
import ButtonAnimation from "@/hooks/ButtonAnimation";
import type { ContactType } from '@/types/contact'
import Text from '@/components/ui/Text'

export default function ContactForm() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState<ContactType>('reservation')
  const [boxes, setBoxes] = useState<string[]>([''])
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [date, setDate] = useState<Date | undefined>();
  const bgRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  ButtonAnimation(bgRef, btnRef);

  function addBox() {
    setBoxes([...boxes, ''])
  }

  function removeBox(index: number) {
    setBoxes(boxes.filter((_, i) => i !== index))
  }

  function updateBox(index: number, value: string) {
    const updated = [...boxes]
    updated[index] = value
    setBoxes(updated)
  }

  function changeType(newType: ContactType) {
    setType(newType)
    setErrors({})
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrors({})

    const formData = new FormData(e.currentTarget)

    const newErrors: Record<string, boolean> = {
      email: !formData.get('email'),
      eventType: type === 'reservation' && !formData.get('eventType'),
      date: type === 'reservation' && !formData.get('date'),
      boxes: type === 'reservation' && boxes.some((box) => !box),
      message: type === 'information' && !formData.get('message'),
    }

    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors)
      return
    }

    setLoading(true)

    const res = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        type,
        email: formData.get('email'),
        eventType: formData.get('eventType'),
        date: formData.get('date'),
        boxes: type === 'reservation' ? boxes : [],
        message: formData.get('message'),
        website_url: formData.get('website_url'), // Honeypot
      }),
    })

    if (res.ok) {
      setSent(true)
    } else if (res.status === 429) {
      const data = await res.json()
      alert(data.error)
    } else {
      alert("Une erreur est survenue lors de l'envoi.")
    }
    setLoading(false)
  }

  if (sent) {
    return <Text className="text-green-400">Votre message a bien été envoyé.</Text>
  }

  const baseInput =
    'w-full rounded-lg border bg-black px-[15px] py-[5px] outline-none cursor-pointer text-[19px] mb-[23px]';
  const border = (error?: boolean) =>
    error ? '1px solid red' : "1px solid var(--secondary-grey)";

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg text-white py-[40px]"
    >
      {/* TYPE FORM */}
      <select
        value={type}
        onChange={(e) => changeType(e.target.value as ContactType)}
        className={`${baseInput} w-[50%]! mb-[49px]`}
        style={{ border: `${border()}` }}
      >
        <option value="reservation">Contact réservation</option>
        <option value="information">Demande d&apos;information</option>
      </select>

      {/* EMAIL */}
      <input
        type="email"
        name="email"
        placeholder="Email"
        className={`${baseInput}`}
        style={{ border: `${border(errors.email)}` }}
      />

      {/* HONEYPOT - Hidden from humans */}
      <div style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
        <input type="text" name="website_url" tabIndex={-1} autoComplete="off" />
      </div>

      {/* TYPE EVENT */}
      {type === 'reservation' && (
        <div className="relative mb-[23px]">
          <select
            name="eventType"
            className={`${baseInput} appearance-none mb-0!`}
            style={{ border: `${border(errors.eventType)}` }}
          >
            <option value="" >Type d&apos;événement</option>
            <option value="anniversaire">Anniversaire</option>
            <option value="entreprise">Événement pro</option>
            <option value="autre">Autre</option>
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white">
            <Image src="/arrowContactForm.svg" alt="Dropdown Icon" width={15} height={15} />
          </span>
        </div>
      )}

      {/* DATE */}
      {type === "reservation" && (
        <DatePicker
          name="date"
          value={date}
          onChange={setDate}
          className={`${baseInput}`}
          style={{ border: `${border(errors.date)}` }}
        />
      )}

      {/* BOXES */}
      {type === 'reservation' && (
        <div className="space-y-3 mb-[23px]">
          {boxes.map((box, index) => (
            <div key={index} className="flex gap-2">
              <div className='relative w-full'>
                <select
                  value={box}
                  onChange={(e) => updateBox(index, e.target.value)}
                  className={`${baseInput} appearance-none mb-0!`}
                  style={{ border: `${border(errors.boxes)}` }}
                >
                  <option value="">Box souhaité</option>
                  <option value="box1">Box 1</option>
                  <option value="box2">Box 2</option>
                  <option value="box3">Box 3</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white">
                  <Image src="/arrowContactForm.svg" alt="Dropdown Icon" width={15} height={15} />
                </span>
              </div>

              {/* DELETE BOX */}
              {boxes.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeBox(index)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border text-xl cursor-pointer bg-black"
                  style={{ border: "1px solid var(--secondary-grey)" }}
                >
                  -
                </button>
              )}

              {/* ADD BOX */}
              {index === boxes.length - 1 && (
                <button
                  type="button"
                  onClick={addBox}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border text-xl cursor-pointer bg-black"
                  style={{ border: "1px solid var(--secondary-grey)" }}
                >
                  <Image src="/plus.svg" alt="Plus Icon" width={15} height={15} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* MESSAGE */}
      <textarea
        name="message"
        placeholder="Message"
        rows={3}
        className={`${baseInput} resize-none`}
        style={{ border: `${border(errors.message)}` }}
      />

      {/* SUBMIT */}
      <button className='flex items-center relative h-[40px] cursor-pointer' disabled={loading} ref={btnRef} >
          <div className='absolute rounded-md w-[22px] h-full z-0' style={{ background: "var(--main-color-hexa)", border: "1px solid var(--secondary-blue)" }} ref={bgRef} ></div>
          <Image src="/arrowContactForm.svg" alt="Arrow Icon" width={15} height={15} className='rotate-[-90deg] ml-[4px]' />
          <Text className='z-2 ml-[10px] pr-[10px]'>{loading ? 'Envoi...' : 'Envoyer'}</Text>
      </button>
    </form>
  )
}
