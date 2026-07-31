import React from 'react';
import { Target, Camera, Megaphone, Share2, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    id: 1,
    title: 'Strategic Admission Campaign Planning',
    desc: 'Launch hyper-targeted enrollment campaigns across digital channels to connect with prospective students and parents, ensuring optimal conversion rates.',
    icon: Target,
    color: '#3b82f6'
  },
  {
    id: 2,
    title: 'Event & Campus Coverage',
    desc: 'Capture live campus events, student achievements, and academic milestones with real-time video updates, reel production, and photo coverage.',
    icon: Camera,
    color: '#06b6d4'
  },
  {
    id: 3,
    title: 'Google & Meta Lead Generation Ads',
    desc: 'Run precision-targeted ad campaigns across Search, Instagram, and Facebook to generate high-quality admissions inquiries.',
    icon: Megaphone,
    color: '#8b5cf6'
  },
  {
    id: 4,
    title: 'Organic Social & Website Management',
    desc: 'Maintain active social handles, post regular brand updates, and keep institutional websites updated with SEO-friendly content.',
    icon: Share2,
    color: '#ec4899'
  },
  {
    id: 5,
    title: 'Content Marketing & PR Storytelling',
    desc: 'Develop value-driven campus blogs, newsletters, media releases, and engaging video stories to build authority and trust.',
    icon: FileText,
    color: '#10b981'
  }
];

