import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { featuredDepartements } from "@/lib/zones";

/**
 * Plan du site.
 *
 * Ni `changefreq` ni `priority` n'y figurent : Google les ignore, et les
 * déclarer donnerait l'illusion de piloter quelque chose.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const paths = [
    "/",
    "/ravalement",
    "/isolation",
    "/etancheite",
    "/zones-d-intervention",
    ...featuredDepartements.map((d) => `/zones/${d.slug}`),
  ];

  return paths.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified,
  }));
}
