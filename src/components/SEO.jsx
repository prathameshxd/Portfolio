import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

const SITE_URL = "https://prathameshxd.vercel.app";
const DEFAULT_TITLE = "Prathamesh Patil | UI/UX Designer & Portfolio";
const DEFAULT_DESCRIPTION = "Explore the portfolio of Prathamesh Patil — a UI/UX Designer specializing in storytelling design, user research, design systems, and frontend development. Based in Kalyan, Maharashtra, India.";
const DEFAULT_IMAGE = `${SITE_URL}/photo.webp`;
const AUTHOR_NAME = "Prathamesh Patil";
const TWITTER_HANDLE = "@prathameshxd";

// Route-specific SEO configurations (invisible keyword targeting)
const ROUTE_SEO = {
  '/': {
    keywords: "UX design portfolio, UI/UX designer India, Prathamesh Patil portfolio, portfolio website examples, UX case studies, frontend developer portfolio, design portfolio website, storytelling UX portfolio, Bestfolios, product designer Pune, user experience designer Maharashtra, portfolio for freshers, digital product design",
  },
  '/projects': {
    keywords: "UX case study examples, UI/UX design projects, portfolio project showcase, design case studies, PathParcel case study, UX design work samples, product design portfolio, mobile app design case study",
  },
  '/projects/pathparcel': {
    keywords: "PathParcel case study, peer-to-peer delivery UX, commuter delivery app design, UX case study logistics, mobile app UX design, two-sided marketplace design, Mumbai commuter app, last-mile delivery UX, zero-trust handover protocol, intra-city logistics design",
  },
  '/contact': {
    keywords: "hire UX designer, contact Prathamesh Patil, UX designer for hire India, freelance UI/UX designer, UI/UX design collaboration, product design inquiry, design consultation",
  },
  '/about': {
    keywords: "about Prathamesh Patil, UX designer biography, UI/UX designer India, product designer Pune, frontend developer portfolio, design philosophy, user-centric design",
  },
  '/privacy': {
    keywords: "privacy policy, data protection, portfolio privacy",
  },
  '/developers': {
    keywords: "portfolio API, developer portal, OpenAPI specification, portfolio data API, AI agent integration, programmatic portfolio access",
  },
};

