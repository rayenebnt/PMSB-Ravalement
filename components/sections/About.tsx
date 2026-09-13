import Image from "next/image";
import Link from "next/link";
import { about, company } from "@/lib/site";
import SplitText from "../system/SplitText";
import Magnetic from "../system/Magnetic";
import s from "./About.module.css";

export default function About() {
  return (
    <section className={`section ${s.section}`} id="qui-sommes-nous">
      <div className={`shell ${s.inner}`}>
        {/* ── Image ── */}
        <div className={s.mediaCol}>
          <div className={`frame ${s.frame}`} data-reveal="clip">
            <div className={s.parallax} data-speed="0.07">
              <Image
                src={about.image}
                alt={about.imageAlt}
                fill
                sizes="(max-width: 960px) 100vw, 50vw"
                quality={85}
                priority={false}
              />
            </div>
          </div>

          <div className={s.badge} data-reveal="scale" data-reveal-delay="380">
            <span className={`display ${s.badgeNum}`}>15+</span>
            <span className={`mono ${s.badgeText}`}>
              ans
              <br />
              d&apos;expérience
            </span>
          </div>

          <span className={`mono ${s.caption}`}>
            Chantier — {company.area}
          </span>
        </div>

        {/* ── Texte ── */}
        <div className={s.textCol}>
          <span className={`mono tag ${s.tag}`}>{about.tag}</span>

          <SplitText
            as="h2"
            text={about.title}
            className={`display h-lg ${s.title}`}
            stagger={50}
          />

          <p className={`lede ${s.para}`} data-reveal="up" data-reveal-delay="120">
            {about.paragraph}
          </p>

          <ul className={s.facts} data-reveal="up" data-reveal-delay="200">
            <li>
              <span className="mono">Siège</span>
              <span>{company.address}</span>
            </li>
            <li>
              <span className="mono">Zone</span>
              <span>{company.area}</span>
            </li>
            <li>
              <span className="mono">Qualification</span>
              <span>RGE</span>
            </li>
          </ul>

          <div data-reveal="up" data-reveal-delay="280">
            <Magnetic strength={0.22} radius={60}>
              <Link href="#contact" className="btn btn-solid">
                Nous contacter
                <span className="btn-arrow">→</span>
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
