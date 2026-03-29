import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, signInWithCustomToken } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import {
  BarChart3,
  Search,
  Share2,
  Mail,
  ExternalLink,
  Menu,
  X,
  CheckCircle2,
  TrendingUp,
  Target,
  ArrowRight,
  Briefcase,
  MessageSquare,
  Camera,
  FileText,
  Zap,
  Radio,
  Layers,
  MousePointer2,
  Loader2
} from 'lucide-react';
import ChatBud from '../ChatBud';
import { sendEmailRoute } from '../emailService';
import { Link } from 'react-router-dom';

// Get globals from window
const { __firebase_config, __app_id, __initial_auth_token } = window;

// Firebase production configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1XYJdw0FV4XZUGoROE_4jE7uUSSSvgmM",
  authDomain: "mylife-7f32f.firebaseapp.com",
  databaseURL: "https://mylife-7f32f-default-rtdb.firebaseio.com",
  projectId: "mylife-7f32f",
  storageBucket: "mylife-7f32f.firebasestorage.app",
  messagingSenderId: "896959023864",
  appId: "1:896959023864:web:a358d1ada249b470ddc90d",
  measurementId: "G-DM3M8DTVL6"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'sandip-wireless-portfolio';

const Home = () => {
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [scrolled, setScrolled] = useState(false);
const [user, setUser] = useState(null);
const [activeCaseStudy, setActiveCaseStudy] = useState(null);

// Form State
const [formState, setFormState] = useState({
name: '',
email: '',
service: 'Search Engine Optimization',
message: ''
});
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitted, setSubmitted] = useState(false);
const [error, setError] = useState(null);

// Initialize Auth
useEffect(() => {
const initAuth = async () => {
try {
if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
await signInWithCustomToken(auth, __initial_auth_token);
} else {
await signInAnonymously(auth);
}
} catch (err) {
console.error("Auth error:", err);
}
};
initAuth();
const unsubscribe = onAuthStateChanged(auth, setUser);
return () => unsubscribe();
}, []);

// Scroll Listener
useEffect(() => {
const handleScroll = () => {
setScrolled(window.scrollY > 50);
};
window.addEventListener('scroll', handleScroll);
return () => window.removeEventListener('scroll', handleScroll);
}, []);

// Scroll Lock for Modal
useEffect(() => {
if (activeCaseStudy) {
document.body.style.overflow = 'hidden';
} else {
document.body.style.overflow = 'unset';
}
return () => { document.body.style.overflow = 'unset'; };
}, [activeCaseStudy]);

const handleInputChange = (e) => {
const { name, value } = e.target;
setFormState(prev => ({ ...prev, [name]: value }));
};

const handleSubmit = async (e) => {
e.preventDefault();

setIsSubmitting(true);
setError(null);

try {
// 1. Trigger the Web3Forms Email Ping (Requires no Firebase Auth)
await sendEmailRoute("New Website Inquiry", formState);

// 2. Silently attempt to log to Firebase (Graceful bypass for local mock servers)
if (user) {
try {
const inquiriesRef = collection(db, 'artifacts', appId, 'public', 'data', 'inquiries');
await addDoc(inquiriesRef, {
...formState,
userId: user.uid,
timestamp: serverTimestamp()
});
} catch (dbErr) {
console.warn("Firebase backup log failed (likely due to mock credentials):", dbErr);
}
}

// 3. Complete the UI cycle
setSubmitted(true);
setFormState({ name: '', email: '', service: 'Search Engine Optimization', message: '' });
} catch (err) {
console.error("Form submission critical error:", err);
setError("Failed to send message. Please check your network and try again.");
} finally {
setIsSubmitting(false);
}
};

const scrollToSection = (id) => {
setIsMenuOpen(false);
const element = document.getElementById(id);
if (element) {
element.scrollIntoView({ behavior: 'smooth' });
}
};

