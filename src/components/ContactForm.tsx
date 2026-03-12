'use client'

import React, { useState } from 'react'
import DatePicker from './DatePicker'
import Image from 'next/image'
import ButtonAnimation from "@/animations/ButtonAnimation";

export default function ContactForm() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [rateLimitError, setRateLimitError] = useState<string | null>(null)
  const [type, setType] = useState<'reservation' | 'information'>('reservation')
  const [boxes, setBoxes] = useState<string[]>([''])
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [date, setDate] = useState<Date | undefined>();
  const bgRef = React.useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const btnRef = React.useRef<HTMLButtonElement>(null) as React.RefObject<HTMLButtonElement>;

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

  function changeType(newType: 'reservation' | 'information') {
    setType(newType)
    setErrors({})
    setRateLimitError(null)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrors({})
    setRateLimitError(null)

    const formData = new FormData(e.currentTarget)

    const newErrors: Record<string, boolean> = {
      email: !formData.get('email'),
      eventType: type === 'reservation' && !formData.get('eventType'),
      date: type === 'reservation' && !formData.get('date'),
      boxes:
        type === 'reservation' && boxes.some((box) => !box),
      message:
        type === 'information' && !formData.get('message'),
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
        date: formData.get('date'), // Ensure this matches hidden input from DatePicker
        boxes: type === 'reservation' ? boxes : [],
        message: formData.get('message'),
        hp_verify: formData.get('hp_verify'), // Honeypot
      }),
    })

    if (res.ok) {
      setSent(true)
    } else if (res.status === 429) {
      const data = await res.json()
      setRateLimitError(data.error)
    } else {
      alert("Une erreur est survenue lors de l'envoi.")
    }
    setLoading(false)
  }

  if (sent) {
    return (
      <div className="max-w-lg w-full text-white py-[40px] flex items-center justify-center min-h-[500px]">
        <p className="text-green-400 text-center text-[22px]">Votre message a bien été envoyé.</p>
      </div>
    )
  }

  const baseInput =
    'w-full rounded-lg border bg-black px-[15px] py-[5px] outline-none cursor-pointer text-[19px] mb-[23px]';
  const border = (error?: boolean) =>
    error ? '1px solid red' : "1px solid var(--secondary-grey)";

  return (
    <div className="max-w-lg w-full">
      <form
        onSubmit={handleSubmit}
        className="text-white py-[40px]"
      >
        {/* TYPE FORM */}
        <select
          value={type}
          onChange={(e) => changeType(e.target.value as any)}
          className={`${baseInput} lg:w-[50%]! mb-[49px]`}
          style={{ border: `${border()}` }}
        >
          <option value="reservation">Contact réservation</option>
          <option value="information">Demande d’information</option>
        </select>

              {/* EMAIL */}
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={`${baseInput}`}
                style={{ border: `${border(errors.email)}` }}
              />
        
              {/* TYPE EVENT */}
              {type === 'reservation' && (
                <div className="relative mb-[23px]">
                  <select
                    name="eventType"
                    className={`${baseInput} appearance-none mb-0!`}
                    style={{ border: `${border(errors.eventType)}` }}
                  >
                    <option value="" >Type d’événement</option>
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
        
              {/* HONEYPOT - Hidden from humans, renamed and moved here to avoid autofill confusion */}
              <div style={{ position: 'absolute', opacity: 0, zIndex: -1, pointerEvents: 'none' }} aria-hidden="true">
                <input type="text" name="hp_verify" tabIndex={-1} autoComplete="nope" />
              </div>        
              {rateLimitError && (
                <p className="text-red-500 mb-4 font-semibold">{rateLimitError}</p>
              )}
        
              {/* SUBMIT */}        <button className='flex items-center relative h-[40px] cursor-pointer' disabled={loading} ref={btnRef} >
            <div className='absolute rounded-md w-[22px] h-full z-0' style={{ background: "var(--main-color-hexa)", border: "1px solid var(--secondary-blue)" }} ref={bgRef} ></div>
            <Image src="/arrowContactForm.svg" alt="Arrow Icon" width={15} height={15} className='rotate-[-90deg] ml-[4px]' />
            <p className='z-2 ml-[10px] pr-[10px]' style={{ fontSize: 'var(--txt-social' }}>{loading ? 'Envoi...' : 'Envoyer'}</p>
        </button>
      </form>
    </div>
  )
}
