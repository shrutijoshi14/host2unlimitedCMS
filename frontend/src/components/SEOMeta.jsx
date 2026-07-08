import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * SEOMeta Component
 * Dynamically handles document metadata and JSON-LD structured schemas.
 */
const SEOMeta = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = 'https://host2unlimited.com/assets/school_marketing_hero.png',
  schemaType = 'WebPage',
  faqList = [], // Array of { question, answer }
  breadcrumbPaths = [] // Array of { name, path }
}) => {
  const location = useLocation();

  useEffect(() => {
    // 1. Title
    let formattedTitle = 'Host2Unlimited | Enterprise Cloud Hosting';
    if (title) {
      if (title.includes('Host2Unlimited')) {
        formattedTitle = title;
      } else {
        formattedTitle = `${title} | Host2Unlimited`;
      }
    }
    document.title = formattedTitle;

    // 2. Meta tags utility
    const updateMetaTag = (attribute, value, attributeValue) => {
      let element = document.querySelector(`meta[${attribute}="${attributeValue}"]`);
      if (element) {
        element.setAttribute('content', value);
      } else {
        element = document.createElement('meta');
        element.setAttribute(attribute, attributeValue);
        element.setAttribute('content', value);
        document.head.appendChild(element);
      }
    };

    // Description & Keywords
    if (description) updateMetaTag('name', description, 'description');
    if (keywords) updateMetaTag('name', keywords, 'keywords');

    // Canonical link
    const absoluteCanonical = canonical || `https://host2unlimited.com${location.pathname}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', absoluteCanonical);
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', absoluteCanonical);
      document.head.appendChild(canonicalLink);
    }

    // Open Graph
    updateMetaTag('property', formattedTitle, 'og:title');
    if (description) updateMetaTag('property', description, 'og:description');
    updateMetaTag('property', absoluteCanonical, 'og:url');
    updateMetaTag('property', ogImage, 'og:image');
    updateMetaTag('property', 'website', 'og:type');

    // Twitter Cards
    updateMetaTag('name', 'summary_large_image', 'twitter:card');
    updateMetaTag('name', formattedTitle, 'twitter:title');
    if (description) updateMetaTag('name', description, 'twitter:description');
    updateMetaTag('name', ogImage, 'twitter:image');
    updateMetaTag('name', absoluteCanonical, 'twitter:url');

    // 3. Structured Data / Schemas
    const schemaScripts = [];

    // Core Website & Organization (Home only)
    if (location.pathname === '/') {
      // Organization Schema
      const orgSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': 'Host2Unlimited',
        'url': 'https://host2unlimited.com/',
        'logo': 'https://host2unlimited.com/favicon.svg',
        'sameAs': [
          'https://facebook.com/host2unlimited',
          'https://twitter.com/host2unlimited',
          'https://linkedin.com/company/host2unlimited'
        ],
        'contactPoint': {
          '@type': 'ContactPoint',
          'telephone': '+91-70219-35273',
          'contactType': 'customer service',
          'areaServed': 'IN',
          'availableLanguage': 'en'
        }
      };
      schemaScripts.push(orgSchema);

      // WebSite Schema
      const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': 'Host2Unlimited',
        'url': 'https://host2unlimited.com/',
        'potentialAction': {
          '@type': 'SearchAction',
          'target': 'https://host2unlimited.com/blog?search={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      };
      schemaScripts.push(websiteSchema);
    }

    // Service/Product Schema
    if (schemaType === 'Product' || schemaType === 'Service') {
      const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': title,
        'provider': {
          '@type': 'Organization',
          'name': 'Host2Unlimited',
          'url': 'https://host2unlimited.com'
        },
        'description': description,
        'areaServed': 'Worldwide'
      };
      schemaScripts.push(serviceSchema);
    }

    // Breadcrumb Schema
    if (breadcrumbPaths && breadcrumbPaths.length > 0) {
      const breadcrumbListSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': breadcrumbPaths.map((pathItem, idx) => ({
          '@type': 'ListItem',
          'position': idx + 1,
          'name': pathItem.name,
          'item': pathItem.path.startsWith('http') ? pathItem.path : `https://host2unlimited.com${pathItem.path}`
        }))
      };
      schemaScripts.push(breadcrumbListSchema);
    }

    // FAQ Schema
    if (faqList && faqList.length > 0) {
      const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqList.map(faq => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer
          }
        }))
      };
      schemaScripts.push(faqSchema);
    }

    // Inject scripts to DOM
    const DOMscripts = schemaScripts.map(schemaObj => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.className = 'dynamic-ld-json';
      script.text = JSON.stringify(schemaObj);
      document.head.appendChild(script);
      return script;
    });

    // Cleanup scripts and reset parameters on unmount
    return () => {
      DOMscripts.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, [title, description, keywords, canonical, ogImage, schemaType, faqList, breadcrumbPaths, location.pathname]);

  return null;
};

export default SEOMeta;
