import Card3 from '@/components/Card3'
import Footer from '@/components/Footer'
import Isol from '@/components/Isol'
import Navbar from '@/components/Navbar'
import Navbar3 from '@/components/Navbar3'
import React from 'react'

export default function page() {
  return (
<main>
    <div className='part1bis'>
    <div className="backgroundimage1"><img src="/isolation.png"></img></div>
    <Navbar/>
    <h2>Isolation thermique</h2>
    <p>Une maison bien isolée accroît son niveau de confort. En outre, cela permet de réaliser des économies d’énergie importantes.<br></br><br></br>
      On avance des réductions qui tournent autour de 30 %. Vous avez donc pleinement raison de vous soucier de l’isolation de votre logement.<br></br><br></br>
      Pour identifier le meilleur matériau, la technique adaptée à votre habitation, fiez-vous au professionnalisme de PMSB. Nous nous appliquerons à mettre en œuvre vos souhaits et à renforcer les performances énergétiques de votre bien.</p>
    </div>

    <div className='part2bis'>
      <div className='principal2bis2'>
      <h2>Nos différents matériaux</h2>
      <p>Notre équipe d'experts met tout en oeuvre pour vous garantir une isolation thermique de haute qualité.</p>
      </div>
      <div className='cardspace3'>
    <Card3
        imageSrc="/laine.jpg"
        title="Laine de roche"
        description="La laine de roche est essentiellement composée de matière minérale comme le basalte. On peut donc la qualifier de matériau écologique, d’autant que son bilan carbone devient positif très peu de temps après sa mise en œuvre comme isolant."
        />
        <Card3
        imageSrc="/isolation.png"
        title="Le polystyrène"
        description="Le polystyrene est un produit qui a de multiples avantages pour isoler vos murs et éviter ainsi les déperditions énergétiques tout en apportant un confort thermique. Économique et performant, c’est le matériau incontournable pour vos travaux !"
      />
        <Card3
        imageSrc="/Etancheité.png"
        title="Le graphité"
        description="Le graphité permet de lutter contre les ponts thermiques et les moisissures dans les intérieurs à condition que la ventilation intérieure soit correctement réglée. De plus, ce matériau permet une meilleure isolation acoustique."
      />
      <Card3
        imageSrc="/Rénovation.png"
        title="Des matériaux de haute qualité"
        description="Chez PMSB, la qualité est au centre de notre travail. Isoler les murs de son immeuble permet de limiter les déperditions d’énergie, d’améliorer le confort thermique et d’avoir une meilleure isolation accoustique."
      />
    </div>
    </div>

    <div className='part3bis'>
      <div className='principal3bis2'>
        <h2>Pourquoi isoler ses murs par l'extérieur ?</h2>
        <Isol />
      </div>
    </div>

    <div className='part4bis'>
      <Footer/>
    </div>
    </main>

  )
}