const services = [
{
title: "SEO Foundations",
desc: "Keyword research and on-page optimization to help small businesses get discovered on Google.",
icon:
<Search className="w-8 h-8 text-blue-600" />
},
{
title: "Paid Ads Management",
desc: "Setting up and monitoring Meta and Google Ads with a focus on testing and learning.",
icon:
<BarChart3 className="w-8 h-8 text-indigo-600" />
},
{
title: "Social Media Content",
desc: "Creating engaging content calendars and managing community interactions to build brand presence.",
icon:
<Share2 className="w-8 h-8 text-purple-600" />
},
{
title: "Email Marketing",
desc: "Designing newsletters and automated flows to nurture leads and build customer loyalty.",
icon:
<Mail className="w-8 h-8 text-blue-600" />
}
];

const projects = [
{
title: "Local Cafe Growth",
category: "Social Media / Local SEO",
impact: "+45% Foot Traffic",
img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800",
description: "Optimized GMB profile and ran a targeted 'Local Favorites' Instagram campaign.",
challenge: "A well-loved local cafe was experiencing stagnant foot traffic despite a high quality product. Their online visibility was low, and their social media lacked a cohesive strategy to drive physical visits.",
strategy: "We completely revamped their Google My Business profile with updated menus, high-quality photos, and structured FAQs. Simultaneously, we launched the 'Local Favorites' Instagram and Meta ad campaign targeting a 3-mile radius with engaging video content of their signature drinks.",
detailedResults: "Within 3 months, profile views increased by 120%, translating to a 45% increase in verified foot traffic. The ad campaign achieved a 4x ROAS on promoted specialty items."
},
{
title: "E-commerce Sandbox",
category: "PPC / Meta Ads",
impact: "2.1x ROAS (Initial)",
img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
description: "A self-funded project testing A/B creative variations for a niche dropshipping store.",
challenge: "A newly launched niche dropshipping store was struggling to find profitable ad creatives, resulting in high CPAs and negative ROI.",
strategy: "We implemented a rapid A/B testing framework for Meta Ads, cycling through 20+ video and image variations over two weeks. We focused on hook-driven UGC (User Generated Content) style videos and narrowed the targeting based on early demographic data.",
detailedResults: "Identified two highly profitable 'winning' creatives that dropped the CPA by 60%. The store achieved profitability in month 2 with a sustained 2.1x ROAS."
},
{
title: "SEO Content Audit",
category: "Content Strategy",
impact: "Top 10 Ranking",
img: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=800",
description: "Complete keyword overhaul for a tech blog, resulting in 3 key terms hitting page one.",
challenge: "An established tech blog had hundreds of articles but minimal organic traffic. Their content was well-written but structurally poor for search engines and targeting highly competitive head terms.",
strategy: "Conducted a comprehensive content gap analysis and keyword audit. We restructured URLs, implemented schema markup, and optimized the top 50 articles for long-tail, high-intent keywords using an internal linking pillar strategy.",
detailedResults: "Organic traffic grew by 85% over 6 months. Three highly competitive 'bottom-of-funnel' search terms reached the top 10 positions on Google, doubling their affiliate revenue."
}
];

const stats = [
{ label: "Client Satisfaction", value: "100%" },
{ label: "Active Projects", value: "3" },
{ label: "Hours Training", value: "500+" },
{ label: "Skill Score", value: "98%" }
];

