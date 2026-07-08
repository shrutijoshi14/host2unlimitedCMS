import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOMeta from '../components/SEOMeta';
import Breadcrumbs from '../components/Breadcrumbs';

const ACTIVE_API_BASE = import.meta.env.VITE_API_URL || window.location.origin;

const staticArticles = [
  {
    id: 'static-1',
    title: 'Why Vite + React is the Gold Standard for Modern SaaS in 2026',
    category: 'Website Development',
    date: 'June 28, 2026',
    readTime: '6 min read',
    desc: 'Unpacking the architectural benefits of hot module replacement, optimized build bundling, and code splitting configurations.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400&h=260',
    slug: 'why-vite-react-gold-standard-saas-2026',
    created_at: new Date('2026-06-28').toISOString(),
    author: 'Admin'
  },
  {
    id: 'static-2',
    title: 'How Core Web Vitals Impact Your Google Search Rankings',
    category: 'SEO',
    date: 'June 15, 2026',
    readTime: '8 min read',
    desc: 'Why Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS) are critical search ranking signals and how to fix them.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400&h=260',
    slug: 'how-core-web-vitals-impact-google-rankings',
    created_at: new Date('2026-06-15').toISOString(),
    author: 'SEO Expert'
  },
  {
    id: 'static-3',
    title: '5 Customer Acquisition Funnels That Convert 3x Better',
    category: 'Digital Marketing',
    date: 'May 30, 2026',
    readTime: '5 min read',
    desc: 'A case study review of landing page structure optimizations, localized landing pages, and interactive estimators.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400&h=260',
    slug: '5-customer-acquisition-funnels-convert-better',
    created_at: new Date('2026-05-30').toISOString(),
    author: 'Acquisition Expert'
  },
  {
    id: 'static-4',
    title: 'Building Serverless Workloads with AWS Lambda & Node.js',
    category: 'Technology',
    date: 'May 18, 2026',
    readTime: '10 min read',
    desc: 'An in-depth guide to engineering serverless REST APIs, setting up CORS configurations, and provisioning database clusters.',
    image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&q=80&w=400&h=260',
    slug: 'building-serverless-workloads-aws-lambda-nodejs',
    created_at: new Date('2026-05-18').toISOString(),
    author: 'Cloud Engineer'
  },
  {
    id: 'static-5',
    title: 'How Apex Global Accelerated Lead Captures by 60%',
    category: 'Case Studies',
    date: 'April 25, 2026',
    readTime: '7 min read',
    desc: 'A detailed breakdown of the wireframing, testing, and CSS refactoring tasks that solved mobile speed drops.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400&h=260',
    slug: 'how-apex-global-accelerated-leads-60-percent',
    created_at: new Date('2026-04-25').toISOString(),
    author: 'UX Designer'
  }
];

const categories = ['All', 'Website Development', 'SEO', 'Digital Marketing', 'Technology', 'Case Studies'];

