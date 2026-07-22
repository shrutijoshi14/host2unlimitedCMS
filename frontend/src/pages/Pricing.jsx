import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Info, Server, Code, ShieldAlert, Cpu, Laptop, Database, Cloud } from 'lucide-react';
import Calculator from '../components/Calculator';
import SEOMeta from '../components/SEOMeta';
import Breadcrumbs from '../components/Breadcrumbs';
import pricingHeroBg from '../assets/hero_bg/pricing_hero_art.svg';
import armietLogo from '../assets/h2u logos/armiet_logo.jpeg';
import pillaiLogo from '../assets/h2u logos/dr-pillai-global-academy.png';
import euroKidsLogo from '../assets/h2u logos/euro_kids.jpeg';
import somaiyaLogo from '../assets/h2u logos/somaiya_college.png';
import uudaanLogo from '../assets/h2u logos/uudaan-montessori-preschool.jpg';
import newHorizonLogo from '../assets/h2u logos/New-Horizon-logo.png';
import dnyanGangaLogo from '../assets/h2u logos/DNYAN_GANGA_EDUCATION_TRUST_S-removebg-preview-e1750267686501 (1).webp';
import gsgsLogo from '../assets/h2u logos/GSGS-logo@4x (1).png';
import ulweLogo from '../assets/h2u logos/Ulwe-logo (1).png';
import vsignLogo from '../assets/h2u logos/V-Sign-logo.png';

const clientLogos = [
  armietLogo, pillaiLogo, euroKidsLogo, somaiyaLogo, uudaanLogo,
  newHorizonLogo, dnyanGangaLogo, gsgsLogo, ulweLogo, vsignLogo
];

const CURRENT_API_BASE = import.meta.env.DEV ? 'http://localhost:5050' : (import.meta.env.VITE_API_URL || window.location.origin).replace(/\/+$/, '');

const staticPackages = [
  {
    name: 'Website & Web App Package',
    price: '₹25,000 – ₹75,000',
    desc: 'Complete web development solution including custom UI/UX design, mobile responsive web apps, CMS modules, and API integrations.',
    features: [
      'Custom Responsive Pages & UI Design',
      'Full Web Application & Admin Dashboard',
      'Dynamic Content Management System (CMS)',
      'API & Payment Gateway Integrations',
      'Advanced SEO & Performance Optimization',
      'Continuous Support & SLA Maintenance'
    ],
    popular: true,
    cta: 'Get Started'
  },
  {
    name: 'Digital Marketing Package',
    price: '₹15,000 – ₹45,000/mo',
    desc: 'Full-funnel digital marketing campaigns, social media management, organic content creation, and lead generation.',
    features: [
      'Social Media Management (Meta, LinkedIn, YouTube)',
      'Google Ads & Paid Meta Ad Campaigns',
      'Search Engine Optimization (SEO)',
      'Event Coverage & Campus Live Updates',
      'Lead Tracking & Analytics Reporting',
      'Dedicated Marketing Coordinator'
    ],
    popular: false,
    cta: 'Select Marketing'
  },
  {
    name: 'Enterprise ERP & Portal Package',
    price: 'Custom Pricing',
    desc: 'Tailored enterprise software built to automate educational institute processes, ERP databases, and large operational portals.',
    features: [
      'Custom ERP & Student Information Systems',
      'Role-based Access & Campus Workflows',
      'Multi-campus Database Synchronization',
      'Custom Reporting & Analytics Engines',
      'High Security & Cloud Data Backups',
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
    <div style={{ paddingTop: '80px' }}>
      <SEOMeta
        title="Pricing Plans"
        description="Transparent pricing structures at Host2Unlimited. Review shared hosting, custom software development, and interactive calculator options."
        keywords="hosting pricing plans, cpanel hosting price, website development cost Mumbai, ERP software price"
        canonical="https://host2unlimited.com/pricing"
        breadcrumbPaths={breadcrumbs}
      />
      
      {/* Hero Banner Section */}
      <section 
        className="page-hero-banner"
        style={{ position: 'relative', height: '280px', minHeight: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: '#0b0f19' }}
      >
        <img 
          src={pricingHeroBg} 
          alt="Pricing Hero Background" 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            objectPosition: 'center center',
            zIndex: 1, 
            pointerEvents: 'none' 
          }} 
        />
        <div className="container hero-content-wrapper" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto' }}>
            <Breadcrumbs paths={breadcrumbs} />
          </div>
        </div>
      </section>

      <div className="container" style={{ marginTop: '40px' }}>

        {/* Dedicated Digital Marketing Calculator Section (FIRST below Hero) */}
        <div style={{ marginBottom: '100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '36px', marginBottom: '14px' }}>Digital Marketing Cost Estimator</h2>
            <p style={{ maxWidth: '580px', margin: '0 auto', color: 'var(--text-secondary)' }}>
              Estimate monthly digital marketing retainers, social media post frequencies, campus shoot days, and ad campaign budgets.
            </p>
          </div>
          <Calculator defaultTab="marketing" hideTabs={true} />
        </div>

        {/* Web & Web App Calculator Section (SECOND) */}
        <div style={{ marginBottom: '100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '36px', marginBottom: '14px' }}>Website & Web App Estimator</h2>
            <p style={{ maxWidth: '580px', margin: '0 auto', color: 'var(--text-secondary)' }}>
              Looking for custom website or web app specifications? Select add-on modules to generate price estimates and delivery expectations immediately.
            </p>
          </div>
          <Calculator defaultTab="web" allowedTabs={['web', 'webapp']} />
        </div>

        {/* Flexible Investment Packages Header & Cards Grid (THIRD) */}
        <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 45px auto' }}>
          <span className="badge" style={{ marginBottom: '12px' }}>Clear Pricing</span>
          <h1 style={{ fontSize: '36px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px', letterSpacing: '-0.5px', lineHeight: 1.25 }}>
            Flexible Investment Packages
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16.5px', lineHeight: 1.7 }}>
            Choose a locked-in website package or use our interactive cost estimator to design your project.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
            Retrieving package pricing structures...
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginBottom: '100px' }} className="pricing-grid">
            {packages.map((pkg, idx) => (
              <div key={idx} style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
                {pkg.popular && (
                  <span style={{
                    position: 'absolute',
                    top: '-14px',
                    right: '30px',
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    padding: '4px 14px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 700,
                    zIndex: 10
                  }}>
                    MOST POPULAR
                  </span>
                )}
                <motion.div 
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
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    border: pkg.popular ? '2px solid var(--primary)' : '1px solid var(--glass-border)',
                    position: 'relative',
                    transition: 'border-color var(--transition-fast)'
                  }}
                >

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
            </div>
          ))}
          </div>
        )}

        {/* Enlarged Brand Logos Marquee Section */}
        <div style={{ marginTop: '80px', marginBottom: '40px' }}>
          <p style={{ textAlign: 'center', fontSize: '15px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '28px', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Trusted by Educational Institutes & Brands Across Maharashtra
          </p>
          <div className="carousel-track-container" style={{ overflow: 'hidden', padding: '20px 0' }}>
            <div className="carousel-track">
              {clientLogos.concat(clientLogos).map((logo, idx) => (
                <div key={idx} className="carousel-logo" style={{ display: 'flex', alignItems: 'center', height: '80px', padding: '0 30px' }}>
                  <img 
                    src={logo} 
                    alt="Partner Logo" 
                    style={{ height: '75px', maxWidth: '180px', objectFit: 'contain', opacity: 0.9, transition: 'all 0.3s ease' }} 
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.08)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'scale(1)'; }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Pricing;
