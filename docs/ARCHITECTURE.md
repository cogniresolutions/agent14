# Agent14 Platform Architecture

> **Version:** 1.0  
> **Last Updated:** December 2024  
> **Document Type:** Technical Architecture Overview

---

## Architecture Diagram

![Agent14 Architecture Diagram](./architecture-diagram.jpg)

**Diagram Legend (top to bottom):**
| Icon | Layer | Description |
|------|-------|-------------|
| 👤 User | Users | Web & Mobile browsers accessing the platform |
| 🖥️ Monitor | Frontend | React application with authentication & chatbot UI |
| ☁️ Cloud/Server | Backend | API Gateway, Authentication, Database services |
| 🤖 Robot | Salesforce Agentforce | AI Chatbot with Einstein Trust Layer security |

---

## Executive Summary

Agent14 is a secure, AI-powered restaurant reservation platform that leverages Salesforce Agentforce for intelligent booking management. The platform implements enterprise-grade security through Cloudflare protection and Salesforce Einstein Trust Layer.

---

## System Architecture Overview

```mermaid
flowchart TB
    subgraph Users["👥 Users"]
        Web["🌐 Web Browser"]
        Mobile["📱 Mobile Browser"]
    end

    subgraph Cloudflare["☁️ Cloudflare Security Layer"]
        DNS["DNS & CDN"]
        WAF["WAF & DDoS Protection"]
        Turnstile["🔐 Turnstile Bot Protection"]
    end

    subgraph Frontend["💻 Frontend Application"]
        ReactApp["⚛️ React Web Application"]
        AuthUI["🔑 Authentication UI"]
        ChatUI["💬 Chatbot Interface"]
        CookieConsent["🍪 Cookie Consent Manager"]
    end

    subgraph Backend["⚙️ Backend Services"]
        API["🔌 API Gateway"]
        Auth["🔐 Authentication Service"]
        TurnstileVerify["✅ Turnstile Verification"]
        DB["🗄️ Database"]
        Storage["📁 File Storage"]
    end

    subgraph Salesforce["☁️ Salesforce Agentforce"]
        Agent["🤖 AI Chatbot Agent"]
        
        subgraph Einstein["🧠 Einstein Trust Layer"]
            PromptGuard["🛡️ Prompt Injection Detection"]
            DataMask["🔒 Data Masking"]
            Toxicity["⚠️ Toxicity Detection"]
            Audit["📋 Audit Trail"]
        end
        
        Topics["📝 Topic Actions & Boundaries"]
        DataPolicy["📊 Data Access Policies"]
    end

    %% User Flow
    Web --> DNS
    Mobile --> DNS
    DNS --> WAF
    WAF --> Turnstile
    
    %% Frontend Connections
    Turnstile --> ReactApp
    ReactApp --> AuthUI
    ReactApp --> ChatUI
    ReactApp --> CookieConsent
    
    %% Backend Connections
    AuthUI --> API
    ChatUI --> API
    API --> Auth
    API --> TurnstileVerify
    Auth --> DB
    API --> Storage
    
    %% Salesforce Integration
    API --> Agent
    Agent --> Einstein
    Einstein --> PromptGuard
    Einstein --> DataMask
    Einstein --> Toxicity
    Einstein --> Audit
    Agent --> Topics
    Agent --> DataPolicy
    
    %% Return paths
    Agent -.-> API
    API -.-> ChatUI

    classDef cloudflare fill:#f48120,stroke:#f48120,color:#fff
    classDef frontend fill:#61dafb,stroke:#61dafb,color:#000
    classDef backend fill:#68a063,stroke:#68a063,color:#fff
    classDef salesforce fill:#00a1e0,stroke:#00a1e0,color:#fff
    classDef security fill:#e74c3c,stroke:#e74c3c,color:#fff
    
    class DNS,WAF,Turnstile cloudflare
    class ReactApp,AuthUI,ChatUI,CookieConsent frontend
    class API,Auth,TurnstileVerify,DB,Storage backend
    class Agent,Topics,DataPolicy salesforce
    class PromptGuard,DataMask,Toxicity,Audit security
```

---

## Component Descriptions

### 1. Cloudflare Security Layer

