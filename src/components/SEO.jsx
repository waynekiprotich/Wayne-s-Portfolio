import { Helmet } from 'react-helmet-async'

export default function SEO({ 
  title, 
  description, 
  type = 'website',
  url = '',
  image = 'https://www.waynekiprotich.online/og-image.png',
  schema
}) {
  const defaultTitle = "Wayne Kiprotich | Software Engineer & Full-Stack Web Developer"
  const defaultDesc = "Wayne Kiprotich is a Software Engineer and Full-Stack Web Developer specializing in React, JavaScript, Vite, Python, Flask, PostgreSQL, and modern web applications."
  
  const siteUrl = "https://www.waynekiprotich.online"
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl
  
  const metaTitle = title ? `${title} | Wayne Kiprotich` : defaultTitle
  const metaDesc = description || defaultDesc

  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDesc} />
      
      {/* Canonical */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Wayne Kiprotich Portfolio" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:url" content={fullUrl} />
      
      {/* Structured Data (JSON-LD) */}
      {schema && (
        <script type="application/ld+json">
          {typeof schema === 'string' ? schema : JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  )
}
