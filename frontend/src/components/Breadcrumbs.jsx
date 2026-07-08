import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';

/**
 * Breadcrumbs Component
 * Renders SEO-optimized visual navigation trail with Schema support.
 * @param {Array} paths - Array of { name, path }
 */
const Breadcrumbs = ({ paths = [] }) => {
  if (!paths || paths.length === 0) return null;

  return (
    <nav 
      aria-label="Breadcrumb" 
      style={{
        padding: '12px 24px',
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
      }}
    >
      <div 
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          fontSize: '13.5px',
          fontWeight: 500,
          color: 'var(--text-secondary)'
        }}
      >
        {/* Home Link */}
        <Link 
          to="/" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '4px', 
            color: 'var(--text-muted)',
            transition: 'color var(--transition-fast)' 
          }}
          className="breadcrumb-link"
        >
          <Home size={14} />
          <span>Home</span>
        </Link>

        {paths.map((item, idx) => {
          const isLast = idx === paths.length - 1;

          return (
            <React.Fragment key={idx}>
              <ChevronRight size={12} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              
              {isLast ? (
                <motion.span 
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  style={{ color: 'var(--primary)', fontWeight: 600 }}
                  aria-current="page"
                >
                  {item.name}
                </motion.span>
              ) : (
                <Link 
                  to={item.path}
                  style={{ 
                    color: 'var(--text-muted)',
                    transition: 'color var(--transition-fast)' 
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
          color: var(--primary) !important;
          text-decoration: underline !important;
        }
      `}</style>
    </nav>
  );
};

export default Breadcrumbs;
