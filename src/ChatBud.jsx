import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { sendEmailRoute } from './emailService';

// --- CHAT BUD ADVANCED KNOWLEDGE BASE ---
const defaultIntents = [
  {
    keywords: ['hi', 'hello', 'hey', 'greetings', 'morning', 'afternoon', 'evening', 'howdy', 'yo', 'sup'],
    responses: [
      "Hi there! 👋 I'm SandipBot. How can I help you grow your business today?",
      "Hello! Great to meet you. What brings you to Sandip Wireless?",
      "Hey! Need help exploring our digital marketing and growth services?"
    ]
  },
  {
    keywords: ['bye', 'goodbye', 'see ya', 'cya', 'later', 'farewell'],
    responses: [
      "Goodbye! Feel free to leave your email below if you want us to reach out later. 👋",
      "Catch you later! Don't hesitate to drop your email if you need anything else."
    ]
  },
  {
    keywords: ['thanks', 'thank you', 'appreciate it', 'awesome', 'cool', 'sounds good', 'great', 'nice', 'perfect', 'ok', 'okay'],
    responses: [
      "You're very welcome! Let me know if you need anything else.",
      "Anytime! I'm always here if you have more questions.",
      "Glad I could help! Would you like to schedule a free strategy session via our contact form?"
    ]
  },
  {
    keywords: ['services', 'offer', 'do you do', 'what can you do', 'help me with', 'marketing', 'what is this'],
    responses: [
      "We offer a full suite of digital growth services! Specifically: SEO, Paid Ads (Meta/Google), Social Media Management, and Email Marketing. What are you looking to improve?",
      "Our main expertise includes SEO, Google/Meta Ads, Social Media, and Email automations. We focus on bridging the gap between awareness and conversion."
    ]
  },
  {
    keywords: ['seo', 'search engine', 'ranking', 'google search', 'organic traffic', 'keywords'],
    responses: [
      "Our SEO process is built on data. We start with a comprehensive keyword audit and content gap analysis, then optimize your on-page elements, fix technical issues, and execute a solid internal linking framework. Eager to get to page one?",
      "We love SEO! We focus on long-tail, high-intent keywords that actually drive conversions, not just vanity metrics. Have you run an SEO audit on your site recently?"
    ]
  },
  {
    keywords: ['ads', 'ppc', 'paid', 'advertising', 'facebook ads', 'google ads', 'meta ads', 'roas', 'cpa'],
    responses: [
      "A successful paid ad system requires constant testing! We implement rapid A/B creative testing (especially hook-driven UGC videos) across Meta and Google to drive down your CPA and push your ROAS up.",
      "Whether it's Meta Ads or Google PPC, we focus heavily on Conversion Rate Optimization (CRO). We cycle through dozens of creatives to find the winning variation for your specific niche."
    ]
  },
  {
    keywords: ['social media', 'instagram', 'tiktok', 'facebook', 'content calendar', 'followers', 'engagement'],
    responses: [
      "Social media isn't just about posting—it's about community and brand presence. We design engaging content calendars and run targeted campaigns (like our 'Local Favorites' strategies) to build real, foot-traffic driving engagement.",
      "We can manage your full social stack! From creating high-quality, engaging visuals to managing community interactions so your brand stays top-of-mind."
    ]
  },
  {
    keywords: ['email', 'newsletter', 'drip', 'flows', 'klaviyo', 'mailchimp', 'inbox'],
    responses: [
      "Email marketing is the best way to own your audience. We design beautiful newsletters and build automated flows (like abandoned cart or welcome series) to nurture leads and build fierce customer loyalty.",
      "Want to boost your retention? We set up targeted email automations to make sure you're capitalizing on your existing customer base without paying for ads!"
    ]
  },
  {
    keywords: ['price', 'cost', 'pricing', 'charge', 'money', 'fee', 'budget', 'expensive', 'cheap', 'how much'],
    responses: [
      "Because every business needs a different mix of services (from local SEO to massive full-funnel paid systems), our pricing is entirely custom. We recommend grabbing a free strategy session with us first!",
      "We build custom quotes tailored exactly to your growth goals and timeline. If you drop your details in the contact form, our human team can reach out to discuss a realistic budget."
    ]
  },
  {
    keywords: ['where are you', 'location', 'located', 'address', 'city', 'office', 'based in', 'where you from'],
    responses: [
      "We are a Digital First, Global Reach agency! This means we work remotely and efficiently with clients all over the world. Our digital nature lets us move fast and scale globally.",
      "Sandip Wireless is a modern, remote-first agency. We collaborate with brands internationally, ensuring your digital growth never sleeps!"
    ]
  },
  {
    keywords: ['how long', 'timeline', 'timeframe', 'how fast', 'when can you start', 'speed', 'duration'],
    responses: [
      "Our timeline depends on the service! Paid ads can start showing results in a few weeks as we test creatives, whereas organic SEO is a longer play (usually 3-6 months to see massive ranking shifts).",
      "We move as fast as you need! Depending on your goals—rapid PPC testing vs long-term SEO—timelines vary. We outline all of this in our free strategy session."
    ]
  },
  {
    keywords: ['why you', 'why sandip', 'guarantee', 'better than', 'competitive advantage', 'why choose'],
    responses: [
      "We don't just 'do marketing'; we bridge the gap. We are completely CRO-focused, meaning every cent of your budget is optimized for action and conversion, not just vanity impressions.",
      "We pride ourselves on practical application over theory. We treat your ad budget like our own and rely solely on data to drive our creative A/B testing and SEO strategies."
    ]
  },
  {
    keywords: ['contact', 'hire', 'phone', 'call', 'reach out', 'talk to someone', 'get in touch', 'book'],
    responses: [
      "You can email us directly at sandip2446@gmail.com! Or, scroll down to the bottom of the page and fill out the contact form.",
      "I'd love to put you in touch with a human! Please fill out the contact form at the bottom of the webpage to book your Free Strategy Session."
    ]
  },
  {
    keywords: ['portfolio', 'projects', 'case study', 'results', 'examples', 'work', 'past clients', 'show me'],
    responses: [
      "We've helped local cafes boost foot traffic by 45%, and e-commerce stores hit 2.1x ROAS on initial campaigns! Check out the 'Recent Projects' section on our site.",
      "Our portfolio is all about data. We've pushed heavy tech blogs to Page 1 of Google and scaled niche dropshipping stores. Click 'View Case Study' on the cards below!"
    ]
  },
  {
    keywords: ['who are you', 'are you human', 'bot', 'robot', 'ai', 'artificial intelligence', 'real person', 'who built you'],
    responses: [
      "I'm SandipBot, the highly intelligent virtual assistant built for Sandip Wireless! I'm made of 100% pure JavaScript, but I'm told I have a great personality. 🤖",
      "I am an autonomous chat agent built by the Sandip Wireless engineering team to help answer your questions! No APIs, just extremely smart coding. 🚀"
    ]
  }
];

