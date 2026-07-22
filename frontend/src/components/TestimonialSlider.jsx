import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle } from 'lucide-react';

const CURRENT_API_BASE = import.meta.env.DEV ? 'http://localhost:5050' : (import.meta.env.VITE_API_URL || window.location.origin).replace(/\/+$/, '');

const staticTestimonials = [
  {
    id: 1,
    name: 'Dr. R. S. Jain',
    company: 'ARMIET Engineering College',
    designation: 'Principal',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150',
    rating: 5,
    review: 'Host2Unlimited helped us establish our digital admissions portal and online lead marketing funnel. The student enrollment campaigns produced excellent results and visibility across Maharashtra.'
  },
  {
    id: 2,
    name: 'Dr. Hitesh Patel',
    company: 'Somaiya College',
    designation: 'Academic Head',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150',
    rating: 5,
    review: 'Their web development team built a highly responsive, custom portal for our admissions. The server hosting is incredibly reliable and handles our traffic spikes during admission cycles with ease.'
  },
  {
    id: 3,
    name: 'Sanjay Sawant',
    company: 'EuroKids Pre-School',
    designation: 'Director',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150',
    rating: 5,
    review: 'The local SEO and digital marketing strategy by Host2Unlimited significantly improved parent inquiries for our preschool branches. The conversion tracking is precise and reliable.'
  },
  {
    id: 4,
    name: 'Sunita Nair',
    company: 'New Horizon School',
    designation: 'Admissions Coordinator',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
    rating: 5,
    review: 'Host2Unlimited completely transformed our school\'s online branding. Their social media campaigns and targeted lead funnels helped us connect with local parents and meet our enrollment goals.'
  },
  {
    id: 5,
    name: 'Megha Joshi',
    company: 'Dnyan Ganga Education Trust',
    designation: 'Trustee',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150',
    rating: 5,
    review: 'Our trust has been working with Host2Unlimited for multiple school branches. Their admission marketing campaigns are highly structured and transparent, producing consistent, measurable growth.'
  },
  {
    id: 6,
    name: 'Rajesh Kadam',
    company: 'V-Sign Preschool',
    designation: 'Founder',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150',
    rating: 5,
    review: 'We saw a dramatic rise in search engine rankings and parent inquiries within just three months of hiring Host2Unlimited for local SEO and web development. A fantastic strategic partner!'
  }
];

