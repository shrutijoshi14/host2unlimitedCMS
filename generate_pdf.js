const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const mdPath = './DEPLOYMENT.md';
const htmlPath = './DEPLOYMENT.html';
const pdfPath = './DEPLOYMENT.pdf';

function parseMarkdown(md) {
  // 1. Escape HTML entities
  let html = md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // 2. Restore blockquotes and parse alert types
  html = html.replace(/^(&gt;)\s*\[!(IMPORTANT|NOTE|WARNING|TIP)\]\s*(.*)$/gm, (m, gt, type, content) => {
    return `<div class="alert alert-${type.toLowerCase()}"><strong>${type}:</strong> ${content}</div>`;
  });
  html = html.replace(/^(&gt;)\s*(.*)$/gm, '<blockquote>$2</blockquote>');

  // 3. Code blocks
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (m, lang, code) => {
    return `<pre><code class="language-${lang}">${code.trim()}</code></pre>`;
  });

  // 4. Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // 5. Headers
  html = html.replace(/^# (.*)$/gm, '<h1>$1</h1>');
  html = html.replace(/^## (.*)$/gm, '<h2>$1</h2>');
  html = html.replace(/^### (.*)$/gm, '<h3>$1</h3>');

  // 6. Checkboxes (match ✦ [ ] and ✦ [x] first)
  html = html.replace(/^\s*✦\s*\[ \]\s*(.*)$/gm, '<div class="checkbox"><input type="checkbox"> <span>$1</span></div>');
  html = html.replace(/^\s*✦\s*\[x\]\s*(.*)$/gm, '<div class="checkbox"><input type="checkbox" checked> <span>$1</span></div>');

  // 7. Unordered Lists (matches remaining lines starting with ✦)
  html = html.replace(/^\s*✦\s*(.*)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
  html = html.replace(/<\/ul>\n<ul>/g, '\n');

  // 8. Bold
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  // 9. Tables parsing (replaces the lines completely)
  const lines = html.split('\n');
  const newLines = [];
  let tableRows = [];
  let inTable = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('|') && line.endsWith('|')) {
      if (line.includes(':---') || line.includes('---:')) {
        continue; 
      }
      const cells = line.split('|').slice(1, -1).map(c => c.trim());
      tableRows.push(cells);
      inTable = true;
    } else {
      if (inTable) {
        let tableHtml = '<table class="table">';
        tableRows.forEach((row, rowIndex) => {
          tableHtml += '<tr>';
          row.forEach(cell => {
            const tag = rowIndex === 0 ? 'th' : 'td';
            tableHtml += `<${tag}>${cell}</${tag}>`;
          });
          tableHtml += '</tr>';
        });
        tableHtml += '</table>';
        newLines.push(tableHtml);
        tableRows = [];
        inTable = false;
      }
      newLines.push(lines[i]);
    }
  }
  if (inTable) {
    let tableHtml = '<table class="table">';
    tableRows.forEach((row, rowIndex) => {
      tableHtml += '<tr>';
      row.forEach(cell => {
        const tag = rowIndex === 0 ? 'th' : 'td';
        tableHtml += `<${tag}>${cell}</${tag}>`;
      });
      tableHtml += '</tr>';
    });
    tableHtml += '</table>';
    newLines.push(tableHtml);
  }
  html = newLines.join('\n');

  // 10. Paragraph wrappers
  html = html.split('\n').map(line => {
    const trimmed = line.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<h') || 
        trimmed.startsWith('<ul') || 
        trimmed.startsWith('<li') || 
        trimmed.startsWith('<pre') || 
        trimmed.startsWith('<table') || 
        trimmed.startsWith('<div') || 
        trimmed.startsWith('</') ||
        trimmed.startsWith('<tr') ||
        trimmed.startsWith('<td') ||
        trimmed.startsWith('<th') ||
        trimmed.startsWith('<blockquote>') ||
        trimmed.startsWith('</blockquote>')) {
      return line;
    }
    return `<p>${line}</p>`;
  }).join('\n');

  return html.replace(/<p>\s*<\/p>/g, '').trim();
}

const mdContent = fs.readFileSync(mdPath, 'utf-8');
const parsedHtml = parseMarkdown(mdContent);

const finalHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Deployment Guide</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;600;700;800&display=swap');
    
    @page {
      size: A4;
      margin: 20mm; /* Restored standard print margins */
    }

    html, body {
      margin: 0;
      padding: 0;
      background: #ffffff;
    }

    body {
      font-family: 'Inter', sans-serif;
      color: #334155;
      line-height: 1.6;
      border-top: 8px solid #2563eb;
      padding-top: 10px;
    }

    h1, h2, h3 {
      font-family: 'Outfit', sans-serif;
      color: #0f172a;
      font-weight: 700;
      margin-top: 1.8em;
      margin-bottom: 0.6em;
    }

    h1 {
      font-size: 32px;
      font-weight: 800;
      color: #2563eb;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 16px;
      margin-top: 0;
      margin-bottom: 1.2em;
    }

    h2 {
      font-size: 22px;
      border-bottom: 1px solid #f1f5f9;
      padding-bottom: 10px;
      color: #1e3a8a;
      page-break-after: avoid;
    }

    h3 {
      font-size: 16px;
      color: #0ea5e9;
      page-break-after: avoid;
    }

    p {
      margin-bottom: 1.25em;
      font-size: 14px;
      color: #475569;
    }

    code {
      font-family: 'Consolas', 'Courier New', monospace;
      background-color: #f1f5f9;
      padding: 3px 6px;
      border-radius: 4px;
      font-size: 13px;
      color: #b91c1c;
      font-weight: 500;
      white-space: pre-wrap;
      word-wrap: break-word;
      word-break: break-all;
    }

    pre {
      background-color: #0f172a;
      padding: 18px 22px;
      border-radius: 8px;
      margin: 20px 0;
      border-left: 4px solid #38bdf8;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
      white-space: pre-wrap;
      word-wrap: break-word;
      word-break: break-all;
    }

    pre code {
      background-color: transparent;
      padding: 0;
      color: #f8fafc;
      font-size: 12.5px;
      font-family: 'Consolas', 'Courier New', monospace;
      white-space: pre-wrap;
      word-wrap: break-word;
      word-break: break-all;
    }

    .table {
      width: 100%;
      border-collapse: collapse;
      margin: 24px 0;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
      table-layout: auto;
    }

    .table th, .table td {
      padding: 12px 16px;
      text-align: left;
      word-wrap: break-word;
      word-break: break-word;
    }

    .table th {
      background-color: #0f172a;
      color: #ffffff;
      font-weight: 600;
      font-size: 13.5px;
      border-bottom: 2px solid #1e293b;
    }

    .table td {
      border-bottom: 1px solid #e2e8f0;
      font-size: 13px;
      color: #334155;
    }

    .table tr:nth-child(even) {
      background-color: #f8fafc;
    }

    .alert {
      padding: 16px 20px;
      border-radius: 8px;
      margin: 24px 0;
      font-size: 13.5px;
      border-left: 5px solid;
    }

    .alert-important {
      background-color: #fef2f2;
      border-color: #ef4444;
      color: #991b1b;
    }

    .alert-note {
      background-color: #f0f9ff;
      border-color: #0ea5e9;
      color: #075985;
    }

    .checkbox {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 0.8em;
      font-size: 14px;
      color: #475569;
    }

    .checkbox input {
      width: 16px;
      height: 16px;
      border-radius: 4px;
      border: 1px solid #cbd5e1;
      accent-color: #2563eb;
      margin: 0;
    }

    ul {
      list-style-type: none;
      padding-left: 0;
      margin-bottom: 1.8em;
    }

    li {
      position: relative;
      padding-left: 24px;
      margin-bottom: 0.8em;
      font-size: 14px;
      color: #475569;
    }

    li::before {
      content: "✦";
      position: absolute;
      left: 4px;
      top: 0px;
      color: #2563eb;
      font-size: 13px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  ${parsedHtml}
</body>
</html>
`;

fs.writeFileSync(htmlPath, finalHtml);

console.log('HTML compiled. Printing to PDF using Edge...');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const command = `"${edgePath}" --headless --disable-gpu --print-to-pdf="${path.resolve(pdfPath)}" "${path.resolve(htmlPath)}"`;

exec(command, (err, stdout, stderr) => {
  if (err) {
    console.error('Error generating PDF:', err);
    process.exit(1);
  }
  console.log('PDF printed successfully.');
  
  // Cleanup
  fs.unlinkSync(htmlPath);
  process.exit(0);
});
