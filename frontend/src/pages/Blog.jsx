import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOMeta from '../components/SEOMeta';
import Breadcrumbs from '../components/Breadcrumbs';
import blogHeroBg from '../assets/hero_bg/blog_hero_art.svg';

const ACTIVE_API_BASE = import.meta.env.DEV ? 'http://localhost:5050' : (import.meta.env.VITE_API_URL || window.location.origin).replace(/\/+$/, '');

const staticArticles = [
  {
    id: 'static-1',
    title: 'Social Media Trends Every Educational Institute Should Know',
    category: 'Social Media',
    date: 'July 12, 2026',
    readTime: '5 min read',
    desc: 'Unpacking emerging video reels strategies, story campaigns, and community engagement algorithms for schools and colleges.',
    image: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80&w=400&h=260',
    slug: 'social-media-trends-every-educational-institute-should-know',
    created_at: new Date('2026-07-12').toISOString(),
    author: 'Marketing Lead'
  },
  {
    id: 'static-2',
    title: 'Google Business Profile: The Most Underutilized Admission Tool for Educational Institutes',
    category: 'SEO',
    date: 'July 05, 2026',
    readTime: '7 min read',
    desc: 'How local search map optimizations, reviews monitoring, and timely updates drive parent inquiries directly to your admissions desk.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400&h=260',
    slug: 'google-business-profile-most-underutilized-admission-tool',
    created_at: new Date('2026-07-05').toISOString(),
    author: 'SEO Expert'
  },
  {
    id: 'static-3',
    title: 'Why Every Educational Institute Needs a Consistent Digital Brand Identity',
    category: 'Branding',
    date: 'June 25, 2026',
    readTime: '6 min read',
    desc: 'Establishing a unified voice, visual guidelines, and digital footprints to secure trust and command a premium reputation online.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400&h=260',
    slug: 'why-every-educational-institute-needs-consistent-digital-brand-identity',
    created_at: new Date('2026-06-25').toISOString(),
    author: 'Branding Lead'
  },
  {
    id: 'static-4',
    title: 'Why Social Media is the New Trust-Building Platform for Brands',
    category: 'Social Media',
    date: 'June 18, 2026',
    readTime: '5 min read',
    desc: 'Traditional advertising is losing ground. Explore how authentic peer engagements, live interactions, and values sharing build brand credibility.',
    image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&q=80&w=400&h=260',
    slug: 'why-social-media-is-new-trust-building-platform',
    created_at: new Date('2026-06-18').toISOString(),
    author: 'Social Media Expert'
  },
  {
    id: 'static-5',
    title: 'How Social Media Builds Student Admissions for Educational Institutes',
    category: 'Digital Marketing',
    date: 'June 10, 2026',
    readTime: '8 min read',
    desc: 'A systematic review of running target demographic lead generation ads on Facebook, Instagram, and LinkedIn to fill classes.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400&h=260',
    slug: 'how-social-media-builds-student-admissions',
    created_at: new Date('2026-06-10').toISOString(),
    author: 'Admissions Partner'
  },
  {
    id: 'static-6',
    title: 'How SEO Builds Long-Term Business Growth Beyond Rankings',
    category: 'SEO',
    date: 'June 02, 2026',
    readTime: '6 min read',
    desc: 'Search engine optimization yields compounding dividends. Discover the value of technical audits, content authority, and user intent alignment.',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=400&h=260',
    slug: 'how-seo-builds-long-term-business-growth',
    created_at: new Date('2026-06-02').toISOString(),
    author: 'SEO Expert'
  },
  {
    id: 'static-7',
    title: 'Performance Marketing vs Traditional Marketing: What Wins in 2026?',
    category: 'Digital Marketing',
    date: 'May 28, 2026',
    readTime: '7 min read',
    desc: 'Comparing measurable parameters, budget tracking, and return on investment (ROI) in digital PPC ads versus print brochures.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400&h=260',
    slug: 'performance-marketing-vs-traditional-marketing',
    created_at: new Date('2026-05-28').toISOString(),
    author: 'Analytics Lead'
  },
  {
    id: 'static-8',
    title: 'Best SEO Strategies for Educational Institutions: A Complete Guide by Host2Unlimited',
    category: 'SEO',
    date: 'May 15, 2026',
    readTime: '9 min read',
    desc: 'A comprehensive playbook covering keywords for higher education, site speed optimization, schema markup, and backlink networks.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400&h=260',
    slug: 'best-seo-strategies-for-educational-institutions',
    created_at: new Date('2026-05-15').toISOString(),
    author: 'SEO Lead'
  },
  {
    id: 'static-9',
    title: 'How Branding Builds Trust in Educational Institutions',
    category: 'Branding',
    date: 'April 30, 2026',
    readTime: '5 min read',
    desc: 'A strong brand connects emotionally. Understand how legacy highlights, parent testimonials, and core mission statements drive parent decisions.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400&h=260',
    slug: 'how-branding-builds-trust-in-educational-institutions',
    created_at: new Date('2026-04-30').toISOString(),
    author: 'Branding Expert'
  },
  {
    id: 'static-10',
    title: 'From Classroom to Clicks: How Digital Marketing is Transforming Student Admissions',
    category: 'Digital Marketing',
    date: 'April 18, 2026',
    readTime: '8 min read',
    desc: 'The digital shift in the education vertical. How virtual tours, student reels, and CRM lead nurturing pipelines are replacing direct walk-ins.',
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb194ef3?auto=format&fit=crop&q=80&w=400&h=260',
    slug: 'from-classroom-to-clicks-how-digital-marketing-transforming-admissions',
    created_at: new Date('2026-04-18').toISOString(),
    author: 'Growth Partner'
  }
];

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
    <div style={{ paddingTop: '80px' }}>
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
        style={{ position: 'relative', height: '280px', minHeight: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: '#0b0f19' }}
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
