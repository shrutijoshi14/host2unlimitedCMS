import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Building2, GraduationCap, ArrowLeft, ArrowRight, CheckCircle2, 
  TrendingUp, Users, Target, Shield, Send, Check, Sparkles, Share2, Layout, Globe, Palette
} from 'lucide-react';
import SEOMeta from '../components/SEOMeta';
import Breadcrumbs from '../components/Breadcrumbs';
import caseStudiesHeroBg from '../assets/hero_bg/case_studies_hero_clean.png';
import { useLeads } from '../context/LeadContext';

// Import logos
import newHorizonPanvel from '../assets/h2u logos/new-horizon-public-school-panvel.png';
import newHorizonRodasInt from '../assets/h2u logos/new-horizon-International-school-Rodas.png';
import newHorizonKavesar from '../assets/h2u logos/new-horizon-scholars-school-kavesar-thane.png';
import newHorizonAiroli13 from '../assets/h2u logos/new-horizon-scholars-school-airoli-sector-13.png';
import newHorizonAiroli3 from '../assets/h2u logos/new-horizon-public-school-airoli-Sector-3.png';
import newHorizonVasant from '../assets/h2u logos/new-horizon-scholars-school-Vasant-Lawns (1).png';
import newHorizonAiroli19 from '../assets/h2u logos/new-horizon-public-school-airoli-Sector-19.png';
import newHorizonRodasKolshet from '../assets/h2u logos/new-horizon-scholars-school-Rodas-Kolshet.png';
import ulweLogo from '../assets/h2u logos/Ulwe-logo (1).png';
import vsignLogo from '../assets/h2u logos/V-Sign-logo.png';
import gsgsLogo from '../assets/h2u logos/GSGS-logo@4x (1).png';
import armietLogo from '../assets/h2u logos/armiet_logo.jpeg';
import drPillaiLogo from '../assets/h2u logos/dr-pillai-global-academy.png';
import uudaanLogo from '../assets/h2u logos/uudaan-montessori-preschool.jpg';
import dnyanGangaLogo from '../assets/h2u logos/DNYAN_GANGA_EDUCATION_TRUST_S-removebg-preview-e1750267686501 (1).webp';
import pillaiLogo from '../assets/h2u logos/pillai-logo.png';
import ardentLogo from '../assets/h2u logos/ardent_tutorials_thane.png';
import somaiyaLogo from '../assets/h2u logos/somaiya_college.png';
import euroKidsLogo from '../assets/h2u logos/euro_kids.jpeg';
import newHorizonLogo from '../assets/h2u logos/New-Horizon-logo.png';
import i3rLogo from '../assets/h2u logos/i3globle-logo.png';
import avLogo from '../assets/h2u logos/av-solution-logo.png';
import rnpLogo from '../assets/h2u logos/RNP_Logo-1.webp';
import skytechLogo from '../assets/h2u logos/skytech-logo.png';
import lotusLogo from '../assets/h2u logos/lotusleafentertainment-logo.png';
import verticesLogo from '../assets/h2u logos/Vertices-Partners_logo (1).svg';
import poddarBrioHero from '../assets/poddar_brio_hero.png';
import schoolBuildingHero from '../assets/school_building_clean.png';

