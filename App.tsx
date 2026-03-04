
import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, useLocation, Navigate } from 'react-router-dom';
import { BLOG_POSTS } from './constants.tsx';
import { Post } from './types.ts';

// --- Icons ---
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);
const InsightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
);
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);

// --- Components ---

const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => {
    if (path === '/' && (location.pathname === '/' || location.pathname === '/index.html')) return true;
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-indigo-600 text-white w-8 h-8 flex items-center justify-center rounded-lg text-lg font-black shadow-sm group-hover:bg-indigo-700 transition-colors">
            K
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            kodi<span className="text-indigo-600">swift</span>
          </span>
        </Link>
        <div className="flex gap-8 items-center">
          <Link 
            to="/" 
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActive('/') ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}
          >
            <HomeIcon /> <span>Home</span>
          </Link>
          <Link 
            to="/insights" 
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActive('/insights') ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}
          >
            <InsightIcon /> <span>Project Insights</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer className="border-t border-gray-100 bg-white py-12 mt-24">
    <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="text-center md:text-left">
        <div className="text-lg font-bold tracking-tight text-gray-900">kodi<span className="text-indigo-600">swift</span></div>
        <p className="text-gray-400 text-xs mt-1 italic">Precision guides for urban researchers.</p>
      </div>
      <div className="flex gap-8 text-xs font-semibold text-gray-400 uppercase tracking-widest">
        <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <Link to="/insights" className="hover:text-indigo-600 transition-colors">Project Insights</Link>
      </div>
    </div>
  </footer>
);

const PostCard: React.FC<{ post: Post }> = ({ post }) => (
  <Link to={`/insights/${post.slug}`} className="group block space-y-4 fade-in">
    <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100 relative shadow-sm">
      <img 
        src={post.imageUrl || `https://picsum.photos/seed/${post.id}/800/500`} 
        alt={post.title} 
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute top-4 left-4">
        <span className="bg-white/95 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider text-indigo-600 shadow-sm border border-gray-100">
          {post.category}
        </span>
      </div>
    </div>
    <div className="space-y-2">
      <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors leading-tight">
        {post.title}
      </h3>
      <p className="text-gray-500 line-clamp-2 text-sm font-medium leading-relaxed">
        {post.excerpt}
      </p>
    </div>
  </Link>
);

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const displayPosts = useMemo(() => {
    // Strictly show only 3 posts on the home page as requested
    // Show latest posts first
    return [...filteredPosts].reverse().slice(0, 3);
  }, [filteredPosts]);

  return (
    <div className="space-y-16 py-12">
      <section className="pt-20 pb-16 text-center space-y-8 max-w-4xl mx-auto px-4">
        <h1 className="text-6xl md:text-7xl font-black text-gray-900 tracking-tight leading-[1.1]">
          Brainstorm. Meditate.<br/>
          <span className="text-indigo-600">Synthesize.</span>
        </h1>
        <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto">
          Welcome to KodiSwift. We provide spurring insights from real-world projects.
        </p>
        
        <div className="flex justify-center pt-4">
          <div className="relative max-w-xl w-full group">
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search guides, projects, or categories..." 
              className="w-full px-6 py-4 rounded-full border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/10 focus:border-indigo-600/30 transition-all text-sm font-medium placeholder:text-gray-400"
            />
            <div className="absolute right-5 top-4 text-gray-300">
              <SearchIcon />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {searchTerm ? 'Search Results' : 'Latest Updates'}
            </h2>
            <p className="text-gray-400 text-sm font-medium mt-1">
              {searchTerm ? `${filteredPosts.length} matches found` : 'Recent notes and guides'}
            </p>
          </div>
          {!searchTerm && (
            <Link to="/insights" className="text-indigo-600 text-xs font-bold uppercase tracking-widest hover:underline transition-all">
              View all insights
            </Link>
          )}
        </div>

        {displayPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {displayPosts.map(post => <PostCard key={post.id} post={post} />)}
          </div>
        ) : (
          <div className="py-24 text-center">
            <h3 className="text-2xl font-bold text-gray-900">No results found</h3>
            <p className="text-gray-500 mt-2">Try searching for different keywords.</p>
          </div>
        )}
      </section>
    </div>
  );
};

const InsightsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const totalPages = Math.ceil(BLOG_POSTS.length / postsPerPage);
  const currentPosts = BLOG_POSTS.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div className="py-20 space-y-12">
      <header className="border-b border-gray-100 pb-12">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Project Insights</h1>
        <p className="text-lg text-gray-500 font-medium mt-3">Comprehensive guides and technical notes from our latest research and projects.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {currentPosts.map(post => <PostCard key={post.id} post={post} />)}
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 pt-8">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
              currentPage === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white border border-gray-200 text-gray-700 hover:border-indigo-600 hover:text-indigo-600 shadow-sm'
            }`}
          >
            First Page
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
              currentPage === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white border border-gray-200 text-gray-700 hover:border-indigo-600 hover:text-indigo-600 shadow-sm'
            }`}
          >
            Previous Page
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
              currentPage === totalPages 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white border border-gray-200 text-gray-700 hover:border-indigo-600 hover:text-indigo-600 shadow-sm'
            }`}
          >
            Next Page
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
              currentPage === totalPages 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white border border-gray-200 text-gray-700 hover:border-indigo-600 hover:text-indigo-600 shadow-sm'
            }`}
          >
            Last Page
          </button>
        </div>
      )}
    </div>
  );
};

const PostDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (post) {
      document.title = post.seoTitle || post.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', post.metaDescription);

      // --- JSON-LD Schema Injection ---
      const schemaId = 'post-schema';
      let script = document.getElementById(schemaId) as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.id = schemaId;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }

      const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.seoTitle,
        "description": post.metaDescription,
        "image": post.imageUrl,
        "datePublished": post.date,
        "author": { "@type": "Person", "name": post.author }
      };

      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": window.location.origin },
          { "@type": "ListItem", "position": 2, "name": "Insights", "item": `${window.location.origin}/insights` },
          { "@type": "ListItem", "position": 3, "name": post.title, "item": window.location.href }
        ]
      };

      const faqSchema = post.faqSchema ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": post.faqSchema.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
        }))
      } : null;

      const organizationSchema = post.slug.includes('cfc') ? {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Common Fund for Commodities",
        "url": "https://www.common-fund.org",
        "logo": "https://www.common-fund.org/themes/custom/cfc/logo.svg",
        "sameAs": [
          "https://twitter.com/CommonFund",
          "https://www.linkedin.com/company/common-fund-for-commodities"
        ]
      } : null;

      script.text = JSON.stringify([articleSchema, breadcrumbSchema, faqSchema, organizationSchema].filter(Boolean));

      return () => {
        const existingScript = document.getElementById(schemaId);
        if (existingScript) existingScript.remove();
      };
    }
  }, [post]);

  if (!post) return <div className="py-32 text-center text-2xl font-bold">Post not found.</div>;

  // --- Content Renderer ---
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];
      const trimmed = line.trim();

      if (!trimmed) {
        elements.push(<div key={i} className="h-4" />);
        i++;
        continue;
      }

      // --- Table Handling ---
      if (trimmed.startsWith('|')) {
        const tableRows: string[] = [];
        while (i < lines.length && lines[i].trim().startsWith('|')) {
          tableRows.push(lines[i].trim());
          i++;
        }

        if (tableRows.length > 0) {
          const headers = tableRows[0]
            .split('|')
            .filter(cell => cell.trim() !== '')
            .map(cell => cell.trim());
          
          const bodyRows = tableRows.slice(2).map(row => 
            row.split('|')
              .filter(cell => cell.trim() !== '')
              .map(cell => cell.trim())
          );

          elements.push(
            <div key={`table-${i}`} className="my-8 overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-gray-50 text-gray-900 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    {headers.map((header, idx) => (
                      <th key={idx} className="px-6 py-4 border-b border-gray-100">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {bodyRows.map((row, rowIdx) => (
                    <tr key={rowIdx} className="hover:bg-gray-50/50 transition-colors">
                      {row.map((cell, cellIdx) => (
                        <td key={cellIdx} className="px-6 py-4 text-gray-600 font-medium leading-relaxed">
                          {cell.split(/(\*\*.*?\*\*|<b>.*?<\/b>|<strong>.*?<\/strong>)/g).map((part, pIdx) => {
                            if (part.startsWith('**') && part.endsWith('**')) return <strong key={pIdx} className="font-black text-gray-900">{part.slice(2, -2)}</strong>;
                            if (part.startsWith('<b>') && part.endsWith('</b>')) return <strong key={pIdx} className="font-black text-gray-900">{part.slice(3, -4)}</strong>;
                            if (part.startsWith('<strong>') && part.endsWith('</strong>')) return <strong key={pIdx} className="font-black text-gray-900">{part.slice(8, -9)}</strong>;
                            return part;
                          })}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
          continue;
        }
      }

      // --- Raw HTML Div Handling (for anchors and custom displays) ---
      const divMatch = trimmed.match(/^<div id="(.*?)"(><\/div>|>\s*<\/div>)$/);
      if (divMatch) {
        const id = divMatch[1];
        
        // Specific "Representative Displays" for Brain Health
        if (id === 'translational-pathway') {
          elements.push(
            <div id={id} key={i} className="my-12 p-8 bg-indigo-50 rounded-3xl border border-indigo-100 relative overflow-hidden group">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-indigo-600/5 rounded-full blur-3xl group-hover:bg-indigo-600/10 transition-all" />
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 11V7a5 5 0 0 1 10 0v4"/><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M12 16v3"/></svg>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 tracking-tight">Translational Pathway Framework</h3>
                </div>
                <p className="text-sm text-indigo-900/70 font-bold uppercase tracking-widest">Strategic Implementation Model</p>
              </div>
            </div>
          );
        } else if (id === 'implementation') {
          elements.push(
            <div id={id} key={i} className="my-12 p-8 bg-emerald-50 rounded-3xl border border-emerald-100 relative overflow-hidden group">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-emerald-600/5 rounded-full blur-3xl group-hover:bg-emerald-600/10 transition-all" />
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 tracking-tight">Quality of Implementation</h3>
                </div>
                <p className="text-sm text-emerald-900/70 font-bold uppercase tracking-widest">Execution & Feasibility Standards</p>
              </div>
            </div>
          );
        } else {
          elements.push(<div id={id} key={i} className="scroll-mt-24" />);
        }
        i++;
        continue;
      }

      // Heading with ID generation for anchor links
      const headingMatch = trimmed.match(/^(#{1,4})\s+(.*)$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const text = headingMatch[2];
        const id = text.toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/^-+|-+$/g, '');
        
        if (level === 1) elements.push(<h1 id={id} key={i} className="text-3xl font-black mt-12 mb-6 text-gray-900">{text}</h1>);
        else if (level === 2) elements.push(<h2 id={id} key={i} className="text-2xl font-black mt-10 mb-5 text-gray-900">{text}</h2>);
        else if (level === 3) elements.push(<h3 id={id} key={i} className="text-xl font-bold mt-8 mb-4 text-indigo-600">{text}</h3>);
        else if (level === 4) elements.push(<h4 id={id} key={i} className="text-lg font-bold mt-6 mb-2 text-gray-900">{text}</h4>);
        i++;
        continue;
      }

      if (trimmed.startsWith('- ')) {
        const content = trimmed.replace('- ', '');
        elements.push(
          <li key={i} className="ml-4 list-disc my-1">
            {content.split(/(\[.*?\]\(.*?\))|(\*\*.*?\*\*|<b>.*?<\/b>|<strong>.*?<\/strong>)/g).map((part, idx) => {
              if (!part) return null;
              if (part.startsWith('[') && part.includes('](')) {
                const m = part.match(/\[(.*?)\]\((.*?)\)/);
                if (m) return <a key={idx} href={m[2]} className="text-indigo-600 hover:text-indigo-800 underline decoration-indigo-200 underline-offset-4 transition-colors">{m[1]}</a>;
              }
              if (part.startsWith('**') && part.endsWith('**')) return <strong key={idx} className="font-black text-gray-900">{part.slice(2, -2)}</strong>;
              if (part.startsWith('<b>') && part.endsWith('</b>')) return <strong key={idx} className="font-black text-gray-900">{part.slice(3, -4)}</strong>;
              if (part.startsWith('<strong>') && part.endsWith('</strong>')) return <strong key={idx} className="font-black text-gray-900">{part.slice(8, -9)}</strong>;
              return part;
            })}
          </li>
        );
        i++;
        continue;
      }
      
      const linkMatch = trimmed.match(/^(\d+\.\s+)?\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        const prefix = linkMatch[1] || '';
        const linkText = linkMatch[2];
        const linkHref = linkMatch[3];
        
        const isPrimaryCta = linkText === "Prepare your Urban Urgencies proposal" || linkText === "Prepare your RAIA Project proposal" || linkText === "Prepare your CFC Thriving Farmers Proposal" || linkText === "Prepare your Mitigation Action Proposal" || linkText === "Prepare your Polk Bros Overdose Prevention Proposal" || linkText === "Prepare your Alstom Project Proposal" || linkText === "Prepare your RWJF Inequities Proposal" || linkText === "Prepare your UNITAID MNH Product Access Proposal" || linkText === "Prepare your GAC International Policy Proposal" || linkText === "Prepare your Western SARE Proposal" || linkText === "Prepare your Connecting the Dots Proposal" || linkText === "Prepare your Society of Breast Imaging Proposal" || linkText === "Prepare your Brain Health Proposal" || linkText === "Prepare your JTC2026 Call 2 Proposal" || linkText === "Prepare your SEA Europe STI Joint Call Proposal(s)" || linkText === "Prepare your Vliruos Team 2026 Proposal(s)" || linkText === "Prepare your Eurostars Proposal(s)" || linkText === "Prepare your IraSME R&D Proposal(s)" || linkText === "Request for Design and Development Services";
        const isSamplePlatform = linkText === "See: Sample Completed Saas Platform";
        const isExternal = linkHref.includes('weebly.com') || linkHref.includes('kodiswift.space');

        if (isSamplePlatform) {
          elements.push(
            <div key={i} className="my-8 flex justify-center">
              <a 
                href={linkHref} 
                className="inline-block bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg active:scale-95 text-center w-full md:w-auto border-2 border-emerald-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                  {linkText}
                </span>
              </a>
            </div>
          );
        } else if (isExternal && !isPrimaryCta) {
          elements.push(
            <div key={i} className="mb-8 mt-[-1rem] text-center">
              <a 
                href={linkHref} 
                className="text-indigo-600 text-sm font-semibold hover:underline flex items-center justify-center gap-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                {linkText} <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>
          );
        } else if (isPrimaryCta) {
          elements.push(
            <div key={i} className="my-8 flex justify-center">
              <a 
                href={linkHref} 
                className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg active:scale-95 text-center w-full md:w-auto"
                target={linkHref.startsWith('http') ? '_blank' : undefined}
                rel={linkHref.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {linkText}
              </a>
            </div>
          );
        } else {
          elements.push(
            <div key={i} className="my-1">
              {prefix}
              <a 
                href={linkHref}
                className="text-indigo-600 hover:text-indigo-800 underline decoration-indigo-200 underline-offset-4 transition-colors"
                onClick={(e) => {
                  if (linkHref.startsWith('#')) {
                    e.preventDefault();
                    const id = linkHref.substring(1);
                    const element = document.getElementById(id);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                      window.history.pushState(null, '', linkHref);
                    }
                  }
                }}
              >
                {linkText}
              </a>
            </div>
          );
        }
        i++;
        continue;
      }

      elements.push(
        <p key={i} className="mb-4">
          {trimmed.split(/(\*\*.*?\*\*|<b>.*?<\/b>|<strong>.*?<\/strong>)/g).map((part, idx) => {
            if (part.startsWith('**') && part.endsWith('**')) return <strong key={idx} className="font-black text-gray-900">{part.slice(2, -2)}</strong>;
            if (part.startsWith('<b>') && part.endsWith('</b>')) return <strong key={idx} className="font-black text-gray-900">{part.slice(3, -4)}</strong>;
            if (part.startsWith('<strong>') && part.endsWith('</strong>')) return <strong key={idx} className="font-black text-gray-900">{part.slice(8, -9)}</strong>;
            return part;
          })}
        </p>
      );
      i++;
    }
    return elements;
  };

  return (
    <div className="max-w-3xl mx-auto py-16 px-4 fade-in">
      <Link to="/" className="text-indigo-600 text-xs font-bold uppercase tracking-widest hover:opacity-70 transition-all mb-10 inline-block">
        ← Back to Guides
      </Link>
      
      <header className="mb-12 space-y-6">
        <div className="flex items-center gap-4">
          <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
            {post.category}
          </span>
          <span className="text-gray-400 text-xs font-medium">{post.date}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
          {post.title}
        </h1>
        
        {post.imageUrl && (
          <div className="aspect-[21/9] rounded-3xl overflow-hidden bg-gray-100 shadow-sm border border-gray-100">
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-black text-sm">
            {post.author[0]}
          </div>
          <div>
            <div className="text-sm font-bold text-gray-900">{post.author}</div>
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Editorial Team</div>
          </div>
        </div>
      </header>

      <article className="prose prose-indigo prose-lg max-w-none text-gray-700 leading-relaxed font-medium mb-20">
        {renderContent(post.content)}
      </article>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
        <Navbar />
        <main className="flex-grow max-w-6xl mx-auto px-6 w-full">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/index.html" element={<Navigate to="/" replace />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/insights/:slug" element={<PostDetailPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
