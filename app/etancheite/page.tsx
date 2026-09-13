import type { Metadata } from "next";
import EtancheiteHero from "./EtancheiteHero";
import CardGrid from "@/components/sections/CardGrid";
import Marquee from "@/components/system/Marquee";
import { etancheite } from "@/lib/site";

export const metadata: Metadata = {
  title: "Étanchéité de balcons, caves et parkings",
  description:
    "PMSB met en œuvre des systèmes modernes d'étanchéité pour vos terrasses, balcons, caves et parkings : primaire d'accrochage, peinture résine et laque de finition.",
};

export default function EtancheitePage() {
  return (
    <>
      <EtancheiteHero />
      <CardGrid
        id="types"
        index="01"
        tag="Ouvrages"
        title={etancheite.typesTitle}
        lede="Chaque support appelle un complexe d'étanchéité adapté : nous intervenons sur les ouvrages les plus exposés aux infiltrations."
        items={etancheite.types}
        columns={3}
      />
      <Marquee
        items={["Balcon", "Cave", "Parking", "Terrasse"]}
        outline
        reverse
        speed={36}
      />
      <CardGrid
        id="produits"
        index="02"
        tag="Produits"
        title={etancheite.productsTitle}
        lede="Trois couches complémentaires : accrochage du support, protection de la surface et finition durable."
        items={etancheite.products}
        columns={3}
        dark
      />
    </>
  );
}