const caseStudiesDataList = [
  {
    id: '1',
    name: 'NEW HORIZON PUBLIC SCHOOL, PANVEL',
    category: 'Education',
    location: 'Panvel, Navi Mumbai',
    logo: newHorizonPanvel,
    color: '#0284c7',
    tagline: 'Leading CBSE School Driving Admissions & Digital Authority',
    metrics: [
      { value: '55%', label: 'Inquiry Growth' },
      { value: '4x', label: 'Social Reach' },
      { value: '300+', label: 'Parent Leads' }
    ],
    description: 'New Horizon Public School, Panvel is a premier CBSE institution dedicated to academic excellence, innovation, and holistic student growth. Equipped with modern digital classrooms and state-of-the-art facilities.',
    challenge: 'Reaching tech-savvy parents in expanding Navi Mumbai hubs with real-time campus activities and streamlined admission inquiry channels.',
    solution: 'Implemented targeted hyper-local Meta & Google Ads, structured SEO landing pages, and automated WhatsApp parent inquiry response funnels.',
    results: [
      'Grew parent admission inquiries by 55% during admission season.',
      'Achieved #1 organic Google local search ranking for "Best CBSE School in Panvel".',
      'Captured 300+ verified lead submissions.'
    ]
  },
  {
    id: '2',
    name: 'NEW HORIZON INTERNATIONAL SCHOOL, RODAS',
    category: 'Education',
    location: 'Rodas Enclave, Thane',
    logo: newHorizonRodasInt,
    color: '#7c3aed',
    tagline: 'World-Class International School Positioning & Digital Branding',
    metrics: [
      { value: '100%', label: 'Seats Filled' },
      { value: '5x', label: 'Web Traffic' },
      { value: '96%', label: 'Parent Trust' }
    ],
    description: 'New Horizon International School, Rodas delivers world-class international education, combining global curricula with strong value systems and advanced digital learning environments.',
    challenge: 'Highlighting international curriculum standards, sports academies, and infrastructure to discerning township residents.',
    solution: 'Produced immersive virtual video walkthroughs, executed targeted Instagram Reels campaigns, and optimized Google Business Profile listings.',
    results: [
      'Achieved 100% seat occupancy across primary and international sections.',
      'Scaled website traffic 5x via organic search and strategic ad campaigns.',
      'Established market-leading brand equity in Thane township.'
    ]
  },
  {
    id: '3',
    name: 'RAMSHETH THAKUR PUBLIC SCHOOL, ULWE',
    category: 'Education',
    location: 'Ulwe, Navi Mumbai',
    logo: ulweLogo,
    color: '#059669',
    tagline: 'Dominating Local Search & Admission Lead Generation',
    metrics: [
      { value: '60%', label: 'Lead Boost' },
      { value: '3.5x', label: 'Local Maps Views' },
      { value: '280+', label: 'Campus Visits' }
    ],
    description: 'Ramsheth Thakur Public School, Ulwe is a leading educational landmark in Navi Mumbai, offering excellent academic programs, sports infrastructure, and comprehensive co-curricular activities.',
    challenge: 'Scaling admission lead capture in the rapidly growing Ulwe node against competing local schools.',
    solution: 'Designed high-converting landing pages, executed local geo-targeted ad funnels, and placed campus event video coverage.',
    results: [
      'Increased campus visit appointments by 60% in peak admission quarter.',
      'Generated 280+ physical campus visit bookings.',
      'Secured top map visibility across Ulwe and Belapur.'
    ]
  },
  {
    id: '4',
    name: 'NEW HORIZON SCHOLARS SCHOOL, KAVESAR, THANE',
    category: 'Education',
    location: 'Kavesar, Thane',
    logo: newHorizonKavesar,
    color: '#2563eb',
    tagline: 'STEM Learning & High-Impact Digital Parent Funnels',
    metrics: [
      { value: '40%', label: 'Enrolment Growth' },
      { value: '250k+', label: 'Video Views' },
      { value: '94%', label: 'Ad Accuracy' }
    ],
    description: 'New Horizon Scholars School, Kavesar, Thane provides top-tier education with emphasis on STEM learning, creative arts, leadership development, and digital parent-teacher engagement.',
    challenge: 'Engaging parents looking for holistic CBSE education in Ghodbunder Road corridor.',
    solution: 'Deployed Facebook lead form campaigns, highlights of STEM exhibitions, and continuous SEO optimization.',
    results: [
      'Boosted admissions by 40% year-on-year.',
      'Over 250,000+ organic video views across social media handles.',
      'Maintained consistent low CPL on ad campaigns.'
    ]
  },
  {
    id: '5',
    slug: 'poddar-brio-school',
    name: 'PODDAR BRIO SCHOOL',
    category: 'Education',
    location: 'Badlapur, Maharashtra',
    logo: euroKidsLogo,
    color: '#2563eb',
    tagline: 'Developing a Truly Holistic Learning Brand',
    subHeadline: 'Highly engaging digital campaigns crafted to maintain a consistent inquiry-to-application conversion rate of 25-30% with uncompromised emphasis on lead nurturing, clear communication, and strong brand trust.',
    subText: 'Effective campaigns aim to reach 5,000–10,000 relevant parents and students per month through social media, search, and display ads. Content that sparks interest drives higher engagement rates. Streamlined, responsive communication channels facilitate enquiries, leading to stronger conversion rates.',
    metrics: [
      { value: '65%', label: 'Increase in ROAS' },
      { value: '220', label: 'New Admissions' },
      { value: '120%', label: 'Increase in Followers' }
    ],
    description: 'PODDAR BRIO International School is a leading CBSE educational institution in Badlapur. Effective campaigns aim to reach 5,000–10,000 relevant parents and students per month through social media, search, and display ads. Content that sparks interest drives higher engagement rates. Streamlined, responsive communication channels facilitate enquiries, leading to stronger conversion rates.',
    goal: 'Build strong Brand awareness, attract quality inquiries, and convert prospective students into confirmed admissions through targeted digital campaigns.',
    challenge: 'Compete in a rapidly growing town, capture attention of discerning parents, and stand out among multiple education options.',
    solution: 'Leverage engaging content, social media, SEO, and responsive communication to nurture leads, showcase the school’s holistic learning approach, and drive measurable admissions growth.',
    results: [
      '65% Increase in ROAS through optimized digital ad campaigns.',
      '220 New confirmed admissions during peak admission season.',
      '120% Increase in social media followers and community engagement.',
      'Maintained a consistent inquiry-to-application conversion rate of 25-30% reaching 5,000–10,000 relevant parents monthly.'
    ],
    pillars: [
      {
        title: 'Holistic Digital Brand Building Strategy',
        desc: 'Establishing a consistent visual identity and messaging across all channels. Sharing engaging content highlighting learning experiences, achievements, and values. Leverage social media, SEO, and influencer collaborations to boost visibility. Foster parent and student engagement through interactive campaigns, testimonials, and virtual events. Monitor performance regularly to refine messaging and strengthen trust, loyalty, and overall Brand recognition.',
        images: [
          'https://host2unlimited.com/wp-content/uploads/2025/10/Wish-post-for-educational-institute-scaled.jpg'
        ],
        layout: 'single-banner'
      },
      {
        title: 'Engaging and Purpose-Driven Social Media Strategy',
        desc: 'Creating a balanced mix of informative, inspirational, and interactive content that reflects the school’s holistic learning approach. Highlighting student achievements, campus life, and events through Reels and carousels. Using targeted ads to reach parents, maintain consistent branding, and engage followers through polls, Q&As, and storytelling to build trust and lasting connections.',
        images: [
          'https://host2unlimited.com/wp-content/uploads/2025/10/Social-media-presence-of-education-brand.jpg',
          'https://host2unlimited.com/wp-content/uploads/2025/10/Social-media-education-brand-1.jpg'
        ],
        layout: 'grid-2'
      },
      {
        title: 'User-Centric and Conversion-Focused Web Development',
        desc: 'Designing a visually appealing, mobile-responsive website that reflects the school’s brand identity. Prioritizing easy navigation, fast loading, and clear calls-to-action for inquiries and admissions. Integrating testimonials and event highlights to enhance credibility. Optimize for SEO and analytics to track visitor behavior and continuously improve user experience and lead conversions.',
        images: [
          'https://host2unlimited.com/wp-content/uploads/2025/10/Educational-institute-website-layout-preview-scaled.jpg'
        ],
        layout: 'single-banner'
      },
      {
        title: 'Localized and Content-Driven SEO Strategy',
        desc: 'Focusing on local SEO to improve visibility among nearby parents searching for quality schools. Optimizing on-page elements, keywords, and metadata aligned with educational intent. Creating content around holistic learning and student growth. Building backlinks through reputable education platforms and monitoring rankings regularly to enhance organic reach, credibility, and admission-related traffic.',
        images: [
          'https://host2unlimited.com/wp-content/uploads/2025/10/img-3.webp',
          'https://host2unlimited.com/wp-content/uploads/2025/10/img-4.webp'
        ],
        layout: 'grid-2'
      },
      {
        title: 'Consistent and Emotionally Resonant Design Approach',
        desc: 'Developing a cohesive visual identity that reflects warmth, trust, and holistic learning. Using bright, student-friendly colors, clean layouts, and authentic imagery to convey positivity and growth. Maintaining consistency across digital platforms—social media, website, and ads—to strengthen brand recall and emotional connection with parents and students, ensuring every visual reinforces Poddar Brio’s educational values.',
        images: [
          'https://host2unlimited.com/wp-content/uploads/2025/10/School-Admission-Open-Creative.1-819x1024.png',
          'https://host2unlimited.com/wp-content/uploads/2025/10/School-Admission-Open-Creative.3-819x1024.png',
          'https://host2unlimited.com/wp-content/uploads/2025/10/School-Admission-Open-Creative.2-819x1024.png'
        ],
        layout: 'grid-3'
      },
      {
        title: 'Ad Campaigns that Inspire Futures Through Holistic Education',
        desc: 'Ad campaigns centered around the theme of nurturing confident, future-ready learners. Highlighting the school’s holistic approach, modern teaching methods, and supportive environment. Using aspirational visuals and student success stories to connect emotionally with parents. Reinforcing the message that Poddar Brio shapes not just academic excellence, but well-rounded individuals prepared for tomorrow’s opportunities.',
        images: [],
        layout: 'text-only'
      }
    ]
  },
  {
    id: '6',
    name: 'NEW HORIZON SCHOLARS SCHOOL, AIROLI (SECTOR 13)',
    category: 'Education',
    location: 'Airoli, Navi Mumbai',
    logo: newHorizonAiroli13,
    color: '#d97706',
    tagline: 'Fostering Excellence & Interactive Parent Engagement',
    metrics: [
      { value: '50%', label: 'More Leads' },
      { value: '4x', label: 'Local Reach' },
      { value: '100%', label: 'Batch Full' }
    ],
    description: 'New Horizon Scholars School, Airoli (Sector 13) empowers young minds through quality CBSE education, interactive digital teaching methods, and outstanding co-curricular opportunities.',
    challenge: 'Communicating academic achievements and infrastructure details to Airoli and Thane parents.',
    solution: 'Created dedicated campaign video reels, optimized local search profiles, and ran targeted Meta ad sets.',
    results: [
      'Achieved 100% capacity in primary and secondary divisions.',
      'Expanded local search reach by 4x.',
      'Generated 50% more qualified parent leads.'
    ]
  },
  {
    id: '7',
    slug: 'dr-pillai-global-academy-panvel',
    name: 'DR. PILLAI GLOBAL ACADEMY PANVEL',
    category: 'International IB & Cambridge School',
    location: 'Panvel, Navi Mumbai',
    logo: drPillaiLogo,
    color: '#7c3aed',
    tagline: 'Omnichannel Digital Brand Building & Admission Lead Generation',
    subHeadline: 'Through a data-driven, omnichannel strategy, we amplified brand visibility and lead generation via precision-targeted Meta and Google Ads, SEO optimization, interactive web design, and authentic visual storytelling.',
    metrics: [
      { value: '31%', label: 'Admission Boost' },
      { value: '22%', label: 'Session Duration' },
      { value: '24%', label: 'Visual Engagement' },
      { value: '19%', label: 'Organic Traffic Lift' }
    ],
    description: 'Dr. Pillai Global Academy (DPGA), Panvel, is a premier international institution under Mahatma Education Society offering IB & Cambridge curriculums. HOST2UNLIMITED partnered with DPGA to transform its online presence, establish digital trust, and drive qualified student enrolments across Panvel and Navi Mumbai.',
    goal: 'Amplify DPGA\'s digital footprint, reach discerning parents seeking world-class international education, and build an automated lead generation funnel to consistently meet annual admission targets.',
    challenge: 'In a rapidly growing educational hub like Panvel, standing out among top international schools required moving beyond standard ad campaigns to build an emotionally resonant, multi-platform digital ecosystem.',
    solution: 'HOST2UNLIMITED implemented an end-to-end 360° strategy combining custom website experience, localized search optimization, engaging social media reels, targeted performance ad campaigns, and real-time lead tracking.',
    pillars: [
      {
        title: 'Redefining User Experience Through Smart Web Design',
        desc: 'We revamped the school’s website with an intuitive interface, mobile responsiveness, and SEO-optimized architecture for seamless navigation and faster performance. By integrating interactive admission touchpoints and engaging visuals, the new site recorded a 22% increase in average session duration, reflecting improved user engagement and a more efficient digital experience for parents and students.',
        images: ['https://host2unlimited.com/wp-content/uploads/2025/10/Educational-institute-website-layout-preview-3-scaled.jpg'],
        layout: 'single-banner'
      },
      {
        title: 'Enhancing Visibility Through Strategic Organic Optimization (SEO)',
        desc: 'We implemented a focused SEO strategy encompassing keyword optimization, technical improvements, and high-quality content aligned with parent search intent. The initiative strengthened the school’s online authority and discoverability, resulting in a 19% increase in organic website traffic within the campaign period, effectively driving more qualified inquiries and enhancing digital credibility.',
        images: [
          'https://host2unlimited.com/wp-content/uploads/2025/10/img-3.webp',
          'https://host2unlimited.com/wp-content/uploads/2025/10/img-4.webp'
        ],
        layout: 'grid-2'
      },
      {
        title: 'Designing Visual Narratives that Inspire and Connect',
        desc: 'DPGA’s digital marketing partner adopted a cohesive graphic design approach focused on visual storytelling, brand consistency, and emotional resonance. By blending vibrant imagery with clear messaging, the campaign strengthened DPGA’s digital identity across platforms, leading to a 24% improvement in content engagement rates and reinforcing the school’s image as a forward-thinking, globally oriented institution.',
        images: [
          'https://host2unlimited.com/wp-content/uploads/2025/10/Social-media-presence-of-education-brand-3.jpg',
          'https://host2unlimited.com/wp-content/uploads/2025/10/Social-media-education-brand-3.jpg'
        ],
        layout: 'grid-2'
      },
      {
        title: 'Driving Admissions Through Targeted Performance Advertising',
        desc: 'We executed well-structured Meta and Google Ad campaigns focused on precise audience targeting, compelling creatives, and continuous bid optimization. The result was a 31% increase in qualified admission inquiries and improved click-through rates, reflecting the effectiveness of data-driven ad placements in reaching prospective parents and strengthening DPGA’s overall admission funnel.',
        images: [
          'https://host2unlimited.com/wp-content/uploads/2025/10/School-Admission-Open-Creative.1-1-819x1024.jpeg',
          'https://host2unlimited.com/wp-content/uploads/2025/10/School-Admission-Open-Creative.2-1-819x1024.jpeg',
          'https://host2unlimited.com/wp-content/uploads/2025/10/School-Admission-Open-Creative.3-1-819x1024.jpeg'
        ],
        layout: 'grid-3'
      },
      {
        title: 'Amplifying School Events Through Strategic Digital Promotion',
        desc: 'We enhanced event visibility through multi-platform campaigns featuring teaser reels, live coverage, and post-event highlights. This integrated approach effectively captured audience attention and extended engagement beyond the campus, resulting in a 27% rise in event-related social interactions and greater community participation, reinforcing DPGA’s vibrant and inclusive school culture online.',
        images: ['https://host2unlimited.com/wp-content/uploads/2025/10/Festival-wish-post-for-school-2-scaled.jpg'],
        layout: 'single-banner'
      },
      {
        title: 'A True Growth Partner Beyond Traditional Service Delivery',
        desc: 'As DPGA’s digital marketing partner, we collaborated closely at every stage, from strategy development to execution, offering insights, proactive solutions, and performance monitoring. By aligning campaigns with DPGA’s vision and goals, they ensured measurable outcomes across admissions, branding, and engagement, fostering a relationship built on trust, accountability, and shared success.',
        images: [
          'https://host2unlimited.com/wp-content/uploads/2025/10/armite-photo-01.jpeg',
          'https://host2unlimited.com/wp-content/uploads/2025/10/armite-photo-03.jpeg'
        ],
        layout: 'grid-2'
      }
    ],
    results: [
      '31% Increase in Qualified Admission Inquiries via Targeted Performance Ads.',
      '22% Growth in Website Average Session Duration & Interactive Engagement.',
      '19% Organic SEO Traffic Lift for International School Keywords in Navi Mumbai.',
      '24% Boost in Parent Social Media Engagement with Cohesive Graphic Storytelling.',
      '27% Increase in Event-Related Social Interactions & Community Participation.'
    ]
  },
  {
    id: '8',
    name: 'NEW HORIZON PUBLIC SCHOOL, AIROLI (SECTOR 3)',
    category: 'Education',
    location: 'Airoli, Navi Mumbai',
    logo: newHorizonAiroli3,
    color: '#0891b2',
    tagline: 'Academic Distinction & Top Google Search Rankings',
    metrics: [
      { value: '65%', label: 'Inquiry Growth' },
      { value: '300k+', label: 'Views' },
      { value: '4.9★', label: 'Rating' }
    ],
    description: 'New Horizon Public School, Airoli (Sector 3) is a distinguished CBSE school known for producing top academic rankers, sports champions, and well-rounded global citizens.',
    challenge: 'Maintaining digital leadership and direct parent communication during admission periods.',
    solution: 'Search engine optimization, Google My Business management, and social media storytelling.',
    results: [
      'Ranked #1 on Google search for CBSE schools in Airoli.',
      'Generated 65% increase in online inquiry submissions.',
      'Maintained 4.9-star rating with positive reviews.'
    ]
  },
  {
    id: '9',
    slug: 'royal-international-cbse-school',
    name: 'ROYAL INTERNATIONAL CBSE SCHOOL',
    category: 'Education',
    location: 'Dombivli, Maharashtra',
    logo: newHorizonLogo,
    color: '#dc2626',
    tagline: 'Driving Parent Trust & Local Brand Dominance',
    subHeadline: 'Comprehensive digital strategy blending academic storytelling, infrastructure showcases, and high-converting performance campaigns for maximum admission inquiries.',
    metrics: [
      { value: '3x', label: 'Parent Inquiries' },
      { value: '500+', label: 'Event Shares' },
      { value: '92%', label: 'Satisfaction Score' }
    ],
    description: 'At Royal International School, we believe in providing excellent learning with the best infrastructure and academic performance. Experience quality facilities and a superior study environment for your children\'s success!',
    challenge: 'Royal International School needed to enhance its digital brand equity and maintain consistent engagement with parents through active digital story-telling and event coverage.',
    solution: 'Host2Unlimited placed a dedicated Digital Marketing Coordinator at the school campus to record live events, manage official social handles, execute weekly video posts, and run automated lead funnels.',
    pillars: [
      {
        title: 'Holistic Brand Identity & School Storytelling',
        desc: 'Establishing a cohesive visual identity across platforms highlighting academic achievements, co-curricular sports, and modern digital classrooms.',
        images: ['https://host2unlimited.com/wp-content/uploads/2025/10/Festival-wish-post-for-school-1-scaled.jpg'],
        layout: 'single-banner'
      },
      {
        title: 'Purpose-Driven Social Media Campaigns',
        desc: 'Publishing student accomplishment reels and event highlights to build active parent engagement and trust across Dombivli & Kalyan.',
        images: [
          'https://host2unlimited.com/wp-content/uploads/2025/10/Social-media-presence-of-education-brand-1.jpg',
          'https://host2unlimited.com/wp-content/uploads/2025/10/Social-media-education-brand-2.jpg'
        ],
        layout: 'grid-2'
      },
      {
        title: 'User-Centric Website Experience & SEO',
        desc: 'Designing a mobile-optimized website layout with quick inquiry forms, virtual campus tours, and localized search optimization.',
        images: ['https://host2unlimited.com/wp-content/uploads/2025/10/Educational-institute-website-layout-preview-1-scaled.jpg'],
        layout: 'single-banner'
      },
      {
        title: 'Targeted Performance Ad Campaigns',
        desc: 'Executing precision Meta & Google ad campaigns reaching parents actively seeking premier CBSE education.',
        images: [
          'https://host2unlimited.com/wp-content/uploads/2025/10/School-Admission-Open-Creative.1-1-819x1024.jpeg',
          'https://host2unlimited.com/wp-content/uploads/2025/10/School-Admission-Open-Creative.2-1-819x1024.jpeg',
          'https://host2unlimited.com/wp-content/uploads/2025/10/School-Admission-Open-Creative.3-1-819x1024.jpeg'
        ],
        layout: 'grid-3'
      }
    ],
    results: [
      'Grew parent inquiries by 3x during admission season.',
      'Achieved over 100,000+ organic video views across Instagram and Facebook Reels.',
      'Established high digital brand equity in Kalyan-Dombivli region.'
    ]
  },
  {
    id: '10',
    slug: 'armiet-engineering-and-mgmt-college',
    name: 'ARMIET ENGINEERING & MGMT COLLEGE',
    category: 'Higher Education',
    location: 'Asangaon, Thane',
    logo: armietLogo,
    color: '#059669',
    tagline: 'Multi-Audience SEO & Targeted Engineering Admission Funnels',
    subHeadline: 'Data-driven campus marketing strategy combining placement records, student testimonials, and statewide ad campaigns.',
    metrics: [
      { value: '60%', label: 'Direct Leads Boost' },
      { value: '4x', label: 'LinkedIn Reach' },
      { value: '25+', label: 'Recruiter Highlights' }
    ],
    description: 'ARMIET (Alamuri Ratnamala Institute of Engineering and Technology) is a reputed engineering and management institute in Asangaon offering diploma, degree, and postgraduate programs. The college focuses on practical, industry-based learning, innovation, and overall student development.',
    challenge: 'Reaching engineering diploma and degree aspirants across rural and urban Maharashtra with authentic placement records and course specialization details.',
    solution: 'Custom SEO portal optimization, regional YouTube placement video stories, student testimonial campaigns, and automated WhatsApp CRM lead nurturing.',
    pillars: [
      {
        title: 'Placement-Driven Student Storytelling',
        desc: 'Highlighting top engineering placements, MNC recruitment drives, and student innovation projects through video reels and LinkedIn posts.',
        images: ['https://host2unlimited.com/wp-content/uploads/2025/10/armite-photo-01.jpeg'],
        layout: 'single-banner'
      },
      {
        title: 'Multi-Stream Course Landing Pages',
        desc: 'Developing specialized landing pages for Computer Science, Mechanical, Civil, EXTC, and Management streams with instant inquiry forms.',
        images: ['https://host2unlimited.com/wp-content/uploads/2025/10/armite-photo-02.jpeg'],
        layout: 'single-banner'
      },
      {
        title: 'Statewide Performance & Lead Generation',
        desc: 'Running geo-targeted Meta & Google ad funnels across Mumbai, Thane, Nashik, and Pune districts to attract high-intent engineering aspirants.',
        images: ['https://host2unlimited.com/wp-content/uploads/2025/10/armite-photo-03.jpeg'],
        layout: 'single-banner'
      }
    ],
    results: [
      '60% increase in direct engineering and management application form submissions.',
      '4x growth in student and placement company engagement on LinkedIn.',
      'Successfully conducted statewide placement drive awareness campaigns.'
    ]
  },
  {
    id: '11',
    name: 'NEW HORIZON SCHOLARS SCHOOL, VASANT LAWNS',
    category: 'Education',
    location: 'Vasant Lawns, Thane',
    logo: newHorizonVasant,
    color: '#4f46e5',
    tagline: 'Enriched Educational Journeys & Digital Parent Engagement',
    metrics: [
      { value: '45%', label: 'Lead Growth' },
      { value: '3x', label: 'Reel Engagement' },
      { value: '98%', label: 'Ad Accuracy' }
    ],
    description: 'New Horizon Scholars School, Vasant Lawns offers an enriched educational journey with modern digital learning aids, sports complexes, and vibrant extracurricular programs.',
    challenge: 'Capturing admission leads from premium residential complexes near Majiwada and Vasant Lawns.',
    solution: 'Targeted hyper-local social ad campaigns, virtual campus tours, and quick lead response funnels.',
    results: [
      '45% growth in high-intent admission inquiries.',
      '3x increase in social video reel views.',
      'High conversion from lead to campus visit.'
    ]
  },
  {
    id: '12',
    name: 'NEW HORIZON PUBLIC SCHOOL, AIROLI (SECTOR 19)',
    category: 'Education',
    location: 'Airoli, Navi Mumbai',
    logo: newHorizonAiroli19,
    color: '#0284c7',
    tagline: 'Fostering Critical Thinking & Digital Brand Strength',
    metrics: [
      { value: '50%', label: 'Inquiry Boost' },
      { value: '4x', label: 'Organic Traffic' },
      { value: '100%', label: 'Full Seats' }
    ],
    description: 'New Horizon Public School, Airoli (Sector 19) is an established center of educational excellence, fostering critical thinking, sportsmanship, and moral values.',
    challenge: 'Promoting school admissions and event highlights across Navi Mumbai digital channels.',
    solution: 'SEO landing page optimization, event video highlights, and Meta Lead ads.',
    results: [
      '50% boost in online admission inquiry form submissions.',
      '4x organic website traffic expansion.',
      '100% filled seats across key grade levels.'
    ]
  },
  {
    id: '13',
    slug: 'gautam-singhania-global-school-dombiali',
    name: 'GAUTAM SINGHANIA GLOBAL SCHOOL DOMBIVALI',
    category: 'Education',
    location: 'Dombivli West, Maharashtra',
    logo: gsgsLogo,
    color: '#d97706',
    tagline: 'Shaping Future-Ready Education Branding',
    subHeadline: 'Innovate & Thrive — Launching a dynamic and inclusive learning community with global educational perspectives in Dombivli.',
    metrics: [
      { value: '100%', label: 'Class Capacity' },
      { value: '2.5x', label: 'Search Authority' },
      { value: '400+', label: 'Parent Visits' }
    ],
    description: 'Innovate & Thrive – A New Era of Education, transforming learning. Gautam Singhania Global School is a dynamic and inclusive learning community with a global perspective, dedicated to shaping future-ready individuals.',
    challenge: 'Creating strong brand awareness for a premier new campus launching in competitive Central Mumbai suburbs.',
    solution: 'Designed immersive virtual campus video walkthroughs, high-impact Meta lead generation campaigns, local outdoor-digital synergy, and Google My Business reviews management.',
    pillars: [
      {
        title: 'Launch Branding & Visual Heritage',
        desc: 'Building instant prestige and trust through premium campus photography, founder vision videos, and modern curriculum showcases.',
        images: ['https://host2unlimited.com/wp-content/uploads/2025/10/Festival-wish-post-for-school-4-scaled.jpg'],
        layout: 'single-banner'
      },
      {
        title: 'Engaging Community & Parent Outreach',
        desc: 'Interactive social media presence showcasing STEAM labs, sports academies, and holistic growth initiatives.',
        images: [
          'https://host2unlimited.com/wp-content/uploads/2025/10/Social-media-presence-of-education-brand-5.jpg',
          'https://host2unlimited.com/wp-content/uploads/2025/10/Social-media-education-brand-5.jpg'
        ],
        layout: 'grid-2'
      },
      {
        title: 'Next-Gen Responsive Web Portal',
        desc: 'Crafting a high-speed web interface with virtual tour navigation, grade-wise fee structure transparency, and direct WhatsApp inquiry integration.',
        images: ['https://host2unlimited.com/wp-content/uploads/2025/10/Educational-institute-website-layout-preview-5-scaled.jpg'],
        layout: 'single-banner'
      }
    ],
    results: [
      'Achieved 100% target enrolment for launching academic batches.',
      'Generated 400+ physical campus visit appointments via digital lead funnels.',
      'Built a top-tier digital presence across Dombivli and Thane district.'
    ]
  },
  {
    id: '14',
    slug: 'poddar-brio-kids',
    name: 'PODDAR BRIO KIDS',
    category: 'Preschool',
    location: 'Maharashtra',
    logo: euroKidsLogo,
    color: '#ec4899',
    tagline: 'Hyperlocal Preschool Enrolment & Parent Engagement',
    subHeadline: 'Engaging young urban parents through child-friendly visuals, transparent activity updates, and streamlined admission inquiry channels.',
    metrics: [
      { value: '50%', label: 'More Enrolments' },
      { value: '4x', label: 'Local Map Views' },
      { value: '98%', label: 'Ad Accuracy' }
    ],
    description: 'Poddar Brio Kids is a leading preschool chain offering a nurturing environment focused on early childhood development. Built with a child-friendly visual theme and simplified navigation, it ensures strong brand presence online.',
    challenge: 'Capturing high-intent parent inquiries within a tight 3km radius of each preschool branch.',
    solution: 'Deployed geo-fenced local search ads, Google Maps location extensions, parent workshop event marketing, and child-friendly visual content sets.',
    pillars: [
      {
        title: 'Early Childhood Storytelling & Safety Showcase',
        desc: 'Highlighting play-way learning methods, child safety protocols, and Montessori activity rooms through warm, engaging visual banners.',
        images: ['https://host2unlimited.com/wp-content/uploads/2025/10/Wish-post-for-educational-institute-scaled.jpg'],
        layout: 'single-banner'
      },
      {
        title: 'Hyper-Local Map & Social Campaigning',
        desc: 'Optimizing Google Maps listings and running radius-targeted Meta ads to capture nearby parents actively seeking daycare and preschool enrolments.',
        images: ['https://host2unlimited.com/wp-content/uploads/2025/10/Social-media-presence-of-education-brand.jpg'],
        layout: 'single-banner'
      },
      {
        title: 'Parent-Friendly Web Portal UX',
        desc: 'Designing a bright, accessible website layout with simple program details, photo galleries, and 1-click admission inquiry buttons.',
        images: ['https://host2unlimited.com/wp-content/uploads/2025/10/Educational-institute-website-layout-preview-scaled.jpg'],
        layout: 'single-banner'
      }
    ],
    results: [
      'Increased preschool batch admissions by 50% year-on-year.',
      'Expanded local map search visibility by 4x across 5 branch locations.',
      'Consistently generated qualified parent leads at minimal cost-per-lead.'
    ]
  },
  {
    id: '15',
    slug: 'dg-international-cbse-school',
    name: 'DG INTERNATIONAL CBSE SCHOOL',
    category: 'Education',
    location: 'Thane West, Maharashtra',
    logo: dnyanGangaLogo,
    color: '#0891b2',
    tagline: '360° CBSE School Branding & Full Admission Campaign',
    subHeadline: 'Blending academic excellence with global teaching standards, cultural values, and interactive parent-teacher digital touchpoints.',
    metrics: [
      { value: '100%', label: 'Seats Filled' },
      { value: '5x', label: 'Organic Traffic' },
      { value: '300+', label: 'Campus Inquiries' }
    ],
    description: 'DG International CBSE School is a leading educational institution in Thane that provides schooling from kindergarten to higher secondary levels. It emphasizes academic excellence blended with global teaching standards and Indian cultural values.',
    challenge: 'Maximizing admission conversions while highlighting sports, STEM labs, and cultural achievements online.',
    solution: 'Built dedicated landing pages for each grade level, ran high-converting Meta & Google search campaigns, and posted weekly video highlights.',
    pillars: [
      {
        title: '360° Educational Excellence Branding',
        desc: 'Crafting vibrant event wish posts, academic topper spotlights, and sports infrastructure highlights across all digital channels.',
        images: ['https://host2unlimited.com/wp-content/uploads/2025/10/Festival-wish-post-for-school-scaled.jpg'],
        layout: 'single-banner'
      },
      {
        title: 'Interactive Parent Engagement & Social Reels',
        desc: 'Publishing weekly video highlights of classroom activities, science exhibitions, and annual day celebrations.',
        images: [
          'https://host2unlimited.com/wp-content/uploads/2025/10/Social-media-presence-of-education-brand-2.jpg',
          'https://host2unlimited.com/wp-content/uploads/2025/10/Social-media-education-brand-2.jpg'
        ],
        layout: 'grid-2'
      },
      {
        title: 'Conversion-Optimized CBSE Web Design',
        desc: 'Developing a modern website portal featuring grade-by-grade curriculum details, fee structure transparency, and online application booking.',
        images: ['https://host2unlimited.com/wp-content/uploads/2025/10/Educational-institute-website-layout-preview-2-scaled.jpg'],
        layout: 'single-banner'
      }
    ],
    results: [
      'Achieved 100% seat occupancy across primary and secondary grades.',
      'Scaled organic website traffic by 5x through targeted local SEO keywords.',
      'Established DG International as a top-ranked CBSE school in Thane.'
    ]
  },
  {
    id: '16',
    slug: 'shivajirao-s-jondhle-college-of-engineering-technology',
    name: 'SHIVAJIRAO S. JONDHLE COLLEGE OF ENGINEERING & TECHNOLOGY',
    category: 'Higher Education',
    location: 'Asangaon, Thane',
    logo: armietLogo,
    color: '#7c3aed',
    tagline: 'Smart School MIS Integration & Technical Student Growth',
    subHeadline: 'Empowering technical education through automated online admission portals, placement record highlights, and Smart MIS integration.',
    metrics: [
      { value: '55%', label: 'Admission Boost' },
      { value: '4x', label: 'Portal Traffic' },
      { value: '100%', label: 'Online MIS' }
    ],
    description: 'Shivajirao S. Jondhle College of Engineering & Technology is a leading institution offering diploma, degree, and postgraduate programs in engineering and technology. Integrated with Smart School MIS for online student management.',
    challenge: 'Integrating online admission systems with MIS while reaching engineering aspirants across Maharashtra.',
    solution: 'Integrated custom Smart School MIS, automated inquiry routing, and executed statewide digital ad campaigns.',
    pillars: [
      {
        title: 'Technical Academic & Placement Showcase',
        desc: 'Highlighting specialized engineering labs, industry partnerships, and campus recruitment highlights through structured web modules.',
        images: ['https://host2unlimited.com/wp-content/uploads/2025/10/armite-photo-01.jpeg'],
        layout: 'single-banner'
      },
      {
        title: 'Smart MIS Admission Portal Integration',
        desc: 'Building an automated application portal with instant SMS/email confirmation and real-time lead tracking for college administration.',
        images: ['https://host2unlimited.com/wp-content/uploads/2025/10/armite-photo-02.jpeg'],
        layout: 'single-banner'
      },
      {
        title: 'Targeted Engineering Lead Generation',
        desc: 'Running statewide performance campaigns across Meta and Google targeting MHT-CET, JEE, and Diploma engineering aspirants.',
        images: ['https://host2unlimited.com/wp-content/uploads/2025/10/armite-photo-03.jpeg'],
        layout: 'single-banner'
      }
    ],
    results: [
      'Increased online admission form submissions by 55%.',
      '4x growth in website portal traffic.',
      'Streamlined campus MIS workflow.'
    ]
  },
  {
    id: '17',
    name: 'NEW HORIZON SCHOLARS SCHOOL RODAS, KOLSHET',
    category: 'Education',
    location: 'Kolshet, Thane',
    logo: newHorizonRodasKolshet,
    color: '#2563eb',
    tagline: 'High-Standard Schooling & Digital Community Reach',
    metrics: [
      { value: '45%', label: 'More Inquiries' },
      { value: '3x', label: 'Local Visibility' },
      { value: '95%', label: 'Parent Satisfaction' }
    ],
    description: 'New Horizon Scholars School Rodas, Kolshet provides high-standard schooling with state-of-the-art facilities, experimental science labs, and holistic sports coaching.',
    challenge: 'Reaching parents moving into new residential towers in Kolshet Road corridor.',
    solution: 'Targeted hyper-local social campaigns, video tours, and local search optimization.',
    results: [
      '45% boost in parent admission inquiries.',
      '3x higher visibility in local map searches.',
      'High conversion from inquiries to confirmed admissions.'
    ]
  },
  {
    id: '18',
    name: 'PILLAI INSTITUTE PANVEL',
    category: 'Higher Education',
    location: 'Panvel, Navi Mumbai',
    logo: pillaiLogo,
    color: '#6d28d9',
    tagline: 'Immersive Study Abroad & Language Learning Digital Campaigns',
    metrics: [
      { value: '3x', label: 'Study Abroad Leads' },
      { value: '80%', label: 'Conversion Rate' },
      { value: '500+', label: 'Enrolled' }
    ],
    description: 'At PIL, we facilitate immersive study abroad experiences, allowing you to fully embrace a new language and culture. Take your education beyond borders and create memories that will last a lifetime. Learning a foreign language enhances critical thinking, problem-solving, and creativity. We recognize the tremendous personal growth that language learning brings.',
    challenge: 'Generating qualified student inquiries for foreign language courses and global study abroad programs.',
    solution: 'Executed targeted Google search campaigns, webinars, student experience video reels, and landing page optimization.',
    results: [
      'Grew qualified study abroad leads by 3x.',
      'Achieved 80% lead to counseling conversion rate.',
      'Successfully enrolled 500+ students into international language batches.'
    ]
  },
  {
    id: '19',
    slug: 'uudaan-montessori',
    name: 'UUDAAN MONTESSORI',
    category: 'Preschool',
    location: 'Thane, Mumbai',
    logo: uudaanLogo,
    color: '#f59e0b',
    tagline: 'Building Early Childhood Digital Authority & Parent Trust',
    subHeadline: 'Nurturing young minds aged 2 to 6 through authentic parent testimonials, Montessori philosophy highlights, and Google Maps local search optimization.',
    metrics: [
      { value: '3x', label: 'Parent Inquiries' },
      { value: '85%', label: 'Lead Conversion' },
      { value: '4.9★', label: 'Google Rating' }
    ],
    description: 'Uudaan Montessori Preschool and Daycare, headquartered in Thane, maintains a high-quality learning atmosphere for young minds between 2 and 6 years. Our focus is developing concentration, self-discipline, and self-motivation.',
    challenge: 'Communicating Montessori teaching philosophies clearly to young urban parents seeking trusted daycare and preschool options.',
    solution: 'Created authentic video testimonials from parents, updated Google Business Profile with weekly photos, and ran localized search campaigns.',
    pillars: [
      {
        title: 'Montessori Early Childhood Showcase',
        desc: 'Highlighting child-centric sensory exercises, self-discipline learning environments, and daycare facilities.',
        images: ['https://host2unlimited.com/wp-content/uploads/2025/10/Wish-post-for-educational-institute-scaled.jpg'],
        layout: 'single-banner'
      },
      {
        title: 'Authentic Parent Testimonials & Local SEO',
        desc: 'Publishing authentic parent video reviews and maintaining top 3-pack Google Maps visibility across Thane city.',
        images: ['https://host2unlimited.com/wp-content/uploads/2025/10/Social-media-presence-of-education-brand.jpg'],
        layout: 'single-banner'
      }
    ],
    results: [
      'Grew parent inquiry volume by 3x during admissions period.',
      'Maintained a 4.9-star average rating with 100+ positive parent reviews.',
      'Expanded daycare admissions significantly.'
    ]
  },
  {
    id: '20',
    slug: 'dr-shivajirao-s-jondhle-international-school',
    name: 'DR SHIVAJIRAO S JONDHLE INTERNATIONAL SCHOOL',
    category: 'Education',
    location: 'Thane, Maharashtra',
    logo: euroKidsLogo,
    color: '#10b981',
    tagline: 'CBSE Quality Learning & Smart MIS Digital Integration',
    subHeadline: 'Delivering modern CBSE education integrated with Smart School MIS for seamless online student management and parent communication.',
    metrics: [
      { value: '50%', label: 'Inquiry Growth' },
      { value: '3.5x', label: 'Map Reach' },
      { value: '100%', label: 'MIS Active' }
    ],
    description: 'Dr. Shivajirao S. Jondhle International School is a reputed CBSE educational institution committed to delivering quality learning through modern teaching methodologies and digital integration.',
    challenge: 'Improving online admission workflow and parent communication across Thane district.',
    solution: 'Redesigned school website with Smart School MIS integration, active GMB reviews, and targeted local Facebook ads.',
    pillars: [
      {
        title: 'CBSE Festival Wish & Brand Awareness',
        desc: 'Vibrant festive posts and institutional branding highlighting CBSE curriculum excellence.',
        images: ['https://host2unlimited.com/wp-content/uploads/2025/10/Festival-wish-post-for-school-4-scaled.jpg'],
        layout: 'single-banner'
      },
      {
        title: 'Social Media Engagement & School Activities',
        desc: 'Highlighting smart classrooms, sports academies, science exhibitions, and student achievements.',
        images: [
          'https://host2unlimited.com/wp-content/uploads/2025/10/Social-media-presence-of-education-brand-5.jpg',
          'https://host2unlimited.com/wp-content/uploads/2025/10/Social-media-education-brand-5.jpg'
        ],
        layout: 'grid-2'
      },
      {
        title: 'Smart MIS Web Portal Preview',
        desc: 'Seamless website design integrated with Smart School MIS for parent-teacher transparency.',
        images: ['https://host2unlimited.com/wp-content/uploads/2025/10/Educational-institute-website-layout-preview-5-scaled.jpg'],
        layout: 'single-banner'
      },
      {
        title: 'Admission Open High-Converting Ad Funnel',
        desc: 'Targeted ad creatives driving parent inquiry form submissions and campus visit bookings.',
        images: [
          'https://host2unlimited.com/wp-content/uploads/2025/10/School-Admission-Open-Creative.1-3.jpeg',
          'https://host2unlimited.com/wp-content/uploads/2025/10/School-Admission-Open-Creative.2-4.jpeg',
          'https://host2unlimited.com/wp-content/uploads/2025/10/School-Admission-Open-Creative.3-3.jpeg'
        ],
        layout: 'grid-3'
      }
    ],
    results: [
      '50% growth in direct online admission inquiries.',
      '3.5x increase in local map search impressions.',
      'Seamless online student record management.'
    ]
  },
  {
    id: '21',
    name: 'DPGA GORAI',
    category: 'Education',
    location: 'Gorai / Borivali, Mumbai',
    logo: drPillaiLogo,
    color: '#7c3aed',
    tagline: 'Premium IB & International School Branding',
    metrics: [
      { value: '40%', label: 'Admission Boost' },
      { value: '4x', label: 'Social Views' },
      { value: '100%', label: 'Batch Full' }
    ],
    description: 'The DPGA Borivali is a well-planned initiative from the Mahatma Education Society, a trust committed to provide meaningful education with tangible results. It is the brainchild and the enterprise of Dr. K. M. Vasudevan Pillai, an educator with 40 years experience.',
    challenge: 'Positioning DPGA Borivali as the top international IB school in North Mumbai suburbs.',
    solution: 'Produced video testimonials of alumni, ran high-intent search ads, and built structured landing pages.',
    results: [
      'Increased IB admission inquiries by 40%.',
      'Over 4x increase in organic social video views.',
      'Full batch enrolments for the new academic year.'
    ]
  },
  {
    id: '22',
    slug: 'ardent-tutorials',
    name: 'ARDENT TUTORIALS',
    category: 'Coaching',
    location: 'Thane, Maharashtra',
    logo: ardentLogo,
    color: '#2563eb',
    tagline: 'Premier Commerce & CA/CS Foundation Coaching Marketing',
    subHeadline: 'Showcasing concept-based learning, student success stories, and the Ardent family ethos to build brand credibility and attract motivated commerce students.',
    metrics: [
      { value: '3x', label: 'Batch Enrolment' },
      { value: '95%', label: 'Passing Rate' },
      { value: '200+', label: 'Verified Leads' }
    ],
    description: 'Premier Commerce Tutorials in Thane offering certified coaching for 11th & 12th Commerce, CA Foundation, and CS Foundation batches.',
    challenge: 'Attracting commerce students for specialized 11th, 12th, CA and CS Foundation batches.',
    solution: 'Executed targeted Google search ads for "Best Commerce Coaching in Thane", topper result banners, and Instagram lead campaigns.',
    pillars: [
      {
        title: 'Festival Wish & Branding Campaigns',
        desc: 'Engaging festive posts and brand trust creatives tailored for commerce students and parents across Thane.',
        images: ['https://host2unlimited.com/wp-content/uploads/2025/10/Festival-wish-post-for-school-6-scaled.jpg'],
        layout: 'single-banner'
      },
      {
        title: 'Social Media Presence & Commerce Topper Highlights',
        desc: 'Highlighting top CA/CS rankers, concept-based coaching methodologies, and student growth stories.',
        images: [
          'https://host2unlimited.com/wp-content/uploads/2025/10/Social-media-presence-of-education-brand-8.jpg',
          'https://host2unlimited.com/wp-content/uploads/2025/10/Social-media-education-brand-8.jpg'
        ],
        layout: 'grid-2'
      },
      {
        title: 'Educational Web Portal & Course Layout',
        desc: 'Optimized web portal preview detailing 11th, 12th Commerce, and CA/CS Foundation course structures.',
        images: ['https://host2unlimited.com/wp-content/uploads/2025/10/Educational-institute-website-layout-preview-8-scaled.jpg'],
        layout: 'single-banner'
      },
      {
        title: 'Targeted Admission Open Performance Creatives',
        desc: 'High-converting Meta & Google search ad creatives designed for peak commerce admission campaigns.',
        images: [
          'https://host2unlimited.com/wp-content/uploads/2025/10/School-Admission-Open-Creative.1-6.jpeg',
          'https://host2unlimited.com/wp-content/uploads/2025/10/School-Admission-Open-Creative.2-7.jpeg',
          'https://host2unlimited.com/wp-content/uploads/2025/10/School-Admission-Open-Creative.03-2.jpeg'
        ],
        layout: 'grid-3'
      }
    ],
    results: [
      'Expanded batch size by 3x across commerce and CA foundation classes.',
      'Captured 200+ qualified student leads per session.',
      'Established Ardent as the #1 Commerce coaching brand in Thane.'
    ]
  },
  {
    id: '23',
    slug: 'royal-junior-degree-college',
    name: 'ROYAL JUNIOR & DEGREE COLLEGE',
    category: 'Higher Education',
    location: 'Dombivli, Maharashtra',
    logo: newHorizonLogo,
    color: '#dc2626',
    tagline: 'Renowned Higher Education & Degree Program Admissions',
    subHeadline: 'Combining data insights, student-centric content, and sharp targeting for maximum inquiries across B.Com, B.Sc, and B.A. streams.',
    metrics: [
      { value: '50%', label: 'More Applicants' },
      { value: '4x', label: 'Search Reach' },
      { value: '100%', label: 'Seats Filled' }
    ],
    description: 'Royal Junior and Degree College, Dombivli, is a renowned higher education institution offering undergraduate and postgraduate programs in arts, science, and commerce.',
    challenge: 'Scaling undergraduate degree applications across Science, Commerce, and Arts streams.',
    solution: 'Designed stream-specific landing pages, conducted digital career guidance webinars, and ran Meta lead form campaigns.',
    pillars: [
      {
        title: 'Higher Education Brand Equity',
        desc: 'Strengthening academic identity through alumni success stories, modern science labs, and night college program highlights.',
        images: ['https://host2unlimited.com/wp-content/uploads/2025/10/Festival-wish-Admission-post-forschool-scaled.jpg'],
        layout: 'single-banner'
      },
      {
        title: 'Stream-Specific Social & Reel Marketing',
        desc: 'Targeting prospective 12th pass students across Dombivli and Kalyan with stream-specific career path video reels.',
        images: [
          'https://host2unlimited.com/wp-content/uploads/2025/10/Social-media-presence-of-education-brand-6.jpg',
          'https://host2unlimited.com/wp-content/uploads/2025/10/Social-media-education-brand-6.jpg'
        ],
        layout: 'grid-2'
      },
      {
        title: 'Responsive Web Portal & Admission UX',
        desc: 'Developing an intuitive web interface for online degree application submissions, fee details, and stream choices.',
        images: ['https://host2unlimited.com/wp-content/uploads/2025/10/Educational-institute-website-layout-preview-6-scaled.jpg'],
        layout: 'single-banner'
      },
      {
        title: 'Targeted Degree Admission Ad Funnels',
        desc: 'Running Meta & Google performance campaigns during 12th result season for high-conversion application submissions.',
        images: [
          'https://host2unlimited.com/wp-content/uploads/2025/10/School-Admission-Open-Creative.1-4.jpeg',
          'https://host2unlimited.com/wp-content/uploads/2025/10/School-Admission-Open-Creative.2-5.jpeg',
          'https://host2unlimited.com/wp-content/uploads/2025/10/School-Admission-Open-Creative.03.jpeg'
        ],
        layout: 'grid-3'
      }
    ],
    results: [
      '50% increase in total degree course applications.',
      'Filled 100% available seats in B.Com, B.Sc, and B.A. streams.',
      '4x increase in organic Google search impressions.'
    ]
  },
  {
    id: 24,
    name: 'GAUTAM SINGHANIA GLOBAL SCHOOL THANE',
    category: 'Education',
    location: 'Thane, Maharashtra',
    logo: gsgsLogo,
    color: '#d97706',
    tagline: 'Future-Ready Education & Dynamic Campus Growth',
    metrics: [
      { value: '100%', label: 'Full Admissions' },
      { value: '3.5x', label: 'Brand Reach' },
      { value: '350+', label: 'Lead Visits' }
    ],
    description: 'Innovate & Thrive – A New Era of Education, transforming learning, Gautam Singhania Global School is a dynamic and inclusive learning community with a global perspective, dedicated to shaping future-ready individuals who are academically strong, socially responsible and emotionally intelligent.',
    challenge: 'Establishing a prominent brand identity and securing launch enrolments in Thane.',
    solution: 'Hyper-local Meta & Google campaign, live campus tour video reels, and interactive parent inquiry forms.',
    results: [
      '100% filled student capacity for launching batches.',
      '3.5x expansion in brand social impressions.',
      'Generated 350+ in-person campus visit bookings.'
    ]
  },
  {
    id: '25',
    name: 'SWAMI VIVEKANAND EDUCATION SOCIETY',
    category: 'Education',
    location: 'Mumbai, Maharashtra',
    logo: euroKidsLogo,
    color: '#f97316',
    tagline: 'Multi-Institutional Group Branding & Website Portal',
    metrics: [
      { value: '60%', label: 'Portal Traffic' },
      { value: '5x', label: 'Event Reach' },
      { value: '100%', label: 'Centralized' }
    ],
    description: 'Swami Vivekanand Education Society is a reputed educational group offering comprehensive learning from school to higher education. The website consolidates information across its institutions, including programs, admissions, and events, through a technically efficient and well-structured framework.',
    challenge: 'Consolidating multiple schools and colleges under one unified, modern digital web portal.',
    solution: 'Designed a multi-tenant institutional CMS portal, search engine optimization, and unified branding.',
    results: [
      '60% growth in website user engagement.',
      'Unified 10+ institutions under one high-performance digital hub.',
      '5x increase in event reach.'
    ]
  },
  {
    id: '26',
    name: 'DGET TRUST BED COLLEGE',
    category: 'Higher Education',
    location: 'Thane, Maharashtra',
    logo: dnyanGangaLogo,
    color: '#0284c7',
    tagline: 'Quality B.Ed Teacher Education & Professional Growth',
    metrics: [
      { value: '45%', label: 'More Applicants' },
      { value: '100%', label: 'B.Ed Seats Filled' },
      { value: '3x', label: 'Organic SEO' }
    ],
    description: 'DGET Trust BEd College is an educational hub delivering quality education from KG to PG in Thane. Determined to run institutions professionally, adopting modern advancements in academics and technology to shape individuals into truly global citizens with Indian values.',
    challenge: 'Attracting aspiring teachers for professional B.Ed degree programs in Thane.',
    solution: 'Executed targeted Google search campaigns, B.Ed admission portal SEO, and alumni placement highlights.',
    results: [
      '100% seat occupancy in B.Ed degree programs.',
      '45% increase in online applicant submissions.',
      '3x organic Google search visibility.'
    ]
  },
  {
    id: '27',
    name: 'PODDAR BRIO COLLEGE OF LAW',
    category: 'Higher Education',
    location: 'Badlapur, Maharashtra',
    logo: euroKidsLogo,
    color: '#1e3a8a',
    tagline: 'Legal Education Portal & LL.B Admission Campaigns',
    metrics: [
      { value: '50%', label: 'LL.B Lead Boost' },
      { value: '4x', label: 'Web Visitors' },
      { value: '100%', label: 'Seats Filled' }
    ],
    description: 'The college website features detailed information about 3-year LL.B and 5-year B.A. LL.B programs, admission process, and infrastructure details like library, moot court, and classrooms. The platform promotes academic excellence, legal education facilities, and student resources with a focus on enrollment and communication through enquiry options.',
    challenge: 'Promoting 3-year LL.B and 5-year B.A. LL.B programs and moot court facilities to law aspirants.',
    solution: 'Custom law college landing page, Google Ads targeting law aspirants, and moot court video showcases.',
    results: [
      '50% boost in LL.B and B.A. LL.B admission applications.',
      'Filled 100% of open law college seats.',
      '4x growth in website portal visitors.'
    ]
  },
  {
    id: '28',
    name: 'DNYAN GANGA COLLEGE OF PHARMACY',
    category: 'Higher Education',
    location: 'Thane, Maharashtra',
    logo: dnyanGangaLogo,
    color: '#059669',
    tagline: 'Pharmacy Education, AICTE/PCI Compliance & Student Leads',
    metrics: [
      { value: '55%', label: 'D/B.Pharm Leads' },
      { value: '100%', label: 'PCI Compliant' },
      { value: '4x', label: 'Web Views' }
    ],
    description: 'The website provides complete academic details including D.Pharm and B.Pharm programs, admission guidelines, faculty and committees info, exam notifications, and syllabus downloads. It also highlights infrastructure, labs, library, campus events, and includes AICTE, PCI, and DTE links for accreditation compliance.',
    challenge: 'Presenting complete D.Pharm and B.Pharm academic compliance while driving admission inquiries.',
    solution: 'Built fully compliant PCI/AICTE digital web portal, download resources, and targeted pharmacy lead ads.',
    results: [
      '55% increase in D.Pharm and B.Pharm admission inquiries.',
      '100% accreditation compliance representation online.',
      '4x increase in syllabus and portal downloads.'
    ]
  },
  {
    id: '29',
    name: 'NAVODAYA ENGLISH HIGH SCHOOL & JUNIOR COLLEGE',
    category: 'Education',
    location: 'Thane, Maharashtra',
    logo: euroKidsLogo,
    color: '#dc2626',
    tagline: 'Sculpting Better Citizens & Digital Community Engagement',
    metrics: [
      { value: '40%', label: 'Admission Boost' },
      { value: '3x', label: 'Social Engagement' },
      { value: '96%', label: 'Parent Rating' }
    ],
    description: 'Well-designed education system is a blessing of Indian culture. Navodaya Kannada Seva Sangha, the conductors of Navodaya English High School & Junior College, move on with total commitment, enabling to sculpt better citizens, a better society.',
    challenge: 'Enhancing digital presence and community awareness for junior college and high school admissions.',
    solution: 'Local search profile optimization, social media activity reels, and direct WhatsApp inquiry integration.',
    results: [
      '40% boost in school and junior college admission forms.',
      '3x growth in social media community engagement.',
      'High parent satisfaction score.'
    ]
  },
  {
    id: '30',
    name: 'HOLY CROSS ENGLISH MEDIUM SCHOOL',
    category: 'Education',
    location: 'Dombivli, Thane',
    logo: euroKidsLogo,
    color: '#4f46e5',
    tagline: 'Holistic Development & Activity-Based Learning Marketing',
    metrics: [
      { value: '45%', label: 'Inquiry Growth' },
      { value: '3.5x', label: 'Local Map Views' },
      { value: '100%', label: 'Class Capacity' }
    ],
    description: 'Holy Cross English Medium School, Dombivili, Thane: An English-medium co-educational school offering classes from pre-primary through higher levels, Holy Cross focuses on holistic development in a nurturing environment, emphasizing identifying a child\'s unique strengths via activity-based learning.',
    challenge: 'Promoting activity-based pre-primary and secondary education to local Dombivli families.',
    solution: 'Created activity video reels, local SEO optimization, and structured parent inquiry forms.',
    results: [
      '45% growth in pre-primary and primary student inquiries.',
      'Filled 100% class capacity across entry grades.',
      '3.5x increase in local map searches.'
    ]
  },
  {
    id: '31',
    name: 'THE LEARNING CURVE INDIA',
    category: 'Preschool',
    location: 'Mumbai & Pan-India',
    logo: euroKidsLogo,
    color: '#ec4899',
    tagline: 'Play-Centric Early Childhood Education & Daycare Marketing',
    metrics: [
      { value: '50%', label: 'Daycare Leads' },
      { value: '4x', label: 'Local Reach' },
      { value: '98%', label: 'Parent Trust' }
    ],
    description: 'The Learning Curve India specializes in early childhood education with a structured preschool and daycare program. The curriculum focuses on cognitive, social, and emotional development through activity-based learning and play-centric pedagogy.',
    challenge: 'Driving qualified parent inquiries across multiple preschool and daycare centers in urban Mumbai.',
    solution: 'Hyper-local geo-targeted Meta ad sets, daycare virtual tours, and automated parent callback funnels.',
    results: [
      '50% increase in daycare and preschool enrolments.',
      '4x growth in local geographic search reach.',
      'Consistent qualified lead flow per center.'
    ]
  },
  {
    id: '32',
    name: 'I3R GLOBAL',
    category: 'Business',
    location: 'Mumbai, India',
    logo: i3rLogo,
    color: '#0891b2',
    tagline: 'Global Event Management, B2B Networking & Hybrid Marketing',
    metrics: [
      { value: '3x', label: 'Delegate Registrations' },
      { value: '5x', label: 'B2B Connects' },
      { value: '100%', label: 'Event Success' }
    ],
    description: 'i3R Global\'s core expertise lies in identifying opportunities, emerging market trends, and leveraging cutting-edge technologies. We facilitate meaningful professional networking and knowledge sharing through face-to-face meetings via live events, digital and hybrid formats.',
    challenge: 'Scaling B2B delegate registrations and sponsor acquisition for national and international corporate expos.',
    solution: 'Executed LinkedIn B2B lead generation campaigns, multi-touch email sequences, and digital landing page optimization.',
    results: [
      '3x growth in delegate registrations for major expos.',
      'Facilitated 500+ high-value corporate B2B meetings.',
      'Delivered 100% client satisfaction for hybrid events.'
    ]
  },
  {
    id: '33',
    name: 'AV SOLUTIONS INDIA',
    category: 'Technology',
    location: 'Mumbai, India',
    logo: avLogo,
    color: '#1e40af',
    tagline: 'Premier AV Systems Integration & School Auditorium Solutions',
    metrics: [
      { value: '40%', label: 'Project Growth' },
      { value: '3x', label: 'HNI Inquiries' },
      { value: '50+', label: 'Auditoriums Built' }
    ],
    description: 'AV Solutions is a leading System Integrator for customized and personalized Audio Video, Home Automation and Control Solutions. AV Solutions has catered its HNI Clients and Educational Institutes with Cinema like Auditorium Experience into their Schools.',
    challenge: 'Showcasing high-end auditorium AV installations to educational management boards and luxury residential clients.',
    solution: 'B2B video case study showcases, Google search ads targeting school trustees and interior architects, and portfolio presentation design.',
    results: [
      'Secured 15+ major school auditorium AV automation contracts.',
      '3x increase in high-ticket HNI leads.',
      '40% year-over-year revenue expansion.'
    ]
  },
  {
    id: '34',
    name: 'RNP SYDNEY',
    category: 'Real Estate',
    location: 'Sydney, Australia',
    logo: rnpLogo,
    color: '#0f766e',
    tagline: 'Australia Property Development & Sydney Real Estate Marketing',
    metrics: [
      { value: '$10M+', label: 'Property Sales' },
      { value: '4x', label: 'Buyer Leads' },
      { value: '92%', label: 'Conversion' }
    ],
    description: 'RNP Sydney is a real estate and property development company in Australia offering professional services in property buying, selling, and project consulting. It specializes in home and land packages and end-to-end real estate solutions.',
    challenge: 'Capturing qualified homebuyer and investor leads in Sydney’s competitive real estate market.',
    solution: 'High-converting real estate lead funnels, Meta Carousel Ads of property packages, and automated CRM lead response.',
    results: [
      'Generated over $10M+ in property package sales pipeline.',
      '4x increase in qualified Sydney buyer inquiries.',
      'Lowered CPL by 40% using custom investor lookalike audiences.'
    ]
  },
  {
    id: '35',
    name: 'SMILES ROYALE',
    category: 'Healthcare',
    location: 'Mumbai, India',
    logo: drPillaiLogo,
    color: '#059669',
    tagline: 'Innovative Dental Care & Patient Acquisition Funnels',
    metrics: [
      { value: '60%', label: 'Patient Inquiries' },
      { value: '4.9★', label: 'Patient Reviews' },
      { value: '3x', label: 'Appointments' }
    ],
    description: 'We at Smiles Royale are committed to provide our patients with the most innovative and pleasant experience possible. Our team of extremely experienced and knowledgeable doctors believe in creating the right and healthy atmosphere for our patients.',
    challenge: 'Building local patient trust and driving appointment bookings for specialized dental procedures.',
    solution: 'Google Maps local search optimization, video patient testimonials, and targeted dental care lead campaigns.',
    results: [
      '60% increase in new patient consultation bookings.',
      'Achieved a 4.9-star rating with 150+ patient reviews on Google.',
      '3x growth in monthly clinic appointments.'
    ]
  },
  {
    id: '36',
    name: "V'SIGN",
    category: 'E-Commerce',
    location: 'India',
    logo: vsignLogo,
    color: '#7c3aed',
    tagline: 'Premium Pen E-Commerce Platform & Online Sales Growth',
    metrics: [
      { value: '2.5x', label: 'E-Com Revenue' },
      { value: '4x', label: 'Online Orders' },
      { value: '3.8%', label: 'Conversion Rate' }
    ],
    description: 'The official website of VSign Pen serves as an e-commerce platform showcasing premium fountain pens, ball pens, and roller pens. It provides detailed product listings with specifications, nib types, and ink-filling mechanisms.',
    challenge: 'Driving online store sales and brand recognition for luxury fountain pens and corporate gifting packages.',
    solution: 'Built a high-converting e-commerce web platform, executed Meta Shopping Ads, and set up abandoned cart retargeting.',
    results: [
      '2.5x increase in e-commerce revenue.',
      '4x growth in direct online pen orders.',
      'Achieved a 3.8% website checkout conversion rate.'
    ]
  },
  {
    id: '37',
    name: 'SKYTECH INDIA',
    category: 'Technology',
    location: 'Mumbai, India',
    logo: skytechLogo,
    color: '#0369a1',
    tagline: 'Pioneering Analytical Instrument Distribution & B2B Growth',
    metrics: [
      { value: '45%', label: 'B2B Lead Boost' },
      { value: '5x', label: 'Catalog Downloads' },
      { value: '100%', label: 'Client Trust' }
    ],
    description: 'Established in 1993, Skytech Systems (I) Pvt Ltd stands as a pioneering force in the field of analytical instrument distribution in India. We deliver comprehensive solutions that empower researchers and analysts to push the boundaries of knowledge.',
    challenge: 'Reaching research laboratories, pharmaceutical R&D units, and universities with technical instrument catalogs.',
    solution: 'Technical SEO optimization, B2B Google search ads for analytical instruments, and automated catalog download funnels.',
    results: [
      '45% boost in B2B laboratory instrument procurement inquiries.',
      '5x increase in product catalog downloads.',
      'Established digital search authority across India.'
    ]
  },
  {
    id: '38',
    name: 'LOTUS LEAF ENTERTAINMENT',
    category: 'Entertainment',
    location: 'Mumbai, India',
    logo: lotusLogo,
    color: '#db2777',
    tagline: 'Premier Entertainment Events & Production Marketing',
    metrics: [
      { value: '3x', label: 'Event Inquiries' },
      { value: '500k+', label: 'Social Reach' },
      { value: '100%', label: 'Event Success' }
    ],
    description: 'Lotus Leaf Entertainment is the dream child of Meenakshi Khosla. Meenakshi had a strong desire to have a one stop solution for all entertainment events, delivering seamless event organization and management.',
    challenge: 'Building a premier event management brand for corporate galas, celebrity shows, and entertainment productions.',
    solution: 'High-impact video reel marketing, portfolio website design, and Meta Lead campaigns.',
    results: [
      '3x growth in corporate and private event management inquiries.',
      '500,000+ social video views showcasing live shows.',
      '100% successful event execution record.'
    ]
  },
  {
    id: '39',
    name: 'GOEL AND SONS',
    category: 'Transport',
    location: 'Mulund West, Mumbai',
    logo: euroKidsLogo,
    color: '#15803d',
    tagline: '18+ Years School Bus Transport & Safety Operations',
    metrics: [
      { value: '100%', label: 'School Contracts' },
      { value: '3x', label: 'Local Visibility' },
      { value: '18+', label: 'Years Trust' }
    ],
    description: 'Welcome to our website. Our bus services was started in April 2006 and we are located in Mulund West, Mumbai. We bring along an experience of 18 brilliant years of bus services to school kids.',
    challenge: 'Highlighting 18+ years of bus safety compliance and expanding school transport contracts in Central Mumbai.',
    solution: 'Designed a professional fleet showcase website, Google My Business profile management, and trust-building parent video content.',
    results: [
      'Secured 100% renewal rate across partner school bus transport contracts.',
      '3x increase in online inquiry submissions from schools.',
      'Enhanced parent trust and brand credibility.'
    ]
  },
  {
    id: '40',
    name: 'VERTICES PARTNERS',
    category: 'Legal',
    location: 'Mumbai, India',
    logo: verticesLogo,
    color: '#1e3a8a',
    tagline: 'Full-Service Corporate Law Firm Digital Positioning',
    metrics: [
      { value: '5x', label: 'Practice Search' },
      { value: '100%', label: 'Corporate Trust' },
      { value: '50k+', label: 'Article Reads' }
    ],
    description: 'Vertices Partners is a full-service law firm providing legal solutions in Corporate & Commercial Law, M&A, Private Equity, Venture Capital, Dispute Resolution, and Regulatory Affairs.',
    challenge: 'Establishing authoritative digital thought leadership for corporate M&A, private equity, and commercial law practice areas.',
    solution: 'SEO legal portal optimization, partner insight publications, and high-converting B2B legal contact access.',
    results: [
      '5x growth in organic search traffic for corporate M&A legal keywords.',
      'Over 50,000+ reads on partner legal thought-leadership articles.',
      'Reinforced firm credibility among venture capital and corporate clients.'
    ]
  }
];

