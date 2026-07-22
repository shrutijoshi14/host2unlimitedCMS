import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLeads } from '../context/LeadContext';
import { 
  Baby, BookOpen, Globe, GraduationCap, School, Cpu, 
  Briefcase, Award, CheckCircle2, Send, ArrowLeft 
} from 'lucide-react';
import SEOMeta from '../components/SEOMeta';
import Breadcrumbs from '../components/Breadcrumbs';
import educationalHeroBg from '../assets/hero_bg/educational_hero_art.svg';

const sectorsData = {
  preschools: {
    icon: Baby,
    title: 'Preschools & Daycare Centers',
    lead: 'Enrolments ensured with highly effective custom digital campaigns, driving engagement.',
    desc: (
      <>
        <p>
          For a preschool, the sale happens in the parent's heart before it happens in an inquiry form. Nobody chooses a daycare from a spec sheet — they choose it from a feeling of <strong>"my child will be safe and happy here."</strong> Our approach is built around that reality: We put your preschool in front of parents in the exact neighborhoods you serve — hyperlocal ads by pin code, alongside Google Maps and local SEO, so you're visible the moment a parent starts searching nearby.
        </p>
        <p>
          Instagram and short-form video carry the real work here: a glimpse of art class, a birthday celebration, a teacher reading aloud — these do more to build trust than any brochure line ever could. Google Reviews and parent testimonials become your strongest sales asset, since a new parent trusts another parent's word far more than your own website copy.
        </p>
        <p>
          Every open house, festival, or activity day gets pushed online in advance, turning a single event into weeks of visibility and inquiries. Once a child is enrolled, the relationship doesn't stop — WhatsApp updates and parenting-tip newsletters keep you top of mind through referrals and sibling admissions. Because your website and inquiry form work around the clock, a parent researching at 10pm can still reach you before a competitor does.
        </p>
      </>
    )
  },
  'primary-secondary': {
    icon: BookOpen,
    title: 'Primary & Secondary Schools',
    lead: 'Reputation built with impactful stories and updates — engage your audience with content that connects.',
    desc: (
      <>
        <p>
          Parents shopping for a primary or secondary school move through a fairly predictable journey — discovery, research, shortlist, decision — and we build a presence at every stage of it, not just the last one:
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', margin: '24px 0' }}>
          <div className="card-glass" style={{ padding: '20px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>Discovery</h4>
            <p style={{ fontSize: '13px', margin: 0, color: 'var(--text-secondary)' }}>Your school needs to be findable the moment a parent starts searching — through Google, Maps, and a consistent identity across Instagram, Facebook, and YouTube.</p>
          </div>
          <div className="card-glass" style={{ padding: '20px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>Research</h4>
            <p style={{ fontSize: '13px', margin: 0, color: 'var(--text-secondary)' }}>This is where most schools lose parents to a competitor with a better website or more recent reviews. We keep your digital footprint current: fresh event photos, recent testimonials, and easy questions follow-up.</p>
          </div>
          <div className="card-glass" style={{ padding: '20px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>Shortlist</h4>
            <p style={{ fontSize: '13px', margin: 0, color: 'var(--text-secondary)' }}>Admission-season campaigns target the right income brackets and locations directly, and every inquiry gets followed up through WhatsApp and email so it doesn't go cold.</p>
          </div>
          <div className="card-glass" style={{ padding: '20px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>Decision</h4>
            <p style={{ fontSize: '13px', margin: 0, color: 'var(--text-secondary)' }}>Reviews and consistent online presence tip a genuinely close decision in your favor — a school with an active, credible digital profile simply reads as better-run.</p>
          </div>
        </div>

        <p>
          This same digital-first approach is especially valuable for reaching relocating or NRI families, who often shortlist a school entirely from research done abroad, well before ever visiting in person.
        </p>
      </>
    )
  },
  international: {
    icon: Globe,
    title: 'International Schools (CBSE / ICSE / IB)',
    lead: 'Boost student engagement by highlighting academic excellence and achievements.',
    desc: (
      <>
        <p>
          International and IB-board schools compete on a different axis than neighborhood schools — parents here are comparison-shopping globally, and often relocating from another city or country entirely. The positioning has to match that: <strong>International schools rarely lose on price — they lose on perceived prestige.</strong> A polished website, well-produced campus tour, and visible accreditation details do more here than any discount or offer ever would.
        </p>
        <p>
          Families relocating from abroad frequently shortlist a school before they've even landed in the city, which makes your digital presence — not your reception desk — the true first impression. Since these families are often paying premium fees, they scrutinize reviews and testimonials more closely than budget-conscious shoppers do; one weak Google rating can outweigh ten strong ones. Beyond admissions, this audience stays engaged for years — alumni networks, international placement outcomes, and global program partnerships are worth showcasing on an ongoing basis.
        </p>
      </>
    )
  },
  coaching: {
    icon: GraduationCap,
    title: 'Private Coaching Institutions',
    lead: 'Promote innovative and personalized coaching methods, proven results, and approach.',
    desc: (
      <>
        <p>
          Coaching institutes run on a compressed sales cycle — batches fill fast, seats are limited, and results are the entire pitch. The marketing has to move at that speed:
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '20px 0' }}>
          <div style={{ padding: '14px', borderLeft: '4px solid var(--primary)', backgroundColor: 'var(--bg-secondary)', borderRadius: '6px' }}>
            <strong>Before the batch opens:</strong> sharp, hyper-specific targeting (think "Class 12 Science students in Mumbai," not "students") fills seats fast without wasting spend.
          </div>
          <div style={{ padding: '14px', borderLeft: '4px solid var(--primary)', backgroundColor: 'var(--bg-secondary)', borderRadius: '6px' }}>
            <strong>While seats are filling:</strong> urgency-driven messaging, limited-batch framing, and quick WhatsApp/Telegram follow-up convert interest before a student enrolls elsewhere.
          </div>
          <div style={{ padding: '14px', borderLeft: '4px solid var(--primary)', backgroundColor: 'var(--bg-secondary)', borderRadius: '6px' }}>
            <strong>To build long-term brand pull:</strong> topper interviews, demo-class videos, and result screenshots do more to convert a skeptical parent than any ad copy.
          </div>
          <div style={{ padding: '14px', borderLeft: '4px solid var(--primary)', backgroundColor: 'var(--bg-secondary)', borderRadius: '6px' }}>
            <strong>Between seasons:</strong> local SEO ("best coaching near me") and a steady content drip keep your institute visible even outside peak admission windows.
          </div>
        </div>

        <p>
          Most local coaching centers still run on word-of-mouth alone — a disciplined digital presence is often the single biggest differentiator against a very crowded, very informal competitive set.
        </p>
      </>
    )
  },
  colleges: {
    icon: School,
    title: 'Junior and Degree Colleges',
    lead: 'Empowering students at Junior and Degree Colleges to achieve academic excellence.',
    desc: (
      <>
        <p>
          Unlike school admissions, where parents make the call, junior and degree college decisions are increasingly driven by the student themselves — which means the marketing has to speak Gen Z, not just reach them. Reels, campus-life content, and fest highlights carry real weight here, because prospective students are evaluating social currency — will this campus feel like somewhere I want to spend the next three years — as much as academics.
        </p>
        <p>
          Placement numbers, fest highlights, and alumni stories get pushed where students actually look: Instagram and YouTube first, formal website content second.
        </p>
        <p>
          Peer influence does a lot of the selling — a current student's story or reel often converts better than an official college post, so building an active, shareable digital identity matters more than polish alone. On the operational side, conversion-optimized landing pages and fast follow-up still matter — a student who fills an inquiry form and doesn't hear back within a day is likely already exploring the next college.
        </p>
      </>
    )
  },
  engineering: {
    icon: Cpu,
    title: 'Institutes of Engineering & Technology',
    lead: 'Future engineers with innovative learning and hands-on experience.',
    desc: (
      <>
        <p>
          Engineering institutes sell to three distinct audiences at once — prospective students, their parents, and future recruiters — and each one is looking for something different online:
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', margin: '24px 0' }}>
          <div style={{ padding: '20px', backgroundColor: 'var(--bg-secondary)', borderRadius: '10px', borderTop: '4px solid var(--primary)', border: '1px solid var(--border-color)' }}>
            <strong style={{ display: 'block', marginBottom: '6px', color: 'var(--text-primary)' }}>For students:</strong> labs, live projects, and hands-on learning showcased through video and campus-tour content to demonstrate practical learning.
          </div>
          <div style={{ padding: '20px', backgroundColor: 'var(--bg-secondary)', borderRadius: '10px', borderTop: '4px solid var(--primary)', border: '1px solid var(--border-color)' }}>
            <strong style={{ display: 'block', marginBottom: '6px', color: 'var(--text-primary)' }}>For parents:</strong> accreditation status, placement statistics, and industry tie-ups, presented plainly and credibly.
          </div>
          <div style={{ padding: '20px', backgroundColor: 'var(--bg-secondary)', borderRadius: '10px', borderTop: '4px solid var(--primary)', border: '1px solid var(--border-color)' }}>
            <strong style={{ display: 'block', marginBottom: '6px', color: 'var(--text-primary)' }}>For recruiters & partners:</strong> LinkedIn visibility, internship pipelines, and highlighted faculty research to build institutional credibility.
          </div>
        </div>

        <p>
          Geo-targeted campaigns near industrial and educational hubs, combined with remarketing to warm leads, keep the admissions funnel moving without over-relying on traditional agents or offline fairs.
        </p>
      </>
    )
  },
  management: {
    icon: Briefcase,
    title: 'Institutes of Management Studies',
    lead: 'Future leaders with practical knowledge, strategic thinking, and a global perspective.',
    desc: (
      <>
        <p>
          Management aspirants — working professionals, fresh graduates, and career-switchers alike — are ultimately buying a career outcome, so the marketing needs to lead with ROI, not campus life. Placement records, average packages, and recruiter tie-ups do more work here than any other content type, since this audience is making a calculated investment decision, not an emotional one.
        </p>
        <p>
          LinkedIn is the primary channel, not a secondary one — targeting by job function, industry, and career stage reaches working professionals considering an MBA or PGDM far more precisely than broad social ads.
        </p>
        <p>
          Alumni outcomes and faculty credentials substitute for the "campus visit" that dominates school marketing — this audience often decides largely from research alone, especially for executive and part-time programs.
        </p>
        <p>
          Webinars, guest faculty sessions, and case-study content build the kind of ongoing professional community that keeps the institute visible between admission cycles.
        </p>
      </>
    )
  },
  universities: {
    icon: Award,
    title: 'Public / Private / Deemed Universities',
    lead: 'Private educational institutions striving continuously to attract the right students.',
    desc: (
      <>
        <p>
          Universities aren't one audience — a public university, a private university, and a deemed university are each solving a different trust problem, and the strategy should reflect that.
        </p>
        <p>
          <strong>Public (government) universities</strong> compete on affordability and access. The priority is making scholarships, research programs, and admission transparency visible and easy to find — often to first-generation learners who won't discover these options otherwise.
        </p>
        <p>
          <strong>Private universities</strong> compete on differentiation. The priority is spotlighting the specific things a student can't get elsewhere — industry tie-ups, infrastructure, international exposure — through paid campaigns, SEO, and an active alumni and corporate network on LinkedIn.
        </p>
        <p>
          <strong>Deemed universities</strong> compete on academic prestige. The priority is surfacing research output, patents, and NAAC/NIRF rankings, along with multilingual content that reaches international students and research collaborators directly.
        </p>
        <p>
          Across all three, the channel mix looks similar even when the message doesn't — SEO for program-specific searches, Google Ads for direct leads, video for campus and student-life content, and CRM-driven follow-up to carry a prospect from first search through to enrollment.
        </p>
      </>
    )
  }
};

const caseStudiesData = {
  preschools: [
    { name: 'Poddar Brio Kids', tag: 'Hyperlocal Leads', metric: '45% Enrolment Growth' },
    { name: 'Uudaan Montessori', tag: 'Local SEO & Maps', metric: '3x Parent Inquiries' },
    { name: 'The Learning Curve India', tag: 'Social Media Trust', metric: '200+ Active Leads' }
  ],
  'primary-secondary': [
    { name: 'Holy Cross English Medium School', tag: 'School Branding & Engagement', metric: '3x Social Reach' },
    { name: 'Navodaya English High School & Junior College', tag: 'Admission Season Campaign', metric: '60% More Conversions' }
  ],
  international: [
    { name: 'Poddar Brio School', tag: 'Prestige Positioning & Search', metric: 'High-intent Inquiries' },
    { name: 'DG International CBSE School', tag: 'Admissions Campaign & Ads', metric: '100% Seats Filled' },
    { name: 'Gautam Singhania Global School', tag: 'Virtual Tour & Reputation', metric: 'Top Local Authority' }
  ],
  coaching: [
    { name: 'Ardent Tutorials', tag: 'Urgency Campaign & Topper Interviews', metric: 'Fast Batch Bookings' }
  ],
  colleges: [
    { name: 'Royal Junior & Degree College', tag: 'Student-centric Reels & Web Funnels', metric: 'Gen Z Focus' }
  ],
  engineering: [
    { name: 'ARMIET Engineering & Management College', tag: 'Multi-audience SEO & LinkedIn', metric: '60% More Direct Leads' },
    { name: 'Shivajirao S. Jondhle College of Engineering & Technology', tag: 'Targeted Regional Funnels', metric: 'Enhanced admissions flow' }
  ]
};

const EducationalInstituteDetail = () => {
  const { id } = useParams();
  const { addLead } = useLeads();
  const sector = sectorsData[id];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: 'Admission Marketing Enquiry',
    qualification: 'Graduation',
    details: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!sector) {
    return (
      <div style={{ padding: '120px 0', textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700 }}>Sector Profile Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '12px' }}>Please go back and select a valid educational sector.</p>
        <Link to="/educational-institutes" className="btn btn-primary" style={{ marginTop: '20px' }}>
          Back to Institutes
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addLead({
      name: formData.name,
      companyName: sector.title,
      email: formData.email,
      phone: formData.phone,
      service: `Educational - ${sector.title} (${formData.program})`,
      budget: 'Detail Page Enquiry',
      details: `Qualification: ${formData.qualification}. Enquiry details: ${formData.details || 'None'}`
    });
    setSubmitted(true);
  };

  const renderCaseStudies = (sectionKey) => {
    const studies = caseStudiesData[sectionKey];
    
    if (!studies || studies.length === 0) {
      return (
        <div style={{ 
          backgroundColor: 'rgba(239, 68, 68, 0.04)', 
          border: '1px dashed rgba(239, 68, 68, 0.3)', 
          borderRadius: '12px', 
          padding: '24px', 
          textAlign: 'left',
          marginTop: '24px'
        }}>
          <span style={{ fontSize: '12px', color: '#ef4444', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '4px' }}>
            Content Gap Alert
          </span>
          <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--text-secondary)' }}>
            No dedicated case study published yet for this sector.
          </p>
          <Link 
            to="/case-studies" 
            className="btn btn-secondary" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px', 
              fontSize: '12.5px', 
              padding: '8px 16px', 
              marginTop: '12px',
              textDecoration: 'none'
            }}
          >
            Browse Case Studies Portfolio →
          </Link>
        </div>
      );
    }

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginTop: '24px', width: '100%' }}>
        {studies.map((study, idx) => (
          <div 
            key={idx} 
            className="card-glass" 
            style={{ 
              padding: '20px', 
              border: '1px solid var(--glass-border)', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              alignItems: 'stretch',
              gap: '12px',
              backgroundColor: 'var(--bg-secondary)',
              transition: 'all 0.25s ease'
            }}
          >
            <div>
              <span style={{ fontSize: '10.5px', color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px', backgroundColor: 'var(--primary-light)', padding: '3px 8px', borderRadius: '4px', display: 'inline-block' }}>
                {study.metric}
              </span>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '10px', marginBottom: '4px', textAlign: 'left' }}>
                {study.name}
              </h4>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: 0, textAlign: 'left' }}>
                {study.tag}
              </p>
            </div>
            <Link 
              to="/case-studies" 
              className="btn btn-secondary"
              style={{ 
                fontSize: '12px', 
                padding: '8px 12px',
                borderRadius: '6px',
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '4px',
                marginTop: '10px',
                textDecoration: 'none'
              }}
            >
              View Case Study →
            </Link>
          </div>
        ))}
      </div>
    );
  };

  const breadcrumbs = [
    { name: 'Educational Institutes', path: '/educational-institutes' },
    { name: sector.title, path: `/educational-institutes/${id}` }
  ];

  return (
    <div>
      <SEOMeta
        title={`${sector.title} Digital Marketing | Host2Unlimited`}
        description={sector.lead}
        keywords="school advertising, college marketing, university lead generation"
        canonical={`https://host2unlimited.com/educational-institutes/${id}`}
        breadcrumbPaths={breadcrumbs}
      />
      
      {/* Hero Banner Section */}
      <section 
        className="page-hero-banner"
        style={{ position: 'relative', height: '280px', minHeight: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: '#0b0f19' }}
      >
        <img 
          src={educationalHeroBg} 
          alt={`${sector.title} Hero Background`} 
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
        
        {/* Navigation back */}
        <div style={{ textAlign: 'left', marginBottom: '30px' }}>
          <Link 
            to="/educational-institutes" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              color: 'var(--text-secondary)', 
              fontWeight: 600, 
              fontSize: '14.5px',
              textDecoration: 'none',
              transition: 'color var(--transition-fast)'
            }}
            className="back-hover-primary"
          >
            <ArrowLeft size={16} /> Back to Educational Institutes
          </Link>
        </div>

        {/* 2-Column Grid Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '50px', textAlign: 'left' }} className="form-faq-grid">
          
          {/* Left Column: Sector Content */}
          <div>
            <h1 style={{ fontSize: '38px', fontWeight: 800, marginBottom: '16px', color: 'var(--text-primary)' }}>
              {sector.title}
            </h1>
            <p style={{ fontSize: '16.5px', fontWeight: 600, color: 'var(--primary)', marginBottom: '24px', lineHeight: 1.5 }}>
              {sector.lead}
            </p>
            <div style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {sector.desc}
            </div>
            
            <div style={{ marginTop: '40px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Demonstrated Case Studies
              </h3>
              {renderCaseStudies(id)}
            </div>
          </div>

          {/* Right Column: Sticky Enquiry Form */}
          <div style={{ alignSelf: 'start' }}>
            <div className="card-glass" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>Launch Campaign</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px', marginBottom: '24px' }}>
                Connect with our academic marketing coordinators to scale enrollments for your campus.
              </p>

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '30px 0' }}>
                  <div style={{ display: 'inline-flex', width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                    <CheckCircle2 size={28} />
                  </div>
                  <h4 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Enquiry Dispatched!</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
                    Thank you. An admissions campaign expert will contact you shortly.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn btn-secondary" style={{ width: '100%' }}>
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>Full Name *</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter your name..."
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>Email Address *</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter your email..."
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>Phone Number *</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter phone number..."
                    />
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }} className="form-row-2">
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>Select Program</label>
                      <select 
                        name="program"
                        value={formData.program}
                        onChange={handleChange}
                        className="form-control"
                        style={{ height: '40px' }}
                      >
                        <option value="Admission Marketing Enquiry">Admissions Enquiry</option>
                        <option value="6-Month Program">6-Month Program</option>
                        <option value="3-Month Program">3-Month Program</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>Last Qualification</label>
                      <select 
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleChange}
                        className="form-control"
                        style={{ height: '40px' }}
                      >
                        <option value="10th">10th</option>
                        <option value="12th">12th</option>
                        <option value="Graduation">Graduation</option>
                        <option value="Master">Master</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: '8px' }}>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>Message / Requirements</label>
                    <textarea 
                      name="details"
                      value={formData.details}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Describe your requirements or questions..."
                      style={{ minHeight: '100px', padding: '12px' }}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', marginTop: '10px' }}
                  >
                    <Send size={14} /> Submit Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default EducationalInstituteDetail;
