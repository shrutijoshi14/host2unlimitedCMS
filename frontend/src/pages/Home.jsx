import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, animate, useMotionValue } from 'framer-motion';
import { ArrowRight, CheckCircle2, Zap, Cpu, Shield, PhoneCall } from 'lucide-react';
import Timeline from '../components/Timeline';
import TestimonialSlider from '../components/TestimonialSlider';
import SEOMeta from '../components/SEOMeta';
import schoolHero from '../assets/school_marketing_hero.png';

const CURRENT_API_BASE = import.meta.env.DEV ? 'http://localhost:5050' : (import.meta.env.VITE_API_URL || window.location.origin).replace(/\/+$/, '');

const Counter = ({ value, suffix = "" }) => {
  const count = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    const numericValue = parseInt(value, 10) || 0;
    const controls = animate(count, numericValue, {
      duration: 2,
      ease: 'easeOut',
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest).toString());
      }
    });
    return () => controls.stop();
  }, [value, count]);

  return <span>{displayValue}{suffix}</span>;
};

const clientLogos = [
  'AgriGlobal', 'FinVibe', 'NestaEdu', 'HealthLine', 'AutoDrive', 'SpaceLab', 'RetailPro', 'SwiftCargo'
];

const staticWhyChooseUsData = [
  {
    title: 'Custom Solutions',
    desc: 'Every business is unique. We build tailored systems that align perfectly with your organizational goals.'
  },
  {
    title: 'Experienced Team',
    desc: 'Skilled developers, UI/UX designers, certified marketers, and systems consultants working in alignment.'
  },
  {
    title: 'Growth Focused',
    desc: 'Our engineering designs focus on improving operational efficiency, search visibility, and revenue streams.'
  },
  {
    title: 'Reliable Support',
    desc: 'Dedicated support before, during, and after project completion to ensure uninterrupted operations.'
  },
  {
    title: 'Scalable Technology',
    desc: 'Future-ready architectures that scale seamlessly as your userbase and inventory databases grow.'
  },
  {
    title: 'Transparent Communication',
    desc: 'Regular updates, visual staging links, clear Slack reports, and structured progress timelines.'
  }
];

const staticServicesPreview = [
  {
    title: 'Website Development',
    desc: 'Responsive, modern websites built for high performance, top-tier security, and optimized user conversions.'
  },
  {
    title: 'Custom Software Development',
    desc: 'Intelligent business software solutions tailored to automate manual operations and improve productivity.'
  },
  {
    title: 'Cloud Hosting Solutions',
    desc: 'Ultra-reliable cloud hosting infrastructure designed for max speeds, redundant security backups, and 99.9% uptime.'
  }
];

const defaultHomepageData = {
  hero: {
    badge: '⭐ Next-Generation Digital Solutions',
    title: 'Digital Marketing Partner of Educational Institutes & Modern Businesses',
    description: 'We serve as a dedicated digital marketing partner for educational institutes like international schools, colleges, campuses, and universities, helping them grow through professional website development, secure cloud hosting, Google-rank SEO services, custom software solutions, and ERP databases.'
  },
  about: {
    title: 'Why Businesses Choose Host2Unlimited',
    description: 'We partner with businesses to deploy scalable digital platforms, driving engagement and compounding search visibility.'
  },
  services: {
    title: 'Core Engineering Capabilities',
    description: 'We translate client specifications into robust websites, automated enterprise software, and scalable hosting frameworks.'
  },
  cta: {
    title: 'Ready to Build Your Digital Future?',
    description: 'Get in touch with our tech consultants today. Let us lock in a tailored blueprint and cost range for your custom software or enterprise portal.'
  }
};

