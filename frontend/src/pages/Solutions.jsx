import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, Building2, Rocket, ShoppingBag, GraduationCap, Check, ArrowRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import SEOMeta from '../components/SEOMeta';
import Breadcrumbs from '../components/Breadcrumbs';

const CURRENT_API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5050'
  : window.location.origin;

const staticSolutionsData = [
  {
    icon_name: 'Building2',
    title: 'Enterprise Digitalization',
    subtitle: 'For Large Companies & Organizations',
    desc: 'Scale legacy architectures into high-performance web systems. We construct customized integrations to automate operational pipelines and secure data stores.',
    bulletTitle: 'Key Focus Areas:',
    bullets: ['Legacy Systems Migration & Modernization', 'Custom ERP & CRM software engineering', 'Military-grade database encryption', 'Automated reporting dashboards', 'RESTful API developer environments']
  },
  {
    icon_name: 'Rocket',
    title: 'Startup Scale Accelerator',
    subtitle: 'For Early-stage & Venture Backed Teams',
    desc: 'Build, deploy, and validate your MVP platforms rapidly. We deploy lightweight, high-performance web applications using robust React and secure databases.',
    bulletTitle: 'Key Focus Areas:',
    bullets: ['MVP scoping and modular designs', 'High-conversion SaaS landing pages', 'Continuous integration (CI/CD) pipelines', 'Scalable hosting deployments', 'Product analytics & heatmaps tracking']
  },
  {
    icon_name: 'ShoppingBag',
    title: 'E-Commerce Infrastructure',
    subtitle: 'For Retailers & Digital Brands',
    desc: 'Boost conversion rates, eliminate payment friction, and sync product inventories across channels. We build secure online stores handling high peak volumes.',
    bulletTitle: 'Key Focus Areas:',
    bullets: ['Optimized checkout page funnels', 'Multi-channel inventory management', 'Localized payment API modules', 'Personalized buyer dashboards', 'Automated receipt and email tracking']
  },
  {
    icon_name: 'GraduationCap',
    title: 'Public Sector & Academics',
    subtitle: 'For Schools, Colleges, and Organizations',
    desc: 'Deploy secure portal portals supporting high concurrent users. We align systems with WCAG accessibility guidelines and secure student databases.',
    bulletTitle: 'Key Focus Areas:',
    bullets: ['WCAG Accessibility compliant layouts', 'Student management systems (SMS)', 'Secure login & roles databases', 'Interactive resource centers', 'Server load optimization for exam events']
  }
];

const Solutions = () => {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        setLoading(true);
        // 1. Check if solutions module is active
        const modulesResponse = await fetch(`${CURRENT_API_BASE}/api/modules`);
        let cmsActive = false;
        if (modulesResponse.ok) {
          const modules = await modulesResponse.json();
          const targetMod = modules.find(m => m.id === 'solutions');
          if (targetMod && targetMod.enabled === 1) {
            cmsActive = true;
          }
        }

        if (cmsActive) {
          // 2. Fetch from database
          const response = await fetch(`${CURRENT_API_BASE}/api/pages/solutions`);
          if (response.ok) {
            const data = await response.json();
            setSolutions(data);
          } else {
            throw new Error('Solutions page content not found.');
          }
        } else {
          setSolutions(staticSolutionsData);
        }
      } catch (err) {
        console.warn('Solutions CMS connection failed, loading fallback static solutions.', err);
        setSolutions(staticSolutionsData);
      } finally {
        setLoading(false);
      }
    };
    fetchSolutions();
  }, []);

  const breadcrumbs = [{ name: 'Solutions', path: '/solutions' }];

  return (
    <div style={{ padding: '100px 0 100px 0' }}>
      <SEOMeta
        title="Solutions"
        description="Scalable technical solutions: Enterprise digitalization, CRM/ERP database development, WooCommerce structures, and public sector portal portals."
        keywords="enterprise systems, business solutions, SaaS accelerator, API connections, Host2Unlimited"
        canonical="https://host2unlimited.com/solutions"
        breadcrumbPaths={breadcrumbs}
      />
      <Breadcrumbs paths={breadcrumbs} />

      <div className="container" style={{ marginTop: '40px' }}>
        
        {/* Top Header */}
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
            Industry Verticals
          </span>
          <h1 style={{ fontSize: '46px', fontWeight: 800, marginBottom: '20px', letterSpacing: '-1px' }}>Tailored Business Solutions</h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '17px', lineHeight: 1.6 }}>
            We align industry requirements with optimized engineering strategies to drive operational excellence and revenue growth.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
            Retrieving solutions verticals...
          </div>
        ) : (
          /* Row blocks for Solutions */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '90px' }}>
            {solutions.map((sol, idx) => {
              const Icon = Icons[sol.icon_name] || Globe;
              const isOdd = idx % 2 !== 0;

              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '60px',
                    flexDirection: isOdd ? 'row-reverse' : 'row'
                  }}
                  className="solution-row"
                >
                  {/* Visual Block */}
                  <div style={{ width: '45%' }} className="solution-visual">
                    <motion.div 
                      className="card-glass" 
                      whileHover={{ y: -8, scale: 1.02 }}
                      style={{ 
                        padding: '40px', 
                        background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--primary-light) 100%)', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '24px', 
                        position: 'relative',
                        border: '1px solid var(--glass-border)',
                        boxShadow: 'var(--glass-shadow)',
                        borderRadius: 'var(--radius-lg)',
                        textAlign: 'left'
                      }}
                    >
                      {/* Top icon */}
                      <div style={{ display: 'inline-flex', width: '56px', height: '56px', borderRadius: '12px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--primary)', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={24} />
                      </div>
                      
                      <div>
                        <span style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{sol.subtitle}</span>
                        <h3 style={{ fontSize: '26px', fontWeight: 800, marginTop: '4px', color: 'var(--text-primary)' }}>{sol.title}</h3>
                      </div>

                      <p style={{ color: 'var(--text-secondary)', fontSize: '15.5px', lineHeight: 1.6, margin: 0 }}>
                        {sol.desc}
                      </p>
                    </motion.div>
                  </div>

                  {/* Bullet points Text Block */}
                  <div style={{ width: '55%', textAlign: 'left' }} className="solution-text">
                    <h4 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Check size={18} className="text-gradient" /> {sol.bulletTitle}
                    </h4>

                    {sol.bullets && sol.bullets.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {sol.bullets.map((bullet, bidx) => (
                          <div 
                            key={bidx}
                            style={{ 
                              display: 'flex', 
                              gap: '12px', 
                              padding: '16px 20px', 
                              backgroundColor: 'var(--bg-secondary)', 
                              border: '1px solid var(--border-color)', 
                              borderRadius: 'var(--radius-md)',
                              fontSize: '14.5px',
                              color: 'var(--text-secondary)',
                              alignItems: 'center'
                            }}
                          >
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--primary)', flexShrink: 0 }} />
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div style={{ marginTop: '30px' }}>
                      <Link to="/contact" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        Consult Our Specialists <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default Solutions;
