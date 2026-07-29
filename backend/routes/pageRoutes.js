import express from 'express';
import { getPool } from '../db.js';

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
    {
      title: 'Speed & Conversion Optimization',
      client: 'Apex Corporate Hub',
      category: 'Corporate',
      challenge: 'Apex Global was losing mobile users due to slow load speeds (exceeding 7.5 seconds) and an outdated navigation menu.',
      solution: 'We rebuilt their portal from scratch using Vite React and modular Vanilla CSS, bringing load speeds under 1.8 seconds.',
      results: 'Organic leads jumped within 60 days. Server operating costs dropped due to lightweight bundles and efficient client-side rendering.'
    },
    {
      title: 'High-Scale E-Commerce Pipeline',
      client: 'RetailPro E-Marketplace',
      category: 'E-Commerce',
      challenge: 'RetailPro experienced system crashes during peak sale campaigns.',
      solution: 'We engineered a highly robust Laravel API database cluster on secure AWS virtual private instances.',
      results: 'Uptime reached 99.98% during high-traffic holidays. Transaction processing times reduced.'
    }
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
