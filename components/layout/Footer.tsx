import Link from "next/link";
import { company, nav } from "@/lib/site";
import QuoteForm from "../sections/QuoteForm";
import SplitText from "../system/SplitText";
import Magnetic from "../system/Magnetic";
import s from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={`on-dark ${s.footer}`} id="contact">
      <div className={`shell ${s.inner}`}>
        {/* ── Appel ── */}
        <div className={s.callout}>
          <span className={`mono tag ${s.tag}`}>Un projet de façade ?</span>

          <SplitText
            as="h2"
            text="Parlons de votre chantier"
            className={`display h-xl ${s.title}`}
            stagger={55}
          />

          <div className={s.contactLinks} data-reveal="up" data-reveal-delay="160">
            <Magnetic strength={0.16} radius={70}>
              <a href={company.phoneHref} className={s.bigLink} data-cursor="Appeler">
                <span className={`mono ${s.bigLinkTag}`}>Téléphone</span>
                <span className={s.bigLinkValue}>{company.phone}</span>
              </a>
            </Magnetic>

            <Magnetic strength={0.16} radius={70}>
              <a href={company.emailHref} className={s.bigLink} data-cursor="Écrire">
                <span className={`mono ${s.bigLinkTag}`}>E-mail</span>
                <span className={s.bigLinkValue}>{company.email}</span>
              </a>
            </Magnetic>
          </div>
        </div>

        {/* ── Demande de devis ── */}
        <QuoteForm />

        {/* ── Colonnes ── */}
        <div className={s.grid}>
          <div className={s.col}>
            <h3 className={`mono ${s.colTitle}`}>Navigation</h3>
            <nav className={s.colLinks}>
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="swipe-link">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className={s.col}>
            <h3 className={`mono ${s.colTitle}`}>Coordonnées</h3>
            <ul className={s.colList}>
              <li>{company.phone}</li>
              <li>{company.email}</li>
              <li>{company.address}</li>
            </ul>
          </div>

          <div className={s.col}>
            <h3 className={`mono ${s.colTitle}`}>Suivez-nous</h3>
            <a
              href={company.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={s.social}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68zm1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
              <span className="swipe-link">LinkedIn</span>
            </a>
          </div>

          <div className={s.col}>
            <h3 className={`mono ${s.colTitle}`}>Qualification</h3>
            <img src="/label.png" alt="Certification RGE" className={s.label} />
          </div>
        </div>

        {/* ── Signature ── */}
        <div className={s.bottom}>
          <span className="mono">{company.copyright}</span>
          <span className={`mono ${s.legal}`}>{company.legalName}</span>
        </div>
      </div>

      {/* Lettrage géant en fond de page */}
      <div className={s.watermark} aria-hidden="true">
        <span className="display">PMSB</span>
      </div>
    </footer>
  );
}
