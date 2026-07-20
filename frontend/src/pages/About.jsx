import React, { useState, useEffect } from 'react';
import { motion, animate, useMotionValue } from 'framer-motion';
import { Globe } from 'lucide-react';
import * as Icons from 'lucide-react';
import SEOMeta from '../components/SEOMeta';
import Breadcrumbs from '../components/Breadcrumbs';
import founderImg from '../assets/h2u/RAM-SIR-01-1.png';
import aboutHeroBg from '../assets/hero_bg/about_hero.png';

const CURRENT_API_BASE = import.meta.env.DEV ? 'http://localhost:5050' : (import.meta.env.VITE_API_URL || window.location.origin).replace(/\/+$/, '');

const staticValues = [
  {
    icon_name: 'Eye',
    title: 'Our Vision',
    desc: 'To be Partner of Choice of Educational Institutes for creating brands and increasing their Business',
    points: [
      'Driving creativity and forward-thinking solutions.',
      'Expanding our impact beyond boundaries.',
      'Building success with responsibility.',
      'Striving for quality in every detail.'
    ]
  },
  {
    icon_name: 'Rocket',
    title: 'Our Mission',
    desc: 'To increase the business of Educational Institutes by having extremely creative & talented teams through use of Creativity, Latest Web Tools and Digital Platform',
    points: [
      'Helping clients and partners achieve sustainable success.',
      'Delivering creative and technology-driven solutions.',
      'Working together with clients to achieve shared goals.',
      'Using creativity and digital power to shape a better tomorrow.'
    ]
  },
  {
    icon_name: 'HeartHandshake',
    title: 'Our Values',
    desc: 'Building trust, honoring commitment, and fostering growth together.',
    points: [
      'Trust',
      'Commitment',
      'Growth'
    ]
  }
];

const staticStats = [
  { icon_name: 'Users', value: 35, suffix: '+', label: 'Skilled Experts' },
  { icon_name: 'Award', value: 16, suffix: '+', label: 'Years of Experience' },
  { icon_name: 'School', value: 50, suffix: '+', label: 'Educational Partners' },
  { icon_name: 'Briefcase', value: 300, suffix: '+', label: 'Campaigns Launched' }
];

const teamMembers = [
  { name: 'Rampratap Bugalia', role: 'Founder & CEO', image: 'https://host2unlimited.com/wp-content/uploads/2025/09/Ram-Sir.jpg' },
  { name: 'Kirti Kadam', role: 'HR Head', image: 'https://host2unlimited.com/wp-content/uploads/2026/01/HR.png' },
  { name: 'Niti Jotania', role: 'Social Media Manager', image: 'https://host2unlimited.com/wp-content/uploads/2025/09/Niti-1.jpg' },
  { name: 'Yashika Shinde', role: 'Social Media Coordinator', image: 'https://host2unlimited.com/wp-content/uploads/2026/03/H2U-Yashika.png' },
  { name: 'Nishu Singh', role: 'Social Media Executive', image: 'https://host2unlimited.com/wp-content/uploads/2025/09/Nishu.jpg' },
  { name: 'Harsha Bhondwe', role: 'WordPress Developer', image: 'https://host2unlimited.com/wp-content/uploads/2026/04/Harsha-Bhondwe.png' },
  { name: 'Abhishek Lokhande', role: 'SEO Specialist', image: 'https://host2unlimited.com/wp-content/uploads/2026/01/Abhishek.png' },
  { name: 'Shubham Sharma', role: 'Graphics Designer', image: 'https://host2unlimited.com/wp-content/uploads/2025/09/Shubham.jpg' },
  { name: 'Prajwal Jadhav', role: 'Graphic Designer & Video Editor', image: 'https://host2unlimited.com/wp-content/uploads/2026/01/Prajwal.png' },
  { name: 'Khushi Doshi', role: 'Graphic Design Intern', image: 'https://host2unlimited.com/wp-content/uploads/2026/02/khushi.jpg' },
  { name: 'Pranav Upare', role: 'Business Development', image: 'https://host2unlimited.com/wp-content/uploads/2026/04/PRANAV-PRITAM-UPARE.png' },
  { name: 'Priynka Gupta', role: 'PR & Social Media', image: 'https://host2unlimited.com/wp-content/uploads/2026/03/H2U-priyanka.png' },
  { name: 'Jagjot Singh', role: 'Digital Marketing Executive', image: 'https://host2unlimited.com/wp-content/uploads/2026/04/Jagjot-Singh.png' },
  { name: 'Nirver Singh', role: 'Digital Marketing Executive', image: 'https://host2unlimited.com/wp-content/uploads/2026/04/Nirver-Singh.png' },
  { name: 'Kumkum Rathi', role: 'Social Media Executive', image: 'https://host2unlimited.com/wp-content/uploads/2025/09/kumkum.jpeg' },
  { name: 'Omkar Mejari', role: 'Social Media Intern', image: 'https://host2unlimited.com/wp-content/uploads/2026/05/Omkar.png' },
  { name: 'Dhara Joshi', role: 'Social Media Executive', image: 'https://host2unlimited.com/wp-content/uploads/2026/01/Dhara.png' },
  { name: 'Vishakha Deorukhkar', role: 'Social Media Executive', image: 'https://host2unlimited.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-12-at-6.36.35-PM.jpeg' },
  { name: 'Khushi Jain', role: 'Social Media Executive', image: 'https://host2unlimited.com/wp-content/uploads/2026/01/Khushi.png' },
  { name: 'Aditi Momaya', role: 'Social Media Intern', image: 'https://host2unlimited.com/wp-content/uploads/2025/10/aditi.jpeg' },
  { name: 'Swapnil Gaikwad', role: 'Digital Marketing Executive', image: 'https://host2unlimited.com/wp-content/uploads/2026/04/Swapnil-Gaikwad.png' },
  { name: 'Sakshi Kulkarni', role: 'Social Media Intern', image: 'https://host2unlimited.com/wp-content/uploads/2026/03/H2U-Sakshi.png' },
  { name: 'Aditi Panigrahi', role: 'Social Media Intern', image: 'https://host2unlimited.com/wp-content/uploads/2026/02/Aditi.jpg' },
  { name: 'Isha Chaubey', role: 'Social Media Intern', image: 'https://host2unlimited.com/wp-content/uploads/2026/03/H2U-isha.png' },
  { name: 'Latasha Mhankavi', role: 'Seo Intern', image: 'https://host2unlimited.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-13-at-11.15.10-AM.jpeg' },
  { name: 'Anuj Gorale', role: 'Social Media & Event Manager', image: 'https://host2unlimited.com/wp-content/uploads/2026/01/Anuj.png' },
  { name: 'Riten Halpani', role: 'Event Management', image: 'https://host2unlimited.com/wp-content/uploads/2025/09/reten.jpeg' },
  { name: 'Harshit Birla', role: 'Photographer', image: 'https://host2unlimited.com/wp-content/uploads/2026/01/Harshit.jpg' },
  { name: 'Pranit Patil', role: 'Photographer', image: 'https://host2unlimited.com/wp-content/uploads/2026/01/Pranit-Patil-2.png' },
  { name: 'Pushkarni Lambole', role: 'Nashik Sales & Marketing', image: 'https://host2unlimited.com/wp-content/uploads/2025/09/pushkarni1.jpeg' }
];

