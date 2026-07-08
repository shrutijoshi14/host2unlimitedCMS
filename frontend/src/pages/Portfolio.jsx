import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SEOMeta from '../components/SEOMeta';
import Breadcrumbs from '../components/Breadcrumbs';

const CURRENT_API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5050'
  : window.location.origin;

const staticProjects = [
  {
    id: 1,
    title: 'Apex Corporate Hub',
    client: 'Apex Global Enterprises',
    category: 'Corporate',
    tech: ['React', 'Next.js', 'Framer Motion', 'Vanilla CSS'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=500&h=320',
    desc: 'A premium, high-speed corporate portal optimized for global clients with real-time analytics.'
  },
  {
    id: 2,
    title: 'RetailPro E-Marketplace',
    client: 'RetailPro Logistics',
    category: 'E-Commerce',
    tech: ['PHP', 'Laravel', 'MySQL', 'Stripe API'],
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=500&h=320',
    desc: 'An enterprise ecommerce ecosystem supporting multiple vendors, stripe payments, and live tracking.'
  },
  {
    id: 3,
    title: 'MedVitals Cloud System',
    client: 'HealthLine Diagnostics',
    category: 'Software',
    tech: ['Node.js', 'Express.js', 'MongoDB', 'Docker'],
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=500&h=320',
    desc: 'Custom software suite handling diagnostic records, patient booking automation, and secure PDF export.'
  },
  {
    id: 4,
    title: 'State Portal Directory',
    client: 'Municipal Technology Board',
    category: 'Government',
    tech: ['TypeScript', 'React.js', 'PostgreSQL', 'AWS'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=500&h=320',
    desc: 'Highly accessible public directory compliance with WCAG level AA, serving millions of active citizens.'
  },
  {
    id: 5,
    title: 'LearnSmart Portal LMS',
    client: 'Nesta Education Group',
    category: 'Education',
    tech: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=500&h=320',
    desc: 'Learning management system holding video catalogs, real-time quizzes, and custom billing modules.'
  },
  {
    id: 6,
    title: 'GovTech Secure Vault',
    client: 'Federal Revenue Agency',
    category: 'Government',
    tech: ['PHP', 'Laravel', 'PostgreSQL', 'Gitlab CI'],
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=500&h=320',
    desc: 'A secure ledger console to process financial documentation with strict authorization protocols.'
  }
];

const categories = ['All', 'Corporate', 'E-Commerce', 'Software', 'Government', 'Education'];

const Portfolio = () => {
  const [filter, setFilter] = useState('All');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        // 1. Check module status
        const modulesResponse = await fetch(`${CURRENT_API_BASE}/api/modules`);
        let cmsActive = false;
        if (modulesResponse.ok) {
          const modules = await modulesResponse.json();
          const targetMod = modules.find(m => m.id === 'portfolio');
          if (targetMod && targetMod.enabled === 1) {
            cmsActive = true;
          }
        }

        if (cmsActive) {
          // 2. Query page database
          const response = await fetch(`${CURRENT_API_BASE}/api/pages/portfolio`);
          if (response.ok) {
            const data = await response.json();
            setProjects(data);
          } else {
            throw new Error('Portfolio content not seeded.');
          }
        } else {
          setProjects(staticProjects);
        }
      } catch (err) {
        console.warn('Portfolio CMS failed, loading static backup.', err);
        setProjects(staticProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const breadcrumbs = [{ name: 'Portfolio', path: '/portfolio' }];

  return (
    <div style={{ padding: '100px 0 100px 0' }}>
      <SEOMeta
        title="Our Enterprise Engineering Portfolio | Host2Unlimited"
        description="Browse through the websites, custom databases, CRM portals, and high-availability cloud configurations constructed by Host2Unlimited."
        keywords="development portfolio, custom web systems, React projects, Laravel ecommerce, Host2Unlimited"
        canonical="https://host2unlimited.com/portfolio"
        breadcrumbPaths={breadcrumbs}
      />
      <Breadcrumbs paths={breadcrumbs} />

      <div className="container" style={{ marginTop: '40px' }}>
        
        {/* Header Block */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
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
            Our Works
          </span>
          <h1 style={{ fontSize: '46px', fontWeight: 800, marginBottom: '20px' }}>Featured Projects</h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '17px' }}>
            Explore a collection of high-performance portals, ecommerce systems, and custom software architectures built for growth.
          </p>
        </div>

        {/* Filter bar */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '50px', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="btn"
              style={{
                padding: '10px 20px',
                fontSize: '14px',
                backgroundColor: filter === cat ? 'var(--primary)' : 'var(--bg-secondary)',
                color: filter === cat ? 'white' : 'var(--text-primary)',
                border: `1px solid ${filter === cat ? 'var(--primary)' : 'var(--border-color)'}`
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
            Retrieving portfolio catalog...
          </div>
        ) : (
          /* Projects Grid */
          <motion.div 
            layout
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  whileHover={{ y: -8, scale: 1.01, boxShadow: 'var(--shadow-lg)' }}
                  key={project.id || idx}
                  className="card-glass"
                  style={{ padding: '0', overflow: 'hidden', textAlign: 'left', display: 'flex', flexDirection: 'column' }}
                >
                  {/* Project Image */}
                  <div style={{ position: 'relative', overflow: 'hidden', height: '230px' }} className="project-img-container">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform var(--transition-slow)' }}
                      className="project-img"
                    />
                    <div style={{ position: 'absolute', top: '16px', right: '16px', backgroundColor: 'var(--glass-bg)', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', border: '1px solid var(--glass-border)' }}>
                      {project.category}
                    </div>
                  </div>

                  {/* Project Body */}
                  <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>{project.client}</span>
                      <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>{project.title}</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '20px', lineHeight: 1.5 }}>{project.desc}</p>
                      
                      {/* Tech list */}
                      {project.tech && project.tech.length > 0 && (
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                          {project.tech.map((t, tidx) => (
                            <span key={tidx} style={{ fontSize: '12px', backgroundColor: 'var(--bg-tertiary)', padding: '4px 10px', borderRadius: '4px', color: 'var(--text-primary)' }}>
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <Link to="/case-studies" className="btn btn-secondary" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                      View Case Study <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>

      <style>{`
        .project-img-container:hover .project-img {
          transform: scale(1.08);
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
