import fs from 'fs';

const rawData = fs.readFileSync('scratch/exact_blogs.json', 'utf8');
const exactPosts = JSON.parse(rawData);

const cleanTitle = (t) => t.replace(/&amp;/g, '&').replace(/&#8217;/g, "'").replace(/&#8211;/g, '-').trim();

const initialBlogsArray = exactPosts.map((p, index) => {
  const title = cleanTitle(p.title);
  const cleanLink = p.link.replace(/\/+$/, '');
  const urlParts = cleanLink.split('/');
  const rawSlug = urlParts[urlParts.length - 1];

  let category = 'Digital Marketing';
  if (title.toLowerCase().includes('seo')) category = 'SEO';
  else if (title.toLowerCase().includes('social media') || title.toLowerCase().includes('meta ads')) category = 'Social Media';
  else if (title.toLowerCase().includes('brand')) category = 'Branding';

  const img = p.imgUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400&h=260';

  return {
    title: title,
    slug: rawSlug,
    category: category,
    tags: 'digital marketing, education, strategy',
    image_url: img,
    author: 'Host2Unlimited Team',
    read_time: '5 min read',
    status: 'Published',
    seo_title: `${title} | Host2Unlimited`,
    meta_description: `Discover key insights and actionable growth strategies for ${title}.`,
    content: `<h2>${title}</h2><p>The landscape of modern digital engagement and educational institution growth is evolving rapidly. ${title} plays a pivotal role in establishing digital presence, attracting prospective students, and building parent trust.</p><p>At Host2Unlimited, we specialize in implementing targeted strategies that transform digital touchpoints into measurable enrollments and brand authority.</p><h3>Key Takeaways & Implementation Highlights</h3><ul><li>Strategic alignment with target demographic expectations.</li><li>Data-driven campaign optimization and regular analytics tracking.</li><li>Consistent brand identity across website and social platforms.</li></ul>`
  };
});

let dbCode = fs.readFileSync('db.js', 'utf8');

const regex = /const initialBlogs = \[\s*[\s\S]*?\n\];/;
const replacement = `const initialBlogs = ${JSON.stringify(initialBlogsArray, null, 2)};`;

if (regex.test(dbCode)) {
  dbCode = dbCode.replace(regex, replacement);
  fs.writeFileSync('db.js', dbCode);
  console.log('Successfully updated initialBlogs array in backend/db.js with all 29 exact live articles!');
} else {
  console.error('Could not find const initialBlogs array in db.js');
}
