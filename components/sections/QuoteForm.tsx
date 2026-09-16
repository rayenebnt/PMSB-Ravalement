"use client";

import { useRef, useState } from "react";
import { company, devis } from "@/lib/site";
import s from "./QuoteForm.module.css";

/* ══════════════════════════════════════════════════════════════
   Demande de devis.

   Le site est statique : aucun serveur ne peut poster le message.
   Le formulaire compose donc un courriel et le remet au logiciel de
   messagerie du visiteur, qui garde la main sur l'envoi. Tout passe
   par `composer` : brancher un envoi côté serveur ne demandera que
   de remplacer cette fonction.
   ══════════════════════════════════════════════════════════════ */

interface Champs {
  nom: string;
  email: string;
  telephone: string;
  ville: string;
  travaux: string;
  message: string;
}

const VIDE: Champs = {
  nom: "",
  email: "",
  telephone: "",
  ville: "",
  travaux: devis.travaux[0],
  message: "",
};

/** Compose le courriel à partir des champs saisis. */
function composer(c: Champs) {
  /* Le filtre écarte les champs facultatifs laissés vides ; la ligne
     de séparation est ajoutée après, sinon il l'emporterait aussi. */
  const entete = [
    `Nom : ${c.nom}`,
    `E-mail : ${c.email}`,
    c.telephone && `Téléphone : ${c.telephone}`,
    c.ville && `Ville du chantier : ${c.ville}`,
    `Nature des travaux : ${c.travaux}`,
  ].filter(Boolean);

  const corps = `${entete.join("\n")}\n\n${c.message}`;

  return (
    `${company.emailHref}` +
    `?subject=${encodeURIComponent(`Demande de devis — ${c.travaux}`)}` +
    `&body=${encodeURIComponent(corps)}`
  );
}

export default function QuoteForm() {
  const [champs, setChamps] = useState<Champs>(VIDE);
  const [lien, setLien] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const lienRef = useRef<HTMLAnchorElement>(null);

  const modifier =
    (cle: keyof Champs) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setChamps((prev) => ({ ...prev, [cle]: e.target.value }));
      setLien("");
    };

  /*
   * On ouvre la messagerie en cliquant une ancre plutôt qu'en posant
   * une adresse de navigation : le lien reste alors lisible dans la
   * page, et le visiteur dont la messagerie ne s'ouvre pas peut le
   * reprendre lui-même.
   */
  const envoyer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current?.reportValidity()) return;
    setLien(composer(champs));
    queueMicrotask(() => lienRef.current?.click());
  };

  return (
    <div className={s.block} id="devis">
      <div className={s.intro}>
        <span className={`mono tag ${s.tag}`}>{devis.tag}</span>
        <h3 className={`display ${s.title}`}>{devis.title}</h3>
        <p className={`body-text ${s.lede}`}>{devis.lede}</p>
      </div>

      <form ref={formRef} className={s.form} onSubmit={envoyer} noValidate>
        <div className={s.row}>
          <label className={s.field}>
            <span className={`mono ${s.label}`}>Nom *</span>
            <input
              type="text"
              name="nom"
              value={champs.nom}
              onChange={modifier("nom")}
              autoComplete="name"
              required
              maxLength={80}
            />
          </label>

          <label className={s.field}>
            <span className={`mono ${s.label}`}>E-mail *</span>
            <input
              type="email"
              name="email"
              value={champs.email}
              onChange={modifier("email")}
              autoComplete="email"
              required
              maxLength={120}
            />
          </label>
        </div>

        <div className={s.row}>
          <label className={s.field}>
            <span className={`mono ${s.label}`}>Téléphone</span>
            <input
              type="tel"
              name="telephone"
              value={champs.telephone}
              onChange={modifier("telephone")}
              autoComplete="tel"
              maxLength={24}
            />
          </label>

          <label className={s.field}>
            <span className={`mono ${s.label}`}>Ville du chantier</span>
            <input
              type="text"
              name="ville"
              value={champs.ville}
              onChange={modifier("ville")}
              autoComplete="address-level2"
              maxLength={80}
            />
          </label>
        </div>

        <label className={s.field}>
          <span className={`mono ${s.label}`}>Nature des travaux</span>
          <select
            name="travaux"
            value={champs.travaux}
            onChange={modifier("travaux")}
          >
            {devis.travaux.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label className={s.field}>
          <span className={`mono ${s.label}`}>Votre projet *</span>
          <textarea
            name="message"
            value={champs.message}
            onChange={modifier("message")}
            rows={4}
            required
            /* Le message voyage dans une URL : au-delà, certains
               logiciels de messagerie la tronquent sans prévenir. */
            maxLength={1200}
            placeholder="Surface approximative, état de la façade, étage, délais souhaités…"
          />
        </label>

        <div className={s.foot}>
          <button type="submit" className={`btn btn-solid ${s.submit}`}>
            {devis.submit}
            <span className="btn-arrow" aria-hidden="true">
              →
            </span>
          </button>

          <p className={`mono ${s.note}`} role="status">
            {lien ? (
              <>
                {devis.confirmation}{" "}
                <a href={lien} className="swipe-link">
                  Rouvrir le message
                </a>
              </>
            ) : (
              <>Champs suivis de * obligatoires.</>
            )}
          </p>

          {/* Déclencheur de l'ouverture : invisible, mais c'est lui qui
              porte le courriel composé. */}
          <a
            ref={lienRef}
            href={lien || company.emailHref}
            className="sr-only"
            tabIndex={-1}
            aria-hidden="true"
            data-devis-lien
          >
            {company.email}
          </a>
        </div>
      </form>
    </div>
  );
}