return (
<div
    className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 scroll-smooth w-full text-left">
    {/* Navigation */}
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5' }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center w-full">
            <div className="flex items-center gap-2 cursor-pointer" onClick={()=> window.scrollTo({ top: 0, behavior:
                'smooth' })}>
                <Radio className="text-blue-600" size={24} />
                <div
                    className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tighter">
                    SANDIP WIRELESS
                </div>
            </div>

            <div className="hidden md:flex space-x-8 items-center">
                <button onClick={()=> scrollToSection('services')} className="text-slate-600 hover:text-blue-600
                    transition-colors font-medium">Expertise</button>
                <button onClick={()=> scrollToSection('work')} className="text-slate-600 hover:text-blue-600
                    transition-colors font-medium">Projects</button>
                <Link to="/blog" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">Blog</Link>
                <button onClick={()=> scrollToSection('contact')} className="bg-blue-600 text-white px-6 py-2.5
                    rounded-full hover:bg-blue-700 transition-all shadow-md hover:shadow-lg active:scale-95">
                    Contact Us
                </button>
            </div>

            <button className="md:hidden p-2" onClick={()=> setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ?
                <X /> :
                <Menu />}
            </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
        <div
            className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 p-6 flex flex-col space-y-4 shadow-xl text-left">
            <button onClick={()=> scrollToSection('services')} className="text-lg font-medium
                text-left">Expertise</button>
            <button onClick={()=> scrollToSection('work')} className="text-lg font-medium text-left">Projects</button>
            <Link to="/blog" className="text-lg font-medium text-left block">Blog</Link>
            <button onClick={()=> scrollToSection('contact')} className="bg-blue-600 text-white px-6 py-3 rounded-xl
                text-center font-medium">Contact Us</button>
        </div>
        )}
    </nav>

    {/* Hero Section */}
    <section className="pt-28 pb-16 md:pt-48 md:pb-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full">
            <div className="space-y-8 text-left">
                <div
                    className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold border border-blue-100">
                    <Zap size={16} />
                    <span>Full-Service Digital Growth Agency</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1]">
                    Connecting brands to <span className="text-blue-600">new heights.</span>
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                    At <span className="font-bold text-slate-900">Sandip Wireless</span>, we specialize in high-impact
                    digital marketing strategies designed for the modern landscape. Fresh thinking, data-driven results.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button onClick={()=> scrollToSection('work')}
                        className="bg-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-blue-700
                        transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-2 group"
                        >
                        View Our Work
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button onClick={()=> scrollToSection('contact')}
                        className="bg-white text-slate-900 border-2 border-slate-200 px-8 py-4 rounded-2xl text-lg
                        font-bold hover:border-blue-600 transition-all flex items-center justify-center"
                        >
                        Let's Chat
                    </button>
                </div>
            </div>
            <div className="relative">
                <div className="absolute -inset-4 bg-blue-100 rounded-3xl blur-2xl opacity-50 animate-pulse"></div>
                <div className="relative bg-white p-8 rounded-3xl border border-slate-200 shadow-2xl">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div
                                className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                <Target size={24} />
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-slate-800">Precision Targeting</div>
                                <div className="text-xs text-slate-400">Reach the right audience</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div
                                className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                                <Layers size={24} />
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-slate-800">Full-Funnel Strategy</div>
                                <div className="text-xs text-slate-400">Awareness to Conversion</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div
                                className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                                <MousePointer2 size={24} />
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-slate-800">CRO Focused</div>
                                <div className="text-xs text-slate-400">Optimizing for action</div>
                            </div>
                        </div>
                        <hr />
                        <div className="pt-2">
                            <div
                                className="flex justify-between text-sm font-bold mb-2 text-slate-400 uppercase tracking-tighter">
                                <span>Sandip Wireless Capacity</span>
                                <span>100% Ready</span>
                            </div>
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 w-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Stats Section */}
    <section className="bg-slate-900 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
            <div key={idx} className="text-center group">
                <div className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</div>
                <div className="text-slate-400 font-medium text-sm md:text-base uppercase tracking-wider">{stat.label}
                </div>
            </div>
            ))}
        </div>
    </section>

    {/* Skills/Services Section */}
    <section id="services" className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm">Our Expertise</h2>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">Modern Skills for Modern Brands</h3>
                <p className="text-slate-600 text-base md:text-lg">Sandip Wireless bridges the gap between your brand and your
                    audience through proven digital channels.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service, idx) => (
                <div key={idx}
                    className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-blue-400 transition-all hover:-translate-y-1 shadow-sm hover:shadow-xl text-left">
                    <div className="mb-6 inline-block p-4 bg-slate-50 rounded-2xl">
                        {service.icon}
                    </div>
                    <h4 className="text-xl font-bold mb-4 text-slate-900">{service.title}</h4>
                    <p className="text-slate-600 leading-relaxed">{service.desc}</p>
                </div>
                ))}
            </div>
        </div>
    </section>

    {/* Portfolio Section */}
    <section id="work" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-6">
                <div className="max-w-2xl space-y-4 text-left">
                    <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm">Recent Projects</h2>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">Practical Application of Theory.</h3>
                </div>
                <button onClick={()=> scrollToSection('contact')}
                    className="text-blue-600 font-bold flex items-center gap-2 hover:gap-3 transition-all active:scale-95"
                    >
                    Start Your Project
                    <ExternalLink size={20} />
                </button>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
                {projects.map((project, idx) => (
                <div 
                    key={idx} 
                    className="group cursor-pointer text-left"
                    onClick={() => setActiveCaseStudy(project)}
                >
                    <div className="relative h-80 overflow-hidden rounded-3xl mb-6 shadow-lg">
                        <img src={project.img} alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div
                            className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full font-bold text-blue-600 text-sm shadow-sm">
                            {project.impact}
                        </div>
                    </div>
                    <span
                        className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-2 block">{project.category}</span>
                    <h4 className="text-2xl font-bold mb-3 text-slate-900">{project.title}</h4>
                    <p className="text-slate-600 mb-4">{project.description}</p>
                    <div
                        className="flex items-center text-slate-900 font-bold group-hover:text-blue-600 transition-colors">
                        View Case Study
                        <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
                ))}
            </div>
        </div>
    </section>

    {/* Contact Section */}
    <section id="contact" className="py-20 md:py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-start text-left">
            <div className="space-y-8">
                <div className="space-y-4">
                    <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm">Contact Us</h2>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight">Ready to boost your
                        frequency?</h3>
                    <p className="text-slate-600 text-base md:text-lg">Sandip Wireless is currently taking on new clients and
                        projects. Let's discuss how we can help your brand resonate in a crowded digital space.</p>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 rounded-xl">
                            <Mail className="text-blue-600" />
                        </div>
                        <div>
                            <div className="text-sm font-medium text-slate-500 mb-1">Email</div>
                            <div className="text-slate-900 font-bold">sandip2446@gmail.com</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 rounded-xl">
                            <FileText className="text-blue-600" />
                        </div>
                        <div>
                            <div className="text-slate-400 text-sm font-medium">Proposal</div>
                            <div className="text-slate-900 font-bold">Free Strategy Session</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 rounded-xl">
                            <CheckCircle2 className="text-blue-600" />
                        </div>
                        <div>
                            <div className="text-slate-400 text-sm font-medium">Status</div>
                            <div className="text-slate-900 font-bold">Accepting New Clients</div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="bg-slate-50 p-8 md:p-12 rounded-[2rem] border border-slate-200 shadow-sm transition-all duration-500">
                {submitted ? (
                <div className="text-center py-12 space-y-6">
                    <div
                        className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                        <CheckCircle2 size={40} />
                    </div>
                    <h4 className="text-3xl font-bold text-slate-900">Message Received!</h4>
                    <p className="text-slate-600">Thank you for reaching out to Sandip Wireless. We'll get back to you
                        within 24 hours.</p>
                    <button onClick={()=> setSubmitted(false)}
                        className="text-blue-600 font-bold hover:underline"
                        >
                        Send another message
                    </button>
                </div>
                ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                        <input required type="text" name="name" value={formState.name} onChange={handleInputChange}
                            placeholder="Your Name"
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Work Email</label>
                        <input required type="email" name="email" value={formState.email} onChange={handleInputChange}
                            placeholder="email@company.com"
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Service Required</label>
                        <select name="service" value={formState.service} onChange={handleInputChange}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all">
                            <option>Search Engine Optimization</option>
                            <option>Social Media Management</option>
                            <option>Paid Advertising</option>
                            <option>Full Digital Strategy</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Message</label>
                        <textarea required name="message" value={formState.message} onChange={handleInputChange}
                            rows="4" placeholder="Tell us about your goals..."
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"></textarea>
                    </div>

                    {error && <div className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg">{error}</div>}

                    <button disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70">
                        {isSubmitting ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            Sending...
                        </>
                        ) : 'Send Inquiry'}
                    </button>
                </form>
                )}
            </div>
        </div>
    </section>

    {/* Footer */}
    <footer className="py-12 bg-slate-50 border-t border-slate-200 px-6 text-center md:text-left w-full">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
                <div className="flex items-center gap-2 mb-2 justify-center md:justify-start cursor-pointer"
                    onClick={()=> window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <Radio className="text-blue-600" size={20} />
                    <div className="text-2xl font-black text-slate-900 tracking-tighter">SANDIP WIRELESS</div>
                </div>
                <p className="text-slate-500 text-sm">Elevating your digital frequency.</p>
            </div>

            <div className="flex space-x-6">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                    className="p-3 bg-white rounded-full border border-slate-200 hover:text-blue-600 hover:border-blue-600 transition-all">
                    <Briefcase size={20} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                    className="p-3 bg-white rounded-full border border-slate-200 hover:text-blue-400 hover:border-blue-400 transition-all">
                    <MessageSquare size={20} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                    className="p-3 bg-white rounded-full border border-slate-200 hover:text-pink-600 hover:border-pink-600 transition-all">
                    <Camera size={20} />
                </a>
            </div>

            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                Digital First • Global Reach
            </div>
        </div>
    </footer>

    {/* Modal Overlay */}
    {activeCaseStudy && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 sm:py-12">
        <div 
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
          onClick={() => setActiveCaseStudy(null)}
        ></div>
        
        <div className="relative bg-white rounded-3xl w-full max-w-4xl max-h-full overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-300 scroll-smooth">
          <button 
            onClick={() => setActiveCaseStudy(null)}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-slate-900 hover:bg-slate-100 transition-colors shadow-sm"
          >
            <X size={20} />
          </button>

          <div className="h-64 sm:h-80 relative w-full overflow-hidden rounded-t-3xl">
            <img 
              src={activeCaseStudy.img} 
              alt={activeCaseStudy.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <span className="bg-blue-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full mb-3 inline-block">
                {activeCaseStudy.category}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                {activeCaseStudy.title}
              </h2>
            </div>
          </div>

          <div className="p-6 sm:p-10 space-y-10 text-left">
            <div className="grid sm:grid-cols-2 gap-8 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Impact</div>
                <div className="text-2xl font-black text-blue-600">{activeCaseStudy.impact}</div>
              </div>
              <div>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Client Area</div>
                <div className="text-xl font-bold text-slate-900">{activeCaseStudy.title.split(' ')[0]} Business</div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Target className="text-blue-600" /> The Challenge
              </h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {activeCaseStudy.challenge}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Layers className="text-indigo-600" /> Our Strategy
              </h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {activeCaseStudy.strategy}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="text-green-600" /> The Results
              </h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {activeCaseStudy.detailedResults}
              </p>
            </div>
            
            <div className="pt-6 border-t border-slate-100 flex justify-end">
                 <button 
                      onClick={() => {
                            setActiveCaseStudy(null);
                            setTimeout(() => scrollToSection('contact'), 50);
                      }}
                      className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all flex border-0 cursor-pointer"
                 >
                      Start a Similar Project
                 </button>
            </div>
          </div>
        </div>
      </div>
    )}
    
    <ChatBud />
</div>
);
};

export default Home;
