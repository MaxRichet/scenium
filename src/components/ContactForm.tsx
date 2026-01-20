'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState<'reservation' | 'information'>('reservation')
  const [boxes, setBoxes] = useState<string[]>(['choix1'])

  function addBox() {
    setBoxes([...boxes, 'choix1'])
  }

  function updateBox(index: number, value: string) {
    const updated = [...boxes]
    updated[index] = value
    setBoxes(updated)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    const res = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        type,
        email: formData.get('email'),
        message: formData.get('message'),
        boxes: type === 'reservation' ? boxes : [],
      }),
    })

    if (res.ok) setSent(true)
    setLoading(false)
  }

  if (sent) {
    return <p>✅ Votre message a bien été envoyé.</p>
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* TYPE */}
      <select
        name="type"
        value={type}
        onChange={(e) => setType(e.target.value as any)}
      >
        <option value="reservation">Réservation</option>
        <option value="information">Renseignement</option>
      </select>
      <div className="bg-red-500 p-20 text-white">
        TEST TAILWIND
      </div>

      {/* BOXES (uniquement réservation) */}
      {type === 'reservation' && (
        <div>
          <p>Box souhaitée</p>

          {boxes.map((box, index) => (
            <select
              key={index}
              value={box}
              onChange={(e) => updateBox(index, e.target.value)}
            >
              <option value="choix1">Choix 1</option>
              <option value="choix2">Choix 2</option>
              <option value="choix3">Choix 3</option>
            </select>
          ))}

          <button type="button" onClick={addBox}>
            + Ajouter une box
          </button>
        </div>
      )}

      {/* EMAIL */}
      <input
        type="email"
        name="email"
        placeholder="Votre email"
        required
      />

      {/* MESSAGE */}
      <textarea
        name="message"
        placeholder="Votre message"
        required
      />

      <button disabled={loading}>
        {loading ? 'Envoi...' : 'Envoyer'}
      </button>
    </form>
  )
}