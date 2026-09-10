import { site } from "@/lib/site";
import type { PublicProfile } from "@/lib/content";

export function HomeJsonLd({ profile }: { profile: PublicProfile }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: profile.name,
        description: profile.introduction,
        url: site.url,
        logo: `${site.url}/logo.png`,
        image: `${site.url}/opengraph-image.png`,
        sameAs: [
          site.github.url,
          site.founder.url,
        ],
        founder: {
          "@type": "Person",
          name: site.founder.name,
          url: site.founder.url,
          sameAs: [site.founder.url],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        publisher: {
          "@id": `${site.url}/#organization`,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