// Generate BreadcrumbList structured data
function generateBreadcrumbs(pathname) {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs = [
    { name: "Home", url: SITE_URL }
  ];

  const nameMap = {
    'projects': 'Projects',
    'pathparcel': 'PathParcel Case Study',
    'contact': 'Contact',
    'about': 'About',
    'privacy': 'Privacy Policy',
    'developers': 'Developer Portal',
    'docs': 'API Documentation',
  };

  let currentPath = '';
  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    breadcrumbs.push({
      name: nameMap[segment] || segment,
      url: `${SITE_URL}${currentPath}`
    });
  });

  return {
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

// Generate page-specific structured data
function generateStructuredData(pathname, seoTitle, seoDescription) {
  const graph = [];

  // Always include Person schema
  graph.push({
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    "name": AUTHOR_NAME,
    "url": SITE_URL,
    "image": {
      "@type": "ImageObject",
      "url": DEFAULT_IMAGE,
      "width": 400,
      "height": 400
    },
    "jobTitle": "UI/UX Designer",
    "description": "UI/UX Designer and Frontend Developer specializing in storytelling portfolios, design systems, and user-centric digital experiences.",
    "knowsAbout": [
      "User Experience Design", "User Interface Design", "Design Systems",
      "Figma", "Prototyping", "User Research", "Frontend Development",
      "React", "JavaScript", "Accessibility", "Interaction Design",
      "Information Architecture", "Wireframing", "Usability Testing"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Mumbai University"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kalyan",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.linkedin.com/in/prathamesh-patil-5652a1358/",
      "https://www.behance.net/prathmeshpatila5",
      "https://github.com/prathameshxd"
    ]
  });

  // Always include WebSite schema (for sitelinks search box)
  graph.push({
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    "url": SITE_URL,
    "name": "Prathamesh Patil Portfolio",
    "description": DEFAULT_DESCRIPTION,
    "publisher": { "@id": `${SITE_URL}/#person` },
    "inLanguage": "en-US"
  });

  // Add BreadcrumbList
  if (pathname !== '/') {
    graph.push(generateBreadcrumbs(pathname));
  }

  // Page-specific schemas
  if (pathname === '/') {
    graph.push({
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      "url": SITE_URL,
      "name": seoTitle,
      "description": seoDescription,
      "mainEntity": { "@id": `${SITE_URL}/#person` },
      "isPartOf": { "@id": `${SITE_URL}/#website` },
      "inLanguage": "en-US"
    });
  } else if (pathname === '/projects/pathparcel') {
    graph.push({
      "@type": "Article",
      "@id": `${SITE_URL}/projects/pathparcel#article`,
      "headline": "PathParcel: Turning Commuters' Daily Routes into a Parcel Delivery Network",
      "description": "A UX case study on designing a peer-to-peer delivery marketplace that connects local senders with daily Mumbai train commuters using a Zero-Trust handover protocol.",
      "url": `${SITE_URL}/projects/pathparcel`,
      "author": { "@id": `${SITE_URL}/#person` },
      "publisher": { "@id": `${SITE_URL}/#person` },
      "datePublished": "2025-01-01",
      "dateModified": "2026-09-01",
      "image": `${SITE_URL}/mockups/splash-screen.webp`,
      "articleSection": "UX Case Studies",
      "keywords": "PathParcel, peer-to-peer delivery, UX case study, commuter logistics, mobile app design",
      "inLanguage": "en-US",
      "isPartOf": { "@id": `${SITE_URL}/#website` }
    });
  } else if (pathname === '/projects') {
    graph.push({
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/projects#collection`,
      "url": `${SITE_URL}/projects`,
      "name": seoTitle,
      "description": seoDescription,
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "PathParcel",
            "url": `${SITE_URL}/projects/pathparcel`,
            "description": "A peer-to-peer delivery network UX case study."
          }
        ]
      },
      "isPartOf": { "@id": `${SITE_URL}/#website` },
      "inLanguage": "en-US"
    });
  } else if (pathname === '/contact') {
    graph.push({
      "@type": "ContactPage",
      "@id": `${SITE_URL}/contact#contactpage`,
      "url": `${SITE_URL}/contact`,
      "name": seoTitle,
      "description": seoDescription,
      "mainEntity": { "@id": `${SITE_URL}/#person` },
      "isPartOf": { "@id": `${SITE_URL}/#website` },
      "inLanguage": "en-US"
    });
  } else if (pathname === '/about') {
    graph.push({
      "@type": "AboutPage",
      "@id": `${SITE_URL}/about#aboutpage`,
      "url": `${SITE_URL}/about`,
      "name": seoTitle,
      "description": seoDescription,
      "mainEntity": { "@id": `${SITE_URL}/#person` },
      "isPartOf": { "@id": `${SITE_URL}/#website` },
      "inLanguage": "en-US"
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

export default function SEO({ title, description, name, type, image }) {
  const location = useLocation();
  const pathname = location.pathname;

  const seoTitle = title ? `${title} | Prathamesh Patil` : DEFAULT_TITLE;
  const seoDescription = description || DEFAULT_DESCRIPTION;
  const seoImage = image ? `${SITE_URL}${image}` : DEFAULT_IMAGE;
  const seoName = name || AUTHOR_NAME;
  const seoType = type || "website";

  // Construct canonical URL (strip trailing slash except root)
  const currentPath = pathname === '/' ? '' : pathname.replace(/\/$/, '');
  const canonicalUrl = `${SITE_URL}${currentPath}`;

  // Get route-specific keywords
  const routeKeywords = ROUTE_SEO[pathname]?.keywords || ROUTE_SEO['/'].keywords;

  // Generate structured data
  const structuredData = generateStructuredData(pathname, seoTitle, seoDescription);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="author" content={seoName} />
      <meta name="keywords" content={routeKeywords} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Language & Geo */}
      <meta httpEquiv="content-language" content="en" />
      <meta name="geo.region" content="IN-MH" />
      <meta name="geo.placename" content="Kalyan, Maharashtra" />
      <meta name="geo.position" content="19.2437;73.1355" />
      <meta name="ICBM" content="19.2437, 73.1355" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={seoType} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${seoName} - UI/UX Designer Portfolio`} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Prathamesh Patil Portfolio" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={seoName} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
      <meta name="twitter:image:alt" content={`${seoName} - UI/UX Designer Portfolio`} />

      {/* JSON-LD Structured Data */}
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
