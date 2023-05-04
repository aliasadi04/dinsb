import { Box } from '@mui/material'
import React from 'react'
import FAQ from '../components/faq.component'


const faq = [
  {
    question: "Hvad tilbyder dinsb?",
    answer: "dinsb tilbyder Soundboks-udlejning til din næste begivenhed 🎉. Vi kan også levere og opsætte Soundboksene på dit sted, og hvis du har brug for det, kan vi endda sende en af vores venlige chauffører for at transportere udstyret for dig 🚚."
  },
  {
    question: "Hvordan kan jeg leje Soundboksene fra dinsb?",
    answer: "At leje Soundboksene fra dinsb er super enkelt 🙌. Du kan kontakte os via vores hjemmeside eller telefon, og vi vil tage os af resten. Vi vil arrangere levering og opsætning af Soundboksene, så du kan slappe af og fokusere på at forberede din begivenhed 🎵."
  },
  {
    question: "Hvad er prisen for at leje Soundboksene?",
    answer: "Prisen for at leje Soundboksene varierer afhængigt af flere faktorer, såsom størrelsen på Soundboksene, lejeperioden og om du har brug for en af vores chauffører til at køre Soundboksene til og fra din begivenhed 🤔. Men fortvivl ikke, vores priser er rimelige og konkurrencedygtige 💸. Kontakt os for at få en pris, der passer til dine behov 💬."
  },
  {
    question: "Hvordan betaler jeg for Soundboksleje?",
    answer: "Vi ønsker at gøre det så let som muligt for dig at betale for Soundboksleje 🤗. Du kan betale via bankoverførsel eller kontant ved levering af Soundboksene 🏦💰. Hvis du har spørgsmål eller bekymringer om betaling, er du velkommen til at kontakte os, så hjælper vi dig gerne 💬."
  },
  {
    question: "Kan jeg afbestille min Soundboksleje?",
    answer: "Selvfølgelig, vi forstår, at planer kan ændre sig, og vi vil ikke lægge ekstra byrder på dig 🙏. Du kan afbestille din Soundboksleje når som helst ved at kontakte os så tidligt som muligt. Vi vil arbejde sammen med dig for at finde den bedste løsning, og du vil ikke blive opkrævet nogen afbestillingsgebyrer 🚫."
  }
];





const FAQPage = () => {
  return (
    <Box sx={{flexGrow:1,mt:1,minHeight:100,display:'flex',flexDirection:'column',alignItems:'center',py:10,}}>

    {faq.map(({question,answer})=><FAQ q={question} a={answer} />)}

    </Box>
  )
}

export default FAQPage