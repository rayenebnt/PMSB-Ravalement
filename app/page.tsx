import Contact from '@/components/Contact'
import Navbar from '@/components/Navbar'
import Image from 'next/image'
import Card from '@/components/Card'
import 'leaflet/dist/leaflet.css';
import BackgroundImage from '@/components/BackgroundImage'
import Footer from '@/components/Footer';
import Head from 'next/head';


export default function Home() {

  return (
    <div>
    <main>
     
      <div className='part1'>
      <div className="background-image" style={{backgroundImage: `url("/bg2.jpg`}}></div>
      <Navbar/>
      <div className='principal'>
        <p className='title'>Entreprise de ravalement et de façade</p>
        <h1 className='name'>PMSB</h1>
        <Contact />
      </div>
      </div>

      <div className='part2' id='qui-sommes-nous'>
        <div className='principal2'>
      <h1>Qui sommes nous ?</h1>
      <p>PMSB, Prestations Multi Services Bâtiment, est une entreprise spécialisée dans la réalisation de divers travaux de bâtiment dans la région Parisienne. Elle met à votre service ses compétences pour l’exécution d’un ravalement de façade, de travaux d’isolation, d’une peinture d’intérieur ou encore la rénovation totale de votre logement. Comptez sur notre savoir-faire pour obtenir un travail soigné.</p>
      <Contact />
      </div>
      <img src='/image_bien.jpg'></img>
      </div>

      <div className='part3' id='services'>
        <div className='principal3'>
          <h2>Nos services</h2>
          <p>Vous désirez redonner une nouvelle vie à votre logement ? Profitez de notre expérience éprouvée dans diverses branches des travaux de bâtiment. Nous réalisons à la <br></br>demande de nos clients des rénovations qui prennent en compte le ravalement de façade, l’isolation thermique, l’étanchéité, mais aussi la peinture et la décoration de<br></br> votre intérieur.</p>
        </div>
        <div className='cardspace'>
        <Card
        imageSrc="/ravalement2.jpg"
        title="Ravalement"
        description="Notre équipe d'experts se charge du ravalement de votre façade."
        />
        <Card
        imageSrc="/isolation.png"
        title="Isolation thermique"
        description="Nous utilisons les meilleurs matériaux pour vos travaux d'isolation."
      />
        <Card
        imageSrc="/Etancheité.png"
        title="Etanchéité"
        description="Nous nous occupons de la parfaite étanchéité de vos balcons et vos terrasses."
      />
      <Card
        imageSrc="/Rénovation.png"
        title="Travaux de rénovations"
        description="Nous nous occupons des travaux ainsi que la peinture et la décoration d'intérieur."
      />
      </div>
      </div>


      <div className='part4' id='réalisations'>
        <div className='principal4'>
        <h2>Nos réalisations</h2>

        <div className='allimg'>
        <BackgroundImage
        imageUrl='/qui1.jpg'
        text='Piochage total et refait en Saint Acier, Paris 75018'
        />

        <BackgroundImage
        imageUrl='/imagebien3.jpg'
        text='Ravalement Chaux Sable, Paris 75008'
        />

        <BackgroundImage
        imageUrl='/image_real.jpg'
        text=' Travaux de Ravalement et de Zinguerie, Paris 75002'
        />
        </div>
        
        </div>
        </div>
      
      <div className='part5'>
        <Footer />
      </div>
    </main>
    </div>
  )
}
