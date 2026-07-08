import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import * as Icons from 'lucide-react';
import SEOMeta from '../components/SEOMeta';

const CURRENT_API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5050'
  : window.location.origin;

const ServiceDetail = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Accordion active index: null means all closed, or track multiple
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${CURRENT_API_BASE}/api/services/${slug}`);
        if (!response.ok) {
          throw new Error('Service not found.');
        }
        const data = await response.json();
        setService(data);

        // Dynamically inject SEO headers
        document.title = data.seo_title || `${data.title} | Host2Unlimited`;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute('content', data.meta_description || data.description);
        } else {
          const meta = document.createElement('meta');
          meta.name = 'description';
          meta.content = data.meta_description || data.description;
          document.head.appendChild(meta);
        }
      } catch (err) {
        console.error('Error fetching service:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchService();

    return () => {
      document.title = 'Host2Unlimited | Modern Web & Marketing Agency';
    };
  }, [slug]);

  if (loading) {
    return (
      <div style={{ padding: '200px 0 100px 0', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '3px solid rgba(59, 130, 246, 0.1)',
            borderTopColor: 'var(--primary)',
            animation: 'spin 1s linear infinite'
          }} />
          <span style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: 600 }}>Loading service details...</span>
        </div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div style={{ padding: '200px 0 100px 0', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="card-glass" style={{ padding: '40px', maxWidth: '500px', width: '100%', textAlign: 'center' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '14px' }}>Service Not Found</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '24px' }}>
            We could not retrieve the service parameters. It may be offline or configured differently.
          </p>
          <Link to="/services" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <ArrowLeft size={16} /> View Services
          </Link>
        </div>
      </div>
    );
  }

  // Get matching icon
  const IconComponent = Icons[service.icon_name] || Icons.Globe;

  // Resolve banner image
  const bannerUrl = service.banner_image_url 
    ? (service.banner_image_url.startsWith('http') ? service.banner_image_url : `${CURRENT_API_BASE}${service.banner_image_url}`)
    : 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200&h=450';

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const breadcrumbs = [
    { name: 'Services', path: '/services' },
    { name: service.title, path: `/services/${slug}` }
  ];

  return (
    <div>
      <SEOMeta
        title={service.seo_title || service.title}
        description={service.meta_description || service.description}
        keywords={`${service.title.toLowerCase()}, host2unlimited, web solution`}
        canonical={`https://host2unlimited.com/services/${slug}`}
        schemaType="Service"
        faqList={service.faqs ? (typeof service.faqs === 'string' ? JSON.parse(service.faqs) : service.faqs) : []}
        breadcrumbPaths={breadcrumbs}
      />
      {/* Dynamic Service Banner Header */}
      <div 
        style={{
          height: '420px',
          backgroundImage: `linear-gradient(rgba(7, 11, 25, 0.45), rgba(7, 11, 25, 0.85)), url(${bannerUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'flex-end',
          paddingBottom: '40px',
          textAlign: 'left'
        }}
      >
        <div className="container" style={{ width: '100%' }}>
          {/* Breadcrumb & Title inside banner */}
          <div style={{ marginBottom: '20px' }}>
            <Link 
              to="/services"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13.5px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', marginBottom: '14px', fontWeight: 500 }}
              className="banner-back-link"
            >
              <ArrowLeft size={14} /> Back to Capabilities
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ display: 'inline-flex', width: '64px', height: '64px', borderRadius: '16px', backgroundColor: 'var(--primary)', color: 'white', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(37,99,235,0.4)' }}>
              <IconComponent size={32} />
            </div>
            
            <div style={{ flexGrow: 1 }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '6px' }}>Service File</span>
              <h1 style={{ fontSize: '36px', mdFontSize: '44px', fontWeight: 900, color: 'white', margin: 0 }}>
                {service.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Details Area */}
      <div style={{ padding: '80px 0 100px 0', textAlign: 'left' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          
          {/* Grid: Description & Checklist */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px', marginBottom: '60px' }} className="details-grid">
            
            {/* Description Card */}
            <div>
              <h2 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '20px', color: 'var(--text-primary)' }}>Overview</h2>
              <p style={{ fontSize: '16.5px', color: 'var(--text-secondary)', lineHeight: 1.8, margin: 0, whiteSpace: 'pre-wrap' }}>
                {service.description}
              </p>

              {/* Action Pitch */}
              <div className="card-glass" style={{ padding: '30px', marginTop: '30px', borderLeft: '4px solid var(--primary)' }}>
                <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>Tailored Delivery Framework</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                  Our technical advisors build robust pipelines matching your enterprise structures. Connect with us to layout custom scopes and target metrics.
                </p>
                <Link to="/contact" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  Schedule Technical Brief
                </Link>
              </div>
            </div>

            {/* Checklist Card */}
            <div className="card-glass" style={{ padding: '30px', alignSelf: 'start', height: 'auto' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '20px', color: 'var(--text-primary)' }}>Core Features</h3>
              
              {service.features && service.features.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {service.features.map((feat, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      <CheckCircle size={18} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No features checklist defined.</span>
              )}
            </div>

          </div>

          {/* Accordion FAQ Section */}
          {service.faqs && service.faqs.length > 0 && (
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '60px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 800, textAlign: 'center', marginBottom: '40px', color: 'var(--text-primary)' }}>
                Frequently Asked Questions
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '800px', margin: '0 auto' }}>
                {service.faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div 
                      key={idx}
                      style={{
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: isOpen ? 'var(--primary-light)' : 'var(--bg-secondary)',
                        overflow: 'hidden',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      {/* Accordion Header */}
                      <button
                        onClick={() => toggleFaq(idx)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '18px 24px',
                          border: 'none',
                          backgroundColor: 'transparent',
                          color: 'var(--text-primary)',
                          fontWeight: 700,
                          fontSize: '15.5px',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <HelpCircle size={16} style={{ color: isOpen ? 'var(--primary)' : 'var(--text-muted)' }} />
                          {faq.question}
                        </span>
                        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>

                      {/* Accordion Body */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            style={{ overflow: 'hidden' }}
                          >
                            <div style={{ 
                              padding: '0 24px 20px 50px', 
                              color: 'var(--text-secondary)', 
                              fontSize: '14.5px', 
                              lineHeight: 1.6, 
                              borderTop: '1px solid rgba(59,130,246,0.1)' 
                            }}>
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>
      
      <style>{`
        .banner-back-link:hover {
          color: white !important;
          text-decoration: underline !important;
        }
        @media (max-width: 768px) {
          .details-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ServiceDetail;
