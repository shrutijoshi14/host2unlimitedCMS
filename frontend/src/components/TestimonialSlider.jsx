import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle } from 'lucide-react';

const CURRENT_API_BASE = import.meta.env.DEV ? 'http://localhost:5050' : (import.meta.env.VITE_API_URL || window.location.origin).replace(/\/+$/, '');

const staticTestimonials = [
  {
    id: 1,
    name: 'Sandeep Deshmukh',
    company: 'AgriGlobal Exports',
    designation: 'Managing Director',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150',
    rating: 5,
    review: 'Host2Unlimited completely overhauled our international supply portal. Our site load speeds improved by 40% and online inquiries tripled in under 3 months. Outstanding customer support!'
  },
  {
    id: 2,
    name: 'Priya Nair',
    company: 'EduSphere Hub',
    designation: 'Co-Founder',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
    rating: 5,
    review: 'Their custom software developers created an intuitive student portal with integrated payments and dashboard analytics. Project management was transparent and delivery was prompt.'
  },
  {
    id: 3,
    name: 'Marcus Vance',
    company: 'CloudScale SaaS',
    designation: 'Tech Director',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150',
    rating: 5,
    review: 'Switching our servers to Host2Unlimited cloud infrastructure reduced latency by half and solved our scaling challenges. A highly professional team of technicians.'
  }
];

const TestimonialSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        // 1. Check module toggle status
        const modulesResponse = await fetch(`${CURRENT_API_BASE}/api/modules`);
        let cmsActive = false;
        if (modulesResponse.ok) {
          const modules = await modulesResponse.json();
          const targetMod = modules.find(m => m.id === 'testimonials');
          if (targetMod && targetMod.enabled === 1) {
            cmsActive = true;
          }
        }

        if (cmsActive) {
          // 2. Fetch reviews array from dynamic CMS page
          const response = await fetch(`${CURRENT_API_BASE}/api/pages/testimonials`);
          if (response.ok) {
            const data = await response.json();
            setTestimonials(data);
          } else {
            throw new Error('Testimonials data not populated.');
          }
        } else {
          setTestimonials(staticTestimonials);
        }
      } catch (err) {
        console.warn('Testimonials CMS failed, loading static slider reviews.', err);
        setTestimonials(staticTestimonials);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  // Auto transition
  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [testimonials]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
        Retrieving testimonials...
      </div>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const activeTestimony = testimonials[activeIndex] || testimonials[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
      
      {/* Slider block */}
      <div className="card-glass" style={{ position: 'relative', overflow: 'hidden', padding: '48px', maxWidth: '800px', margin: '0 auto' }}>
        
        <Quote 
          size={80} 
          style={{ 
            position: 'absolute', 
            top: '20px', 
            left: '20px', 
            opacity: 0.05, 
            color: 'var(--primary)' 
          }} 
        />

        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* Star Rating */}
          <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginBottom: '24px' }}>
            {[...Array(activeTestimony.rating || 5)].map((_, i) => (
              <Star key={i} size={18} fill="var(--secondary)" color="var(--secondary)" />
            ))}
          </div>

          {/* Testimonial Review Content */}
          <p style={{ 
            fontSize: '18px', 
            lineHeight: 1.7, 
            color: 'var(--text-primary)', 
            fontWeight: 500, 
            marginBottom: '32px',
            fontStyle: 'italic'
          }}>
            "{activeTestimony.review}"
          </p>

          {/* User Profile Info */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
            <img 
              src={activeTestimony.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150'} 
              alt={activeTestimony.name} 
              style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                objectFit: 'cover',
                border: '2px solid var(--primary-light)' 
              }} 
            />
            <div style={{ textAlign: 'left' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                {activeTestimony.name}
                <CheckCircle size={14} color="#10b981" />
              </h4>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                {activeTestimony.designation}, <strong>{activeTestimony.company}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'absolute', width: '92%', top: '50%', left: '4%', transform: 'translateY(-50%)', pointerEvents: 'none' }} className="slider-arrows">
          <button 
            onClick={handlePrev}
            style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--bg-secondary)', 
              border: '1px solid var(--border-color)', 
              color: 'var(--text-primary)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              cursor: 'pointer',
              pointerEvents: 'auto',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all var(--transition-fast)'
            }}
            className="slider-arrow-btn"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={handleNext}
            style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--bg-secondary)', 
              border: '1px solid var(--border-color)', 
              color: 'var(--text-primary)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              cursor: 'pointer',
              pointerEvents: 'auto',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all var(--transition-fast)'
            }}
            className="slider-arrow-btn"
          >
            <ChevronRight size={20} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default TestimonialSlider;
