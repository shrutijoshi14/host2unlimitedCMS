import mysql from 'mysql2/promise';
import pg from 'pg';

let pool;
let dbType = 'mysql';
let pgPool;
let mysqlPool;

async function dbQuery(sql, params = []) {
  if (dbType === 'postgres') {
    let pgSql = sql;
    let index = 1;
    // Replace ? with $1, $2, $3...
    pgSql = pgSql.replace(/\?/g, () => `$${index++}`);
    
    // Convert INSERT IGNORE for Postgres compatibility
    if (pgSql.toUpperCase().includes('INSERT IGNORE INTO CMS_MODULES')) {
      pgSql = pgSql.replace(/INSERT IGNORE INTO cms_modules/gi, 'INSERT INTO cms_modules') + ' ON CONFLICT (id) DO NOTHING';
    } else if (pgSql.toUpperCase().includes('INSERT IGNORE INTO CMS_PAGES')) {
      pgSql = pgSql.replace(/INSERT IGNORE INTO cms_pages/gi, 'INSERT INTO cms_pages') + ' ON CONFLICT (id) DO NOTHING';
    } else if (pgSql.toUpperCase().includes('ON DUPLICATE KEY UPDATE')) {
      pgSql = pgSql.replace(/ON DUPLICATE KEY UPDATE\s+(\w+)\s*=\s*\$\d+/gi, 'ON CONFLICT (id) DO UPDATE SET $1 = EXCLUDED.$1');
    }

    const isInsert = pgSql.trim().toUpperCase().startsWith('INSERT');
    const isDelete = pgSql.trim().toUpperCase().startsWith('DELETE');
    const isUpdate = pgSql.trim().toUpperCase().startsWith('UPDATE');

    if (isInsert && !pgSql.toUpperCase().includes('RETURNING')) {
      pgSql += ' RETURNING id';
    }

    const res = await pgPool.query(pgSql, params);

    // Cast count results to numbers to match MySQL output
    if (res.rows) {
      res.rows.forEach(row => {
        if (row.count !== undefined) {
          row.count = Number(row.count);
        }
      });
    }

    if (isInsert) {
      const insertId = res.rows && res.rows[0] ? res.rows[0].id : null;
      return [{ insertId, affectedRows: res.rowCount }, res.fields];
    }

    if (isDelete || isUpdate) {
      return [{ affectedRows: res.rowCount }, res.fields];
    }

    return [res.rows, res.fields];
  } else {
    return await mysqlPool.query(sql, params);
  }
}

