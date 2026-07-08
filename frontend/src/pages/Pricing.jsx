import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Info, Server, Code, ShieldAlert, Cpu, Laptop, Database, Cloud } from 'lucide-react';
import Calculator from '../components/Calculator';
import SEOMeta from '../components/SEOMeta';
import Breadcrumbs from '../components/Breadcrumbs';

const CURRENT_API_BASE = import.meta.env.DEV ? 'http://localhost:5050' : (import.meta.env.VITE_API_URL || window.location.origin).replace(/\/+$/, '');

const staticPackages = [
  {
    name: 'Starter Website Package',
    price: '₹15,000 – ₹25,000',
    desc: 'Perfect for small businesses and startups seeking a professional landing page or online brochure.',
    features: [
      'Up to 5 Pages development',
      'Fully Mobile Responsive',
      'Secure Contact Form',
      'Basic SEO & Metadata config',
      'SSL Certificate Setup',
      '1 Month Support'
    ],
    popular: false,
    cta: 'Get Started'
  },
  {
    name: 'Business Website Package',
    price: '₹35,000 – ₹60,000',
    desc: 'Designed for scaling companies needing custom layout mockups, blogs, and marketing connections.',
    features: [
      'Up to 15 Custom Pages',
      'Custom UI/UX Mockups',
      'Dynamic Blog Module',
      'Advanced SEO & Indexing',
      'Google Analytics Setup',
      '3 Months Support & Edits'
    ],
    popular: true,
    cta: 'Select Package'
  },
  {
    name: 'Enterprise Solution Package',
    price: 'Custom Pricing',
    desc: 'Tailored systems built to automate operational processes and synchronize massive databases.',
    features: [
      'Unlimited Pages & Code',
      'Custom React Admin Dashboard',
      'CRM & ERP API Integrations',
      'Multi-gateway Payment support',
      'Advanced Security Hardening',
      '1 Year Dedicated SLA Support'
    ],
    popular: false,
    cta: 'Contact Sales'
  }
];

const techStack = {
  Frontend: ['React', 'Next.js', 'JavaScript', 'TypeScript'],
  Backend: ['Node.js', 'Express.js', 'PHP', 'Laravel'],
  Database: ['MySQL', 'PostgreSQL', 'MongoDB'],
  Cloud: ['AWS', 'Azure', 'Google Cloud'],
  Tools: ['Git', 'Docker', 'CI/CD']
};