| Component | Description |
|-----------|-------------|
| **DNS & CDN** | Global content delivery network with intelligent DNS routing for optimal performance |
| **WAF & DDoS Protection** | Web Application Firewall protecting against common attacks and distributed denial of service |
| **Turnstile Bot Protection** | Privacy-preserving CAPTCHA alternative that verifies human users without intrusive challenges |

### 2. Frontend Application

| Component | Description |
|-----------|-------------|
| **React Web Application** | Modern, responsive single-page application built with React and TypeScript |
| **Authentication UI** | Email/password and phone OTP authentication interfaces |
| **Chatbot Interface** | Floating chat widget for AI-powered reservation management |
| **Cookie Consent Manager** | GDPR-compliant cookie consent with granular preferences |

### 3. Backend Services

| Component | Description |
|-----------|-------------|
| **API Gateway** | Centralized API management with rate limiting and request validation |
| **Authentication Service** | Secure user authentication with JWT tokens and session management |
| **Turnstile Verification** | Server-side verification of Cloudflare Turnstile tokens |
| **Database** | PostgreSQL database with Row Level Security (RLS) policies |
| **File Storage** | Secure file storage for user uploads and assets |

### 4. Salesforce Agentforce

| Component | Description |
|-----------|-------------|
| **AI Chatbot Agent** | Conversational AI handling all reservation operations |
| **Topic Actions & Boundaries** | Defined conversation scope and allowed actions |
| **Data Access Policies** | Fine-grained control over data the AI can access |

### 5. Einstein Trust Layer (Security)

| Component | Description |
|-----------|-------------|
| **Prompt Injection Detection** | Real-time detection and blocking of prompt injection attacks |
| **Data Masking** | Automatic masking of sensitive data in AI responses |
| **Toxicity Detection** | Filtering of harmful or inappropriate content |
| **Audit Trail** | Complete logging of all AI interactions for compliance |

---

## Salesforce Agentforce Internal Architecture

![Salesforce Agentforce Architecture](./salesforce-agentforce-architecture.jpg)

**Diagram Legend (center hub with connected components):**

| Color | Icon | Component | Description |
|-------|------|-----------|-------------|
| 🔵 Blue (Center) | Robot | **AI Agent** | Core Agentforce conversational AI engine |
| 🟣 Purple | Document | **Topics & Actions** | Defines conversation scope, allowed intents, and action boundaries |
| 🔴 Red | Gears | **Agent Actions** | Executable operations (create reservation, modify booking, cancel) |
| 🟠 Orange | Shield | **Guardrails** | Safety boundaries preventing harmful or off-topic responses |
| 🟡 Yellow | Settings | **Einstein GPT** | Generative AI engine powering natural language understanding |
| 🟣 Dark Purple | Cloud | **Data Cloud** | Unified customer data platform for personalization |
| 🔵 Teal | Person | **Service Cloud** | Customer service integration for case escalation |
| 🟢 Green | Person | **Sales Cloud CRM** | Customer relationship data and booking history |

### Agentforce Component Details

