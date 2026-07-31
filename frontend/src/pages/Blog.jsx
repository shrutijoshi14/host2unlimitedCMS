import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOMeta from '../components/SEOMeta';
import Breadcrumbs from '../components/Breadcrumbs';
import blogHeroBg from '../assets/hero_bg/blog_hero_clean.png';

const ACTIVE_API_BASE = process.env.NODE_ENV === 'production'
  ? (window.location.origin.includes('localhost') ? 'http://localhost:5000' : 'https://host2unlimitedcms-backend.onrender.com')
  : 'http://localhost:5000';

import { staticArticles } from '../data/staticBlogs';

const categories = ['All', 'Digital Marketing', 'SEO', 'Branding', 'Social Media'];

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
  const [limit, setLimit] = useState(6);

  useEffect(() => {
    const checkCMSAndLoadData = async () => {
      try {
        setLoading(true);
        
        // 0. Fetch configured items_per_page limit from CMS
        let currentLimit = limit;
        try {
          const configRes = await fetch(`${ACTIVE_API_BASE}/api/blogs/config`);
          if (configRes.ok) {
            const configData = await configRes.json();
            if (configData.items_per_page) {
              currentLimit = Number(configData.items_per_page);
              setLimit(currentLimit);
            }
          }
        } catch (err) {
          console.warn('Could not fetch blog config:', err);
        }

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
          const blogsUrl = `${ACTIVE_API_BASE}/api/blogs?status=Published&page=${page}&limit=${currentLimit}&category=${filter}&search=${search}`;
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
          loadStaticArticles(currentLimit);
        }
      } catch (error) {
        console.warn('CMS connection failed, loading static mock fallback.', error);
        setIsCMSActive(false);
        loadStaticArticles(limit);
      } finally {
        setLoading(false);
      }
    };

    const loadStaticArticles = (effectiveLimit = limit) => {
      // Apply search and category filter locally for static fallback
      const filtered = staticArticles.filter(art => {
        const matchesCat = filter === 'All' || art.category === filter;
        const matchesSearch = art.title.toLowerCase().includes(search.toLowerCase()) || 
                              art.desc.toLowerCase().includes(search.toLowerCase());
        return matchesCat && matchesSearch;
      });

      // Simple static pagination
      const offset = (page - 1) * effectiveLimit;
      const paginated = filtered.slice(offset, offset + effectiveLimit);
      setArticles(paginated);
      setTotalPages(Math.ceil(filtered.length / effectiveLimit));
    };

    checkCMSAndLoadData();

    const handleUpdate = () => {
      checkCMSAndLoadData();
    };

    window.addEventListener('cmsBlogUpdate', handleUpdate);
    window.addEventListener('cmsModuleUpdate', handleUpdate);

    return () => {
      window.removeEventListener('cmsBlogUpdate', handleUpdate);
      window.removeEventListener('cmsModuleUpdate', handleUpdate);
    };
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
    <div style={{ paddingTop: '0px' }}>
      <SEOMeta
        title="Blog"
        description="Read technical articles on Host2Unlimited's blog. Caching tips, Google search guidelines, server configuration walkthroughs, and SEO advice."
        keywords="hosting blog, SEO rank tips, website speed articles, database scaling, Host2Unlimited"
        canonical="https://host2unlimited.com/blog"
        breadcrumbPaths={breadcrumbs}
      />
      
      {/* Hero Banner Section */}
      <section 
        className="page-hero-banner"
        style={{ position: 'relative', height: '190px', minHeight: '190px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: '#0b0f19' }}
      >
        <img 
          src={blogHeroBg} 
          alt="Blog Hero Background" 
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
        {/* Subpage Header Content */}
        <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 45px auto' }}>
          <span className="badge" style={{ marginBottom: '12px' }}>Technical Articles {isCMSActive && '• Live'}</span>
          <h1 style={{ fontSize: '36px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px', letterSpacing: '-0.5px', lineHeight: 1.25 }}>
            Latest Articles & News
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16.5px', lineHeight: 1.7 }}>
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
                  const dateToUse = art.published_at || art.created_at;
                  const formattedDate = dateToUse 
                    ? new Date(dateToUse).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
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
                            style={{ 
                              display: 'inline-flex', 
                              alignItems: 'center', 
                              justifyContent: 'center', 
                              padding: '10px 22px', 
                              backgroundColor: 'var(--primary)', 
                              color: '#ffffff', 
                              fontSize: '13.5px', 
                              fontWeight: 700, 
                              borderRadius: '8px', 
                              textDecoration: 'none',
                              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.25)',
                              transition: 'all 0.2s ease',
                              textAlign: 'center',
                              width: '100%'
                            }}
                            className="btn-read-more-styled"
                          >
                            Read More
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
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '50px', flexWrap: 'wrap' }}>
                <button 
                  disabled={page === 1}
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  className="btn"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', opacity: page === 1 ? 0.5 : 1, cursor: page === 1 ? 'not-allowed' : 'pointer' }}
                >
                  <ChevronLeft size={16} /> Prev
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className="btn"
                    style={{
                      padding: '8px 14px',
                      fontSize: '14px',
                      fontWeight: page === pageNum ? '800' : '600',
                      backgroundColor: page === pageNum ? 'var(--primary)' : 'var(--bg-secondary)',
                      color: page === pageNum ? 'white' : 'var(--text-primary)',
                      border: `1px solid ${page === pageNum ? 'var(--primary)' : 'var(--border-color)'}`,
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    {pageNum}
                  </button>
                ))}

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
