import React, { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { posts } from '../data/posts';
import ChatBud from '../ChatBud';

const BlogPost = () => {
    const { slug } = useParams();
    const post = posts.find((p) => p.slug === slug);

    // Scroll mapping logic to ensure article sits at the top upon load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!post) {
        return <Navigate to="/blog" />;
    }

    return (
        <article className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 text-left">
            <nav className="w-full bg-white/90 backdrop-blur-md shadow-sm py-5 fixed top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <Link to="/blog" className="flex items-center gap-2 group text-slate-600 hover:text-blue-600 transition-colors font-bold">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Articles
                    </Link>
                    <div className="text-xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tighter">
                        SW. DIGITAL HUB
                    </div>
                </div>
            </nav>

            <header className="pt-32 pb-16 px-6 bg-slate-50 border-b border-slate-100">
                <div className="max-w-4xl mx-auto space-y-6">
                    <div className="flex items-center gap-4 text-sm font-bold text-slate-500 uppercase tracking-widest">
                        <span className="text-blue-600 bg-blue-100 px-3 py-1 rounded-full">{post.category}</span>
                        <span>{post.date}</span>
                        <span className="flex items-center gap-1"><Clock size={16}/> {post.readTime}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 tracking-tight leading-tight">
                        {post.title}
                    </h1>
                </div>
            </header>

            <div className="w-full h-64 md:h-[500px] overflow-hidden relative border-b border-slate-200">
                <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            <section className="py-20 px-6 max-w-4xl mx-auto">
                {/* Dynamically Inject Sanitzed HTML String from DB */}
                <div 
                    className="prose prose-lg md:prose-xl prose-slate max-w-none text-left" 
                    dangerouslySetInnerHTML={{ __html: post.content }} 
                />

                <hr className="my-16 border-slate-200" />
                
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 text-center space-y-4">
                    <h3 className="text-2xl font-bold text-slate-900">Need help building your local presence?</h3>
                    <p className="text-slate-600 text-lg">Our growth engineering experts at Sandip Wireless can construct this exact funnel for your brand.</p>
                    <div className="pt-4">
                        <Link to="/" className="inline-block bg-blue-600 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all hover:-translate-y-1">
                            Book Free Strategy Session
                        </Link>
                    </div>
                </div>
            </section>
            
            <ChatBud />
        </article>
    );
};
export default BlogPost;