export async function initializeDatabase() {
  try {
    const usePostgres = process.env.FORCE_LIVE_DB === 'true' || process.env.RENDER === 'true';

    if (usePostgres) {
      dbType = 'postgres';
      const connectionString = process.env.DATABASE_URL;
      
      pgPool = new pg.Pool({
        connectionString,
        ssl: {
          rejectUnauthorized: false
        }
      });

      console.log('Connected to PostgreSQL (Supabase) database.');

      // Create tables for PostgreSQL
      await pgPool.query(`
        CREATE TABLE IF NOT EXISTS cms_modules (
          id VARCHAR(50) PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          enabled SMALLINT DEFAULT 0,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      await pgPool.query(`
        CREATE TABLE IF NOT EXISTS blogs (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          content TEXT NOT NULL,
          category VARCHAR(100) DEFAULT 'Website Development',
          tags VARCHAR(255) DEFAULT '',
          image_url VARCHAR(500) DEFAULT '',
          slug VARCHAR(255) UNIQUE NOT NULL,
          seo_title VARCHAR(255) DEFAULT '',
          meta_description TEXT,
          author VARCHAR(100) NOT NULL,
          status VARCHAR(50) DEFAULT 'Draft',
          read_time VARCHAR(50) DEFAULT '5 min read',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      await pgPool.query(`
        CREATE TABLE IF NOT EXISTS services (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          banner_image_url VARCHAR(500) DEFAULT '',
          features TEXT NOT NULL,
          faqs TEXT NOT NULL,
          slug VARCHAR(255) UNIQUE NOT NULL,
          seo_title VARCHAR(255) DEFAULT '',
          meta_description TEXT,
          icon_name VARCHAR(100) DEFAULT 'Globe',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      await pgPool.query(`
        CREATE TABLE IF NOT EXISTS admins (
          id SERIAL PRIMARY KEY,
          username VARCHAR(100) UNIQUE NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      await pgPool.query(`
        CREATE TABLE IF NOT EXISTS cms_pages (
          id VARCHAR(50) PRIMARY KEY,
          content_data TEXT NOT NULL,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

    } else {
      dbType = 'mysql';
      
      const initConnection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'Shruti@1408',
        port: parseInt(process.env.DB_PORT || '3306')
      });

      await initConnection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'host2unlimited'}\``);
      await initConnection.end();

      mysqlPool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'Shruti@1408',
        database: process.env.DB_NAME || 'host2unlimited',
        port: parseInt(process.env.DB_PORT || '3306'),
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });

      console.log('Connected to MySQL database: ' + (process.env.DB_NAME || 'host2unlimited'));

      // Create tables for MySQL
      await mysqlPool.query(`
        CREATE TABLE IF NOT EXISTS cms_modules (
          id VARCHAR(50) PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          enabled TINYINT(1) DEFAULT 0,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);

      await mysqlPool.query(`
        CREATE TABLE IF NOT EXISTS blogs (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          content TEXT NOT NULL,
          category VARCHAR(100) DEFAULT 'Website Development',
          tags VARCHAR(255) DEFAULT '',
          image_url VARCHAR(500) DEFAULT '',
          slug VARCHAR(255) UNIQUE NOT NULL,
          seo_title VARCHAR(255) DEFAULT '',
          meta_description TEXT,
          author VARCHAR(100) NOT NULL,
          status VARCHAR(50) DEFAULT 'Draft',
          read_time VARCHAR(50) DEFAULT '5 min read',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);

      await mysqlPool.query(`
        CREATE TABLE IF NOT EXISTS services (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          banner_image_url VARCHAR(500) DEFAULT '',
          features TEXT NOT NULL,
          faqs TEXT NOT NULL,
          slug VARCHAR(255) UNIQUE NOT NULL,
          seo_title VARCHAR(255) DEFAULT '',
          meta_description TEXT,
          icon_name VARCHAR(100) DEFAULT 'Globe',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);

      await mysqlPool.query(`
        CREATE TABLE IF NOT EXISTS admins (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(100) UNIQUE NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);

      await mysqlPool.query(`
        CREATE TABLE IF NOT EXISTS cms_pages (
          id VARCHAR(50) PRIMARY KEY,
          content_data LONGTEXT NOT NULL,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);
    }

    // Set the global pool variable to be our query wrapper object
    pool = {
      query: dbQuery
    };

    // 4. Seed initial modules if table is empty
    const [moduleRows] = await pool.query('SELECT COUNT(*) as count FROM cms_modules');
    if (moduleRows[0].count === 0) {
      const modules = [
        ['blog', 'Blog Management', 1],
        ['services', 'Services Management', 0],
        ['contact_leads', 'Contact Leads Log', 1],
        ['solutions', 'Solutions Management', 0],
        ['portfolio', 'Portfolio Management', 0],
        ['case_studies', 'Case Studies Management', 0],
        ['pricing', 'Pricing Management', 0],
        ['careers', 'Careers Management', 0],
        ['about', 'About Us Management', 0]
      ];

      for (const mod of modules) {
        await pool.query(
          'INSERT INTO cms_modules (id, name, enabled) VALUES (?, ?, ?)',
          mod
        );
      }
      console.log('Seeded initial CMS modules config.');
    } else {
      // Ensure the newer modules exist in case the database was already partially seeded
      const newModules = [
        ['solutions', 'Solutions Management', 0],
        ['portfolio', 'Portfolio Management', 0],
        ['case_studies', 'Case Studies Management', 0],
        ['pricing', 'Pricing Management', 0],
        ['careers', 'Careers Management', 0],
        ['about', 'About Us Management', 0]
      ];
      for (const [id, name, enabled] of newModules) {
        await pool.query(
          'INSERT IGNORE INTO cms_modules (id, name, enabled) VALUES (?, ?, ?)',
          [id, name, enabled]
        );
      }
    }

    // 5. Seed initial blogs if table is empty
    const [blogRows] = await pool.query('SELECT COUNT(*) as count FROM blogs');
    if (blogRows[0].count === 0) {
      const initialBlogs = [
        [
          'Leveraging Vite React for Rapid Website Deployments',
          '<h2>The Shift to Faster Build Cycles</h2><p>In modern web agency environments, waiting for build times represents lost revenue. Rebuilding old-school pipelines with Vite has streamlined execution...</p>',
          'Website Development',
          'vite, react, frontend',
          '/uploads/school_marketing_hero.png',
          'leveraging-vite-react-rapid-deployments',
          'Vite React Web Development Guide | Host2Unlimited',
          'Learn how Host2Unlimited integrates Vite React with custom designs to construct fast loading, secure corporate portals.',
          'Lead Architect',
          'Published',
          '4 min read'
        ],
        [
          'Optimizing Core Web Vitals to Rise Google Ranks',
          '<h2>Understanding LCP and CLS Metrics</h2><p>Getting traffic represents half the marketing battle. rise to the top of Google searches requires meeting Core Web Vitals guidelines. We optimize resource compression...</p>',
          'SEO',
          'seo, speed, google',
          '/uploads/development_process_visual.png',
          'optimizing-core-web-vitals-google-ranks',
          'Core Web Vitals SEO Speed Optimization | Host2Unlimited',
          'Improve search visibility and ranking. Read our technical guide on Core Web Vitals optimizations.',
          'SEO Specialist',
          'Published',
          '6 min read'
        ],
        [
          'Why SaaS Startups Prefer Custom ERP Systems Over WordPress',
          '<h2>The Performance Limits of Generic Templates</h2><p>Startups require lightweight, custom software to automate manual bookings. While WordPress works for landing pages, custom ERP applications handle high volumes cleanly...</p>',
          'Case Studies',
          'erp, startups, backend',
          '/uploads/school_marketing_hero.png',
          'saas-startups-prefer-custom-erp-wordpress',
          'Custom Software vs WordPress | Host2Unlimited Case Study',
          'Read why scaling venture teams choose custom React databases over slow templates.',
          'Solutions Analyst',
          'Published',
          '5 min read'
        ],
        [
          '5 Customer Acquisition Funnels That Convert 3x Better',
          '<h2>Designing User Checkout Journeys</h2><p>Designing digital marketing flows requires removing form friction. We implement localized Razorpay checkout modules and interactive cost calculators...</p>',
          'Digital Marketing',
          'marketing, conversion, funnels',
          '/uploads/development_process_visual.png',
          '5-customer-acquisition-funnels-convert-better',
          '5 Customer Acquisition Funnels for 3x Conversion Rates',
          'A case study review of landing page structure optimizations, localized landing pages, and interactive estimators.',
          'Acquisition Consultant',
          'Published',
          '5 min read'
        ]
      ];

      for (const blog of initialBlogs) {
        await pool.query(
          `INSERT INTO blogs (title, content, category, tags, image_url, slug, seo_title, meta_description, author, status, read_time) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          blog
        );
      }
      console.log('Seeded initial blog articles successfully.');
    }

    // 6. Seed initial services if table is empty
    const [serviceRows] = await pool.query('SELECT COUNT(*) as count FROM services');
    if (serviceRows[0].count === 0) {
      const initialServices = [
        [
          'Website Development',
          'Responsive, modern websites built for speed, redundant security, and high user conversion rates.',
          'https://images.unsplash.com/photo-1547658719-da2b81169b7a?auto=format&fit=crop&q=80&w=800&h=450',
          JSON.stringify(['Corporate Portals', 'SaaS Landing Pages', 'WordPress/Headless CMS Development', 'Website Redesign & Speed Optimization', 'Custom React & Vue Frameworks']),
          JSON.stringify([
            { question: 'What technologies do you use for website development?', answer: 'We primarily build using React, Vue, HTML5/CSS3, Node.js, and headless CMS frameworks like WordPress or Strapi to ensure loading speeds under 1.5 seconds.' },
            { question: 'Is search engine optimization included in website development?', answer: 'Yes! Every website we construct includes basic technical SEO setups, optimized asset sizing, meta titles, and semantic HTML schema.' },
            { question: 'Do you design custom UX layouts?', answer: 'Absolutely. We design bespoke, wireframed mockups customized for your target customer profiles before writing any production HTML/CSS.' }
          ]),
          'website-development',
          'Professional Website Development Services | Host2Unlimited',
          'Responsive, modern websites built for speed, redundant security, and high user conversion rates.',
          'Globe'
        ],
        [
          'Custom Software Development',
          'Business software solutions tailored to automate manual operations, remove pipeline errors, and improve team productivity.',
          'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800&h=450',
          JSON.stringify(['Enterprise Resource Planning (ERP)', 'Custom Customer Relationship Managers (CRM)', 'Third-Party API Integrations', 'Client Portals & Booking Platforms', 'Automated Accounting & Billing Software']),
          JSON.stringify([
            { question: 'Can you integrate with our existing tools?', answer: 'Yes. We build customized API adapters that synchronise data with tools like Stripe, Salesforce, Zoho, Google Workspace, and Quickbooks.' },
            { question: 'Do you offer post-deployment maintenance?', answer: 'Yes, we provide ongoing support agreements to monitor server security, apply system patches, and scale infrastructure as your database grows.' }
          ]),
          'custom-software-development',
          'Custom Software Development & ERP Solutions | Host2Unlimited',
          'Business software solutions tailored to automate manual operations, remove pipeline errors, and improve team productivity.',
          'Cpu'
        ],
        [
          'Cloud Hosting Solutions',
          'Highly reliable cloud hosting architectures optimized for low latency, secure database backups, and guaranteed uptime.',
          'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=800&h=450',
          JSON.stringify(['Managed Amazon Web Services (AWS)', 'Google Cloud & Azure Deployments', 'Continuous Backup & Restore Systems', 'SSL/TLS & Security Policies Setup', 'Scalable Virtual Private Servers (VPS)']),
          JSON.stringify([
            { question: 'What is the uptime guarantee for cloud configurations?', answer: 'We design hosting architecture across multi-zone database nodes to guarantee a minimum uptime service level agreement of 99.9%.' },
            { question: 'Are databases securely backed up?', answer: 'Yes, we configure daily off-site snapshot backups retained for 30 days, permitting recovery points within minutes of a network alert.' }
          ]),
          'cloud-hosting-solutions',
          'Reliable Cloud Hosting & Infrastructure Services | Host2Unlimited',
          'Highly reliable cloud hosting architectures optimized for low latency, secure database backups, and guaranteed uptime.',
          'Cloud'
        ],
        [
          'SEO Services',
          'Improve search visibility, rise to the top of Google page-rankings, and drive organic qualified traffic to your platforms.',
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=450',
          JSON.stringify(['Technical Website SEO Audits', 'Local SEO & Google Maps optimization', 'Content Strategy & Link Building', 'Keyword Rank & Analytics Reports', 'Page Speed & Core Web Vitals optimization']),
          JSON.stringify([
            { question: 'How long before we see Google search rank increases?', answer: 'Usually search indexing updates take between 3 to 6 months to display consistent keyword growth, depending on site history and competition.' },
            { question: 'Do you run competitor audits?', answer: 'Yes, every search contract begins with competitor keyword gap assessments, traffic audits, and backlink comparisons.' }
          ]),
          'seo-services',
          'SEO Services & Google Page Rankings | Host2Unlimited',
          'Improve search visibility, rise to the top of Google page-rankings, and drive organic qualified traffic to your platforms.',
          'LineChart'
        ],
        [
          'Digital Marketing',
          'Reach the right demographics through targeted campaigns that maximize advertising return-on-investment (ROI).',
          'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800&h=450',
          JSON.stringify(['Pay-Per-Click Ads (Google & Socials)', 'Social Media Management (SMM)', 'High-Converting Sales Funnels', 'Email Marketing Campaigns', 'Brand Strategy & Identity Consulting']),
          JSON.stringify([
            { question: 'Do you manage social advertising content?', answer: 'Yes, we coordinate copy-writing, design banner media, setup target audiences, and track monthly conversions across Meta, LinkedIn, and Google Ads.' },
            { question: 'What is your refund policy on ad spends?', answer: 'Ad spends are paid directly to ad platforms (Google/Meta). Our setup fees are based on performance deliverables outlined in our scope documents.' }
          ]),
          'digital-marketing',
          'Strategic Digital Marketing & Ad Campaigns | Host2Unlimited',
          'Reach the right demographics through targeted campaigns that maximize advertising return-on-investment (ROI).',
          'Megaphone'
        ],
        [
          'E-Commerce Development',
          'Scalable online stores with frictionless checkout screens, stock synchronizations, and customer administration.',
          'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800&h=450',
          JSON.stringify(['Custom WooCommerce & Shopify Stores', 'Secure Payment Gateways Integration', 'Multi-currency & Multilingual support', 'Order, Inventory & Tax Tracking Modules', 'Customer Loyalty & Discounts setups']),
          JSON.stringify([
            { question: 'Can you synchronize physical stock inventory?', answer: 'Yes. We write adapters that coordinate digital e-commerce inventory with point-of-sale machines and stock databases.' },
            { question: 'Are standard checkouts payment-secured?', answer: 'Yes, we build PCI-compliant transaction paths using secure tokens like Stripe, PayPal, and local Razorpay gateways.' }
          ]),
          'e-commerce-development',
          'E-Commerce Development & Online Store Solutions | Host2Unlimited',
          'Scalable online stores with frictionless checkout screens, stock synchronizations, and customer administration.',
          'ShoppingCart'
        ]
      ];

      for (const service of initialServices) {
        await pool.query(
          `INSERT INTO services (title, description, banner_image_url, features, faqs, slug, seo_title, meta_description, icon_name) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          service
        );
      }
      console.log('Seeded initial services successfully.');
    }

    // 7. Seed initial cms_pages if missing
    {
      const initialPages = [
        [
          'solutions',
          JSON.stringify([
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
          ])
        ],
        [
          'portfolio',
          JSON.stringify([
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
            },
            {
              id: 5,
              title: 'LearnSmart Portal LMS',
              client: 'Nesta Education Group',
              category: 'Education',
              tech: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
              image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=500&h=320',
              desc: 'Learning management system holding video catalogs, real-time quizzes, and custom billing modules.'
            },
            {
              id: 6,
              title: 'GovTech Secure Vault',
              client: 'Federal Revenue Agency',
              category: 'Government',
              tech: ['PHP', 'Laravel', 'PostgreSQL', 'Gitlab CI'],
              image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=500&h=320',
              desc: 'A secure ledger console to process financial documentation with strict authorization protocols.'
            }
          ])
        ],
        [
          'case_studies',
          JSON.stringify([
            {
              title: 'Speed & Conversion Optimization',
              client: 'Apex Corporate Hub',
              metrics: [
                { value: '40% Faster', label: 'Website Performance' },
                { value: '60% Increase', label: 'Qualified Leads' }
              ],
              challenge: 'Apex Global was losing mobile users due to slow load speeds (exceeding 7.5 seconds) and an outdated navigation menu. Their marketing funnels failed to convert traffic because of complex consultation forms.',
              solution: 'We rebuilt their portal from scratch using Vite React and modular Vanilla CSS. By implementing custom image compression, code splitting, and streamlined forms, we brought load speeds under 1.8 seconds.',
              tech: ['React.js', 'Next.js', 'Framer Motion', 'Vanilla CSS'],
              impact: 'Organic leads jumped within 60 days. Server operating costs dropped due to lightweight bundles and efficient client-side rendering.'
            },
            {
              title: 'High-Scale E-Commerce Pipeline',
              client: 'RetailPro E-Marketplace',
              metrics: [
                { value: '3x Growth', label: 'Online Visibility' },
                { value: '45% Raise', label: 'Cart Completions' }
              ],
              challenge: 'RetailPro experienced system crashes during peak sale campaigns. Multi-vendor stock synchronization delayed orders, leading to manual customer support overloads.',
              solution: 'We engineered a highly robust Laravel API database cluster on secure AWS virtual private instances. Integrated asynchronous background jobs to sync stock databases in under 3 seconds without blocking checkout paths.',
              tech: ['PHP', 'Laravel', 'MySQL', 'Stripe API', 'Docker'],
              impact: 'Uptime reached 99.98% during high-traffic holidays. Transaction processing times reduced, driving merchant registration gains.'
            },
            {
              title: 'Secure Public Sector Ledger',
              client: 'Municipal Technology Board',
              metrics: [
                { value: '100% Passed', label: 'Security Compliance' },
                { value: '80% Lower', label: 'Admin Workload' }
              ],
              challenge: 'The municipal portal was vulnerable to cross-site scripting (XSS) issues and lacked compliance with level AA accessibility guidelines, making document downloads difficult for citizens.',
              solution: 'We implemented strict content security policies and sanitizations using PostgreSQL databases. Structured structural HTML5 tables and keyboard navigation routes to pass audits.',
              tech: ['TypeScript', 'React.js', 'PostgreSQL', 'AWS Cloud'],
              impact: 'Successfully passed government evaluations. Citizens can search directories and verify tax receipts securely on mobile devices.'
            }
          ])
        ],
        [
          'pricing',
          JSON.stringify([
            {
              name: 'Starter Website Package',
              price: '₹15,000 – ₹25,000',
              desc: 'Perfect for small businesses and startups seeking a professional landing page or online brochure.',
              features: [
                'Up to 5 Pages development',
                'Fully Mobile Responsive',
                'Secure Contact Form',
                'Basic SEO & Metadata config',
                'SSL Certificate Setup',
                '1 Month Support'
              ],
              popular: false,
              cta: 'Get Started'
            },
            {
              name: 'Business Website Package',
              price: '₹35,000 – ₹60,000',
              desc: 'Designed for scaling companies needing custom layout mockups, blogs, and marketing connections.',
              features: [
                'Up to 15 Custom Pages',
                'Custom UI/UX Mockups',
                'Dynamic Blog Module',
                'Advanced SEO & Indexing',
                'Google Analytics Setup',
                '3 Months Support & Edits'
              ],
              popular: true,
              cta: 'Select Package'
            },
            {
              name: 'Enterprise Solution Package',
              price: 'Custom Pricing',
              desc: 'Tailored systems built to automate operational processes and synchronize massive databases.',
              features: [
                'Unlimited Pages & Code',
                'Custom React Admin Dashboard',
                'CRM & ERP API Integrations',
                'Multi-gateway Payment support',
                'Advanced Security Hardening',
                '1 Year Dedicated SLA Support'
              ],
              popular: false,
              cta: 'Contact Sales'
            }
          ])
        ],
        [
          'careers',
          JSON.stringify([
            {
              title: 'Graphics Designer',
              department: 'Creative Design',
              location: 'Mumbai Office / Hybrid',
              type: 'Full-Time',
              requirements: ['Expertise in Photoshop, Illustrator, and Figma', 'Strong portfolio in branding, layouts, and social media designs', 'Knowledge of modern web visual guidelines & typography']
            },
            {
              title: 'WordPress Developer',
              department: 'Engineering',
              location: 'Mumbai Office',
              type: 'Full-Time',
              requirements: ['Proficient in custom themes, Gutenberg, and ACF', 'Strong knowledge of PHP, HTML5, CSS3, and JavaScript', 'Experience in speed optimization and core web vitals tuning']
            },
            {
              title: 'Social Media Executive',
              department: 'Digital Marketing',
              location: 'Hybrid',
              type: 'Full-Time',
              requirements: ['Experience managing Facebook, Instagram, and LinkedIn accounts', 'Proven track record of driving organic content engagement', 'Skills in copy writing and content scheduling tools']
            },
            {
              title: 'Video Editor',
              department: 'Creative Production',
              location: 'Hybrid',
              type: 'Full-Time',
              requirements: ['Proficiency in Premiere Pro, After Effects, or DaVinci Resolve', 'Ability to edit fast-paced reels, corporate clips, and promo videos', 'Knowledge of sound design, color grading, and graphics overlays']
            },
            {
              title: 'Event Management Photography / Videography',
              department: 'Creative Production',
              location: 'On-Site / Project-Based',
              type: 'Contract',
              requirements: ['Professional photography and videography experience', 'Own high-end mirrorless gear and stabilization equipment', 'Experience coverage for corporate keynotes, institutional campaigns, and events']
            },
            {
              title: 'Business Development Sales',
              department: 'Sales & Partnerships',
              location: 'Mumbai Office / Field',
              type: 'Full-Time',
              requirements: ['Experience selling web services, hosting, or custom software', 'Outstanding verbal and written presentation abilities', 'Skill in pipeline CRM logging, proposal writing, and client pitching']
            }
          ])
        ],
        [
          'about',
          JSON.stringify({
            values: [
              {
                icon_name: 'ShieldCheck',
                title: 'Security & Integrity',
                desc: 'We follow rigorous coding standards and security audit checklists to keep client databases safe from vulnerabilities.'
              },
              {
                icon_name: 'Target',
                title: 'Customer-Centric Growth',
                desc: 'We map technology outputs to business outcomes, building solutions that improve speed and drive revenue.'
              },
              {
                icon_name: 'HeartHandshake',
                title: 'Reliable Transparency',
                desc: 'No hidden clauses. We provide access to live staging branches and clear Slack updates throughout the sprint cycle.'
              }
            ],
            stats: [
              { icon_name: 'Users', value: 500, suffix: '+', label: 'Clients Worldwide' },
              { icon_name: 'Award', value: 15, suffix: '+', label: 'Years Experience' },
              { icon_name: 'Trophy', value: 98, suffix: '%', label: 'Satisfaction Score' },
              { icon_name: 'Briefcase', value: 1200, suffix: '+', label: 'Successful Projects' }
            ]
          })
        ],
        [
          'testimonials',
          JSON.stringify([
            {
              name: 'Sandeep Deshmukh',
              company: 'AgriGlobal Exports',
              designation: 'Managing Director',
              photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150',
              rating: 5,
              review: 'Host2Unlimited completely overhauled our international supply portal. Our site load speeds improved by 40% and online inquiries tripled in under 3 months. Outstanding customer support!'
            },
            {
              name: 'Priya Nair',
              company: 'EduSphere Hub',
              designation: 'Co-Founder',
              photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
              rating: 5,
              review: 'Their custom software developers created an intuitive student portal with integrated payments and dashboard analytics. Project management was transparent and delivery was prompt.'
            },
            {
              name: 'Marcus Vance',
              company: 'CloudScale SaaS',
              designation: 'Tech Director',
              photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150',
              rating: 5,
              review: 'Switching our servers to Host2Unlimited cloud infrastructure reduced latency by half and solved our scaling challenges. A highly professional team of technicians.'
            }
          ])
        ],
        [
          'website_settings',
          JSON.stringify({
            logo: '',
            favicon: '',
            company_name: 'Host2Unlimited',
            address: 'Mumbai, Maharashtra, India',
            email: 'info@host2unlimited.com',
            phone: '+91 70219 35273',
            whatsapp_number: '+91 81046 12974',
            social_links: {
              facebook: 'https://facebook.com/host2unlimited',
              twitter: 'https://twitter.com/host2unlimited',
              linkedin: 'https://linkedin.com/company/host2unlimited'
            }
          })
        ],
        [
          'homepage',
          JSON.stringify({
            hero: {
              badge: '⭐ Next-Generation Digital Solutions',
              title: 'Digital Marketing Partner of Educational Institutes & Modern Businesses',
              description: 'We serve as a dedicated digital marketing partner for educational institutes like international schools, colleges, campuses, and universities, helping them grow through professional website development, secure cloud hosting, Google-rank SEO services, custom software solutions, and ERP databases.'
            },
            about: {
              title: 'Why Businesses Choose Host2Unlimited',
              description: 'We partner with businesses to deploy scalable digital platforms, driving engagement and compounding search visibility.'
            },
            services: {
              title: 'Core Engineering Capabilities',
              description: 'We translate client specifications into robust websites, automated enterprise software, and scalable hosting frameworks.'
            },
            cta: {
              title: 'Ready to Build Your Digital Future?',
              description: 'Get in touch with our tech consultants today. Let us lock in a tailored blueprint and cost range for your custom software or enterprise portal.'
            }
          })
        ]
      ];

      for (const page of initialPages) {
        await pool.query(
          'INSERT IGNORE INTO cms_pages (id, content_data) VALUES (?, ?)',
          page
        );
      }
      console.log('Seeded initial universal pages content successfully.');
    }

  } catch (error) {
    console.error('Database Initialization Failed:', error);
    process.exit(1);
  }
}

export function getPool() {
  if (!pool) {
    throw new Error('Database pool has not been initialized. Call initializeDatabase first.');
  }
  return pool;
}