const Counter = ({ value, suffix = "" }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const numericValue = parseInt(value.toString().replace(/[^0-9]/g, ''), 10) || 0;
    if (numericValue <= 0) {
      setDisplayValue(0);
      return;
    }

    let start = 0;
    const end = numericValue;
    const duration = 1500;
    const startTime = performance.now();
    let animationFrameId;

    const updateCounter = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easeProgress = progress * (2 - progress);
      const currentValue = Math.floor(easeProgress * (end - start) + start);

      setDisplayValue(currentValue);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(end);
      }
    };

    animationFrameId = requestAnimationFrame(updateCounter);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [value]);

  return <span>{displayValue.toLocaleString()}{suffix}</span>;
};

const About = () => {
  const [aboutData] = useState({ values: staticValues, stats: staticStats });
  const [membersList, setMembersList] = useState(teamMembers);
  const [banner] = useState({
    title: 'Digital Growth Partner for Education Institutes & Businesses',
    subtitle: 'About Us',
    desc: 'Founded in 2010 in Mumbai, our journey began with a deep focus on the education sector—supporting schools, colleges, coaching centers, and ed-tech platforms with creative, results-driven marketing. Partner with Host2Unlimited – your trusted digital partner for educational institutes.',
    para2: 'From boosting your online presence to social media management and school admission campaigns – we help you start early and stay ahead!',
    para3: 'From seamless event coverage to admission lead campaigns, we help educational institutes shine with the right digital strategies.'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch(`${CURRENT_API_BASE}/api/team`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            setMembersList(data);
          }
        }
      } catch (err) {
        console.warn('Backend team fetch offline, using static team members.', err);
      }
    };
    fetchTeam();

    const handleUpdate = (e) => {
      if (e.detail?.type === 'team_update' || e.type === 'cmsTeamUpdate') {
        fetchTeam();
      }
    };

    window.addEventListener('cmsTeamUpdate', handleUpdate);
    return () => {
      window.removeEventListener('cmsTeamUpdate', handleUpdate);
    };
  }, []);

  const breadcrumbs = [{ name: 'About Us', path: '/about' }];

  return (
    <div style={{ paddingTop: '80px' }}>
      <SEOMeta
        title="About Us | Host2Unlimited"
        description="Founded in 2010 in Mumbai, we are the leading digital marketing partner of educational institutions like schools, colleges, and campuses in Maharashtra."
        keywords="about host2unlimited, school marketing experts, education agency Mumbai, team host2unlimited"
        canonical="https://host2unlimited.com/about"
        breadcrumbPaths={breadcrumbs}
      />

      {/* Hero Banner Section */}
      <section 
        className="page-hero-banner"
        style={{ backgroundImage: `url(${aboutHeroBg})` }}
      >
        <div className="container hero-content-wrapper">
          <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto' }}>
            <Breadcrumbs paths={breadcrumbs} />
          </div>
        </div>
      </section>

      <div className="container" style={{ marginTop: '50px' }}>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
            Retrieving about us values...
          </div>
        ) : (
          <>
            {/* Corporate Summary section (Stacked layout) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '50px', marginBottom: '85px', textAlign: 'left' }}>
              
              {/* Who We Are & What We Do */}
              <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '20px', letterSpacing: '-0.5px' }}>Empowering Digital Growth</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '16.5px', lineHeight: 1.7, marginBottom: '20px' }}>
                  Host2Unlimited is a Strategic Digital Partner for Educational Institutes in Maharashtra. We are the digital partner for preschools, primary and secondary schools, junior/degree colleges, engineering and management colleges, and deemed universities.
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '16.5px', lineHeight: 1.7 }}>
                  From boosting online presence to executing targeted school admission lead campaigns, and managing live event coverages, our team places a dedicated digital coordinator directly at your campus to track leads and build Follower growth organically.
                </p>
              </div>

              {/* Stats Cards Row */}
              <div style={{ marginTop: '10px' }} className="about-stats-grid">
                {aboutData.stats.map((stat, idx) => {
                  const Icon = Icons[stat.icon_name] || Globe;
                  return (
                    <motion.div 
                      key={idx}
                      className="card-glass" 
                      whileHover={{ y: -6, scale: 1.02, borderColor: 'var(--primary)', boxShadow: '0 12px 30px -10px rgba(14, 165, 233, 0.2)' }}
                      style={{ backgroundColor: 'var(--bg-secondary)', padding: '24px 20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', textAlign: 'center', transition: 'border-color 0.2s, box-shadow 0.2s' }}
                    >
                      <Icon size={30} color="var(--primary)" style={{ marginBottom: '14px' }} />
                      <h3 style={{ fontSize: '30px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
                        <Counter value={stat.value} suffix={stat.suffix} />
                      </h3>
                      <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', fontWeight: 600, margin: 0 }}>{stat.label}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Award Winning Moment */}
            <div className="card-glass" style={{ textAlign: 'left', marginBottom: '85px', padding: '40px', border: '1px solid var(--primary)' }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }} className="award-header">
                <div style={{ display: 'flex', width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icons.Trophy size={28} />
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: '#f59e0b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Award Winning Moment</span>
                  <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left' }}>
                    Celebrating Excellence At The Indian School Awards 2025!
                  </h2>
                </div>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
                Recognized as the <strong>Best Digital Marketing Agency for the Education Sector</strong> in Mumbai, Nashik, Pune, Satara, and across Maharashtra. This prestigious milestone celebrates our commitment to introducing cutting-edge web tools and custom admissions campaigns for our partner campuses.
              </p>
            </div>

            {/* Corporate Operating Values */}
            <div style={{ marginBottom: '85px' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '40px', textAlign: 'center', letterSpacing: '-0.5px' }}>Our Core Pillars</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }} className="values-grid">
                {aboutData.values.map((v, idx) => {
                  const Icon = Icons[v.icon_name] || Globe;
                  return (
                    <div key={idx} className="card-glass" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div className="card-icon-container" style={{ width: '48px', height: '48px', borderRadius: '12px', marginBottom: '20px' }}>
                          <Icon size={24} />
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>{v.title}</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.5, marginBottom: '20px' }}>{v.desc}</p>
                      </div>

                      {v.points && (
                        <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0 0 0', display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                          {v.points.map((pt, pIdx) => (
                            <li key={pIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                              <Icons.CheckCircle2 size={14} color="var(--primary)" style={{ flexShrink: 0 }} />
                              {pt}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Event Marketing section */}
            <div style={{ textAlign: 'left', marginBottom: '90px', padding: '40px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', background: 'var(--glass-bg)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }} className="award-header">
                <div className="card-icon-container" style={{ width: '56px', height: '56px', borderRadius: '50%', flexShrink: 0 }}>
                  <Icons.Sparkles size={28} />
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Your Event, Elevated</span>
                  <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left' }}>
                    Event Marketing
                  </h2>
                </div>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15.5px', lineHeight: 1.6, marginBottom: '30px' }}>
                We structure customized brand exposure setups, visitor registration funnels, and real-time storytelling modules to capture and showcase institutional milestones:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                {[
                  { title: 'Brand Visibility', text: 'Showcase your brand dynamically to the right audience.', icon: 'Eye' },
                  { title: 'Audience Engagement', text: 'Interactive sessions, live demonstrations, and setups.', icon: 'Users' },
                  { title: 'Lead Generation', text: 'Capture potential student inquiries on-site instantly.', icon: 'Target' },
                  { title: 'Customer Loyalty', text: 'Provide rich content archives for blogs and newsletters.', icon: 'Heart' },
                  { title: 'Measurable ROI', text: 'Track attendance, active engagement, and conversions.', icon: 'TrendingUp' },
                  { title: 'Data & Analytics', text: 'Measure attendee profiles and digital footprint ratios.', icon: 'BarChart' },
                  { title: 'Seamless Execution', text: 'Handle logistics, layout parameters, and media setups.', icon: 'CheckCircle' },
                  { title: 'Content & Storytelling', text: 'Craft compelling video stories that resonate with families.', icon: 'Video' }
                ].map((item, i) => {
                  const ItemIcon = Icons[item.icon] || Icons.CheckCircle2;
                  return (
                    <div 
                      key={i} 
                      className="card-glass" 
                      style={{ 
                        padding: '20px', 
                        backgroundColor: 'var(--bg-secondary)', 
                        border: '1px solid var(--border-color)', 
                        borderRadius: 'var(--radius-md)', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '12px' 
                      }}
                    >
                      <div className="card-icon-container" style={{ width: '36px', height: '36px', borderRadius: '8px' }}>
                        <ItemIcon size={18} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>{item.title}</h4>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>{item.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Team Members Grid Section */}
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '50px', alignItems: 'center', marginBottom: '60px', textAlign: 'left' }} className="about-founder-grid">
                <div>
                  <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '20px', letterSpacing: '-0.5px', textAlign: 'left' }}>Meet Minds Behind Host2Unlimited</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.7, marginBottom: '24px' }}>
                    At Host2Unlimited, our strength lies in our people. Our team is a blend of innovators, strategists, creators, and digital experts who share a common passion for transforming ideas into results. From web development and design to content creation, social media, and digital marketing, each member brings unique expertise to the table.
                  </p>
                  <div className="card-glass" style={{ padding: '24px', backgroundColor: 'var(--bg-secondary)', borderLeft: '4px solid var(--primary)', borderRadius: 'var(--radius-md)' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px 0', textAlign: 'left' }}>Rampratap Bugalia</h3>
                    <p style={{ fontSize: '14.5px', color: 'var(--primary)', fontWeight: 600, margin: '0 0 10px 0' }}>Founder & CEO, Host2Unlimited</p>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                      "Our focus has always been to build long-term relationships with educational institutes and businesses across Maharashtra, introducing the latest web tools and admission marketing funnels to secure real, measurable growth."
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div className="card-glass" style={{ padding: '12px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--glass-shadow)', maxWidth: '380px' }}>
                    <img 
                      src={founderImg} 
                      alt="Rampratap Bugalia, Founder and CEO of Host2Unlimited" 
                      style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-md)', display: 'block', objectFit: 'cover' }}
                    />
                  </div>
                </div>
              </div>

              <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '30px', textAlign: 'center', letterSpacing: '-0.5px' }}>Our Team Experts</h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                {membersList.map((member, idx) => (
                  <motion.div
                    key={member.id || idx}
                    className="card-glass"
                    whileHover={{ y: -4, borderColor: 'var(--primary)' }}
                    style={{ padding: '20px', border: '1px solid var(--border-color)', textAlign: 'center', transition: 'all var(--transition-fast)' }}
                  >
                    <div style={{ 
                      width: '80px', 
                      height: '80px', 
                      borderRadius: '50%', 
                      overflow: 'hidden',
                      margin: '0 auto 16px auto',
                      border: '2px solid var(--border-color)',
                      boxShadow: 'var(--shadow-sm)',
                      backgroundColor: 'var(--bg-secondary)'
                    }}>
                      {(member.image || member.image_url) ? (
                        <img 
                          src={member.image || member.image_url} 
                          alt={member.name} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', fontSize: '20px', fontWeight: 700 }}>
                          {member.name ? member.name.split(' ').map(n => n[0]).join('') : 'TM'}
                        </div>
                      )}
                    </div>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px', color: 'var(--text-primary)' }}>{member.name}</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0, fontWeight: 500 }}>{member.role}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}

      </div>

      <style>{`
        @media (max-width: 992px) {
          .about-founder-grid {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
            text-align: center !important;
          }
          .about-founder-grid h2, 
          .about-founder-grid p,
          .about-founder-grid h3 {
            text-align: center !important;
          }
        }
      `}</style>
    </div>
  );
};

export default About;
