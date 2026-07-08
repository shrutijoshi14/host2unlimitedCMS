import React from 'react';
import { Search, Map, Layout, Code, ShieldCheck, Rocket, HeartHandshake } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Discovery & Consultation',
    desc: 'We analyze your requirements, industry landscape, and user behaviors to craft an initial feasibility roadmap.',
    icon: Search,
    color: '#3b82f6'
  },
  {
    id: 2,
    title: 'Planning & Strategy',
    desc: 'Creating interactive user journey flows, architectures, database schemas, and locked-in delivery timelines.',
    icon: Map,
    color: '#06b6d4'
  },
  {
    id: 3,
    title: 'UI/UX Design',
    desc: 'Mocking up custom SaaS-inspired, glassmorphic page wireframes to establish corporate colors and typography.',
    icon: Layout,
    color: '#6366f1'
  },
  {
    id: 4,
    title: 'Development',
    desc: 'Writing optimized, production-ready React codebase, components, database queries, and custom integrations.',
    icon: Code,
    color: '#2563eb'
  },
  {
    id: 5,
    title: 'Quality Assurance',
    desc: 'Rigorous cross-browser, unit, and speed testing to guarantee 100% security compliance and responsive metrics.',
    icon: ShieldCheck,
    color: '#0891b2'
  },
  {
    id: 6,
    title: 'Deployment',
    desc: 'Deploying optimized builds to AWS or secure cloud hosting nodes with SSL certificates and CDN caching.',
    icon: Rocket,
    color: '#8b5cf6'
  },
  {
    id: 7,
    title: 'Ongoing Support',
    desc: 'Providing continuous database backups, site updates, monthly SEO tracking, and 24/7 technical assistance.',
    icon: HeartHandshake,
    color: '#10b981'
  }
];

