# Sandip Wireless | Digital Growth Agency

This repository contains the full source code for the Sandip Wireless modern marketing portfolio. 
The application is structured as a blazing-fast React Application heavily optimized for Google metrics, featuring dynamic Glassmorphism UI processing, autonomous conversational AI routing, and sub-domain Firebase Hosting integrated with Web3Forms real-time email triggers.

**Tech Stack:** React, Vite, Tailwind v4, React-Router-Dom, Firebase Hosting, Lucide Icons

---

## 🚀 The Daily Development Workflow

Any time you make a change to the codebase (such as publishing a new blog article, modifying the ChatBud's intelligence database, or tweaking the primary CSS colors), you need to back up your changes to GitHub and push them to the live website.

From your application terminal, follow these steps in exact order:

### 1. Back Up Your Code (GitHub)

**Stage all modified files for backup:**
```bash
git add .
```

**Package the files with a descriptive note:**
```bash
git commit -m "Describe the exact feature you just built or color you just changed"
```

**Securely push to GitHub:**
```bash
git push
```

---

### 2. Deploy to the Live Public Internet (Firebase)

Backing up the code to GitHub does *not* automatically update the public website URL. To push your fresh code directly to users at `sandipwireless.web.app`, run these commands:

**Compress all React files into a high-speed production `/dist` folder:**
```bash
npm run build
```

**Upload the raw `/dist` bundle to Google's hosting infrastructure:**
```bash
npx firebase-tools deploy --only hosting
```
# sandipWireless
