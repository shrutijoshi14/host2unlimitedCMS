import React from 'react';
import { Target, Code, Globe, Shield, FileText, Users } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Strategic Admission',
    desc: 'Launch hyper-targeted enrollment campaigns across digital channels to connect with prospective students and parents, ensuring optimal conversion rates.',
    icon: Target,
    color: '#3b82f6'
  },
  {
    id: 2,
    title: 'Event Coverage',
    desc: 'Capture live campus events, student achievements, and academic milestones with real-time video updates and photo coverage.',
    icon: Code,
    color: '#06b6d4'
  },
  {
    id: 3,
    title: 'Google Ads & Meta Ads',
    desc: 'Run precision-targeted ad campaigns across Search, Instagram, and Facebook to generate high-quality admissions inquiries.',
    icon: Globe,
    color: '#6366f1'
  },
  {
    id: 4,
    title: 'Organic Social Media and Website Updates',
    desc: 'Maintain active social handles, post regular brand updates, and keep institutional websites updated with SEO-friendly content.',
    icon: Shield,
    color: '#2563eb'
  },
  {
    id: 5,
    title: 'Content Marketing',
    desc: 'Develop value-driven campus blogs, newsletters, and engaging video stories to build authority and trust.',
    icon: FileText,
    color: '#0891b2'
  }
];

const StepIllustration = ({ stepId, color }) => {
  switch (stepId) {
    case 1:
      return (
        <svg viewBox="0 0 200 120" style={{ width: '100%', maxHeight: '110px' }}>
          <circle cx="100" cy="60" r="35" fill="none" stroke={color} strokeWidth="2" opacity="0.3" strokeDasharray="3,3" />
          <circle cx="100" cy="60" r="22" fill="none" stroke={color} strokeWidth="2" />
          <circle cx="100" cy="60" r="8" fill={color} />
          <path d="M40 30 L80 50" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <path d="M40 90 L80 70" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <circle cx="30" cy="30" r="4" fill={color} opacity="0.6" />
          <circle cx="35" cy="60" r="5" fill={color} opacity="0.8" />
          <circle cx="30" cy="90" r="4" fill={color} opacity="0.6" />
          <path d="M130 90 L150 70 L170 80 L190 40" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
          <circle cx="190" cy="40" r="4" fill={color} />
        </svg>
      );
    case 2:
      return (
        <svg viewBox="0 0 200 120" style={{ width: '100%', maxHeight: '110px' }}>
          <rect x="30" y="25" width="140" height="70" rx="6" fill="var(--bg-primary)" stroke={color} strokeWidth="2" />
          <line x1="30" y1="45" x2="170" y2="45" stroke={color} strokeWidth="1.5" />
          <circle cx="42" cy="35" r="2.5" fill={color} opacity="0.5" />
          <circle cx="50" cy="35" r="2.5" fill={color} opacity="0.5" />
          <circle cx="58" cy="35" r="2.5" fill={color} opacity="0.5" />
          <path d="M75 58 L65 65 L75 72" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M95 58 L105 65 L95 72" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="90" y1="56" x2="80" y2="74" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          <rect x="135" y="52" width="22" height="12" rx="3" fill="none" stroke={color} strokeWidth="1.5" />
          <rect x="135" y="68" width="22" height="12" rx="3" fill={color} opacity="0.2" stroke={color} strokeWidth="1.5" />
        </svg>
      );
    case 3:
      return (
        <svg viewBox="0 0 200 120" style={{ width: '100%', maxHeight: '110px' }}>
          <path d="M50 70 L75 70 L95 85 L95 35 L75 50 L50 50 Z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
          <path d="M50 50 L50 70" stroke={color} strokeWidth="2" />
          <path d="M75 50 L75 70" stroke={color} strokeWidth="1.5" />
          <rect x="42" y="55" width="8" height="10" rx="1" fill={color} />
          <path d="M110 50 A 15 15 0 0 1 110 70" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M120 40 A 28 28 0 0 1 120 80" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
          <path d="M130 30 A 42 42 0 0 1 130 90" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
          <rect x="150" y="40" width="30" height="40" rx="4" fill="var(--bg-primary)" stroke={color} strokeWidth="1.5" />
          <line x1="155" y1="50" x2="175" y2="50" stroke={color} strokeWidth="1.5" />
          <line x1="155" y1="60" x2="170" y2="60" stroke="var(--text-muted)" strokeWidth="1.5" />
          <line x1="155" y1="70" x2="165" y2="70" stroke="var(--text-muted)" strokeWidth="1.5" />
        </svg>
      );
    case 4:
      return (
        <svg viewBox="0 0 200 120" style={{ width: '100%', maxHeight: '110px' }}>
          <path d="M100 25 C120 25, 140 30, 140 55 C140 85, 100 100, 100 100 C100 100, 60 85, 60 55 C60 30, 80 25, 100 25 Z" fill="var(--bg-primary)" stroke={color} strokeWidth="3" strokeLinejoin="round" />
          <path d="M85 62 L95 72 L118 48" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M35 50 L38 56 L44 56 L39 60 L41 66 L35 62 L29 66 L31 60 L26 56 L32 56 Z" fill={color} opacity="0.8" />
          <path d="M165 50 L168 56 L174 56 L169 60 L171 66 L165 62 L159 66 L161 60 L156 56 L162 56 Z" fill={color} opacity="0.8" />
          <path d="M100 5 L102 10 L107 10 L103 13 L105 18 L100 15 L95 18 L97 13 L93 10 L98 10 Z" fill={color} opacity="0.4" />
        </svg>
      );
    case 5:
      return (
        <svg viewBox="0 0 200 120" style={{ width: '100%', maxHeight: '110px' }}>
          <rect x="40" y="35" width="50" height="65" rx="4" fill="var(--bg-primary)" stroke={color} strokeWidth="2" />
          <line x1="48" y1="48" x2="82" y2="48" stroke={color} strokeWidth="2" />
          <line x1="48" y1="58" x2="76" y2="58" stroke="var(--text-muted)" strokeWidth="1.5" />
          <line x1="48" y1="68" x2="80" y2="68" stroke="var(--text-muted)" strokeWidth="1.5" />
          <line x1="48" y1="78" x2="70" y2="78" stroke="var(--text-muted)" strokeWidth="1.5" />
          <rect x="110" y="25" width="50" height="65" rx="4" fill="var(--bg-primary)" stroke={color} strokeWidth="2" />
          <line x1="118" y1="38" x2="152" y2="38" stroke={color} strokeWidth="2" />
          <line x1="118" y1="48" x2="146" y2="48" stroke="var(--text-muted)" strokeWidth="1.5" />
          <line x1="118" y1="58" x2="150" y2="58" stroke="var(--text-muted)" strokeWidth="1.5" />
          <path d="M96 55 L104 60 L96 65" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="90" y1="60" x2="102" y2="60" stroke={color} strokeWidth="2" strokeDasharray="3,3" />
        </svg>
      );
    case 6:
      return (
        <svg viewBox="0 0 200 120" style={{ width: '100%', maxHeight: '110px' }}>
          <line x1="60" y1="40" x2="100" y2="80" stroke={color} strokeWidth="1.5" strokeDasharray="2,2" />
          <line x1="140" y1="40" x2="100" y2="80" stroke={color} strokeWidth="1.5" strokeDasharray="2,2" />
          <line x1="60" y1="40" x2="140" y2="40" stroke={color} strokeWidth="2" />
          <line x1="100" y1="80" x2="100" y2="105" stroke={color} strokeWidth="1.5" />
          <circle cx="60" cy="40" r="16" fill="var(--bg-primary)" stroke={color} strokeWidth="2" />
          <circle cx="60" cy="35" r="5" fill={color} />
          <path d="M49 50 C49 45, 71 45, 71 50" fill="none" stroke={color} strokeWidth="2" />
          <circle cx="140" cy="40" r="16" fill="var(--bg-primary)" stroke={color} strokeWidth="2" />
          <circle cx="140" cy="35" r="5" fill={color} />
          <path d="M129 50 C129 45, 151 45, 151 50" fill="none" stroke={color} strokeWidth="2" />
          <circle cx="100" cy="80" r="16" fill="var(--bg-primary)" stroke={color} strokeWidth="2" />
          <circle cx="100" cy="75" r="5" fill={color} />
          <path d="M89 90 C89 85, 111 85, 111 90" fill="none" stroke={color} strokeWidth="2" />
        </svg>
      );
    default:
      return null;
  }
};

