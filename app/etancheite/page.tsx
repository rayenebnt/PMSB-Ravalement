import Card4 from '@/components/Card4'
import Card5 from '@/components/Card5'
import Footer3 from '@/components/Footer3'
import Footer4 from '@/components/Footer4'
import Navbar from '@/components/Navbar'
import Navbar4 from '@/components/Navbar4'
import React from 'react'

export default function page() {
  return (
    <main>
    <div className='part1bis'>
    <div className="backgroundimage1"><img src="/balcon.webp"></img></div>
    <Navbar4/>
    <h2>Etanchéité</h2>
    <p>
Notre équipe d'experts en étanchéité chez PMSB s'engage à vous offrir des solutions durables pour la rénovation de vos terrasses et balcons. Nous comprenons l'importance cruciale de maintenir l'intégrité de votre bâtiment en empêchant toute infiltration d'eau nuisible.<br></br><br></br> Que votre complexe d'étanchéité soit devenu obsolète en raison de l'usure naturelle ou de dommages causés par des éléments extérieurs, nous avons l'expertise nécessaire pour identifier les problèmes sous-jacents et mettre en œuvre des systèmes modernes et efficaces qui garantissent une étanchéité optimale.<br></br><br></br> Votre tranquillité d'esprit et la préservation de la valeur de votre propriété sont notre priorité, et nous sommes fiers de contribuer à la longévité et à la fonctionnalité de vos espaces extérieurs.
</p>
    </div>

    <div className='part5bis'>
      <h2>Nos types d'étanchéité</h2>
      <div className='cardspace3'>
    <Card4
        imageSrc="/balcon2.jpg"
        title="Balcon"
        description="L'étanchéité des balcons est essentielle pour empêcher les infiltrations d'eau, protéger la structure, et garantir la durabilité du balcon."
        />
        <Card4 
        imageSrc="/cave2.jpg"
        title="Cave"
        description="
        L'étanchéité des caves est cruciale pour éviter les infiltrations d'eau, protéger les fondations, et préserver l'intégrité structurelle de la cave."
      />
        <Card4
        imageSrc="/parking2.jpg"
        title="Parking"
        description="L'étanchéité des parkings est vitale pour empêcher les infiltrations d'eau, préserver l'intégrité structurelle du parking, et assurer sa durabilité."
      />
      </div>
    </div>

    <div className='part6bis'>
      <h2>Les produits utilisés</h2>
      <div className='cardspace5'>
    <Card5
        imageSrc="/primaire.jpg"
        title="Produit primaire d'accrochage"
        description= "Le produit primaire d'accrochage assure une adhérence solide entre la surface préparée et les revêtements ultérieurs, améliorant la durabilité et prévenant les décollements prématurés des revêtements d'étanchéité."
        />
        <Card5
        imageSrc="/Stocorr.jpg"
        title="Peinture résine"
        description="La peinture résine, faite de résines synthétiques, offre une protection robuste contre les intempéries, les UV, les produits chimiques et l'abrasion, tout en préservant l'esthétique."
      />
        <Card5
        imageSrc="/laque.webp"
        title="Laque de finition"
        description="La laque de finition est un revêtement lisse et brillant composé de résines, offrant une protection durable et améliorant l'esthétique de surfaces telles que le bois, le métal, et les meubles."
      />
      </div>
    </div>

    <div className='part4bis4'>
      <Footer4 />
    </div>
    </main>
  )
}
