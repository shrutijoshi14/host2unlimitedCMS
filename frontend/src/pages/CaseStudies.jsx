import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, TrendingUp, Target } from 'lucide-react';
import SEOMeta from '../components/SEOMeta';
import Breadcrumbs from '../components/Breadcrumbs';
import caseStudiesHeroBg from '../assets/hero_bg/case_studies_hero.png';

const CURRENT_API_BASE = import.meta.env.DEV ? 'http://localhost:5050' : (import.meta.env.VITE_API_URL || window.location.origin).replace(/\/+$/, '');

const staticCaseStudiesData = [
  {
    title: 'Academics & Admissions Marketing',
    client: 'PODDAR BRIO SCHOOL',
    metrics: [
      { value: '45% Up', label: 'Student Enrollments' },
      { value: '80% Lower', label: 'Admin Workload' }
    ],
    challenge: 'Poddar Brio International School needed to boost digital registrations for its Badlapur campus while streamlining parent communication and administrative lead workflows.',
    solution: 'We executed highly targeted admissions marketing campaigns combined with smart landing pages to capture leads, while implementing Moodle and Smart School MIS platforms for automated operations.',
    tech: ['Admissions Marketing', 'Smart School MIS', 'Google Ads', 'cPanel'],
    impact: 'Organic student enrollments surged by 45% within one admissions cycle, while administrative processing time was cut by 80%.'
  },
  {
    title: 'School Branding & Event Coverage',
    client: 'DR. PILLAI GLOBAL ACADEMY',
    metrics: [
      { value: '3x Reach', label: 'Social Engagement' },
      { value: '100% Filled', label: 'Event Attendance' }
    ],
    challenge: 'Highlighting international curricula (CBSE, ICSE, IB) and academic events effectively to local Mumbai parents to drive engagement and credibility.',
    solution: 'Deployed a dedicated social media coordinator on campus for seamless live event coverage, creating powerful reels, video stories, and technical SEO updates.',
    tech: ['Event Coverage', 'SEO', 'Video Reels', 'Instagram'],
    impact: 'Increased monthly social media impressions by 300% and generated qualified inquiries for all major curriculum streams.'
  },
  {
    title: 'Higher Education Branding & Leads',
    client: 'ARMIET COLLEGE',
    metrics: [
      { value: '60% More', label: 'Direct Inquiries' },
      { value: '50% Faster', label: 'Web Page Load' }
    ],
    challenge: 'Attracting engineering and MBA aspirants in Thane/Asangaon amidst heavy competition, using a slow, unoptimized web portal.',
    solution: 'Rebuilt the college portal with mobile-first web engineering standards, integrated technical SEO audits, and launched Google/Facebook lead-generation funnels.',
    tech: ['Web Engineering', 'Local SEO', 'Lead Funnels', 'Facebook Ads'],
    impact: 'Admissions applications increased by 60% with zero server crashes during high-traffic results days.'
  }
];