const Pricing = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        setLoading(true);
        // 1. Check module status
        const modulesResponse = await fetch(`${CURRENT_API_BASE}/api/modules`);
        let cmsActive = false;
        if (modulesResponse.ok) {
          const modules = await modulesResponse.json();
          const targetMod = modules.find(m => m.id === 'pricing');
          if (targetMod && targetMod.enabled === 1) {
            cmsActive = true;
          }
        }

        if (cmsActive) {
          // 2. Query dynamic page CMS content
          const response = await fetch(`${CURRENT_API_BASE}/api/pages/pricing`);
          if (response.ok) {
            const data = await response.json();
            setPackages(data);
          } else {
            throw new Error('Pricing data not populated.');
          }
        } else {
          setPackages(staticPackages);
        }
      } catch (err) {
        console.warn('Pricing CMS failed, loading static backups.', err);
        setPackages(staticPackages);
      } finally {
        setLoading(false);
      }
    };
    fetchPricing();
  }, []);

  const breadcrumbs = [{ name: 'Pricing', path: '/pricing' }];

  return (
    <div style={{ padding: '100px 0 100px 0' }}>
      <SEOMeta
        title="Pricing Plans"
        description="Transparent pricing structures at Host2Unlimited. Review shared hosting, custom software development, and interactive calculator options."
        keywords="hosting pricing plans, cpanel hosting price, website development cost Mumbai, ERP software price"
        canonical="https://host2unlimited.com/pricing"
        breadcrumbPaths={breadcrumbs}
      />
      <Breadcrumbs paths={breadcrumbs} />

      <div className="container" style={{ marginTop: '40px' }}>
        
        {/* Header Block */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <span style={{ 
            display: 'inline-block', 
            backgroundColor: 'var(--primary-light)', 
            color: 'var(--primary)', 
            padding: '6px 16px', 
            borderRadius: '20px', 
            fontWeight: 600, 
            fontSize: '14px',
            marginBottom: '16px'
          }}>
            Clear Pricing
          </span>
          <h1 style={{ fontSize: '46px', fontWeight: 800, marginBottom: '20px' }}>Flexible Investment Packages</h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '17px' }}>
            Choose a locked-in website package or use our interactive cost estimator to design your project.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
            Retrieving package pricing structures...
          </div>
        ) : (
          /* Pricing Cards Grid */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginBottom: '100px' }} className="pricing-grid">
            {packages.map((pkg, idx) => (
              <motion.div 
                key={idx} 
                className="card-glass"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ 
                  y: -10, 
                  scale: pkg.popular ? 1.05 : 1.03, 
                  boxShadow: '0 20px 40px -15px rgba(14, 165, 233, 0.25)', 
                  borderColor: 'var(--primary)' 
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  textAlign: 'left',
                  border: pkg.popular ? '2px solid var(--primary)' : '1px solid var(--glass-border)',
                  position: 'relative',
                  transition: 'border-color var(--transition-fast)'
                }}
              >
                {pkg.popular && (
                  <span style={{
                    position: 'absolute',
                    top: '-15px',
                    right: '30px',
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    padding: '4px 14px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 700
                  }}>
                    MOST POPULAR
                  </span>
                )}

                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>{pkg.name}</h3>
                  <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '24px' }}>{pkg.desc}</p>
                  
                  {/* Cost value */}
                  <div style={{ marginBottom: '28px' }}>
                    <span style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }} className="text-gradient">
                      {pkg.price}
                    </span>
                  </div>

                  <hr style={{ border: 'none', borderBottom: '1px solid var(--border-color)', marginBottom: '24px' }} />

                  {/* Features checklist */}
                  {pkg.features && pkg.features.length > 0 && (
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
                      {pkg.features.map((feat, fidx) => (
                        <li key={fidx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                          <span style={{ display: 'flex', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Check size={12} />
                          </span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <Link to="/contact" className={`btn ${pkg.popular ? 'btn-primary' : 'btn-secondary'}`} style={{ width: '100%', textAlign: 'center' }}>
                  {pkg.cta || 'Select Package'}
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Dynamic Calculator Section */}
        <div style={{ marginBottom: '100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '36px', marginBottom: '14px' }}>Interactive Cost Estimator</h2>
            <p style={{ maxWidth: '580px', margin: '0 auto', color: 'var(--text-secondary)' }}>
              Looking for custom counts? Select add-on modules to generate price estimates and delivery expectations immediately.
            </p>
          </div>
          <Calculator />
        </div>

        {/* Technology Stack Grid */}
        <div className="card-glass" style={{ textAlign: 'left', padding: '50px' }}>
          <h2 style={{ fontSize: '30px', fontWeight: 800, marginBottom: '12px' }} className="text-center">Our Core Technology Stack</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px auto' }} className="text-center">
            We use stable, high-performance, and standard programming frameworks to construct scalable systems.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }} className="tech-stack-grid">
            {Object.keys(techStack).map((cat) => (
              <div key={cat} style={{ backgroundColor: 'var(--bg-secondary)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {cat === 'Frontend' ? <Laptop size={16} /> : cat === 'Backend' ? <Cpu size={16} /> : cat === 'Database' ? <Database size={16} /> : cat === 'Cloud' ? <Cloud size={16} /> : <Info size={16} />}
                  {cat}
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14.5px', color: 'var(--text-primary)', fontWeight: 600 }}>
                  {techStack[cat].map((t) => (
                    <li key={t} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--text-muted)' }} />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Pricing;