const Home = () => {
  const [homepageData, setHomepageData] = useState(defaultHomepageData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomepage = async () => {
      try {
        setLoading(true);
        // 1. Check if homepage CMS module is enabled
        const modulesResponse = await fetch(`${CURRENT_API_BASE}/api/modules`);
        let cmsActive = false;
        if (modulesResponse.ok) {
          const modules = await modulesResponse.json();
          const targetMod = modules.find(m => m.id === 'homepage');
          if (targetMod && targetMod.enabled === 1) {
            cmsActive = true;
          }
        }

        if (cmsActive) {
          // 2. Fetch data from CMS page endpoint
          const response = await fetch(`${CURRENT_API_BASE}/api/pages/homepage`);
          if (response.ok) {
            const data = await response.json();
            setHomepageData(data);
          }
        }
      } catch (err) {
        console.warn('Homepage CMS connection offline, using static defaults.', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHomepage();
  }, []);

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <SEOMeta
        title="Enterprise Cloud Web Hosting & Digital Solutions"
        description="Host2Unlimited provides premium, high-speed Shared NVMe Hosting, Managed WordPress Hosting, KVM VPS, Bare Metal Servers, and Cloud infrastructures alongside custom development."
        keywords="web hosting, cloud hosting, VPS server, dedicated server, hosting company, Host2Unlimited, cheap domain hosting"
        canonical="https://host2unlimited.com/"
      />
      {/* Background blobs */}
      <div className="bg-decorations">
        <div className="decor-shape decor-shape-1" />
        <div className="decor-shape decor-shape-2" />
      </div>

      {/* Hero Section */}
      <section className="section-padding" style={{ paddingTop: '160px', position: 'relative' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '50px', alignItems: 'center' }} className="hero-grid">
            
            {/* Hero Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'left' }}
            >
              <span style={{ 
                display: 'inline-block', 
                backgroundColor: 'var(--primary-light)', 
                color: 'var(--primary)', 
                padding: '6px 16px', 
                borderRadius: '20px', 
                fontWeight: 600, 
                fontSize: '14px',
                marginBottom: '20px'
              }}>
                {homepageData.hero.badge}
              </span>
              
              <h1 style={{ fontSize: '50px', fontWeight: 800, lineHeight: 1.15, marginBottom: '24px', letterSpacing: '-1px' }}>
                {homepageData.hero.title}
              </h1>
              
              <p style={{ fontSize: '17px', color: 'var(--text-secondary)', marginBottom: '36px', lineHeight: 1.6 }}>
                {homepageData.hero.description}
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '0' }}>
                <Link to="/contact" className="btn btn-primary" style={{ fontSize: '16px', padding: '14px 32px' }}>
                  Get Free Consultation <ArrowRight size={18} />
                </Link>
                <Link to="/portfolio" className="btn btn-secondary" style={{ fontSize: '16px', padding: '14px 32px' }}>
                  View Portfolio
                </Link>
              </div>
            </motion.div>

            {/* Hero Right Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}
              className="animate-float"
            >
              {/* Premium Generated Technology Visual */}
              <div className="card-glass" style={{ padding: '12px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--glass-shadow)', maxWidth: '460px', border: '1px solid var(--glass-border)' }}>
                <img 
                  src={schoolHero} 
                  alt="Host2Unlimited digital marketing partner and custom software services illustration" 
                  style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-md)', display: 'block' }}
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: '38px', marginBottom: '16px' }}>{homepageData.about.title}</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '16px' }}>
              {homepageData.about.description}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {staticWhyChooseUsData.map((item, idx) => (
              <motion.div 
                key={idx} 
                className="card-glass"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{ textAlign: 'left' }}
              >
                <div style={{ display: 'inline-flex', width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <CheckCircle2 size={24} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', lineHeight: 1.5 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Highlight Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px', flexWrap: 'wrap', gap: '20px' }} className="service-header-flex">
            <div style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: '38px', marginBottom: '16px' }}>{homepageData.services.title}</h2>
              <p style={{ maxWidth: '550px', color: 'var(--text-secondary)', fontSize: '16px' }}>
                {homepageData.services.description}
              </p>
            </div>
            <Link to="/services" className="btn btn-primary">
              All Services <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {staticServicesPreview.map((service, idx) => (
              <motion.div 
                key={idx} 
                className="card-glass" 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ y: -8, scale: 1.02, boxShadow: 'var(--shadow-lg)' }}
                style={{ backgroundColor: 'var(--bg-primary)', textAlign: 'left' }}
              >
                <div style={{ display: 'inline-flex', width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                  {idx === 0 ? <Zap size={22} /> : idx === 1 ? <Cpu size={22} /> : <Shield size={22} />}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>{service.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', marginBottom: '24px', lineHeight: 1.5 }}>{service.desc}</p>
                <Link to="/services" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>
                  Learn More <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Proven Process Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: '38px', marginBottom: '16px' }}>Our Proven Development Process</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '16px' }}>
              From initial consultation to deployment and maintenance, we ensure transparency and alignment at every milestone.
            </p>
          </div>
          
          <Timeline />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: '38px', marginBottom: '16px' }}>What Our Clients Say</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '16px' }}>
              Real metrics and reviews from companies that scaled their operations with Host2Unlimited solutions.
            </p>
          </div>
          <TestimonialSlider />
        </div>
      </section>

      {/* Client Logos Section */}
      <section style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', padding: '40px 0' }}>
        <div className="container">
          <p style={{ textAlign: 'center', fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '24px', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Trusted by Businesses Across Multiple Industries
          </p>
          <div className="carousel-track-container">
            <div className="carousel-track">
              {clientLogos.concat(clientLogos).map((logo, idx) => (
                <div key={idx} className="carousel-logo">
                  <Cpu size={20} style={{ marginRight: '6px' }} />
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="section-padding" style={{ padding: '80px 0', position: 'relative' }}>
        <div className="container">
          <div className="card-glass" style={{ background: 'var(--grad-primary)', color: 'white', padding: '60px 40px', position: 'relative', overflow: 'hidden' }}>
            
            {/* Background SVG abstract lines */}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.1, pointerEvents: 'none' }}>
              <path d="M-100 200 C100 100, 300 300, 500 100 C700 200, 900 50, 1100 250" fill="none" stroke="white" strokeWidth="8" />
              <path d="M-100 250 C100 150, 300 350, 500 150 C700 250, 900 100, 1100 300" fill="none" stroke="white" strokeWidth="4" />
            </svg>

            <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <h2 style={{ color: 'white', fontSize: '36px', fontWeight: 800, margin: 0 }}>{homepageData.cta.title}</h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.9)', maxWidth: '600px', fontSize: '16px', margin: 0 }}>
                {homepageData.cta.description}
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '10px' }}>
                <Link to="/contact" className="btn" style={{ backgroundColor: 'white', color: 'var(--primary)' }}>
                  Get Free Consultation
                </Link>
                <Link to="/contact" className="btn btn-glass" style={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.4)' }}>
                  <PhoneCall size={16} /> Contact Sales
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 992px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center !important;
            gap: 40px !important;
          }
          .hero-grid div {
            text-align: center !important;
          }
          .stats-grid {
            justify-content: center !important;
          }
          .service-header-flex {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .process-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
