import Card2 from '@/components/Card2'
import Navbar from '@/components/Navbar'
import Navbar2 from '@/components/Navbar2'
import React from 'react'
import Rge from '@/components/Rge'
import Footer from '@/components/Footer'
import Footer2 from '@/components/Footer2'

export default function page() {
  return (
    <main>
    <div className='part1bis'>
    <div className="backgroundimage1"><img src="/New.jpg"></img></div>
    <Navbar2/>
    <h2>Ravalement</h2>
    <p>N’exécute pas un ravalement de façade qui veut. C’est une prestation qui nécessite la possession de certaines connaissances techniques et d’une expérience éprouvée. Sans la réunion de ces préalables, les résultats en matière d’esthétique et d’efficacité ne sont pas au rendez-vous. Nous ferons le nécessaire pour élever les performances de votre logement.<br></br><br></br><br></br>
      Nettoyer, décaper, repeindre: aucun pan des travaux de ravalement n’échappe à notre savoir-faire. Et nous saurons appliquer les méthodes les plus appropriées pour atteindre les résultats souhaités.</p>
    </div>
    <div className='part2bis'>
    <div className='principal2bis'>
      <h2>Nos differentes expertises</h2>
      <p>Nous mettons tout le nécessaire en oeuvre pour vous offrir des travaux de ravalement de haute qualité.</p>
    </div>
    <div className='cardspace2'>
    <Card2
        imageSrc="/pierre.jpg"
        title="Pierre de taille"
        description="Reconstituer une pierre désagrégée, des décors ou modénatures, faire une retaille de la pierre ou une incrustation nécessite des experts compétents. PMSB est compétente pour la pierre de taille."
        />
        <Card2
        imageSrc="/isolation.png"
        title="Brique"
        description="Le travail de la brique est une spécialité particulière des travaux de ravalement.  La rénovation d’une telle façade demande une compétences particulières que disposent notre entreprise."
      />
        <Card2
        imageSrc="/platre.jpg"
        title="Plâtre"
        description="Le travail de plâtrerie en ravalement est particulièrement délicat car il est exposé aux intempéries et à la lumière. Cela demandera donc une équipe spécialisée et formée à ce type d’ouvrage."
      />
      <Card2
        imageSrc="/impermeable.jpg"
        title="Imperméabilisation"
        description="L’imperméabilisation d’une façade est un ouvrage délicat qui requiert des qualifications précises. Nous prenons en charge les 4 niveaux différents d’imperméabilité de façade (I1, I2, I3, I4)."
      />
    </div>
    </div>
    <Rge/>
    <div className='part5'>
        <Footer2 />
      </div>
    </main>
  )
}
