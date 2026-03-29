import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock } from 'lucide-react';

const Blog = () => {
    // Premium hardcoded blog posts
    const posts = [
        {
            title: "The Ultimate Guide to Local SEO in 2026",
            excerpt: "Discover the top strategies for dominating Google Maps and ensuring your local business is found when it matters most.",
            date: "Mar 15, 2026",
            readTime: "8 min read",
            category: "SEO",
            img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Why High-Intent Conversions Beat Broad Reach",
            excerpt: "Stop paying for vanity metrics. We break down the mathematics behind high-intent targeted paid ads and why they win every time.",
            date: "Feb 28, 2026",
            readTime: "5 min read",
            category: "PPC",
            img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: "Building a Glassmorphism Brand Identity",
            excerpt: "Visual trust matters. Learn how modern design methodologies translate directly to increased user confidence and lowered bounce rates.",
            date: "Feb 10, 2026",
            readTime: "12 min read",
            category: "Design",
            img: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=800"
        }
    ];

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 text-left">
            {/* Minimal Nav */}
            <nav className="w-full bg-white/90 backdrop-blur-md shadow-sm py-5 fixed top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2 group text-slate-600 hover:text-blue-600 transition-colors font-bold">
                        <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        Back to Agency
                    </Link>
                    <div className="text-xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tighter">
                        SW. DIGITAL HUB
                    </div>
                </div>
            </nav>

            {/* Header */}
            <header className="pt-32 pb-16 px-6 bg-slate-50 border-b border-slate-100">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 font-bold px-4 py-1.5 rounded-full text-sm">
                        <BookOpen size={16} /> Insights & Articles
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">The Growth Engine</h1>
                    <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto">Actionable strategies, deep dives, and marketing engineering directly from the Sandip Wireless team.</p>
                </div>
            </header>

            {/* Grid */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {posts.map((post, idx) => (
                        <div key={idx} className="group cursor-pointer bg-white rounded-[2rem] border border-slate-200 overflow-hidden hover:shadow-2xl hover:border-blue-400 transition-all duration-300 flex flex-col hover:-translate-y-2">
                            <div className="h-48 overflow-hidden relative">
                                <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-blue-600">
                                    {post.category}
                                </div>
                            </div>
                            <div className="p-8 flex-1 flex flex-col justify-between">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                        <span>{post.date}</span>
                                        <span className="flex items-center gap-1"><Clock size={12}/> {post.readTime}</span>
                                    </div>
                                    <h2 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{post.title}</h2>
                                    <p className="text-slate-600 leading-relaxed">{post.excerpt}</p>
                                </div>
                                <div className="mt-8 font-bold text-blue-600 flex items-center group-hover:gap-2 transition-all">
                                    Read Article &rarr;
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};
export default Blog;