```mermaid
flowchart TB
    subgraph AgentCore["🤖 Agentforce Core"]
        Agent["AI Agent Engine"]
        NLU["Natural Language Understanding"]
        Dialog["Dialog Management"]
    end

    subgraph Topics["📝 Topics & Actions"]
        ResTopic["Reservation Topic"]
        ModTopic["Modification Topic"]
        CancelTopic["Cancellation Topic"]
        InfoTopic["Information Topic"]
    end

    subgraph Actions["⚡ Agent Actions"]
        CreateRes["Create Reservation"]
        ModifyRes["Modify Booking"]
        CancelRes["Cancel Booking"]
        CheckAvail["Check Availability"]
    end

    subgraph Guardrails["🛡️ Guardrails"]
        Boundary["Topic Boundaries"]
        Restrict["Action Restrictions"]
        Escalate["Human Escalation Rules"]
    end

    subgraph Einstein["🧠 Einstein Platform"]
        GPT["Einstein GPT"]
        Trust["Einstein Trust Layer"]
        Copilot["Einstein Copilot"]
    end

    subgraph DataSources["📊 Data Sources"]
        DataCloud["Data Cloud"]
        ServiceCloud["Service Cloud"]
        SalesCRM["Sales Cloud CRM"]
        Knowledge["Knowledge Base"]
    end

    subgraph Flows["⚙️ Automation"]
        SFFlow["Salesforce Flow"]
        Apex["Apex Triggers"]
        Integration["External APIs"]
    end

    %% Core connections
    Agent --> NLU
    NLU --> Dialog
    Dialog --> Topics
    
    %% Topic to Action
    ResTopic --> CreateRes
    ModTopic --> ModifyRes
    CancelTopic --> CancelRes
    InfoTopic --> CheckAvail
    
    %% Guardrails
    Topics --> Guardrails
    Actions --> Guardrails
    
    %% Einstein
    Agent --> Einstein
    GPT --> Trust
    Trust --> Agent
    
    %% Data Sources
    Agent --> DataSources
    DataCloud --> Agent
    Knowledge --> Agent
    
    %% Automation
    Actions --> Flows
    SFFlow --> Integration

    classDef core fill:#00a1e0,stroke:#00a1e0,color:#fff
    classDef topics fill:#9b59b6,stroke:#9b59b6,color:#fff
    classDef actions fill:#e74c3c,stroke:#e74c3c,color:#fff
    classDef guard fill:#f39c12,stroke:#f39c12,color:#fff
    classDef einstein fill:#1abc9c,stroke:#1abc9c,color:#fff
    classDef data fill:#3498db,stroke:#3498db,color:#fff
    classDef flow fill:#27ae60,stroke:#27ae60,color:#fff

    class Agent,NLU,Dialog core
    class ResTopic,ModTopic,CancelTopic,InfoTopic topics
    class CreateRes,ModifyRes,CancelRes,CheckAvail actions
    class Boundary,Restrict,Escalate guard
    class GPT,Trust,Copilot einstein
    class DataCloud,ServiceCloud,SalesCRM,Knowledge data
    class SFFlow,Apex,Integration flow
```

### How Agentforce Processes a Reservation Request

```mermaid
sequenceDiagram
    participant User
    participant Agent as AI Agent
    participant NLU as NLU Engine
    participant Topic as Topic Router
    participant Guard as Guardrails
    participant Trust as Einstein Trust Layer
    participant Action as Agent Action
    participant Flow as Salesforce Flow
    participant Data as Data Cloud

    User->>Agent: "Book a table for 4 tonight at 7pm"
    Agent->>Trust: Security scan (prompt injection check)
    Trust-->>Agent: ✅ Safe input
    Agent->>NLU: Parse intent & entities
    NLU-->>Agent: Intent: CREATE_RESERVATION, Entities: {party_size: 4, time: 19:00, date: today}
    Agent->>Topic: Route to Reservation Topic
    Topic->>Guard: Check topic boundaries
    Guard-->>Topic: ✅ Within scope
    Topic->>Action: Execute "Create Reservation"
    Action->>Data: Fetch customer preferences
    Data-->>Action: Customer history & preferences
    Action->>Flow: Trigger reservation flow
    Flow-->>Action: Reservation confirmed #RES-12345
    Action-->>Agent: Success response
    Agent->>Trust: Mask sensitive data
    Trust-->>Agent: Safe response
    Agent-->>User: "Your table for 4 is confirmed for tonight at 7pm. Confirmation: #RES-12345"
```

### Salesforce Integration Points

| Salesforce Product | Integration Purpose |
|--------------------|---------------------|
| **Data Cloud** | Unified customer profiles, preferences, dining history |
| **Service Cloud** | Case escalation, human agent handoff, support tickets |
| **Sales Cloud** | CRM data, loyalty program, customer relationships |
| **Einstein GPT** | Natural language generation, response personalization |
| **Einstein Trust Layer** | Security scanning, data masking, toxicity detection |
| **Salesforce Flow** | Business process automation, reservation workflows |
| **Knowledge Base** | Restaurant info, menu details, policies, FAQs |
| **MuleSoft** | External system integrations (POS, payment systems) |

### Guardrail Configuration

| Guardrail Type | Configuration |
|----------------|---------------|
| **Topic Boundaries** | Agent only discusses reservations, restaurant info, loyalty program |
| **Action Restrictions** | Cannot access payment details, cannot modify past reservations |
| **Data Access** | Read-only access to customer history, no PII in responses |
| **Escalation Triggers** | Complaints, refund requests, special accommodations |
| **Response Limits** | Max 500 characters, no external links, professional tone |

