import React, { useState, useEffect } from 'react';
import { motion, animate, useMotionValue } from 'framer-motion';
import { Globe } from 'lucide-react';
import * as Icons from 'lucide-react';
import SEOMeta from '../components/SEOMeta';
import Breadcrumbs from '../components/Breadcrumbs';

const CURRENT_API_BASE = import.meta.env.VITE_API_URL || window.location.origin;

const staticValues = [
  {
    icon_name: 'ShieldCheck',
    title: 'Security & Integrity',
    desc: 'We follow rigorous coding standards and security audit checklists to keep client databases safe from vulnerabilities.'
  },
  {
    icon_name: 'Target',
    title: 'Customer-Centric Growth',
    desc: 'We map technology outputs to business outcomes, building solutions that improve speed and drive revenue.'
  },
  {
    icon_name: 'HeartHandshake',
    title: 'Reliable Transparency',
    desc: 'No hidden clauses. We provide access to live staging branches and clear Slack updates throughout the sprint cycle.'
  }
];

const staticStats = [
  { icon_name: 'Users', value: 500, suffix: '+', label: 'Clients Worldwide' },
  { icon_name: 'Award', value: 15, suffix: '+', label: 'Years Experience' },
  { icon_name: 'Trophy', value: 98, suffix: '%', label: 'Satisfaction Score' },
  { icon_name: 'Briefcase', value: 1200, suffix: '+', label: 'Successful Projects' }
];

const Counter = ({ value, suffix = "" }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const numericValue = parseInt(value.toString().replace(/[^0-9]/g, ''), 10) || 0;
    if (numericValue <= 0) {
      setDisplayValue(0);
      return;
    }

    let start = 0;
    const end = numericValue;
    const duration = 2000; // 2 seconds animation
    const startTime = performance.now();
    let animationFrameId;

    const updateCounter = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Ease out quad formula: progress * (2 - progress)
      const easeProgress = progress * (2 - progress);
      const currentValue = Math.floor(easeProgress * (end - start) + start);

      setDisplayValue(currentValue);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(end);
      }
    };

    animationFrameId = requestAnimationFrame(updateCounter);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [value]);

  return <span>{displayValue.toLocaleString()}{suffix}</span>;
};

const About = () => {
  const [aboutData, setAboutData] = useState({ values: staticValues, stats: staticStats });
  const [banner, setBanner] = useState({
    title: 'About Host2Unlimited',
    subtitle: 'Our Background',
    desc: 'We are a dedicated team of software developers, database managers, systems architects, and digital marketing consultants who help brands scale their systems.'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true);
        // 1. Check module status
        const modulesResponse = await fetch(`${CURRENT_API_BASE}/api/modules`);
        let cmsActive = false;
        let bannerActive = false;
        if (modulesResponse.ok) {
          const modules = await modulesResponse.json();
          const targetMod = modules.find(m => m.id === 'about');
          if (targetMod && targetMod.enabled === 1) {
            cmsActive = true;
          }
          const targetBannerMod = modules.find(m => m.id === 'banner');
          if (targetBannerMod && targetBannerMod.enabled === 1) {
            bannerActive = true;
          }
        }

        if (cmsActive) {
          // 2. Fetch page content
          const response = await fetch(`${CURRENT_API_BASE}/api/pages/about`);
          if (response.ok) {
            const data = await response.json();
            setAboutData(data);
          } else {
            throw new Error('About data not seeded.');
          }
        } else {
          setAboutData({ values: staticValues, stats: staticStats });
        }

        if (bannerActive) {
          const bannerRes = await fetch(`${CURRENT_API_BASE}/api/pages/banner`);
          if (bannerRes.ok) {
            const bannerData = await bannerRes.json();
            if (bannerData.about) {
              setBanner(bannerData.about);
            }
          }
        }
      } catch (err) {
        console.warn('About CMS failed, using local static values.', err);
        setAboutData({ values: staticValues, stats: staticStats });
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  const breadcrumbs = [{ name: 'About Us', path: '/about' }];

  return (
    <div style={{ padding: '100px 0 100px 0' }}>
      <SEOMeta
        title="About Us"
        description="Learn about Host2Unlimited's mission, values, and experienced systems engineers providing next-generation shared hosting, VPS hosting, and custom software."
        keywords="about host2unlimited, cloud web hosting company, web agency profile, systems consultants Mumbai"
        canonical="https://host2unlimited.com/about"
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
            {banner.subtitle}
          </span>
          <h1 style={{ fontSize: '46px', fontWeight: 800, marginBottom: '20px', letterSpacing: '-1px' }}>{banner.title}</h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '17px', lineHeight: 1.6 }}>
            {banner.desc}
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
            Retrieving about us values...
          </div>
        ) : (
          <>
            {/* Corporate Summary section (Stacked layout) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '50px', marginBottom: '100px', textAlign: 'left' }}>
              
              {/* Who We Are & What We Do (Row 1 - No Counters) */}
              <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '20px', letterSpacing: '-0.5px' }}>Who We Are & What We Do</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '16.5px', lineHeight: 1.7, marginBottom: '20px' }}>
                  Founded with the goal of delivering premium digital infrastructures, Host2Unlimited has matured into a reliable technology partner for over 500 companies globally. We combine cutting-edge Javascript frameworks like React.js and Next.js with secure database backends like MySQL and PostgreSQL to design modern platforms.
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '16.5px', lineHeight: 1.7 }}>
                  Our work is backed by a 24/7 dedicated support team. Whether you need a simple high-conversion landing page, structured SEO rankings, or custom enterprise CRM software, we build systems designed to succeed.
                </p>
              </div>

              {/* Stats Cards Row (Row 2 - Interactive Counters + Hover Effects) */}
              <div style={{ marginTop: '10px' }} className="about-stats-grid">
                {aboutData.stats.map((stat, idx) => {
                  const Icon = Icons[stat.icon_name] || Globe;
                  return (
                    <motion.div 
                      key={idx}
                      className="card-glass" 
                      whileHover={{ y: -8, scale: 1.03, borderColor: 'var(--primary)', boxShadow: '0 12px 30px -10px rgba(14, 165, 233, 0.2)' }}
                      style={{ backgroundColor: 'var(--bg-secondary)', padding: '30px 24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', textAlign: 'center', transition: 'border-color 0.2s, box-shadow 0.2s' }}
                    >
                      <Icon size={32} color="var(--primary)" style={{ marginBottom: '16px' }} />
                      <h3 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                        <Counter value={stat.value} suffix={stat.suffix} />
                      </h3>
                      <p style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 600, margin: 0 }}>{stat.label}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Corporate Operating Values */}
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '50px', textAlign: 'center', letterSpacing: '-0.5px' }}>Our Core Operating Values</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }} className="values-grid">
                {aboutData.values.map((v, idx) => {
                  const Icon = Icons[v.icon_name] || Globe;
                  return (
                    <div key={idx} className="card-glass" style={{ textAlign: 'left' }}>
                      <div style={{ display: 'inline-flex', width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                        <Icon size={24} />
                      </div>
                      <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>{v.title}</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.5 }}>{v.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default About;