const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        setLoading(true);
        // 1. Check module status
        const modulesResponse = await fetch(`${CURRENT_API_BASE}/api/modules`);
        let cmsActive = false;
        if (modulesResponse.ok) {
          const modules = await modulesResponse.json();
          const targetMod = modules.find(m => m.id === 'case_studies');
          if (targetMod && targetMod.enabled === 1) {
            cmsActive = true;
          }
        }

        if (cmsActive) {
          // 2. Query dynamic page CMS endpoint
          const response = await fetch(`${CURRENT_API_BASE}/api/pages/case_studies`);
          if (response.ok) {
            const data = await response.json();
            setCaseStudies(data);
          } else {
            throw new Error('Case studies database content not found.');
          }
        } else {
          setCaseStudies(staticCaseStudiesData);
        }
      } catch (err) {
        console.warn('Case Studies CMS failed, loading static backups.', err);
        setCaseStudies(staticCaseStudiesData);
      } finally {
        setLoading(false);
      }
    };
    fetchCaseStudies();
  }, []);

  const breadcrumbs = [{ name: 'Case Studies', path: '/case-studies' }];

  return (
    <div style={{ paddingTop: '80px' }}>
      <SEOMeta
        title="Web System Case Studies & Uptime Metrics | Host2Unlimited"
        description="Read our case studies detailing performance tuning, custom CRM configurations, WooCommerce integrations, and server optimizations."
        keywords="case studies web, speed optimization case study, cloud failover metrics, Host2Unlimited"
        canonical="https://host2unlimited.com/case-studies"
        breadcrumbPaths={breadcrumbs}
      />
      
      {/* Hero Banner Section */}
      <section 
        className="page-hero-banner"
        style={{ backgroundImage: `url(${caseStudiesHeroBg})` }}
      >
        <div className="container hero-content-wrapper">
          <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto' }}>
            <span className="hero-badge">
              📈 Client Success & Impact
            </span>
            <h1 style={{ fontSize: '46px', fontWeight: 800, marginBottom: '20px' }}>Case Studies</h1>
            <p style={{ maxWidth: '650px', margin: '0 auto', color: '#cbd5e1', fontSize: '17px' }}>
              Discover how Host2Unlimited custom development and cloud hosting frameworks solve technical bottlenecks and improve business revenue.
            </p>
            <Breadcrumbs paths={breadcrumbs} />
          </div>
        </div>
      </section>

      <div className="container" style={{ marginTop: '50px' }}>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
            Retrieving case studies portfolio...
          </div>
        ) : (
          /* Case Studies List */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
            {caseStudies.map((study, idx) => (
              <motion.div
                key={idx}
                className="card-glass"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, boxShadow: '0 20px 45px -10px rgba(14, 165, 233, 0.15)' }}
                style={{ padding: '40px', textAlign: 'left', transition: 'box-shadow var(--transition-fast), transform var(--transition-fast)' }}
              >
                
                {/* Top banner info */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '24px', marginBottom: '24px' }}>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', backgroundColor: 'var(--primary-light)', padding: '4px 10px', borderRadius: '4px' }}>
                      {study.client}
                    </span>
                    <h2 style={{ fontSize: '28px', fontWeight: 800, marginTop: '12px', letterSpacing: '-0.5px' }}>{study.title}</h2>
                  </div>
                  {/* Metric Badges */}
                  {study.metrics && study.metrics.length > 0 && (
                    <div style={{ display: 'flex', gap: '16px' }} className="study-metrics-row">
                      {study.metrics.map((m, midx) => (
                        <div key={midx} style={{ backgroundColor: 'var(--bg-secondary)', padding: '12px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
                          <span style={{ fontSize: '22px', fontWeight: 800, color: 'var(--primary)', display: 'block' }}>{m.value}</span>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{m.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Body Columns */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px' }} className="study-body-grid">
                  
                  {/* Text explanation */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ borderLeft: '4px solid #ef4444', paddingLeft: '16px' }}>
                      <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', color: '#ef4444', marginBottom: '8px', fontWeight: 700 }}>
                        <Target size={16} /> The Challenge
                      </h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', lineHeight: 1.6, margin: 0 }}>{study.challenge}</p>
                    </div>
                    
                    <div style={{ borderLeft: '4px solid #10b981', paddingLeft: '16px' }}>
                      <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', color: '#10b981', marginBottom: '8px', fontWeight: 700 }}>
                        <CheckCircle2 size={16} /> The Solution
                      </h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', lineHeight: 1.6, margin: 0 }}>{study.solution}</p>
                    </div>

                    <div style={{ borderLeft: '4px solid var(--primary)', paddingLeft: '16px' }}>
                      <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', color: 'var(--primary)', marginBottom: '8px', fontWeight: 700 }}>
                        <TrendingUp size={16} /> Business Impact
                      </h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', lineHeight: 1.6, margin: 0 }}>{study.impact}</p>
                    </div>
                  </div>

                  {/* Tech & Action */}
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'var(--bg-secondary)', padding: '30px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', borderTop: '4px solid var(--primary)', boxShadow: 'var(--shadow-sm)' }}>
                    <div>
                      <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>Technologies Employed</h4>
                      {study.tech && study.tech.length > 0 && (
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                          {study.tech.map((t, tidx) => (
                            <span key={tidx} style={{ fontSize: '13px', backgroundColor: 'var(--bg-primary)', padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontWeight: 600 }}>
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <Link to="/contact" className="btn btn-primary" style={{ width: '100%', padding: '14px 28px', fontSize: '15px' }}>
                      Replicate These Results
                    </Link>
                  </div>

                </div>

              </motion.div>
            ))}
          </div>
        )}

      </div>

      <style>{`
        @media (max-width: 768px) {
          .study-body-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .study-metrics-row {
            width: 100% !important;
            justify-content: flex-start !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CaseStudies;
