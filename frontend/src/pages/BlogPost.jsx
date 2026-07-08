import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock, Tag } from 'lucide-react';
import SEOMeta from '../components/SEOMeta';
import Breadcrumbs from '../components/Breadcrumbs';

const API_BASE = import.meta.env.DEV ? 'http://localhost:5050' : (import.meta.env.VITE_API_URL || window.location.origin).replace(/\/+$/, '');

const BlogPost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/api/blogs/${slug}`);
        if (!response.ok) {
          throw new Error('Article not found.');
        }
        const data = await response.ok ? await response.json() : null;
        if (data) {
          setBlog(data);
          
          // Set SEO metadata dynamically
          document.title = data.seo_title || `${data.title} | Host2Unlimited`;
          const metaDesc = document.querySelector('meta[name="description"]');
          if (metaDesc) {
            metaDesc.setAttribute('content', data.meta_description || data.title);
          } else {
            const meta = document.createElement('meta');
            meta.name = 'description';
            meta.content = data.meta_description || data.title;
            document.head.appendChild(meta);
          }
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();

    return () => {
      // Reset document title to general
      document.title = 'Host2Unlimited | Modern Web & Marketing Agency';
    };
  }, [slug]);

  if (loading) {
    return (
      <div style={{ padding: '200px 0 100px 0', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <div className="spinner" style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '3px solid rgba(59, 130, 246, 0.1)',
            borderTopColor: 'var(--primary)',
            animation: 'spin 1s linear infinite'
          }} />
          <span style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: 600 }}>Loading article details...</span>
        </div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div style={{ padding: '200px 0 100px 0', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="card-glass" style={{ padding: '40px', maxWidth: '500px', width: '100%', textAlign: 'center' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '14px' }}>Article Not Found</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '24px' }}>
            We couldn't retrieve the article you're searching for. It may have been drafted, removed, or has a different URL path.
          </p>
          <Link to="/blog" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <ArrowLeft size={16} /> Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Handle uploaded image URL vs full URL
  const imageUrl = blog.image_url && blog.image_url.startsWith('http')
    ? blog.image_url
    : blog.image_url ? `${API_BASE}${blog.image_url}` : '';

  // Parse tags list
  const tagsList = blog.tags
    ? blog.tags.split(',').map(t => t.trim()).filter(Boolean)
    : [];

  const breadcrumbs = [
    { name: 'Blog', path: '/blog' },
    { name: blog.title, path: `/blog/${slug}` }
  ];

  return (
    <div style={{ padding: '100px 0 100px 0' }}>
      <SEOMeta
        title={blog.seo_title || blog.title}
        description={blog.meta_description || blog.title}
        keywords={blog.tags || 'host2unlimited, technical article'}
        canonical={`https://host2unlimited.com/blog/${slug}`}
        schemaType="Article"
        breadcrumbPaths={breadcrumbs}
      />
      <Breadcrumbs paths={breadcrumbs} />

      <div className="container" style={{ maxWidth: '850px', marginTop: '40px' }}>
        
        {/* Navigation Breadcrumbs / Back button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '30px' }}>
          <Link 
            to="/blog" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px', 
              fontSize: '14px', 
              fontWeight: 600, 
              color: 'var(--text-muted)',
              textDecoration: 'none',
              transition: 'color var(--transition-fast)'
            }}
            className="hover-primary"
          >
            <ArrowLeft size={16} /> Back to Articles
          </Link>
        </div>

        {/* Category & Title */}
        <div style={{ textAlign: 'left', marginBottom: '24px' }}>
          <span style={{ 
            display: 'inline-block', 
            backgroundColor: 'var(--primary-light)', 
            color: 'var(--primary)', 
            padding: '4px 12px', 
            borderRadius: '20px', 
            fontWeight: 700, 
            fontSize: '12px',
            textTransform: 'uppercase',
            marginBottom: '14px',
            letterSpacing: '0.5px'
          }}>
            {blog.category}
          </span>
          <h1 style={{ fontSize: '38px', mdFontSize: '46px', fontWeight: 900, lineHeight: 1.25, marginBottom: '20px', color: 'var(--text-primary)' }}>
            {blog.title}
          </h1>
          
          {/* Metadata Row */}
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '20px', 
            fontSize: '13.5px', 
            color: 'var(--text-muted)',
            borderBottom: '1px solid var(--border-color)',
            paddingBottom: '20px',
            marginBottom: '30px'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <User size={15} style={{ color: 'var(--primary)' }} /> By <strong>{blog.author}</strong>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={15} /> {new Date(blog.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={15} /> {blog.read_time || '5 min read'}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        {blog.image_url && (
          <div className="card-glass" style={{ padding: '0', overflow: 'hidden', borderRadius: 'var(--radius-lg)', marginBottom: '40px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow-xl)' }}>
            <img 
              src={imageUrl} 
              alt={blog.title} 
              style={{ width: '100%', maxHeight: '480px', objectFit: 'cover', display: 'block' }}
            />
          </div>
        )}

        {/* Rich Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="blog-content-body"
          dangerouslySetInnerHTML={{ __html: blog.content }}
          style={{
            textAlign: 'left',
            color: 'var(--text-secondary)',
            fontSize: '16.5px',
            lineHeight: 1.8,
            marginBottom: '40px'
          }}
        />

        {/* Tags Row */}
        {tagsList.length > 0 && (
          <div style={{ 
            display: 'flex', 
            gap: '8px', 
            flexWrap: 'wrap', 
            borderTop: '1px solid var(--border-color)', 
            paddingTop: '24px', 
            marginTop: '40px',
            textAlign: 'left'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13.5px', color: 'var(--text-muted)', marginRight: '8px' }}>
              <Tag size={14} /> Tags:
            </span>
            {tagsList.map((tag, idx) => (
              <span 
                key={idx}
                style={{
                  fontSize: '12px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-secondary)',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontWeight: 500
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

      </div>

      {/* Styled class injection for content body markup styling */}
      <style>{`
        .hover-primary:hover {
          color: var(--primary) !important;
        }
        .blog-content-body p {
          margin-bottom: 20px;
        }
        .blog-content-body strong {
          color: var(--text-primary);
        }
        .blog-content-body h2 {
          font-size: 26px;
          margin-top: 40px;
          margin-bottom: 16px;
          color: var(--text-primary);
        }
        .blog-content-body h3 {
          font-size: 22px;
          margin-top: 32px;
          margin-bottom: 14px;
          color: var(--text-primary);
        }
        .blog-content-body ul, .blog-content-body ol {
          margin-bottom: 24px;
          padding-left: 24px;
        }
        .blog-content-body li {
          margin-bottom: 8px;
        }
        .blog-content-body blockquote {
          border-left: 4px solid var(--primary);
          background-color: var(--primary-light);
          padding: 16px 20px;
          margin: 30px 0;
          font-style: italic;
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
          color: var(--text-primary);
        }
      `}</style>
    </div>
  );
};

export default BlogPost;
