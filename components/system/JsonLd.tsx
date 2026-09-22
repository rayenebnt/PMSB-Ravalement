/**
 * Injecte un graphe schema.org dans la page.
 *
 * Rendu côté serveur : le balisage est présent dans le HTML initial,
 * donc lisible par les robots qui n'exécutent pas le JavaScript.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? data : [data];

  return (
    <>
      {payload.map((entry, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Le contenu provient de nos propres constantes, jamais d'une saisie.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
    </>
  );
}
