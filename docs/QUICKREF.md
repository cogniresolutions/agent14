# Agent14 Quick Reference Card

> **Last Updated:** December 2024  
> Quick reference for key architecture decisions, components, and patterns.

---

## 🎯 Core Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Reservation System** | Chatbot-only | All bookings via AI chatbot, no traditional forms |
| **AI Backend** | Salesforce Agentforce | Enterprise-grade, built-in trust layer |
| **Bot Protection** | Cloudflare Turnstile | Human verification before site access |
| **Authentication** | Email + Phone OTP | Dual-factor options via Supabase Auth |
| **Database** | Supabase (PostgreSQL) | Real-time, RLS security, edge functions |
| **Frontend** | React + Vite + Tailwind | Fast builds, utility-first CSS |
| **Security Layer** | Einstein Trust Layer | Prompt injection protection |

---

## 🏗️ System Layers

```
┌─────────────────────────────────────────────────┐
│  LAYER 1: SECURITY                              │
│  Cloudflare Turnstile → Bot Protection          │
├─────────────────────────────────────────────────┤
│  LAYER 2: FRONTEND                              │
│  React SPA → Auth → Loyalty Program → Chatbot   │
├─────────────────────────────────────────────────┤
│  LAYER 3: AI AGENT                              │
│  Salesforce Agentforce → Einstein Trust Layer   │
└─────────────────────────────────────────────────┘
```

---

## 📦 Key Components

### Security Components
| Component | Location | Purpose |
|-----------|----------|---------|
| `SecurityGate` | `src/components/security/` | Turnstile verification wrapper |
| `TurnstileWidget` | `src/components/security/` | Cloudflare challenge widget |
| `verify-turnstile` | `supabase/functions/` | Server-side token validation |

### Chatbot Components
| Component | Location | Purpose |
|-----------|----------|---------|
| `FloatingChatButton` | `src/components/chatbot/` | Bottom-right chat trigger |
| `SalesforceChatbot` | `src/components/chatbot/` | Agentforce integration |

### Landing Page Components
| Component | Location | Purpose |
|-----------|----------|---------|
| `Header` | `src/components/landing/` | Navigation, auth buttons |
| `Hero` | `src/components/landing/` | Main hero section |
| `Features` | `src/components/landing/` | Platform features showcase |
| `HowItWorks` | `src/components/landing/` | 3-step process explanation |
| `LoyaltyProgram` | `src/components/landing/` | Membership benefits |
| `FAQ` | `src/components/landing/` | Common questions |
| `Footer` | `src/components/landing/` | Links, legal pages |

---

## 🔐 Security Patterns

### Access Control Flow
```
User → Turnstile Challenge → Auth (Login/Signup) → Loyalty Member → Chatbot
```

### Critical Security Rules
- ✅ Chatbot only accessible after Turnstile verification
- ✅ Chatbot only accessible to authenticated users
- ✅ Loyalty points are immutable by users (server-side only)
- ✅ RLS policies on all database tables
- ✅ Einstein Trust Layer protects against prompt injection

---

## 🗄️ Database Tables

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `profiles` | User profile data | `id`, `email`, `full_name`, `phone` |
| `loyalty_members` | Membership status | `user_id`, `points`, `tier`, `total_bookings` |
| `loyalty_offers` | Available rewards | `title`, `points_required`, `min_tier` |

### Loyalty Tiers
| Tier | Points Required |
|------|-----------------|
| Bronze | 0 |
| Silver | 500 |
| Gold | 1500 |
| Platinum | 5000 |

---

## 🛣️ Application Routes

| Route | Page | Auth Required |
|-------|------|---------------|
| `/` | Landing Page | No |
| `/auth` | Login/Signup | No |
| `/reset-password` | Password Reset | No |
| `/security` | Security Features | No |
| `/api-documentation` | API Docs | No |
| `/privacy-policy` | Privacy Policy | No |
| `/terms-of-service` | Terms of Service | No |
| `/cookie-policy` | Cookie Policy | No |
| `/status` | System Status | No |
| `/blog` | Blog | No |

---

## 🔧 Edge Functions

| Function | Endpoint | Purpose |
|----------|----------|---------|
| `verify-turnstile` | `POST` | Validate Turnstile token |
| `turnstile-config` | `GET` | Serve site key to frontend |

---

## 🎨 Design System

### Theme: Light Elegant (Navy + Gold)
| Token | Usage |
|-------|-------|
| `--primary` | Navy blue - main brand |
| `--accent` | Gold - highlights, CTAs |
| `--background` | Light cream/white |
| `--foreground` | Dark text |

### Key Patterns
- Floating chatbot button (bottom-right)
- Cookie consent banner (delayed 1.5s)
- Responsive mobile-first design

---

## 📋 Compliance Checklist

- [x] GDPR - Cookie consent, data rights
- [x] PCI DSS - Payment data handling
- [x] CCPA - California privacy
- [x] SOC 2 - Security controls
- [x] HIPAA - Data protection patterns

---

## 🚀 Quick Commands

```bash
# Development
npm run dev

# Build
npm run build

# Deploy edge functions
supabase functions deploy verify-turnstile
supabase functions deploy turnstile-config
```

---

## 📞 Key Integrations

| Service | Purpose | Config Location |
|---------|---------|-----------------|
| Supabase | Auth, DB, Functions | `src/integrations/supabase/` |
| Cloudflare | Bot protection | Edge function secrets |
| Salesforce | AI Chatbot | Embedded in `SalesforceChatbot` |

---

## 📚 Related Docs

- [Full Architecture](./ARCHITECTURE.md) - Complete technical documentation
- [Architecture HTML](./ARCHITECTURE.html) - Offline/print version
- [Docs README](./README.md) - Documentation guidelines

---

*For detailed information, see the full [ARCHITECTURE.md](./ARCHITECTURE.md) document.*