---

## Data Flow Sequence

```mermaid
sequenceDiagram
    participant U as User
    participant CF as Cloudflare
    participant FE as Frontend
    participant BE as Backend
    participant SF as Salesforce Agentforce
    participant ET as Einstein Trust Layer

    Note over U,ET: User Access Flow
    U->>CF: Access Website
    CF->>CF: DDoS & WAF Check
    CF->>U: Turnstile Challenge
    U->>CF: Complete Challenge
    CF->>BE: Verify Token
    BE->>CF: Token Valid
    CF->>FE: Allow Access

    Note over U,ET: Authentication Flow
    U->>FE: Login Request
    FE->>BE: Authenticate
    BE->>BE: Validate Credentials
    BE->>FE: JWT Token
    FE->>U: Access Granted

    Note over U,ET: Reservation Flow
    U->>FE: Open Chatbot
    FE->>BE: Send Message
    BE->>SF: Forward to Agentforce
    SF->>ET: Security Check
    ET->>ET: Prompt Injection Scan
    ET->>ET: Data Masking
    ET->>SF: Approved Request
    SF->>SF: Process Reservation
    SF->>BE: Response
    BE->>FE: Display Response
    FE->>U: Show Confirmation
```

---

## Security Architecture

### Multi-Layer Security Model

```mermaid
flowchart LR
    subgraph Layer1["Layer 1: Edge Security"]
        A1["Cloudflare WAF"]
        A2["DDoS Protection"]
        A3["Bot Detection"]
    end

    subgraph Layer2["Layer 2: Application Security"]
        B1["Turnstile Verification"]
        B2["JWT Authentication"]
        B3["Session Management"]
    end

    subgraph Layer3["Layer 3: Data Security"]
        C1["Row Level Security"]
        C2["Encrypted Storage"]
        C3["Access Policies"]
    end

    subgraph Layer4["Layer 4: AI Security"]
        D1["Prompt Injection Guard"]
        D2["Data Masking"]
        D3["Toxicity Filters"]
    end

    Layer1 --> Layer2 --> Layer3 --> Layer4

    classDef edge fill:#f48120,stroke:#f48120,color:#fff
    classDef app fill:#61dafb,stroke:#61dafb,color:#000
    classDef data fill:#68a063,stroke:#68a063,color:#fff
    classDef ai fill:#00a1e0,stroke:#00a1e0,color:#fff

    class A1,A2,A3 edge
    class B1,B2,B3 app
    class C1,C2,C3 data
    class D1,D2,D3 ai
```

### Prompt Injection Protection

The platform is protected against six categories of prompt injection attacks:

| Attack Category | Protection Mechanism |
|----------------|---------------------|
| **Direct Prompt Injection** | Einstein Trust Layer pattern detection |
| **Information Extraction** | Data Access Policies & masking |
| **Jailbreak Attempts** | Topic Actions & Boundaries |
| **Indirect Prompt Injection** | Input sanitization & validation |
| **Context Manipulation** | Conversation context isolation |
| **Encoding/Obfuscation** | Multi-layer input normalization |

---

## Compliance & Standards

| Standard | Compliance Status |
|----------|------------------|
| **GDPR** | ✅ Compliant |
| **CCPA** | ✅ Compliant |
| **PCI DSS** | ✅ Compliant (via Salesforce) |
| **SOC 2** | ✅ Compliant (via infrastructure providers) |
| **LGPD** | ✅ Compliant |
| **POPIA** | ✅ Compliant |
| **PDPA** | ✅ Compliant |
| **PIPEDA** | ✅ Compliant |

---

## Infrastructure Summary

| Aspect | Technology |
|--------|------------|
| **Frontend** | React, TypeScript, Tailwind CSS, Vite |
| **Backend** | Edge Functions, PostgreSQL |
| **AI Platform** | Salesforce Agentforce with Einstein Trust Layer |
| **CDN & Security** | Cloudflare (DNS, CDN, WAF, Turnstile) |
| **Authentication** | Email/Password, Phone OTP |
| **Hosting** | Globally distributed edge network |

---

## Contact

For technical questions about this architecture, please contact the Agent14 development team.

---

*This document is confidential and intended for stakeholder review only.*