const TestimonialSlider = () => {
  const testimonialScrollRef = React.useRef(null);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const scrollTestimonials = (direction) => {
    if (testimonialScrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      testimonialScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Auto-scroll loop every 3.5s (pauses when user hovers or interacts)
  useEffect(() => {
    if (loading || testimonials.length === 0 || isHovered) return;

    const interval = setInterval(() => {
      if (testimonialScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = testimonialScrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 15) {
          testimonialScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          testimonialScrollRef.current.scrollBy({ left: 380, behavior: 'smooth' });
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [loading, testimonials, isHovered]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        // 1. Try Google Reviews endpoint first
        try {
          const googleRes = await fetch(`${CURRENT_API_BASE}/api/google-reviews`);
          if (googleRes.ok) {
            const googleData = await googleRes.json();
            if (Array.isArray(googleData.reviews) && googleData.reviews.length > 0) {
              setTestimonials(googleData.reviews);
              setLoading(false);
              return;
            }
          }
        } catch (gErr) {
          console.warn('Google Reviews endpoint offline/unconfigured, checking CMS.', gErr);
        }

        // 2. Check module toggle status
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
          const response = await fetch(`${CURRENT_API_BASE}/api/pages/testimonials`);
          if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
              setTestimonials(data);
            } else {
              setTestimonials(staticTestimonials);
            }
          } else {
            setTestimonials(staticTestimonials);
          }
        } else {
          setTestimonials(staticTestimonials);
        }
      } catch (err) {
        console.warn('Testimonials fetch fallback triggered.', err);
        setTestimonials(staticTestimonials);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();

    const handleUpdate = (e) => {
      if (e.detail?.page === 'testimonials' || e.detail?.type === 'module_update') {
        fetchTestimonials();
      }
    };
    window.addEventListener('cmsPageUpdate', handleUpdate);
    return () => {
      window.removeEventListener('cmsPageUpdate', handleUpdate);
    };
  }, []);

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      
      {/* Navigation Arrows Controls */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', width: '100%', marginBottom: '10px' }}>
        <button 
          onClick={() => scrollTestimonials('left')} 
          aria-label="Scroll testimonials left"
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={() => scrollTestimonials('right')} 
          aria-label="Scroll testimonials right"
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Scrollable Testimonials Container */}
      <div 
        ref={testimonialScrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="testimonials-scroll-container hide-scrollbar" 
        style={{ 
          display: 'flex', 
          gap: '24px', 
          overflowX: 'auto', 
          width: '100%',
          paddingBottom: '20px',
          paddingTop: '10px',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {testimonials.map((testimony, idx) => (
          <div 
            key={testimony.id || idx} 
            className="card-glass testimonial-card" 
            style={{ 
              flex: '0 0 360px',
              maxWidth: '85vw',
              scrollSnapAlign: 'start',
              position: 'relative', 
              overflow: 'hidden', 
              padding: '28px 24px', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              gap: '20px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <Quote 
              size={50} 
              style={{ 
                position: 'absolute', 
                top: '16px', 
                right: '16px', 
                opacity: 0.05, 
                color: 'var(--primary)' 
              }} 
            />

            {/* Profile Header: Photo (Increased size), Name, Designation & Company, Yellow Stars */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img 
                src={testimony.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150'} 
                alt={testimony.name} 
                style={{ 
                  width: '65px', 
                  height: '65px', 
                  borderRadius: '50%', 
                  objectFit: 'cover',
                  flexShrink: 0,
                  border: '2.5px solid var(--primary)',
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.12)' 
                }} 
              />
              <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '4px', flexGrow: 1 }}>
                <h4 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {testimony.name}
                  <CheckCircle size={15} color="#10b981" />
                </h4>
                <span style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: 1.3 }}>
                  {testimony.designation}, <strong>{testimony.company}</strong>
                </span>

                {/* Yellow Stars */}
                <div style={{ display: 'flex', gap: '3px', marginTop: '4px' }}>
                  {[...Array(testimony.rating || 5)].map((_, i) => (
                    <Star key={i} size={17} fill="#eab308" color="#eab308" />
                  ))}
                </div>
              </div>
            </div>

            {/* Message / Review Content */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <p style={{ 
                fontSize: '14.5px', 
                lineHeight: 1.65, 
                color: 'var(--text-primary)', 
                fontWeight: 500, 
                fontStyle: 'italic',
                margin: 0,
                textAlign: 'justify'
              }}>
                "{testimony.review}"
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Google Reviews CTA */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginTop: '10px' }}>
        <a 
          href="https://www.google.com/search?q=Host2Unlimited+Mulund&sca_esv=5fbeaf94ea03b9d5&sxsrf=APpeQnucxrlLKMwGWJ9IYtLVEBNW9FQmxA%3A1784186391024&ei=F4ZYasBuiLaq2w_-l72QBg&biw=1138&bih=484&ved=0ahUKEwiA1rKg1NaVAxUIm2oFHf5LD2IQ4dUDCBI&uact=5&oq=Host2Unlimited+Mulund&gs_lp=Egxnd3Mtd2l6LXNlcnAiFUhvc3QyVW5saW1pdGVkIE11bHVuZDIEECMYJzIGEAAYFhgeMgIQJjIFEAAY7wUyCBAAGIAEGKIEMggQABiABBiiBDIIEAAYgAQYogRI5ChQsxlYnCVwAXgAkAEAmAGFAqABxQuqAQUwLjcuMbgBA8gBAPgBAZgCBKAC-wTCAg4QABiABBiKBRiGAxiwA8ICCxAAGIAEGKIEGLADwgIIEAAY7wUYsAOYAwCIBgGQBgeSBwUxLjIuMaAH-CKyBwUwLjIuMbgH9ATCBwMyLTTIBxWACAE&sclient=gws-wiz-serp#lrd=0x3be7b8fff5308517:0x18c885b8cc0fdc0,3,,,," 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-primary" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '12px 24px',
            fontSize: '14.5px',
            fontWeight: 600
          }}
        >
          ✍ Write a Google Review
        </a>
      </div>

      <style>{`
        .testimonials-grid {
          display: grid !important;
          grid-template-columns: repeat(3, 1fr) !important;
        }
        @media (max-width: 992px) {
          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .testimonials-grid {
            grid-template-columns: 1fr !important;
          }
        }
        .testimonial-card:hover {
          transform: translateY(-6px);
          border-color: var(--primary) !important;
          box-shadow: 0 12px 24px rgba(14, 165, 233, 0.12) !important;
        }
      `}</style>

    </div>
  );
};

export default TestimonialSlider;