const Blog = () => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  
  // Dynamic Blogs States
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCMSActive, setIsCMSActive] = useState(false);
  
  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(6);

  useEffect(() => {
    const checkCMSAndLoadData = async () => {
      try {
        setLoading(true);
        // 1. Fetch modules state to verify if Blog CMS is enabled
        const modulesResponse = await fetch(`${ACTIVE_API_BASE}/api/modules`);
        
        let cmsEnabled = false;
        if (modulesResponse.ok) {
          const modules = await modulesResponse.json();
          const blogMod = modules.find(m => m.id === 'blog');
          if (blogMod && blogMod.enabled === 1) {
            cmsEnabled = true;
          }
        }
        
        setIsCMSActive(cmsEnabled);

        if (cmsEnabled) {
          // 2. If CMS is enabled, query published articles dynamically
          const blogsUrl = `${ACTIVE_API_BASE}/api/blogs?status=Published&page=${page}&limit=${limit}&category=${filter}&search=${search}`;
          const blogsResponse = await fetch(blogsUrl);
          
          if (blogsResponse.ok) {
            const data = await blogsResponse.json();
            setArticles(data.blogs);
            setTotalPages(data.totalPages);
          } else {
            throw new Error('Failed to fetch blogs');
          }
        } else {
          // 3. CMS is disabled: fall back to static articles locally filtered
          loadStaticArticles();
        }
      } catch (error) {
        console.warn('CMS connection failed, loading static mock fallback.', error);
        setIsCMSActive(false);
        loadStaticArticles();
      } finally {
        setLoading(false);
      }
    };

    const loadStaticArticles = () => {
      // Apply search and category filter locally for static fallback
      const filtered = staticArticles.filter(art => {
        const matchesCat = filter === 'All' || art.category === filter;
        const matchesSearch = art.title.toLowerCase().includes(search.toLowerCase()) || 
                              art.desc.toLowerCase().includes(search.toLowerCase());
        return matchesCat && matchesSearch;
      });

      // Simple static pagination
      const offset = (page - 1) * limit;
      const paginated = filtered.slice(offset, offset + limit);
      setArticles(paginated);
      setTotalPages(Math.ceil(filtered.length / limit));
    };

    checkCMSAndLoadData();
  }, [page, filter, search, limit]);

  // Reset page when filter or search changes
  const handleFilterChange = (cat) => {
    setFilter(cat);
    setPage(1);
  };

  const handleSearchChange = (val) => {
    setSearch(val);
    setPage(1);
  };

  const breadcrumbs = [{ name: 'Blog', path: '/blog' }];

  return (
    <div style={{ padding: '100px 0 100px 0' }}>
      <SEOMeta
        title="Blog"
        description="Read technical articles on Host2Unlimited's blog. Caching tips, Google search guidelines, server configuration walkthroughs, and SEO advice."
        keywords="hosting blog, SEO rank tips, website speed articles, database scaling, Host2Unlimited"
        canonical="https://host2unlimited.com/blog"
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
            Technical Articles {isCMSActive && '• Live'}
          </span>
          <h1 style={{ fontSize: '46px', fontWeight: 800, marginBottom: '20px' }}>Latest Articles & News</h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '17px' }}>
            Stay updated with engineering insights, search engine guidelines, and digital conversion strategies.
          </p>
        </div>

        {/* Search and filter row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', marginBottom: '40px', flexWrap: 'wrap' }} className="blog-controls">
          {/* Category buttons */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterChange(cat)}
                className="btn"
                style={{
                  padding: '8px 16px',
                  fontSize: '13px',
                  backgroundColor: filter === cat ? 'var(--primary)' : 'var(--bg-secondary)',
                  color: filter === cat ? 'white' : 'var(--text-primary)',
                  border: `1px solid ${filter === cat ? 'var(--primary)' : 'var(--border-color)'}`
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div style={{ position: 'relative', width: '300px' }} className="blog-search-wrap">
            <input 
              type="text" 
              placeholder="Search articles..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="form-control"
              style={{ paddingLeft: '40px' }}
            />
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          </div>
        </div>

        {/* Articles Loading state */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)', fontSize: '16px' }}>
            Retrieving published article records...
          </div>
        ) : (
          <>
            {/* Articles Grid */}
            <motion.div 
              layout
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}
            >
              <AnimatePresence mode="popLayout">
                {articles.map((art) => {
                  const imageSrc = art.image_url 
                    ? (art.image_url.startsWith('http') ? art.image_url : `${ACTIVE_API_BASE}${art.image_url}`)
                    : art.image;

                  const readTitle = art.read_time || art.readTime || '5 min read';
                  const formattedDate = art.created_at 
                    ? new Date(art.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                    : art.date;

                  return (
                    <motion.article
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      key={art.id || art.slug}
                      className="card-glass"
                      style={{ padding: '0', overflow: 'hidden', textAlign: 'left', display: 'flex', flexDirection: 'column' }}
                    >
                      {/* Cover Image */}
                      {imageSrc && (
                        <div style={{ height: '200px', width: '100%', overflow: 'hidden' }}>
                          <img 
                            src={imageSrc} 
                            alt={art.title} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform var(--transition-slow)' }}
                            className="blog-cover"
                          />
                        </div>
                      )}

                      {/* Article Info */}
                      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                        <div>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                            {art.category}
                          </span>
                          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', lineHeight: 1.4, color: 'var(--text-primary)' }}>
                            {art.title}
                          </h3>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px', marginBottom: '16px', lineHeight: 1.5 }}>
                            {art.meta_description || art.desc}
                          </p>
                          {art.tags && (
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
                              {art.tags.split(',').map(t => t.trim()).filter(Boolean).map((tag, i) => (
                                <span key={i} style={{ fontSize: '11px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '10px', fontWeight: 600 }}>
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div>
                          <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '16px', flexWrap: 'wrap' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Calendar size={13} /> {formattedDate}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Clock size={13} /> {readTitle}
                            </span>
                            {art.author && (
                              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <User size={13} /> {art.author}
                              </span>
                            )}
                          </div>

                          <Link 
                            to={`/blog/${art.slug}`} 
                            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--primary)', textDecoration: 'none' }}
                            className="read-article-link"
                          >
                            Read Full Article <ArrowRight size={13} />
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {articles.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
                No articles found matching search criteria.
              </div>
            )}

            {/* Pagination controls for public view */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '50px' }}>
                <button 
                  disabled={page === 1}
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  className="btn"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', opacity: page === 1 ? 0.5 : 1, cursor: page === 1 ? 'not-allowed' : 'pointer' }}
                >
                  <ChevronLeft size={16} /> Prev
                </button>
                <span style={{ fontSize: '14.5px', color: 'var(--text-secondary)' }}>
                  Page <strong>{page}</strong> of <strong>{totalPages}</strong>
                </span>
                <button 
                  disabled={page === totalPages}
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  className="btn"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', opacity: page === totalPages ? 0.5 : 1, cursor: page === totalPages ? 'not-allowed' : 'pointer' }}
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        )}

      </div>

      <style>{`
        .blog-cover:hover {
          transform: scale(1.06);
        }
        .read-article-link:hover {
          text-decoration: underline !important;
        }
        @media (max-width: 768px) {
          .blog-controls {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .blog-search-wrap {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Blog;
