import express from 'express';
import { getPool } from '../db.js';
import { cacheInvalidate } from '../cache.js';

const router = express.Router();

// Fallback seed dictionary for universal pages
const DEFAULT_PAGE_CONTENTS = {
  solutions: [
    {
      icon_name: 'Building2',
      title: 'Enterprise Digitalization',
      subtitle: 'For Large Companies & Organizations',
      desc: 'Scale legacy architectures into high-performance web systems. We construct customized integrations to automate operational pipelines and secure data stores.',
      bulletTitle: 'Key Focus Areas:',
      bullets: ['Legacy Systems Migration & Modernization', 'Custom ERP & CRM software engineering', 'Military-grade database encryption', 'Automated reporting dashboards', 'RESTful API developer environments']
    },
    {
      icon_name: 'Rocket',
      title: 'Startup Scale Accelerator',
      subtitle: 'For Early-stage & Venture Backed Teams',
      desc: 'Build, deploy, and validate your MVP platforms rapidly. We deploy lightweight, high-performance web applications using robust React and secure databases.',
      bulletTitle: 'Key Focus Areas:',
      bullets: ['MVP scoping and modular designs', 'High-conversion SaaS landing pages', 'Continuous integration (CI/CD) pipelines', 'Scalable hosting deployments', 'Product analytics & heatmaps tracking']
    },
    {
      icon_name: 'ShoppingBag',
      title: 'E-Commerce Infrastructure',
      subtitle: 'For Retailers & Digital Brands',
      desc: 'Boost conversion rates, eliminate payment friction, and sync product inventories across channels. We build secure online stores handling high peak volumes.',
      bulletTitle: 'Key Focus Areas:',
      bullets: ['Optimized checkout page funnels', 'Multi-channel inventory management', 'Localized payment API modules', 'Personalized buyer dashboards', 'Automated receipt and email tracking']
    },
    {
      icon_name: 'GraduationCap',
      title: 'Public Sector & Academics',
      subtitle: 'For Schools, Colleges, and Organizations',
      desc: 'Deploy secure portal portals supporting high concurrent users. We align systems with WCAG accessibility guidelines and secure student databases.',
      bulletTitle: 'Key Focus Areas:',
      bullets: ['WCAG Accessibility compliant layouts', 'Student management systems (SMS)', 'Secure login & roles databases', 'Interactive resource centers', 'Server load optimization for exam events']
    }
  ],
  portfolio: [
    {
      id: 1,
      title: 'Apex Corporate Hub',
      client: 'Apex Global Enterprises',
      category: 'Corporate',
      tech: ['React', 'Next.js', 'Framer Motion', 'Vanilla CSS'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=500&h=320',
      desc: 'A premium, high-speed corporate portal optimized for global clients with real-time analytics.'
    },
    {
      id: 2,
      title: 'RetailPro E-Marketplace',
      client: 'RetailPro Logistics',
      category: 'E-Commerce',
      tech: ['PHP', 'Laravel', 'MySQL', 'Stripe API'],
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=500&h=320',
      desc: 'An enterprise ecommerce ecosystem supporting multiple vendors, stripe payments, and live tracking.'
    },
    {
      id: 3,
      title: 'MedVitals Cloud System',
      client: 'HealthLine Diagnostics',
      category: 'Software',
      tech: ['Node.js', 'Express.js', 'MongoDB', 'Docker'],
      image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=500&h=320',
      desc: 'Custom software suite handling diagnostic records, patient booking automation, and secure PDF export.'
    },
    {
      id: 4,
      title: 'State Portal Directory',
      client: 'Municipal Technology Board',
      category: 'Government',
      tech: ['TypeScript', 'React.js', 'PostgreSQL', 'AWS'],
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=500&h=320',
      desc: 'Highly accessible public directory compliance with WCAG level AA, serving millions of active citizens.'
    }
  ],
  case_studies: [
    { id: 1, name: 'PODDAR BRIO SCHOOL', title: 'PODDAR BRIO SCHOOL', category: 'Education', link: '/educational-institutes/international', description: 'PODDAR BRIO International School is a leading CBSE educational institution in Badlapur that provides schooling from kindergarten to higher secondary levels. The school emphasizes academic excellence blended with global teaching standards.' },
    { id: 2, name: 'DR. PILLAI GLOBAL ACADEMY PANVEL', title: 'DR. PILLAI GLOBAL ACADEMY PANVEL', category: 'Education', link: '/educational-institutes/international', description: 'The Dr. Pillai Global Academy Panvel is a well-planned initiative from the Mahatma Education Society, a trust committed to provide meaningful education with tangible results.' },
    { id: 3, name: 'ROYAL INTERNATIONAL CBSE SCHOOL', title: 'ROYAL INTERNATIONAL CBSE SCHOOL', category: 'Education', link: '/educational-institutes/international', description: 'At Royal International School, we believe in providing excellent learning with the best infrastructure and academic performance. Experience quality facilities and a superior study environment.' },
    { id: 4, name: 'ARMIET ENGINEERING & MGMT COLLEGE', title: 'ARMIET ENGINEERING & MGMT COLLEGE', category: 'Higher Education', link: '/educational-institutes/engineering', description: 'ARMIET (Alamuri Ratnamala Institute of Engineering and Technology) is a reputed engineering and management institute in Asangaon offering diploma, degree, and postgraduate programs.' },
    { id: 5, name: 'GAUTAM SINGHANIA GLOBAL SCHOOL DOMBIVALI', title: 'GAUTAM SINGHANIA GLOBAL SCHOOL DOMBIVALI', category: 'Education', link: '/educational-institutes/international', description: 'Innovate & Thrive – A New Era of Education, transforming learning. Gautam Singhania Global School is a dynamic and inclusive learning community with a global perspective.' },
    { id: 6, name: 'PODDAR BRIO KIDS', title: 'PODDAR BRIO KIDS', category: 'Preschool', link: '/educational-institutes/preschools', description: 'Poddar Brio Kids is a leading preschool chain offering a nurturing environment focused on early childhood development.' },
    { id: 7, name: 'DG INTERNATIONAL CBSE SCHOOL', title: 'DG INTERNATIONAL CBSE SCHOOL', category: 'Education', link: '/educational-institutes/international', description: 'DG International CBSE School is a leading educational institution in Thane that provides schooling from kindergarten to higher secondary levels.' },
    { id: 8, name: 'SHIVAJIRAO S. JONDHLE COLLEGE OF ENGINEERING & TECHNOLOGY', title: 'SHIVAJIRAO S. JONDHLE COLLEGE OF ENGINEERING & TECHNOLOGY', category: 'Higher Education', link: '/educational-institutes/engineering', description: 'Shivajirao S. Jondhle College of Engineering & Technology is a leading institution offering diploma, degree, and postgraduate programs in engineering and technology.' },
    { id: 9, name: 'PILLAI INSTITUTE PANVEL', title: 'PILLAI INSTITUTE PANVEL', category: 'Higher Education', link: '/educational-institutes/universities', description: 'At PIL, we facilitate immersive study abroad experiences, allowing you to fully embrace a new language and culture.' },
    { id: 10, name: 'UUDAAN MONTESSORI', title: 'UUDAAN MONTESSORI', category: 'Preschool', link: '/educational-institutes/preschools', description: 'Uudaan Montessori Preschool and Daycare, is headquartered at Thane, maintaining a high-quality learning atmosphere for Young-Minds.' },
    { id: 11, name: 'DR SHIVAJIRAO S JONDHLE INTERNATIONAL SCHOOL', title: 'DR SHIVAJIRAO S JONDHLE INTERNATIONAL SCHOOL', category: 'Education', link: '/educational-institutes/international', description: 'Dr. Shivajirao S. Jondhle International School is a reputed CBSE educational institution committed to delivering quality learning through modern teaching methodologies.' },
    { id: 12, name: 'DPGA GORAI', title: 'DPGA GORAI', category: 'Education', link: '/educational-institutes/international', description: 'The DPGA Borivali is a well-planned initiative from the Mahatma Education Society, a trust committed to provide meaningful education with tangible results.' },
    { id: 13, name: 'ARDENT TUTORIALS', title: 'ARDENT TUTORIALS', category: 'Coaching', link: '/educational-institutes/coaching', description: 'Premier Commerce Tutorials in Thane. Certified Online Coaching for 11th & 12th Commerce, CA & CS Foundation.' },
    { id: 14, name: 'ROYAL JUNIOR & DEGREE COLLEGE', title: 'ROYAL JUNIOR & DEGREE COLLEGE', category: 'Higher Education', link: '/educational-institutes/colleges', description: 'Royal Junior and Degree College, Dombivli, is a renowned higher education institution offering undergraduate and postgraduate programs in arts, science, and commerce.' },
    { id: 15, name: 'GAUTAM SINGHANIA GLOBAL SCHOOL THANE', title: 'GAUTAM SINGHANIA GLOBAL SCHOOL THANE', category: 'Education', link: '/educational-institutes/international', description: 'Innovate & Thrive – A New Era of Education, transforming learning. Gautam Singhania Global School is a dynamic and inclusive learning community.' },
    { id: 16, name: 'SWAMI VIVEKANAND EDUCATION SOCIETY', title: 'SWAMI VIVEKANAND EDUCATION SOCIETY', category: 'Education', link: '/educational-institutes/primary-secondary', description: 'Swami Vivekanand Education Society is a reputed educational group offering comprehensive learning from school to higher education.' },
    { id: 17, name: 'DGET TRUST BED COLLEGE', title: 'DGET TRUST BED COLLEGE', category: 'Higher Education', link: '/educational-institutes/colleges', description: 'DGET Trust BEd College is an educational hub delivering quality education from KG to PG in Thane.' },
    { id: 18, name: 'PODDAR BRIO COLLEGE OF LAW', title: 'PODDAR BRIO COLLEGE OF LAW', category: 'Higher Education', link: '/educational-institutes/universities', description: 'The college website features detailed information about 3-year LL.B and 5-year B.A. LL.B programs, admission process, and infrastructure.' },
    { id: 19, name: 'DNYAN GANGA COLLEGE OF PHARMACY', title: 'DNYAN GANGA COLLEGE OF PHARMACY', category: 'Higher Education', link: '/educational-institutes/universities', description: 'The website provides complete academic details including D.Pharm and B.Pharm programs, admission guidelines, faculty and committees info, and syllabus downloads.' },
    { id: 20, name: 'NAVODAYA ENGLISH HIGH SCHOOL & JUNIOR COLLEGE', title: 'NAVODAYA ENGLISH HIGH SCHOOL & JUNIOR COLLEGE', category: 'Education', link: '/educational-institutes/primary-secondary', description: 'Well-designed education system is a blessing of Indian culture. Navodaya Kannada Seva Sangha move on with total commitment.' },
    { id: 21, name: 'HOLY CROSS ENGLISH MEDIUM SCHOOL', title: 'HOLY CROSS ENGLISH MEDIUM SCHOOL', category: 'Education', link: '/educational-institutes/primary-secondary', description: 'Holy Cross English Medium School, Dombivili, Thane: An English-medium co-educational school offering classes from pre-primary through higher levels.' },
    { id: 22, name: 'THE LEARNING CURVE INDIA', title: 'THE LEARNING CURVE INDIA', category: 'Preschool', link: '/educational-institutes/preschools', description: 'The Learning Curve India specializes in early childhood education with a structured preschool and daycare program.' },
    { id: 23, name: 'I3R GLOBAL', title: 'I3R GLOBAL', category: 'Business', link: '/contact?service=business-solutions', description: 'i3R Global core expertise lies in identifying opportunities, emerging market trends, and leveraging cutting-edge technologies.' },
    { id: 24, name: 'AV SOLUTIONS INDIA', title: 'AV SOLUTIONS INDIA', category: 'Technology', link: '/contact?service=av-solutions', description: 'AV Solutions is a leading System Integrator for customized and personalized Audio Video, Home Automation and Control Solutions.' },
    { id: 25, name: 'RNP SYDNEY', title: 'RNP SYDNEY', category: 'Real Estate', link: '/contact?service=real-estate-solutions', description: 'RNP Sydney is a real estate and property development company in Australia offering professional services in property buying and selling.' },
    { id: 26, name: 'SMILES ROYALE', title: 'SMILES ROYALE', category: 'Healthcare', link: '/contact?service=healthcare-branding', description: 'We at Smiles Royale are committed to provide our patients with the most innovative and pleasant experience possible.' },
    { id: 27, name: "V'SIGN", title: "V'SIGN", category: 'E-Commerce', link: '/contact?service=ecommerce-solutions', description: 'The official website of VSign Pen serves as an e-commerce platform showcasing premium fountain pens, ball pens, and roller pens.' },
    { id: 28, name: 'SKYTECH INDIA', title: 'SKYTECH INDIA', category: 'Technology', link: '/contact?service=tech-branding', description: 'Established in 1993, Skytech Systems (I) Pvt Ltd stands as a pioneering force in the field of analytical instrument distribution in India.' },
    { id: 29, name: 'LOTUS LEAF ENTERTAINMENT', title: 'LOTUS LEAF ENTERTAINMENT', category: 'Entertainment', link: '/contact?service=event-branding', description: 'Lotus Leaf Entertainment is a one stop solution for all entertainment events and high-end event branding.' },
    { id: 30, name: 'GOEL AND SONS', title: 'GOEL AND SONS', category: 'Transport', link: '/contact?service=logistics-branding', description: 'Bus services started in April 2006 bringing 18 brilliant years of transportation experience for school kids.' },
    { id: 31, name: 'VERTICES PARTNERS', title: 'VERTICES PARTNERS', category: 'Legal', link: '/contact?service=legal-branding', description: 'Vertices Partners is a full-service law firm providing legal solutions in Corporate & Commercial Law, M&A, Private Equity, and Dispute Resolution.' }
  ],
  pricing: [
    {
      name: 'Starter Website Package',
      price: '₹15,000 – ₹25,000',
      desc: 'Perfect for small businesses and startups seeking a professional landing page or online brochure.',
      features: 'Up to 5 Pages development, Fully Mobile Responsive, Secure Contact Form, Basic SEO & Metadata config, SSL Certificate Setup, 1 Month Support',
      popular: false
    },
    {
      name: 'Business Website Package',
      price: '₹35,000 – ₹60,000',
      desc: 'Designed for scaling companies needing custom layout mockups, blogs, and marketing connections.',
      features: 'Up to 15 Pages development, Custom UI/UX & Animations, Blog Engine Integration, Lead Management Dashboard, Advanced Technical SEO, Google Analytics setup, 3 Months Dedicated Support',
      popular: true
    },
    {
      name: 'Enterprise / Custom Software',
      price: 'Custom Quote',
      desc: 'Tailored for high-scale organizations needing custom ERP portals, SaaS platforms, or mobile apps.',
      features: 'Unlimited Pages / Custom Modules, Dedicated Cloud Architecture, Multi-role RBAC security, API & Webhooks integration, SLA 99.9% Uptime Guarantee, Dedicated Project Manager, 24/7 Priority Support',
      popular: false
    }
  ],
  careers: [
    {
      title: 'Senior Full Stack Engineer',
      department: 'Engineering',
      type: 'Full-time',
      location: 'Thane / Remote',
      desc: 'Build scalable web applications, API microservices, and high-performance user interfaces using React, Node.js, and cloud databases.'
    },
    {
      title: 'Digital Marketing & SEO Manager',
      department: 'Marketing',
      type: 'Full-time',
      location: 'Thane, Mumbai',
      desc: 'Lead strategic organic search optimization campaigns, lead generation funnels, and performance marketing for educational & enterprise clients.'
    },
    {
      title: 'UI/UX Visual Designer',
      department: 'Design',
      type: 'Full-time',
      location: 'Remote',
      desc: 'Craft modern responsive user interfaces, brand design systems, dynamic web animations, and interactive prototypes.'
    }
  ],
  about: {
    values: [
      { icon_name: 'ShieldCheck', title: 'Absolute Data Integrity', desc: 'We prioritize high-encryption security standards across every database query and customer portal.' },
      { icon_name: 'Zap', title: 'Performance-First Engineering', desc: 'Every line of code is optimized for microsecond load speeds and lightweight execution.' },
      { icon_name: 'HeartHandshake', title: 'Client-Centric Transparency', desc: 'Direct technical communication and transparent project roadmaps from initial scoping to live deployment.' }
    ],
    stats: [
      { number: '16+', label: 'Years Experience' },
      { number: '35+', label: 'Enterprise Clients' },
      { number: '300+', label: 'Campaigns Delivered' },
      { number: '99.9%', label: 'Uptime SLA' }
    ]
  },
  testimonials: [
    {
      id: 1,
      name: 'Rajesh Sharma',
      designation: 'Director',
      company: 'Poddar Brio International School',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150',
      rating: 5,
      review: 'Host2Unlimited transformed our digital presence and online admissions system completely. Their technical team is extremely responsive and proactive.'
    },
    {
      id: 2,
      name: 'Dr. K. M. Vasudevan',
      designation: 'Trustee',
      company: 'Dr. Pillai Global Academy',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150',
      rating: 5,
      review: 'Outstanding execution on our web portal development and admission lead pipelines. The CMS gives us total control over our website updates.'
    }
  ],
  banner: {
    about: { title: 'About Host2Unlimited', subtitle: 'Our Background', desc: 'We are a dedicated team of software developers, database managers, systems architects, and digital marketing consultants who help brands scale their systems.' },
    services: { title: 'Our Services & Solutions', subtitle: 'Capabilities', desc: 'We offer robust custom website design, cloud database configuration, Google organic search SEO sprints, and scalable VPS architectures.' },
    careers: { title: 'Careers at Host2Unlimited', subtitle: 'Join Our Team', desc: 'Explore opportunities to build scalable portals, launch digital marketing campaigns, and craft visual graphics with our collaborative engineering desk.' },
    portfolio: { title: 'Selected Projects & Portfolios', subtitle: 'Our Work', desc: 'Explore our track record of custom e-commerce engines, public sector portals, compliance directories, and interactive software suites.' },
    case_studies: { title: 'Success Metrics & Case Studies', subtitle: 'Client Outcomes', desc: 'Real-world blueprints detailing how our systems engineers scale database transactions, improve page loads, and cut cloud hosting overheads.' }
  },
  website_settings: {
    company_name: 'Host2Unlimited Technologies',
    whatsapp_number: '+91 81046 12974',
    contact_email: 'info@host2unlimited.com',
    contact_phone: '+91 81046 12974',
    office_address: 'Thane West, Mumbai Metropolitan Region, Maharashtra 400601',
    footer_text: '© 2026 Host2Unlimited Technologies. All Rights Reserved.'
  }
};

// Helper for cross-database safe upsert (MySQL & PostgreSQL compatible)
const savePageToDB = async (db, id, stringified) => {
  const [existing] = await db.query('SELECT id FROM cms_pages WHERE id = ?', [id]);
  if (existing && existing.length > 0) {
    return await db.query('UPDATE cms_pages SET content_data = ? WHERE id = ?', [stringified, id]);
  } else {
    return await db.query('INSERT INTO cms_pages (id, content_data) VALUES (?, ?)', [id, stringified]);
  }
};

// GET page content
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const db = getPool();
    const [rows] = await db.query('SELECT * FROM cms_pages WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      if (DEFAULT_PAGE_CONTENTS[id]) {
        const defaultData = DEFAULT_PAGE_CONTENTS[id];
        const stringified = JSON.stringify(defaultData);
        
        // Auto-seed into DB if missing
        try {
          await savePageToDB(db, id, stringified);
        } catch (e) {
          console.warn(`Could not auto-seed ${id}:`, e.message);
        }
        return res.json(defaultData);
      }
      return res.status(404).json({ error: `Page content block for '${id}' not found.` });
    }
    
    // Parse the JSON data before sending
    const pageData = JSON.parse(rows[0].content_data);
    res.json(pageData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST update page content
router.post('/:id', async (req, res) => {
  const { id } = req.params;
  const contentData = req.body;

  if (!contentData) {
    return res.status(400).json({ error: 'Page content payload is required.' });
  }

  try {
    const db = getPool();
    const stringified = JSON.stringify(contentData);

    await savePageToDB(db, id, stringified);

    cacheInvalidate('/api/pages');

    if (global.broadcastSSE) {
      global.broadcastSSE({ type: 'page_update', page: id });
    }

    res.json({
      message: `Universal page content for '${id}' saved successfully.`,
      updated: true
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Alias POST to PUT also for convenience
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const contentData = req.body;

  if (!contentData) {
    return res.status(400).json({ error: 'Page content payload is required.' });
  }

  try {
    const db = getPool();
    const stringified = JSON.stringify(contentData);

    await savePageToDB(db, id, stringified);

    cacheInvalidate('/api/pages');

    if (global.broadcastSSE) {
      global.broadcastSSE({ type: 'page_update', page: id });
    }

    res.json({
      message: `Universal page content for '${id}' updated successfully.`,
      updated: true
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