const MarketingTimeline = () => {
  return (
    <div style={{ position: 'relative', maxWidth: '950px', margin: '40px auto 0 auto', padding: '20px 0' }}>
      
      {/* Center line (Desktop only) */}
      <div 
        className="timeline-center-line"
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: '4px',
          backgroundColor: 'var(--border-color)',
          transform: 'translateX(-50%)',
          borderRadius: '2px',
          zIndex: 1
        }}
      />

      {/* Timeline items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
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
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-primary)',
                  border: `4px solid ${step.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: step.color,
                  boxShadow: 'var(--shadow-md)',
                  zIndex: 3
                }}
                className="timeline-bullet"
              >
                <Icon size={20} />
              </div>

              {/* Card Container */}
              <div 
                className="card-glass timeline-card" 
                style={{ 
                  width: '43%', 
                  padding: '24px', 
                  textAlign: 'left',
                  borderTop: `4px solid ${step.color}`
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <span style={{ 
                    fontSize: '14px', 
                    fontWeight: 700, 
                    color: 'white', 
                    backgroundColor: step.color,
                    padding: '2px 8.5px',
                    borderRadius: '20px',
                    flexShrink: 0
                  }}>
                    Phase {step.id}
                  </span>
                  <h4 style={{ fontSize: '18px', fontWeight: 700, margin: 0, textAlign: 'left' }}>{step.title}</h4>
                </div>
                <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', margin: 0 }}>{step.desc}</p>
              </div>

              {/* Focus highlights on opposite side */}
              <div 
                className="card-glass timeline-illus"
                style={{
                  width: '43%',
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)'
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
            left: 25px !important;
            transform: none !important;
          }
          .timeline-item {
            justify-content: flex-start !important;
            padding-left: 70px;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 20px !important;
          }
          .timeline-bullet {
            left: 25px !important;
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
