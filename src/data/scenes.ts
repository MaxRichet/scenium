export type Slide = {
  id: number
  title: string
  description: string
  image: string
}

export const slidesData: Slide[] = [
  {
    id: 1,
    title: 'Fleur',
    description: 'Créez votre jardin secret : réservez ce décor floral pour des photos inoubliables.',
    image: '/fleur.png',
  },
  {
    id: 2,
    title: 'Nuage',
    description: 'Une ambiance onirique et vaporeuse pour capturer des instants hors du temps.',
    image: '/nuage.png',
  },
  {
    id: 3,
    title: 'Ballon',
    description: 'Un moment magique entouré de reflets et de lumières, idéal pour un impact visuel.',
    image: '/ballon.png',
  },
]