const StepIllustration = ({ stepId, color }) => {
  switch (stepId) {
    case 1:
      return (
        <svg viewBox="0 0 200 120" style={{ width: '100%', maxHeight: '110px' }}>
          <circle cx="100" cy="60" r="40" fill="none" stroke={color} strokeWidth="3" opacity="0.2" />
          <circle cx="100" cy="60" r="25" fill="none" stroke={color} strokeWidth="2" />
          <line x1="100" y1="60" x2="135" y2="95" stroke={color} strokeWidth="4" strokeLinecap="round" />
          <rect x="35" y="80" width="10" height="15" fill={color} rx="2" opacity="0.6" />
          <rect x="50" y="70" width="10" height="25" fill={color} rx="2" opacity="0.8" />
          <rect x="140" y="75" width="10" height="20" fill={color} rx="2" opacity="0.6" />
          <rect x="155" y="65" width="10" height="30" fill={color} rx="2" opacity="0.9" />
        </svg>
      );
    case 2:
      return (
        <svg viewBox="0 0 200 120" style={{ width: '100%', maxHeight: '110px' }}>
          <rect x="15" y="45" width="40" height="30" rx="6" fill="var(--bg-primary)" stroke={color} strokeWidth="2" />
          <circle cx="35" cy="60" r="4" fill={color} />
          <path d="M 55 60 L 85 60" stroke={color} strokeWidth="2" strokeDasharray="4,4" />
          <rect x="85" y="30" width="40" height="60" rx="6" fill="var(--bg-primary)" stroke={color} strokeWidth="2" />
          <line x1="93" y1="50" x2="117" y2="50" stroke="var(--text-muted)" strokeWidth="2" />
          <line x1="93" y1="60" x2="112" y2="60" stroke="var(--text-muted)" strokeWidth="2" />
          <line x1="93" y1="70" x2="108" y2="70" stroke="var(--text-muted)" strokeWidth="2" />
          <path d="M 125 50 L 150 35" stroke={color} strokeWidth="2" strokeDasharray="4,4" />
          <path d="M 125 70 L 150 85" stroke={color} strokeWidth="2" strokeDasharray="4,4" />
          <circle cx="158" cy="35" r="8" fill={color} />
          <circle cx="158" cy="85" r="8" fill={color} />
        </svg>
      );
    case 3:
      return (
        <svg viewBox="0 0 200 120" style={{ width: '100%', maxHeight: '110px' }}>
          <rect x="15" y="15" width="170" height="90" rx="8" fill="var(--bg-primary)" stroke={color} strokeWidth="2" />
          <line x1="15" y1="35" x2="185" y2="35" stroke={color} strokeWidth="1.5" />
          <circle cx="27" cy="25" r="3" fill="#ff5f56" />
          <circle cx="37" cy="25" r="3" fill="#ffbd2e" />
          <circle cx="47" cy="25" r="3" fill="#27c93f" />
          <rect x="25" y="45" width="40" height="50" rx="4" fill="none" stroke="var(--text-muted)" strokeWidth="1" />
          <rect x="75" y="45" width="100" height="12" rx="3" fill={color} opacity="0.3" />
          <rect x="75" y="65" width="45" height="10" rx="2" fill="var(--text-muted)" opacity="0.2" />
          <rect x="130" y="65" width="45" height="10" rx="2" fill="var(--text-muted)" opacity="0.2" />
          <rect x="75" y="80" width="100" height="15" rx="3" fill={color} opacity="0.1" />
        </svg>
      );
    case 4:
      return (
        <svg viewBox="0 0 200 120" style={{ width: '100%', maxHeight: '110px' }}>
          <rect x="15" y="15" width="170" height="90" rx="8" fill="#1e1e1e" stroke={color} strokeWidth="2" />
          <circle cx="27" cy="25" r="3" fill="#ff5f56" />
          <circle cx="37" cy="25" r="3" fill="#ffbd2e" />
          <circle cx="47" cy="25" r="3" fill="#27c93f" />
          <text x="25" y="52" fill="#38bdf8" fontSize="8.5" fontFamily="monospace">const Host2 = () =&gt; &#123;</text>
          <text x="35" y="66" fill="#a855f7" fontSize="8.5" fontFamily="monospace">  const [site, setSite] = build();</text>
          <text x="35" y="80" fill="#e11d48" fontSize="8.5" fontFamily="monospace">  return &lt;Unlimited /&gt;;</text>
          <text x="25" y="94" fill="#38bdf8" fontSize="8.5" fontFamily="monospace">&#125;;</text>
        </svg>
      );
    case 5:
      return (
        <svg viewBox="0 0 200 120" style={{ width: '100%', maxHeight: '110px' }}>
          <rect x="15" y="15" width="170" height="90" rx="8" fill="var(--bg-primary)" stroke={color} strokeWidth="2" />
          <circle cx="60" cy="60" r="30" fill="none" stroke="var(--border-color)" strokeWidth="5" />
          <circle cx="60" cy="60" r="30" fill="none" stroke={color} strokeWidth="5" strokeDasharray="188" strokeDashoffset="28" />
          <text x="60" y="65" textAnchor="middle" fill="var(--text-primary)" fontSize="12" fontWeight="bold">98%</text>
          
          <rect x="110" y="35" width="12" height="12" rx="3" fill={color} />
          <path d="M113 41 L116 44 L120 38" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <text x="130" y="44" fill="var(--text-primary)" fontSize="9.5" fontWeight="bold">Responsive</text>
          
          <rect x="110" y="55" width="12" height="12" rx="3" fill={color} />
          <path d="M113 61 L116 64 L120 58" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <text x="130" y="64" fill="var(--text-primary)" fontSize="9.5" fontWeight="bold">Security</text>
          
          <rect x="110" y="75" width="12" height="12" rx="3" fill={color} />
          <path d="M113 81 L116 84 L120 78" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <text x="130" y="84" fill="var(--text-primary)" fontSize="9.5" fontWeight="bold">SEO Ranks</text>
        </svg>
      );
    case 6:
      return (
        <svg viewBox="0 0 200 120" style={{ width: '100%', maxHeight: '110px' }}>
          <path d="M 60 70 A 15 15 0 0 1 70 40 A 25 25 0 0 1 120 35 A 20 20 0 0 1 145 55 A 15 15 0 0 1 135 80 L 65 80 A 15 15 0 0 1 60 70 Z" fill="none" stroke={color} strokeWidth="3" />
          <path d="M 100 85 L 100 50" stroke={color} strokeWidth="3" strokeLinecap="round" />
          <path d="M 90 62 L 100 50 L 110 62" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <rect x="40" y="92" width="120" height="12" rx="3" fill="var(--bg-primary)" stroke="var(--border-color)" strokeWidth="1" />
          <circle cx="50" cy="98" r="2.5" fill="#10b981" />
          <circle cx="60" cy="98" r="2.5" fill="var(--text-muted)" />
          <line x1="80" y1="98" x2="150" y2="98" stroke="var(--border-color)" strokeWidth="2" />
        </svg>
      );
    case 7:
      return (
        <svg viewBox="0 0 200 120" style={{ width: '100%', maxHeight: '110px' }}>
          <circle cx="100" cy="50" r="30" fill="none" stroke={color} strokeWidth="2.5" />
          <path d="M 90 40 L 98 48 L 112 34" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <rect x="35" y="90" width="130" height="18" rx="4" fill="var(--bg-primary)" stroke={color} strokeWidth="1" />
          <circle cx="48" cy="99" r="3" fill="#10b981" />
          <text x="60" y="102" fill="var(--text-primary)" fontSize="9" fontWeight="bold">Uptime Status: 99.99%</text>
        </svg>
      );
    default:
      return null;
  }
};

const Timeline = () => {
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
                    padding: '2px 8px',
                    borderRadius: '20px'
                  }}>
                    Step {step.id}
                  </span>
                  <h4 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>{step.title}</h4>
                </div>
                <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', margin: 0 }}>{step.desc}</p>
              </div>

              {/* Illustration Container on opposite side */}
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

export default Timeline;
