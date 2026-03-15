export type ProcessStep = {
  id: number
  title: string
  text: string
}

export const processData: ProcessStep[] = [
  {
    id: 1,
    title: 'Contacte',
    text: "Tout commence par un simple formulaire. Vous y partagez l'histoire de votre événement : où il aura lieu, quand, et l'univers que vous souhaitez créer. C'est là que votre scène prend vie pour la première fois.",
  },
  {
    id: 2,
    title: 'Échange',
    text: "En moins de 24h, notre équipe revient vers vous pour affiner cette vision. On discute de tous les détails importants… Ensemble, on construit une expérience fidèle à l'émotion que vous voulez offrir à vos invités.",
  },
  {
    id: 3,
    title: 'Profite',
    text: "Puis vient enfin le grand jour. Nous livrons et installons la box pendant que vous vous concentrez sur l'essentiel : vivre votre moment. Quand tout est prêt, il ne reste qu'à capturer des souvenirs qui resteront longtemps.",
  },
]
