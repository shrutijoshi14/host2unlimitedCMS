import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Shield, Zap, Globe, Server, Award, ChevronDown, ChevronUp, AlertCircle, RefreshCw, Layers } from 'lucide-react';
import SEOMeta from '../../components/SEOMeta';
import Breadcrumbs from '../../components/Breadcrumbs';

const WordPressHosting = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const breadcrumbs = [
    { name: 'Services', path: '/services' },
    { name: 'WordPress Hosting', path: '/hosting/wordpress-hosting' }
  ];

  const pricingPlans = [
    {
      name: 'WP Personal',
      price: '₹199',
      period: 'mo',
      desc: 'Perfect for bloggers, single-site writers, and personal portfolios.',
      features: [
        '1 WordPress Website',
        '25 GB Ultra NVMe Storage',
        '10,000 Estimated Visits/mo',
        'Free SSL & Jetpack Free',
        'Automated Daily Backups',
        'Free WP Site Migration',
        'Standard WordPress Core Updates'
      ],
      popular: false,
      cta: 'Get WP Personal'
    },
    {
      name: 'WP Business',
      price: '₹399',
      period: 'mo',
      desc: 'Our recommended configuration for commercial WordPress sites and e-commerce (WooCommerce).',
      features: [
        '3 WordPress Websites',
        '80 GB Ultra NVMe Storage',
        '50,000 Estimated Visits/mo',
        'Free Unlimited SSL Certificates',
        'Redis Object Cache support',
        'LiteSpeed Cache Acceleration',
        '1-Click Staging Environment',
        '24/7 Managed WordPress Support'
      ],
      popular: true,
      cta: 'Get WP Business'
    },
    {
      name: 'WP Enterprise',
      price: '₹699',
      period: 'mo',
      desc: 'High-performance WP plan designed for huge media blogs, membership sites, and complex Woo stores.',
      features: [
        '10 WordPress Websites',
        '150 GB Ultra NVMe Storage',
        '200,000 Estimated Visits/mo',
        'Free Cloudflare Enterprise CDN',
        'Elasticsearch database queries ready',
        'WP-CLI & SSH developer access',
        'Imunify360 Malware Cleanup',
        'Priority Technical Support Ticket'
      ],
      popular: false,
      cta: 'Get WP Enterprise'
    }
  ];

  const hostingFaqs = [
    {
      question: 'What is Managed WordPress Hosting?',
      answer: 'Managed WordPress Hosting is a specialized environment where all server assets are tuned to run WordPress at peak efficiency. Host2Unlimited handles technical details like operating system updates, database caching rules, daily snapshot backups, and security hardening, leaving you to focus purely on content and marketing.'
    },
    {
      question: 'How do staging environments work?',
      answer: 'Staging environments allow you to create a perfect clone of your active WordPress site in one click. You can test theme modifications, verify new plugin updates, and debug custom code in a safe sandbox without impacting live visitors. Once verified, you can push the changes live instantly.'
    },
    {
      question: 'What cache setups do you configure?',
      answer: 'We deploy LiteSpeed Enterprise Web Server configurations. This enables native server-side caching (LSCache) which is significantly faster than standard PHP-based caching plugins. For our Business and Enterprise packages, we also activate Redis database Object Caching to reduce SQL query response times.'
    },
    {
      question: 'Can you secure my WordPress site from hacks?',
      answer: 'Yes. We run custom web application firewalls (WAF) configured with specific security rules to block common WordPress vulnerabilities (like SQL injections, brute-force login attacks, and cross-site scripting). Imunify360 scans directories daily to isolate malicious code automatically.'
    },
    {
      question: 'Is plugin update management included?',
      answer: 'Yes, on our managed plans, we monitor and install critical core updates. We can also configure automated visual regression testing to verify that plugin updates do not alter your website layout before applying them.'
    }
  ];

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <SEOMeta
        title="Managed WordPress Hosting with Redis & LSCache | Host2Unlimited"
        description="Supercharge your WordPress site with Host2Unlimited's Managed WordPress Hosting. Free staging, SSL, daily backups, Redis object cache, and LiteSpeed speeds. Starting at ₹199/mo."
        keywords="wordpress hosting, managed wordpress hosting, cheap wordpress hosting, litespeed caching wordpress, woocommerce hosting, host2unlimited, wp hosting"
        canonical="https://host2unlimited.com/hosting/wordpress-hosting"
        schemaType="Product"
        faqList={hostingFaqs}
        breadcrumbPaths={breadcrumbs}
      />

      <div style={{ paddingTop: '100px' }}>
        <Breadcrumbs paths={breadcrumbs} />
      </div>

      {/* Hero Header */}
      <section className="section-padding" style={{ padding: '80px 0', position: 'relative', background: 'var(--grad-hero)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '50px', alignItems: 'center' }} className="hero-grid">
            <div style={{ textAlign: 'left' }}>
              <span style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', padding: '6px 16px', borderRadius: '20px', fontSize: '13.5px', fontWeight: 700, display: 'inline-block', marginBottom: '16px' }}>
                ✍️ Managed Optimized Infrastructure
              </span>
              <h1 style={{ fontSize: '42px', fontWeight: 900, lineHeight: 1.2, marginBottom: '20px', textAlign: 'left' }}>
                Managed WordPress Hosting Built for Speed, Staging & Absolute Safety
              </h1>
              <p style={{ fontSize: '16.5px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '30px' }}>
                Stop dealing with slow databases and security vulnerabilities. Host2Unlimited tunes physical server nodes exclusively for the WordPress PHP and MySQL layout. Armed with native LiteSpeed server cache, Redis object caching databases, and one-click staging environments, we keep your WordPress and WooCommerce stores running fast.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <a href="#pricing" className="btn btn-primary">View WordPress Plans</a>
                <Link to="/contact" className="btn btn-secondary">Request Free Migration</Link>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center' }} className="animate-float">
              <div className="card-glass" style={{ padding: '24px', maxWidth: '400px', borderLeft: '5px solid var(--primary)', textAlign: 'left' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '14px', textAlign: 'left' }}>Optimized WP Tech Stack:</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '14px' }}><Check size={16} className="text-gradient" /> LiteSpeed Enterprise Caching</li>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '14px' }}><Check size={16} className="text-gradient" /> Redis Object Cache Integration</li>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '14px' }}><Check size={16} className="text-gradient" /> 1-Click Staging / Production Sync</li>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '14px' }}><Check size={16} className="text-gradient" /> Automatic WordPress Core Updates</li>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '14px' }}><Check size={16} className="text-gradient" /> Daily Off-site Snapshot Backups</li>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '14px' }}><Check size={16} className="text-gradient" /> Free WP Migration Assistance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: '36px', marginBottom: '16px' }}>Managed WordPress Hosting Packages</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '16px' }}>
              Select hosting packages optimized for your specific blog or e-commerce scaling limits. Secure, fast, and fully managed.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {pricingPlans.map((plan, idx) => (
              <motion.div 
                key={idx}
                className="card-glass"
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                  backgroundColor: 'var(--bg-primary)',
                  position: 'relative',
                  border: plan.popular ? '2px solid var(--primary)' : '1px solid var(--glass-border)'
                }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
              >
                {plan.popular && (
                  <span style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--primary)', color: 'white', padding: '4px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 700 }}>
                    BEST FOR WOO
                  </span>
                )}
                <div>
                  <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '8px', textAlign: 'left' }}>{plan.name}</h3>
                  <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '24px', textAlign: 'left', lineHeight: 1.4 }}>{plan.desc}</p>
                  
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '24px' }}>
                    <span style={{ fontSize: '36px', fontWeight: 900, color: 'var(--text-primary)' }}>{plan.price}</span>
                    <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>/{plan.period}</span>
                  </div>

                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                    {plan.features.map((feat, fidx) => (
                      <li key={fidx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-secondary)', textAlign: 'left' }}>
                        <Check size={16} className="text-gradient" style={{ flexShrink: 0 }} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link to="/contact" className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'}`} style={{ width: '100%' }}>
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Structured Content Section (Min 800 words goal) */}
      <section className="section-padding">
        <div className="container" style={{ maxWidth: '960px', textAlign: 'left' }}>
          
          <h2 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '24px', textAlign: 'left' }}>
            Why Choose Managed WordPress Hosting Over Generic Accounts?
          </h2>
          <p style={{ fontSize: '16px', lineHeight: 1.8, marginBottom: '20px', color: 'var(--text-secondary)' }}>
            WordPress is the world’s most popular content management system, powering over 43% of active websites. However, because it runs on a dynamic architecture of PHP scripts and MySQL database queries, standard web servers can struggle to load pages quickly when traffic scales. Host2Unlimited’s Managed WordPress hosting environment is designed specifically to run WordPress sites at peak efficiency, integrating advanced server-side cache utilities, security shields, and expert site care.
          </p>

          <h3 style={{ fontSize: '22px', fontWeight: 800, marginTop: '36px', marginBottom: '16px', textAlign: 'left' }}>
            LiteSpeed Web Cache & Redis Object Caching Database Tuning
          </h3>
          <p style={{ fontSize: '15.5px', lineHeight: 1.7, marginBottom: '16px', color: 'var(--text-secondary)' }}>
            Unlike generic web hosting providers running standard Apache server builds, we run LiteSpeed Enterprise Web Servers. LiteSpeed communicates directly with the physical CPU kernel to handle concurrent user requests with minimal RAM. LiteSpeed's native cache plugins store static copies of dynamic pages, loading your layout in milliseconds without executing slow PHP scripts.
          </p>
          <p style={{ fontSize: '15.5px', lineHeight: 1.7, marginBottom: '20px', color: 'var(--text-secondary)' }}>
            Furthermore, for database-heavy WooCommerce catalog layers and user login routes, we integrate Redis Object Caching. Redis acts as a memory cache for database requests. When a user clicks a product, Redis pulls the query result from memory instantly rather than searching the MySQL database on the disk. This speeds up cart checkouts, reduces database load, and boosts overall site conversion rates.
          </p>

          <h3 style={{ fontSize: '22px', fontWeight: 800, marginTop: '36px', marginBottom: '16px', textAlign: 'left' }}>
            WordPress Security, Staging Sandboxes & Backups
          </h3>
          <p style={{ fontSize: '15.5px', lineHeight: 1.7, marginBottom: '16px', color: 'var(--text-secondary)' }}>
            The open-source nature of WordPress makes it a common target for automated hacker scans. Host2Unlimited builds multi-layered security walls to protect your files. Our custom Web Application Firewall (WAF) includes rules designed specifically to block common exploits like SQL injections, XML-RPC floods, brute-force attacks, and plugin vulnerabilities.
          </p>
          <p style={{ fontSize: '15.5px', lineHeight: 1.7, marginBottom: '20px', color: 'var(--text-secondary)' }}>
            Additionally, our one-click staging sandbox tool allows developers to clone site files safely. You can test updates to theme layouts, install new plugins, or debug custom CSS files without affecting live visitors. Once verified, you can sync the staging site back to the production environment in a single click.
          </p>

          {/* Comparison Table */}
          <h3 style={{ fontSize: '22px', fontWeight: 800, marginTop: '40px', marginBottom: '20px', textAlign: 'left' }}>
            Detailed WordPress Hosting Stack Comparison
          </h3>
          <div className="table-responsive" style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginBottom: '32px' }}>
            <table>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '16px', textAlign: 'left' }}>Feature Metric</th>
                  <th style={{ padding: '16px', textAlign: 'left' }}>Host2Unlimited WP Hosting</th>
                  <th style={{ padding: '16px', textAlign: 'left' }}>Standard Linux Hosting</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px', fontWeight: 600 }}>Web Server Speed</td>
                  <td style={{ padding: '16px', color: 'var(--primary)', fontWeight: 700 }}>LiteSpeed Enterprise + LSCache</td>
                  <td style={{ padding: '16px' }}>Apache Standard (No caching)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px', fontWeight: 600 }}>Database Performance</td>
                  <td style={{ padding: '16px', color: 'var(--primary)', fontWeight: 700 }}>Redis Object Caching Ready</td>
                  <td style={{ padding: '16px' }}>Standard MySQL disk queries</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px', fontWeight: 600 }}>Staging Environment</td>
                  <td style={{ padding: '16px', color: 'var(--primary)', fontWeight: 700 }}>Free, 1-Click Staging</td>
                  <td style={{ padding: '16px' }}>Manual setup/copying required</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px', fontWeight: 600 }}>Security Hardening</td>
                  <td style={{ padding: '16px', color: 'var(--primary)', fontWeight: 700 }}>WP-specific WAF + Imunify360</td>
                  <td style={{ padding: '16px' }}>Generic server firewalls only</td>
                </tr>
                <tr>
                  <td style={{ padding: '16px', fontWeight: 600 }}>Developer Access</td>
                  <td style={{ padding: '16px', color: 'var(--primary)', fontWeight: 700 }}>SSH, SFTP, and WP-CLI</td>
                  <td style={{ padding: '16px' }}>FTP access only</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ fontSize: '22px', fontWeight: 800, marginTop: '36px', marginBottom: '16px', textAlign: 'left' }}>
            Optimize Internal Linking for SEO Rank Growth
          </h3>
          <p style={{ fontSize: '15.5px', lineHeight: 1.7, marginBottom: '20px', color: 'var(--text-secondary)' }}>
            To build custom designs and WooCommerce catalog layouts that stand out, we suggest checking our professional <Link to="/services" style={{ color: 'var(--primary)', fontWeight: 600 }}>E-Commerce Development solutions</Link>. Reviewing our custom <Link to="/case-studies" style={{ color: 'var(--primary)', fontWeight: 600 }}>Case Studies</Link> details how we optimize layouts to lower mobile bounce rates and drive organic conversion growth.
          </p>

        </div>
      </section>

      {/* Trust Signals & Testimonials */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', textAlign: 'left' }}>
            <div className="card-glass" style={{ backgroundColor: 'var(--bg-primary)' }}>
              <div style={{ display: 'flex', gap: '8px', color: 'var(--primary)', marginBottom: '14px' }}>
                {'★'.repeat(5)}
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                "We migrated our WooCommerce retail store to Host2Unlimited WordPress packages. The loading speeds improved significantly, driving checkout drop-off rates down by 45%. We highly recommend their caching setups."
              </p>
              <strong style={{ display: 'block', fontSize: '14.5px', color: 'var(--text-primary)' }}>Priya Nair</strong>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Co-Founder, EduSphere Hub</span>
            </div>

            <div className="card-glass" style={{ backgroundColor: 'var(--bg-primary)' }}>
              <div style={{ display: 'flex', gap: '8px', color: 'var(--primary)', marginBottom: '14px' }}>
                {'★'.repeat(5)}
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                "The 1-click staging workspace makes plugin updates stress-free. We verify theme edits and custom styling in sandbox directories before pushing them to live production paths."
              </p>
              <strong style={{ display: 'block', fontSize: '14.5px', color: 'var(--text-primary)' }}>Sandeep Deshmukh</strong>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Managing Director, AgriGlobal Exports</span>
            </div>

            <div className="card-glass" style={{ backgroundColor: 'var(--bg-primary)' }}>
              <div style={{ display: 'flex', gap: '8px', color: 'var(--primary)', marginBottom: '14px' }}>
                {'★'.repeat(5)}
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                "WP-CLI access is incredibly useful. We manage multiple WordPress sites efficiently. Their security modules scan files daily, keeping our code protected."
              </p>
              <strong style={{ display: 'block', fontSize: '14.5px', color: 'var(--text-primary)' }}>Marcus Vance</strong>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Tech Director, CloudScale SaaS Co.</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="section-padding">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="text-center" style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '12px' }}>WordPress Hosting FAQ</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15.5px' }}>
              Frequently asked questions on WooCommerce support, updates, staging sandboxes, and speed optimization.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }}>
            {hostingFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
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
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div style={{ padding: '0 24px 20px 24px', color: 'var(--text-secondary)', fontSize: '14.5px', lineHeight: 1.6, borderTop: '1px solid rgba(59, 130, 246, 0.1)' }}>
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
      </section>

      {/* Bottom CTA */}
      <section className="section-padding" style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="card-glass" style={{ background: 'var(--grad-primary)', color: 'white', padding: '50px 30px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <h2 style={{ color: 'white', fontSize: '32px', fontWeight: 800, margin: 0 }}>
                Supercharge Your WordPress Speed Today
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.9)', maxWidth: '600px', fontSize: '15.5px', margin: 0 }}>
                Migrate your WordPress and WooCommerce instances to Host2Unlimited for lightning-fast speeds and secure updates.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '10px' }}>
                <Link to="/contact" className="btn" style={{ backgroundColor: 'white', color: 'var(--primary)' }}>
                  Deploy Your WordPress Site
                </Link>
                <Link to="/contact" className="btn btn-glass" style={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.4)' }}>
                  Free Migration Request
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WordPressHosting;
