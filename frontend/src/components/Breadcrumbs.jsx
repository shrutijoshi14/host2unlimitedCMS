import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Breadcrumbs Component
 * Renders SEO-optimized visual navigation trail with Schema support.
 * @param {Array} paths - Array of { name, path }
 * @param {Boolean} centered - Whether to center align breadcrumbs (default true)
 */
const Breadcrumbs = ({ paths = [], centered = true }) => {
  if (!paths || paths.length === 0) return null;

  return (
    <nav 
      aria-label="Breadcrumb" 
      style={{
        padding: '10px 0',
        backgroundColor: 'transparent',
        border: 'none',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: centered ? 'center' : 'flex-start',
        marginTop: '20px'
      }}
    >
      <div 
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          fontSize: '14px',
          fontWeight: 600,
          color: '#cbd5e1',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          padding: '6px 18px',
          borderRadius: '30px',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.12)'
        }}
      >
        {/* Home Link */}
        <Link 
          to="/" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '4px', 
            color: '#94a3b8',
            transition: 'color var(--transition-fast)',
            textDecoration: 'none'
          }}
          className="breadcrumb-link"
        >
          <span>Home</span>
        </Link>

        {paths.map((item, idx) => {
          const isLast = idx === paths.length - 1;

          return (
            <React.Fragment key={idx}>
              <span style={{ color: '#64748b', fontWeight: 400, userSelect: 'none' }}>/</span>
              
              {isLast ? (
                <motion.span 
                  initial={{ opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ color: '#60a5fa', fontWeight: 700 }}
                  aria-current="page"
                >
                  {item.name}
                </motion.span>
              ) : (
                <Link 
                  to={item.path}
                  style={{ 
                    color: '#94a3b8',
                    transition: 'color var(--transition-fast)',
                    textDecoration: 'none'
                  }}
                  className="breadcrumb-link"
                >
                  {item.name}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <style>{`
        .breadcrumb-link:hover {
          color: #ffffff !important;
          text-decoration: underline !important;
        }
      `}</style>
    </nav>
  );
};

export default Breadcrumbs;