const LOCAL_STORAGE_KEY = 'sandipbot_learned_intents';

// --- SEVERE NLP ENGINE ---
const parseIntent = (input, activeIntents) => {
  const normalizedInput = input.toLowerCase().trim();
  const rawTokens = normalizedInput.replace(/[^\w\s]/gi, '').split(/\s+/);
  
  const stopWords = ['a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'for', 'if', 'in', 'into', 'is', 'it', 'no', 'not', 'of', 'on', 'or', 'such', 'that', 'the', 'their', 'then', 'there', 'these', 'they', 'this', 'to', 'was', 'will', 'with', 'what', 'can', 'you', 'how', 'me', 'do', 'i', 'my', 'we', 'about', 'some'];
  const tokens = rawTokens.filter(t => !stopWords.includes(t) && t.length > 0);

  let bestMatch = null;
  let highestScore = 0;

  for (const intent of activeIntents) {
    let score = 0;
    
    for (const keyword of intent.keywords) {
      if (keyword.includes(' ') && normalizedInput.includes(keyword)) {
        score += 15;
      } 
      else {
        tokens.forEach(token => {
           if (keyword === token) score += 5;
           else if (keyword.length > 3 && token.includes(keyword)) score += 2;
           else if (token.length > 3 && keyword.includes(token)) score += 2;
        });
      }
    }
    
    if (score > highestScore) {
      highestScore = score;
      bestMatch = intent;
    }
  }

  // Minimum threshold required
  if (bestMatch && highestScore >= 4) {
    return { 
      type: 'response', 
      text: bestMatch.responses[Math.floor(Math.random() * bestMatch.responses.length)] 
    };
  }

  // Fallback: Neural DOM Web Scraping
  if (tokens.length > 0) {
    const scrapedAnswer = scrapeDOMForAnswer(tokens);
    if (scrapedAnswer) {
      return { 
        type: 'response', 
        text: `I actually found something highly relevant on this page: "${scrapedAnswer}" Does that help answer your question?` 
      };
    }
  }

  // Absolute Catch-All Default Fallback triggering TEACH MODE
  return { 
    type: 'triggerTeach', 
    text: "Hmm, I don't actually know the answer to that yet! Would you like to teach me how to respond?" 
  };
};

const scrapeDOMForAnswer = (tokens) => {
  try {
    const elements = document.querySelectorAll('h1, h2, h3, h4, p, span, div');
    
    let bestSentence = "";
    let bestScore = 0;

    elements.forEach(el => {
      const text = el.innerText || el.textContent;
      if (!text || text.length < 15 || text.length > 300) return;

      const lowerText = text.toLowerCase();
      let score = 0;

      for (const token of tokens) {
        if (lowerText.includes(token)) {
          score++;
        }
      }

      if (score > 1) {
          score += 2;
      }

      if (score > bestScore) {
        bestScore = score;
        bestSentence = text;
      }
    });

    if (bestScore >= 1) {
      return bestSentence.trim().replace(/\n/g, ' ');
    }
  } catch(e) {
    console.warn("SandipBot NLP Scraping failed:", e);
  }
  return null;
};

// --- COMPONENT UI ---
const ChatBud = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi there! 👋 I am the SandipBot Autonomous Assistant. How can I help you grow today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Teach Mode States
  const [teachingMode, setTeachingMode] = useState('idle'); // 'idle' | 'asking' | 'waitingForAnswer'
  const [pendingQuestion, setPendingQuestion] = useState('');
  const [activeIntents, setActiveIntents] = useState([]);

  const messagesEndRef = useRef(null);

  // Initialize Memory Bank on Boot
  useEffect(() => {
    const storedLearned = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedLearned) {
      try {
        const parsedLearned = JSON.parse(storedLearned);
        // Prepend learned intents so they have priority scoring over default
        setActiveIntents([...parsedLearned, ...defaultIntents]);
      } catch (e) {
        console.error("Failed to parse learned intents", e);
        setActiveIntents([...defaultIntents]);
      }
    } else {
      setActiveIntents([...defaultIntents]);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const simulateBotReply = (text, customDelayMultiplier = 25) => {
    setIsTyping(true);
    const typingDelay = Math.min(Math.max(text.length * customDelayMultiplier, 800), 2500);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'bot', text }]);
    }, typingDelay);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    const userMessage = { role: 'user', text: userText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // --- EMAIL INTELLIGENCE ROUTING ---
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
    const foundEmails = userText.match(emailRegex);
    
    if (foundEmails && foundEmails.length > 0) {
      // Fire payload to Web3Forms API
      sendEmailRoute("New SandipBot Chat Lead!", {
        lead_email: foundEmails[0],
        last_message: userText,
        chat_log: JSON.stringify([...messages, userMessage].map(m => `${m.role.toUpperCase()}: ${m.text}`).join(' || '))
      });
      
      simulateBotReply("Thanks for passing along your email! I have securely alerted our human team. Someone will be reaching out to you shortly.", 12);
      return;
    }

    // --- TEACH MODE INTERCEPTION ---
    if (teachingMode === 'asking') {
      const normalizedAns = userText.toLowerCase().replace(/[^\w\s]/gi, '');
      if (['yes', 'yeah', 'sure', 'ok', 'yep', 'absolutely', 'of course'].includes(normalizedAns)) {
        setTeachingMode('waitingForAnswer');
        simulateBotReply("Great! What should my exact response be when someone asks that?", 10);
      } else {
        setTeachingMode('idle');
        simulateBotReply("No worries! If there is anything else you need, let me know.", 10);
      }
      return;
    }

    if (teachingMode === 'waitingForAnswer') {
      // Build Learned Intent
      const rawTokens = pendingQuestion.toLowerCase().replace(/[^\w\s]/gi, '').split(/\s+/);
      const stopWords = ['a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'for', 'if', 'in', 'into', 'is', 'it', 'no', 'not', 'of', 'on', 'or', 'such', 'that', 'the', 'their', 'then', 'there', 'these', 'they', 'this', 'to', 'was', 'will', 'with', 'what', 'can', 'you', 'how', 'me', 'do', 'i', 'my', 'we', 'about', 'some'];
      
      // Keep meaningful single words, plus the entire exact phrase as a massive weighted match
      const newKeywords = [
        ...rawTokens.filter(t => !stopWords.includes(t) && t.length > 0),
        pendingQuestion.toLowerCase().trim()
      ];

      const newIntent = {
        keywords: newKeywords,
        responses: [userText] // the user's provided answer
      };

      // 1. Save to state memory
      setActiveIntents(prev => [newIntent, ...prev]);

      // 2. Save strictly the learned intents to LocalStorage for persistence
      try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        const parsedStored = stored ? JSON.parse(stored) : [];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([newIntent, ...parsedStored]));
      } catch (err) {
        console.warn("Could not commit memory to local storage.", err);
      }

      setTeachingMode('idle');
      setPendingQuestion('');
      
      simulateBotReply("Got it! I've permanently committed that to my memory bank. Need anything else?", 15);
      return;
    }

    // --- NORMAL NLP EXECUTION ---
    setIsTyping(true);
    
    // Tiny delay to let the UI breathe
    setTimeout(() => {
        const parsedResult = parseIntent(userText, activeIntents);
        
        if (parsedResult.type === 'triggerTeach') {
          setTeachingMode('asking');
          setPendingQuestion(userText);
          
          setIsTyping(false);
          setMessages(prev => [...prev, { role: 'bot', text: parsedResult.text }]);
        } else {
          setIsTyping(false);
          simulateBotReply(parsedResult.text);
        }
    }, 100);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[200] p-4 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 group"
      >
        <MessageSquare size={28} className="group-hover:animate-pulse" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 md:right-8 z-[200] w-[90vw] md:w-96 bg-white rounded-2xl shadow-2xl flex flex-col border border-slate-200 overflow-hidden h-[500px] max-h-[85vh] animate-in fade-in slide-in-from-bottom-5 duration-300 text-left">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex justify-between items-center text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm shadow-inner">
            <Bot size={22} />
          </div>
          <div>
            <div className="font-bold text-sm tracking-wide">SandipBot</div>
            <div className="text-xs text-blue-100 flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 bg-green-400 rounded-full inline-block animate-pulse"></span>
              Autonomous AI
            </div>
          </div>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-white hover:text-blue-100 transition-colors bg-white/10 p-2 rounded-full hover:bg-white/20 focus:outline-none"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[80%] rounded-2xl p-3.5 shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none'
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm rounded-bl-none flex gap-1.5 items-center">
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={teachingMode === 'waitingForAnswer' ? "Teach me the answer..." : "Ask me anything..."}
          className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-900 placeholder-slate-400"
        />
        <button 
          type="submit"
          disabled={!input.trim() || isTyping}
          className="p-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:hover:bg-blue-600 flex items-center justify-center shrink-0 w-11 h-11 shadow-sm active:scale-95"
        >
          <Send size={18} className="ml-1" />
        </button>
      </form>
    </div>
  );
};

export default ChatBud;
