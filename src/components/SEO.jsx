import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

export default function SEO({ title, description, name, type, image }) {
  const location = useLocation();
  const defaultTitle = "Prathamesh Patil | UI/UX Designer";
  const defaultDescription = "Portfolio of Prathamesh Patil, a UI/UX Designer crafting beautiful, user-centric, and functional digital experiences.";
  const defaultImage = "https://prathameshxd.vercel.app/photo.webp";
  const defaultName = "Prathamesh Patil";
  const defaultType = "website";
  const siteUrl = "https://prathameshxd.vercel.app";

  const seoTitle = title ? `${title} | Prathamesh Patil` : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoImage = image ? `${siteUrl}${image}` : defaultImage;
  const seoName = name || defaultName;
  const seoType = type || defaultType;
  
  // Construct canonical URL based on current route
  const currentPath = location.pathname === '/' ? '' : location.pathname;
  const canonicalUrl = `${siteUrl}${currentPath}`;

  // JSON-LD Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Prathamesh Patil",
    "url": siteUrl,
    "image": defaultImage,
    "jobTitle": "UI/UX Designer",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "sameAs": [
      "https://www.linkedin.com/in/prathamesh-patil-5652a1358/",
      "https://www.behance.net/prathmeshpatila5",
      "https://github.com/prathameshxd"
    ]
  };

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{seoTitle}</title>
      <meta name='description' content={seoDescription} />
      <meta name="author" content={seoName} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Facebook tags */}
      <meta property="og:type" content={seoType} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:url" content={canonicalUrl} />
      
      {/* Twitter tags */}
      <meta name="twitter:creator" content={seoName} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />

      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  image: PropTypes.string
};
