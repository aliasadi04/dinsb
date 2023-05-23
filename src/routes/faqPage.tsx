import { Box } from '@mui/material'
import React from 'react'
import FAQ from '../components/faq.component'


const faq = [
  
  {
    question: "Hvordan kan jeg leje Soundboksene fra dinsb?",
    answer: `For at leje Soundboksene fra DinSoundboks, kan du nemt bruge vores online bookingsystem. Gå til vores hjemmeside, hvor du kan reservere dine ønskede datoer og tider med blot nogle få klik. Når din booking er bekræftet, kan du selv hente Soundboksen fra vores placering på Triumfvej 62B i Bagsværd.
    
    Hvis du ønsker levering til døren, bedes du kontakte os via e-mail eller telefon. Vi vil glæde os til at arrangere levering og sørge for, at Soundboksen når frem til din festlokation på det ønskede tidspunkt. Vores dedikerede team er altid klar til at hjælpe dig med at skabe den bedste lydoplevelse til din fest.`
  },
  {
    question: "Tilbyder I levering af Soundboksene til døren, og hvad er prisen?",
    answer: "Ja, vi tilbyder levering af Soundboksene i Københavns-området for at gøre det endnu mere bekvemt for dig. Prisen for levering starter fra 150 kr., men da den kan variere afhængigt af afstanden og andre faktorer, beder vi dig kontakte os for at få en præcis pris på levering. På den måde kan vi sikre, at du får den mest præcise og konkurrencedygtige pris for levering til din specifikke lokation."
  },
  {
    question: "Hvordan fungerer betalingen ved leje af Soundboksene hos DinSoundboks?",
    answer: "Hos DinSoundboks er det enkelt og bekvemt at betale for din leje. Vi opererer uden et depositumssystem, hvilket betyder, at du ikke behøver at betale noget depositum for at leje vores Soundbokse. I stedet betaler du det fulde beløb ved afhentning af Soundboksen.Vi accepterer kun MobilePay."
  },
  {
    question: "Kan jeg afbestille min Soundboksleje?",
    answer: "Selvfølgelig, vi forstår, at planer kan ændre sig, og vi vil ikke lægge ekstra byrder på dig 🙏. Du kan afbestille din Soundboksleje når som helst ved at kontakte os så tidligt som muligt. Vi vil arbejde sammen med dig for at finde den bedste løsning, og du vil ikke blive opkrævet nogen afbestillingsgebyrer 🚫."
  }
];





const FAQPage = () => {
  return (
    <Box sx={{flexGrow:1,mt:1,minHeight:900,display:'flex',flexDirection:'column',alignItems:'center',py:10,}}>

    {faq.map(({question,answer})=><FAQ key={answer+question} q={question} a={answer} />)}

    </Box>
  )
}

export default FAQPage