const CaseStudyDetail = (props) => {
  const { id: paramId } = useParams();
  const location = useLocation();
  const { addLead } = useLeads();
  const [studiesList, setStudiesList] = useState(caseStudiesDataList);

  useEffect(() => {
    let isMounted = true;
    const fetchBackendCaseStudies = async () => {
      try {
        const CURRENT_API_BASE = process.env.NODE_ENV === 'production'
          ? (window.location.origin.includes('localhost') ? 'http://localhost:5000' : 'https://host2unlimitedcms-backend.onrender.com')
          : 'http://localhost:5000';
        const res = await fetch(`${CURRENT_API_BASE}/api/pages/case_study_details`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0 && isMounted) {
            setStudiesList(data);
          }
        }
      } catch (err) {
        console.warn('Backend fetch for case_study_details fallback to static:', err.message);
      }
    };
    fetchBackendCaseStudies();
    return () => { isMounted = false; };
  }, []);

  // Normalize pathname to extract key segment
  const cleanPath = (location.pathname || '').replace(/^\/+|\/+$/g, '');
  const pathSegment = cleanPath.split('/').pop() || '';

  const targetKey = String(props.defaultId || paramId || pathSegment).toLowerCase().trim();

  // Bulletproof study lookup matching id, slug, or normalized name
  const study = studiesList.find(s => {
    if (!s) return false;
    const sId = String(s.id).toLowerCase().trim();
    const sSlug = (s.slug || '').toLowerCase().trim();
    const sNameKey = (s.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').trim();

    return (
      sId === targetKey ||
      (sSlug && sSlug === targetKey) ||
      (sSlug && targetKey.endsWith(sSlug)) ||
      (sNameKey && targetKey.includes(sNameKey))
    );
  }) || studiesList.find(s => String(s.id) === '1') || studiesList[0];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    instituteName: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const breadcrumbs = [
    { name: 'Home', label: 'Home', path: '/' },
    { name: 'Case Studies', label: 'Case Studies', path: '/case-studies' },
    { name: study?.name || 'Detail', label: study?.name || 'Detail', path: location.pathname }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    addLead({
      type: 'Case Study Strategy Request',
      ...formData,
      caseStudy: study.name,
      date: new Date().toISOString()
    });
    setSubmitted(true);
  };

  return (
    <div style={{ paddingTop: '0px', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      <SEOMeta
        title={`${study?.name || 'Case Study'} | Digital Marketing Case Study | Host2Unlimited`}
        description={study?.description || study?.subHeadline || 'Explore how Host2Unlimited scales admissions and digital brand equity.'}
        canonical={`https://host2unlimited.com${location.pathname}`}
        breadcrumbPaths={breadcrumbs}
      />

      {/* Hero Banner with H1 Title */}
      <section
        className="page-hero-banner"
        style={{ 
          position: 'relative', 
          minHeight: '220px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          overflow: 'hidden', 
          backgroundColor: '#0b0f19',
          padding: '36px 0'
        }}
      >
        <img
          src={caseStudiesHeroBg}
          alt="Case Study Hero"
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            zIndex: 1, 
            pointerEvents: 'none' 
          }}
        />
        <div className="container hero-content-wrapper" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <span style={{ 
            backgroundColor: 'rgba(59, 130, 246, 0.2)', 
            color: '#60a5fa', 
            fontSize: '12px', 
            fontWeight: 800, 
            padding: '4px 16px', 
            borderRadius: '20px', 
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            display: 'inline-block',
            marginBottom: '12px',
            border: '1px solid rgba(96, 165, 250, 0.3)'
          }}>
            Case Study • {study?.category || 'Education'}
          </span>
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 900, color: '#ffffff', marginBottom: '14px', letterSpacing: '-0.5px', lineHeight: 1.2 }}>
            {study?.name || 'Case Study Detail'}
          </h1>
          <Breadcrumbs paths={breadcrumbs} />
        </div>
      </section>

      <div className="container" style={{ marginTop: '40px', paddingBottom: '80px' }}>
        
        {/* Navigation back link */}
        <Link 
          to="/case-studies" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            color: '#0284c7', 
            fontWeight: 700, 
            fontSize: '14.5px', 
            marginBottom: '28px',
            textDecoration: 'none'
          }}
        >
          <ArrowLeft size={16} /> Back to All Case Studies
        </Link>

        {/* Case Study Header Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ 
            backgroundColor: 'var(--bg-secondary)', 
            border: '1px solid var(--border-color)', 
            borderRadius: '24px', 
            overflow: 'hidden',
            marginBottom: '40px',
            boxShadow: '0 15px 40px rgba(0,0,0,0.18)'
          }}
        >
          {/* Universal Photographic Hero Visual Banner */}
          {(() => {
            let heroImg = poddarBrioHero;
            let badgeText = '★ Featured Educational Success Story';
            let badgeBg = '#2563eb';

            if (study?.slug === 'poddar-brio-school' || study?.id === '5') {
              heroImg = poddarBrioHero;
              badgeText = '★ Featured CBSE School Success Story';
              badgeBg = '#2563eb';
            } else if (study?.slug === 'dr-pillai-global-academy-panvel' || study?.id === '7') {
              heroImg = 'https://host2unlimited.com/wp-content/uploads/2025/10/Festival-wish-post-for-school-2-scaled.jpg';
              badgeText = '★ Featured International IB & Cambridge School Success Story';
              badgeBg = '#7c3aed';
            } else if (study?.category === 'Preschool') {
              heroImg = 'https://host2unlimited.com/wp-content/uploads/2025/10/Social-media-presence-of-education-brand.jpg';
              badgeText = '★ Featured Early Childhood & Preschool Success Story';
              badgeBg = '#ec4899';
            } else if (study?.category === 'Higher Education' || study?.category === 'Engineering') {
              heroImg = 'https://host2unlimited.com/wp-content/uploads/2025/10/armite-photo-01.jpeg';
              badgeText = '★ Featured Higher Education & Engineering Success Story';
              badgeBg = '#059669';
            } else if (study?.category === 'Coaching') {
              heroImg = 'https://host2unlimited.com/wp-content/uploads/2025/10/Social-media-education-brand-1.jpg';
              badgeText = '★ Featured Coaching & Commerce Success Story';
              badgeBg = '#2563eb';
            } else {
              heroImg = 'https://host2unlimited.com/wp-content/uploads/2025/10/Wish-post-for-educational-institute-scaled.jpg';
              badgeText = '★ Featured CBSE & K-12 Digital Branding Story';
              badgeBg = '#0284c7';
            }

            return (
              <div style={{ position: 'relative', width: '100%', height: '260px', overflow: 'hidden' }}>
                <img 
                  src={heroImg} 
                  alt={study?.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} 
                  onError={(e) => { e.target.src = schoolBuildingHero; }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(11, 15, 25, 0.95) 0%, rgba(11, 15, 25, 0.35) 60%, transparent 100%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '28px 36px'
                }}>
                  <div>
                    <span className="badge" style={{ fontSize: '12px', fontWeight: 800, backgroundColor: badgeBg, color: '#fff', padding: '6px 18px', borderRadius: '20px', letterSpacing: '0.5px' }}>
                      {badgeText}
                    </span>
                    <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 900, color: '#ffffff', margin: '8px 0 0 0', textAlign: 'left' }}>
                      {study?.name} — {study?.tagline}
                    </h2>
                  </div>
                </div>
              </div>
            );
          })()}

          <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Callout Header Box (Preschool Style) */}
            <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.08)', borderLeft: '4px solid #3b82f6', borderRadius: '14px', padding: '20px 24px', textAlign: 'left' }}>
              <span style={{ color: '#3b82f6', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px', display: 'block', marginBottom: '4px' }}>
                {study?.category} • {study?.location}
              </span>
              <h1 style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontWeight: 900, color: 'var(--text-primary)', margin: '0 0 6px 0', lineHeight: 1.25, textAlign: 'left' }}>
                {study?.tagline}
              </h1>
              {study?.subHeadline && (
                <p style={{ fontSize: '15px', lineHeight: 1.65, color: 'var(--text-secondary)', margin: 0, fontWeight: 500, textAlign: 'left' }}>
                  {study.subHeadline}
                </p>
              )}
            </div>

            {/* Key Metric Badges Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', paddingTop: '10px' }}>
              {(study?.metrics || []).map((m, idx) => {
                const badgeColors = [
                  { bg: 'rgba(56, 189, 248, 0.08)', border: 'rgba(56, 189, 248, 0.25)', text: '#38bdf8' },
                  { bg: 'rgba(52, 211, 153, 0.08)', border: 'rgba(52, 211, 153, 0.25)', text: '#34d399' },
                  { bg: 'rgba(192, 132, 252, 0.08)', border: 'rgba(192, 132, 252, 0.25)', text: '#c084fc' },
                  { bg: 'rgba(250, 204, 21, 0.08)', border: 'rgba(250, 204, 21, 0.25)', text: '#facc15' }
                ];
                const theme = badgeColors[idx % badgeColors.length];

                return (
                  <motion.div 
                    key={idx} 
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    style={{ 
                      backgroundColor: theme.bg, 
                      borderRadius: '20px', 
                      padding: '22px 24px', 
                      textAlign: 'center', 
                      border: `1px solid ${theme.border}`,
                      boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
                    }}
                  >
                    <span style={{ fontSize: '38px', fontWeight: 900, color: theme.text, display: 'block', letterSpacing: '-1px' }}>{m.value}</span>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{m.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Full-Width Case Details Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '36px', width: '100%' }}>
          
          {/* Institute Overview & Goal */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '26px' }}>
            <motion.div whileHover={{ y: -4 }} className="card-glass" style={{ padding: '32px', textAlign: 'left', borderRadius: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', backgroundColor: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Building2 size={22} color="#38bdf8" />
                </div>
                <h3 style={{ fontSize: '21px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left' }}>
                  Institute Overview
                </h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.75, margin: 0, textAlign: 'left' }}>
                {study.description}
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} className="card-glass" style={{ padding: '32px', textAlign: 'left', borderRadius: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', backgroundColor: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Target size={22} color="#38bdf8" />
                </div>
                <h3 style={{ fontSize: '21px', fontWeight: 800, color: '#38bdf8', margin: 0, textAlign: 'left' }}>
                  Strategic Goal & Objective
                </h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.75, margin: 0, textAlign: 'left' }}>
                {study.goal || `Accelerate student admissions, maximize local search dominance, and build strong brand trust among parents across ${study.location}.`}
              </p>
            </motion.div>
          </div>

          {/* The Challenge & Solution */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '26px' }}>
            <motion.div whileHover={{ y: -4 }} className="card-glass" style={{ padding: '32px', textAlign: 'left', borderRadius: '24px', borderLeft: '4px solid #ef4444' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', backgroundColor: 'rgba(239, 68, 68, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Target size={22} color="#ef4444" />
                </div>
                <h3 style={{ fontSize: '21px', fontWeight: 800, color: '#f87171', margin: 0, textAlign: 'left' }}>
                  The Challenge
                </h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.75, margin: 0, textAlign: 'left' }}>
                {study.challenge}
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} className="card-glass" style={{ padding: '32px', textAlign: 'left', borderRadius: '24px', borderLeft: '4px solid #10b981' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', backgroundColor: 'rgba(52, 211, 153, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Shield size={22} color="#10b981" />
                </div>
                <h3 style={{ fontSize: '21px', fontWeight: 800, color: '#34d399', margin: 0, textAlign: 'left' }}>
                  Strategy & Execution by Host2Unlimited
                </h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.75, margin: 0, textAlign: 'left' }}>
                {study.solution}
              </p>
            </motion.div>
          </div>

          {/* Universal Middle Visual Spotlight Showcase Banner */}
          {(() => {
            let spotlightImg = schoolBuildingHero;
            let spotlightBadge = 'Admission Growth Engine';
            let spotlightTitle = `Consistent Inquiry Growth for ${study.name}`;
            let spotlightDesc = `By pairing localized SEO and targeted Meta ads with continuous lead nurturing and authentic campus storytelling, HOST2UNLIMITED established ${study.name} as a top choice in ${study.location}.`;

            if (study?.slug === 'dr-pillai-global-academy-panvel' || study?.id === '7') {
              spotlightImg = 'https://host2unlimited.com/wp-content/uploads/2025/10/armite-photo-01.jpeg';
              spotlightBadge = '360° International Education Campaign';
              spotlightTitle = '31% Increase in Qualified IB & Cambridge Admission Inquiries';
              spotlightDesc = 'By combining high-converting Meta and Google Ad placements with intuitive web UX, localized SEO, and campus event reels, HOST2UNLIMITED amplified DPGA Panvel’s brand reputation across Navi Mumbai.';
            } else if (study?.slug === 'poddar-brio-school' || study?.id === '5') {
              spotlightImg = schoolBuildingHero;
              spotlightBadge = 'Admission Growth Engine';
              spotlightTitle = 'Consistent 25-30% Inquiry-to-Application Conversion Rate';
              spotlightDesc = 'By pairing localized SEO and targeted Meta ads with continuous lead nurturing and authentic campus Reels storytelling, HOST2UNLIMITED established Poddar BRIO School as a premier educational choice in Badlapur.';
            } else if (study?.category === 'Higher Education' || study?.category === 'Engineering') {
              spotlightImg = 'https://host2unlimited.com/wp-content/uploads/2025/10/armite-photo-01.jpeg';
              spotlightBadge = 'Campus Enrolment Engine';
              spotlightTitle = 'Multi-Stream Technical & Degree Application Growth';
              spotlightDesc = `HOST2UNLIMITED executed targeted digital ad funnels and student testimonial reels, driving verified degree & diploma applications for ${study.name}.`;
            }

            return (
              <motion.div 
                whileHover={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                  gap: '32px', 
                  alignItems: 'center', 
                  backgroundColor: 'var(--bg-secondary)', 
                  border: '1px solid rgba(56, 189, 248, 0.3)', 
                  borderRadius: '28px', 
                  padding: '32px', 
                  margin: '10px 0',
                  textAlign: 'left',
                  boxShadow: '0 16px 40px rgba(0, 0, 0, 0.2)'
                }}
              >
                <div style={{ borderRadius: '20px', overflow: 'hidden', height: '240px', boxShadow: '0 10px 25px rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <img 
                    src={spotlightImg} 
                    alt={`${study.name} Showcase`} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    onError={(e) => { e.target.src = schoolBuildingHero; }}
                  />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <span className="badge" style={{ marginBottom: '14px', fontSize: '12px', fontWeight: 800, backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                    {spotlightBadge}
                  </span>
                  <h4 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '14px', textAlign: 'left', letterSpacing: '-0.3px' }}>
                    {spotlightTitle}
                  </h4>
                  <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0, textAlign: 'left' }}>
                    {spotlightDesc}
                  </p>
                </div>
              </motion.div>
            );
          })()}

          {/* Strategic Execution Pillars with Exact Website Images (Preschool Style) */}
          {(() => {
            const activePillars = (study?.pillars && study.pillars.length > 0) ? study.pillars : [
              {
                title: 'Hyper-Targeted Digital Audience Reach',
                desc: `We deployed precision-targeted Meta, Google, and display advertising campaigns focused on reaching parents and prospective students in ${study.location}. By segmenting demographics by age, interest, and academic goals, we ensured maximum ROI and qualified lead generation.`,
                images: ['https://host2unlimited.com/wp-content/uploads/2025/10/Wish-post-for-educational-institute-scaled.jpg'],
                layout: 'single-banner'
              },
              {
                title: 'High-Converting Web Architecture & Mobile UX',
                desc: 'We optimized the institutional web portal with fast loading speeds, mobile responsiveness, and intuitive navigation. Direct WhatsApp and admission inquiry touchpoints were embedded to turn casual visitors into registered applicants.',
                images: ['https://host2unlimited.com/wp-content/uploads/2025/10/Educational-institute-website-layout-preview-scaled.jpg'],
                layout: 'single-banner'
              },
              {
                title: 'Authentic Social Media Visual Storytelling',
                desc: 'Our creative team delivered custom video reels, campus event coverage, and student success highlights. This consistent visual messaging strengthened community trust and boosted social engagement across platforms.',
                images: [
                  'https://host2unlimited.com/wp-content/uploads/2025/10/Social-media-presence-of-education-brand.jpg',
                  'https://host2unlimited.com/wp-content/uploads/2025/10/Social-media-education-brand-1.jpg'
                ],
                layout: 'grid-2'
              },
              {
                title: 'Localized SEO & Google Search Dominance',
                desc: `Through dedicated local keyword optimization, Google Business Profile management, and high-authority backlinks, we secured top search engine rankings for ${study.name} in ${study.location}.`,
                images: [
                  'https://host2unlimited.com/wp-content/uploads/2025/10/img-3.webp',
                  'https://host2unlimited.com/wp-content/uploads/2025/10/img-4.webp'
                ],
                layout: 'grid-2'
              }
            ];

            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
                <div style={{ textAlign: 'left' }}>
                  <span style={{ color: '#3b82f6', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>
                    Strategic Growth Roadmap
                  </span>
                  <h3 style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-primary)', margin: 0, textAlign: 'left', letterSpacing: '-0.5px' }}>
                    {activePillars.length} Core Execution Pillars & Campaign Creatives
                  </h3>
                </div>

                {activePillars.map((pillar, pIdx) => {
                  const pillarIcons = [
                    <Sparkles key={0} size={22} color="#38bdf8" />,
                    <Share2 key={1} size={22} color="#ec4899" />,
                    <Layout key={2} size={22} color="#06b6d4" />,
                    <Globe key={3} size={22} color="#10b981" />,
                    <Palette key={4} size={22} color="#f59e0b" />,
                    <Target key={5} size={22} color="#8b5cf6" />
                  ];
                  const icon = pillarIcons[pIdx % pillarIcons.length];

                  return (
                    <motion.div 
                      key={pIdx}
                      whileHover={{ y: -6, scale: 1.01 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      className="card-glass preschool-activity-card"
                      style={{ 
                        padding: '36px', 
                        textAlign: 'left',
                        borderRadius: '28px',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'var(--bg-secondary)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '22px',
                        boxShadow: '0 14px 40px rgba(0,0,0,0.15)',
                        position: 'relative'
                      }}
                    >
                      {/* Glowing Index Badge (Preschool Style) */}
                      <span 
                        style={{ 
                          position: 'absolute', 
                          top: '28px', 
                          right: '28px', 
                          fontSize: '13px', 
                          fontWeight: 900, 
                          color: '#3b82f6', 
                          backgroundColor: 'rgba(59, 130, 246, 0.15)', 
                          padding: '6px 16px', 
                          borderRadius: '20px', 
                          border: '1px solid rgba(59, 130, 246, 0.3)' 
                        }}
                      >
                        Pillar 0{pIdx + 1}
                      </span>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '16px', backgroundColor: 'rgba(59, 130, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {icon}
                        </div>
                        <div style={{ paddingRight: '90px' }}>
                          <h4 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, textAlign: 'left' }}>
                            {pillar.title}
                          </h4>
                        </div>
                      </div>

                      <p style={{ fontSize: '15.5px', color: 'var(--text-secondary)', lineHeight: 1.75, margin: 0, textAlign: 'left' }}>
                        {pillar.desc}
                      </p>

                      {/* Render Exact Website Images */}
                      {pillar.images && pillar.images.length > 0 && (
                        <div style={{ marginTop: '12px' }}>
                          {pillar.layout === 'single-banner' && (
                            <motion.div 
                              whileHover={{ scale: 1.015 }}
                              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                              style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: '0 12px 35px rgba(0,0,0,0.2)' }}
                            >
                              <img 
                                src={pillar.images[0]} 
                                alt={pillar.title}
                                style={{ width: '100%', height: 'auto', maxHeight: '460px', objectFit: 'cover', display: 'block' }}
                                onError={(e) => { e.target.style.display = 'none'; }}
                              />
                            </motion.div>
                          )}

                          {pillar.layout === 'grid-2' && (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                              {pillar.images.map((imgUrl, imgIdx) => (
                                <motion.div 
                                  key={imgIdx} 
                                  whileHover={{ scale: 1.02 }}
                                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                  style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: '0 10px 30px rgba(0,0,0,0.18)' }}
                                >
                                  <img 
                                    src={imgUrl} 
                                    alt={`${pillar.title} visual ${imgIdx + 1}`}
                                    style={{ width: '100%', height: '100%', maxHeight: '360px', objectFit: 'cover', display: 'block' }}
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                  />
                                </motion.div>
                              ))}
                            </div>
                          )}

                          {pillar.layout === 'grid-3' && (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                              {pillar.images.map((imgUrl, imgIdx) => (
                                <motion.div 
                                  key={imgIdx} 
                                  whileHover={{ scale: 1.025 }}
                                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                  style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: '0 10px 30px rgba(0,0,0,0.18)' }}
                                >
                                  <img 
                                    src={imgUrl} 
                                    alt={`Admission Creative ${imgIdx + 1}`}
                                    style={{ width: '100%', height: 'auto', objectFit: 'cover', display: 'block' }}
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                  />
                                </motion.div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            );
          })()}

          {/* Key Delivered Results */}
          <motion.div whileHover={{ y: -4 }} className="card-glass" style={{ padding: '36px', textAlign: 'left', borderRadius: '28px', borderLeft: '4px solid #10b981' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '22px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '14px', textAlign: 'left' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '14px', backgroundColor: 'rgba(52, 211, 153, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TrendingUp size={24} color="#34d399" />
              </div>
              Delivered Growth & Results
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '18px' }}>
              {study.results.map((res, rIdx) => (
                <div key={rIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', backgroundColor: 'rgba(52, 211, 153, 0.08)', padding: '18px 20px', borderRadius: '18px', border: '1px solid rgba(52, 211, 153, 0.25)' }}>
                  <div style={{ backgroundColor: '#10b98125', borderRadius: '50%', padding: '6px', marginTop: '2px', flexShrink: 0 }}>
                    <CheckCircle2 size={20} color="#34d399" />
                  </div>
                  <span style={{ fontSize: '15px', color: 'var(--text-primary)', lineHeight: 1.6, fontWeight: 600, textAlign: 'left' }}>
                    {res}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Full-Width Bottom Contact CTA Section */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              border: '1px solid rgba(59, 130, 246, 0.35)', 
              borderRadius: '28px', 
              padding: '48px 40px',
              textAlign: 'center',
              marginTop: '24px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <span className="badge" style={{ marginBottom: '14px', fontSize: '12px', fontWeight: 800, backgroundColor: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.4)', padding: '6px 18px', borderRadius: '20px' }}>
              Accelerate Your Admission Funnel
            </span>
            <h3 style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '14px', letterSpacing: '-0.5px' }}>
              Want Similar Admission Results for Your Institute?
            </h3>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '680px', marginBottom: '32px' }}>
              Partner with HOST2UNLIMITED for a customized 360° digital marketing roadmap, lead nurturing CRM, and targeted admission campaigns.
            </p>
            <Link 
              to="/contact" 
              className="btn btn-primary" 
              style={{ padding: '18px 40px', fontSize: '16.5px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '12px', borderRadius: '30px', boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)' }}
            >
              Get Your Custom Admission Strategy <Send size={20} />
            </Link>
          </motion.div>

        </div>

      </div>
    </div>
  );
};

export default CaseStudyDetail;