const StepIllustration = ({ stepId, color }) => {
  switch (stepId) {
    case 1:
      return (
        <svg viewBox="0 0 200 120" style={{ width: '100%', maxHeight: '110px' }}>
          <circle cx="100" cy="60" r="38" fill="none" stroke={color} strokeWidth="2" strokeDasharray="4,4" opacity="0.4" />
          <circle cx="100" cy="60" r="24" fill="none" stroke={color} strokeWidth="2.5" />
          <circle cx="100" cy="60" r="8" fill={color} />
          <path d="M35 35 L80 52" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <path d="M35 85 L80 68" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <circle cx="28" cy="35" r="5" fill={color} opacity="0.7" />
          <circle cx="32" cy="60" r="6" fill={color} />
          <circle cx="28" cy="85" r="5" fill={color} opacity="0.7" />
          <path d="M125 85 L145 65 L165 75 L188 38" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
          <circle cx="188" cy="38" r="5" fill={color} />
        </svg>
      );
    case 2:
      return (
        <svg viewBox="0 0 200 120" style={{ width: '100%', maxHeight: '110px' }}>
          <rect x="30" y="25" width="140" height="70" rx="8" fill="rgba(15, 23, 42, 0.9)" stroke={color} strokeWidth="2" />
          <line x1="30" y1="45" x2="170" y2="45" stroke={color} strokeWidth="1.5" opacity="0.5" />
          <circle cx="42" cy="35" r="3" fill={color} />
          <circle cx="52" cy="35" r="3" fill={color} opacity="0.6" />
          <circle cx="62" cy="35" r="3" fill={color} opacity="0.3" />
          <polygon points="90,52 120,67 90,82" fill={color} />
          <rect x="140" y="55" width="20" height="12" rx="3" fill="none" stroke={color} strokeWidth="1.5" />
          <rect x="140" y="72" width="20" height="12" rx="3" fill={color} opacity="0.3" />
        </svg>
      );
    case 3:
      return (
        <svg viewBox="0 0 200 120" style={{ width: '100%', maxHeight: '110px' }}>
          <path d="M50 70 L75 70 L95 85 L95 35 L75 50 L50 50 Z" fill="rgba(15, 23, 42, 0.9)" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
          <rect x="40" y="54" width="10" height="12" rx="2" fill={color} />
          <path d="M110 48 A 18 18 0 0 1 110 72" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
          <path d="M122 38 A 30 30 0 0 1 122 82" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.7" />
          <path d="M134 28 A 42 42 0 0 1 134 92" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.4" />
        </svg>
      );
    case 4:
      return (
        <svg viewBox="0 0 200 120" style={{ width: '100%', maxHeight: '110px' }}>
          <path d="M100 22 C122 22, 142 28, 142 55 C142 85, 100 102, 100 102 C100 102, 58 85, 58 55 C58 28, 78 22, 100 22 Z" fill="rgba(15, 23, 42, 0.9)" stroke={color} strokeWidth="3" strokeLinejoin="round" />
          <path d="M84 60 L94 72 L118 46" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 5:
      return (
        <svg viewBox="0 0 200 120" style={{ width: '100%', maxHeight: '110px' }}>
          <rect x="38" y="32" width="54" height="68" rx="6" fill="rgba(15, 23, 42, 0.9)" stroke={color} strokeWidth="2" />
          <line x1="48" y1="46" x2="80" y2="46" stroke={color} strokeWidth="2.5" />
          <line x1="48" y1="58" x2="74" y2="58" stroke="#94a3b8" strokeWidth="2" />
          <line x1="48" y1="70" x2="78" y2="70" stroke="#94a3b8" strokeWidth="2" />
          <rect x="110" y="24" width="54" height="68" rx="6" fill="rgba(15, 23, 42, 0.9)" stroke={color} strokeWidth="2" />
          <line x1="120" y1="38" x2="152" y2="38" stroke={color} strokeWidth="2.5" />
          <line x1="120" y1="50" x2="146" y2="50" stroke="#94a3b8" strokeWidth="2" />
          <line x1="120" y1="62" x2="150" y2="62" stroke="#94a3b8" strokeWidth="2" />
          <path d="M96 55 L104 60 L96 65" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
};

const MarketingTimeline = () => {
  return (
    <div style={{ position: 'relative', maxWidth: '1000px', margin: '40px auto 0 auto', padding: '20px 0' }}>
      
      {/* Center line (Desktop only) */}
      <div 
        className="timeline-center-line"
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: '3px',
          background: 'linear-gradient(180deg, #3b82f6 0%, #ec4899 50%, #10b981 100%)',
          transform: 'translateX(-50%)',
          borderRadius: '2px',
          zIndex: 1,
          opacity: 0.6
        }}
      />

      {/* Timeline items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isEven = idx % 2 === 0;

          return (
            <div 
              key={step.id} 
              className={`timeline-item ${isEven ? 'even' : 'odd'}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                zIndex: 2,
                justifyContent: 'space-between',
                width: '100%',
                flexDirection: isEven ? 'row' : 'row-reverse'
              }}
            >
              
              {/* Bullet circle */}
              <div 
                style={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  backgroundColor: '#0b0f19',
                  border: `3px solid ${step.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: step.color,
                  boxShadow: `0 0 20px ${step.color}66`,
                  zIndex: 3
                }}
                className="timeline-bullet"
              >
                <Icon size={20} />
              </div>

              {/* Card Container */}
              <motion.div 
                whileHover={{ y: -5, scale: 1.015 }}
                className="timeline-card" 
                style={{ 
                  width: '44%', 
                  padding: '24px 26px', 
                  textAlign: 'left',
                  backgroundColor: 'rgba(30, 41, 59, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderLeft: `4px solid ${step.color}`,
                  borderRadius: '16px',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.35)',
                  backdropFilter: 'blur(12px)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <span style={{ 
                    fontSize: '11px', 
                    fontWeight: 800, 
                    color: '#ffffff', 
                    backgroundColor: step.color,
                    padding: '3px 10px',
                    borderRadius: '20px',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase'
                  }}>
                    Phase {step.id}
                  </span>
                </div>

                <h4 style={{ fontSize: '18.5px', fontWeight: 800, margin: '0 0 10px 0', textAlign: 'left', color: '#ffffff', lineHeight: 1.3 }}>
                  {step.title}
                </h4>

                <p style={{ fontSize: '14px', color: '#cbd5e1', margin: 0, lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </motion.div>

              {/* Illustration box on opposite side */}
              <div 
                className="timeline-illus"
                style={{
                  width: '44%',
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(15, 23, 42, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                }}
              >
                <StepIllustration stepId={step.id} color={step.color} />
              </div>

            </div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .timeline-center-line {
            left: 23px !important;
            transform: none !important;
          }
          .timeline-item {
            justify-content: flex-start !important;
            padding-left: 60px;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
          .timeline-bullet {
            left: 23px !important;
            transform: translateX(-50%) !important;
          }
          .timeline-card {
            width: 100% !important;
          }
          .timeline-illus {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default MarketingTimeline;
