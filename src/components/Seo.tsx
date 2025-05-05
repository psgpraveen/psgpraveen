// src/components/Seo.tsx
'use client'
import Head from 'next/head';

export interface SeoProps {
  title: string;
  description: string;
  keywords?: string[];
  author?: string;

  // Optional single-image fallback (if you don’t use openGraph)
  image?: string;
  url?: string;

  // Full OG object
  openGraph?: {
    title: string;
    description: string;
    url: string;
    type?: 'website' | 'article' | 'profile';
    images: {
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }[];
  };
}

const Seo = ({
  title,
  description,
  keywords = [],
  author,
  image,
  url,
  openGraph,
}: SeoProps) => {
  return (
    <Head>
      {/* Basic metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      {author && <meta name="author" content={author} />}

      {/* Open Graph */}
      {openGraph ? (
        <>
          <meta property="og:title" content={openGraph.title} />
          <meta property="og:description" content={openGraph.description} />
          <meta property="og:url" content={openGraph.url} />
          <meta
            property="og:type"
            content={openGraph.type ?? 'website'}
          />
          {openGraph.images.map((img, i) => (
            <meta
              key={i}
              property="og:image"
              content={img.url}
            />
          ))}
        </>
      ) : (
        <>
          {/* Fallback single-image/url */}
          {url && <meta property="og:url" content={url} />}
          {image && <meta property="og:image" content={image} />}
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:type" content="website" />
        </>
      )}

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            headline: title,
            description,
            author: {
              '@type': 'Person',
              name: author ?? 'Praveen Kumar Gupta',
            },
            url: openGraph?.url ?? url,
            image: openGraph?.images[0]?.url ?? image,
            datePublished: '2025-05-01',
          }),
        }}
      />
    </Head>
  );
};

export default Seo;
