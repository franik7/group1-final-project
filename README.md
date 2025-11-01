# 🏛️ **Kura Capital LLC — AI Compliance Command Center (AC³)**
**Tagline:** *"From Regulatory Chaos to One-Click Compliance"*

---

## Executive Summary

**Kura Capital LLC** presents the **AI Compliance Command Center (AC³)** — a ServiceNow-based system that transforms AI compliance from reactive to proactive governance.  
The platform automates compliance for **two active AI laws**:

- **EU AI Act Article 4** — mandates documented AI literacy training.  
  **Penalty:** €15 million or 3 % of global turnover  
- **NYC Local Law 144** — requires annual bias audits for AI hiring tools.  
  **Penalty:** $500–$1,500 per day per violation  

Current approaches rely on Excel tracking and fragmented audits.  
**AC³** introduces continuous, AI-driven oversight, replacing weeks of manual work with automated **regulatory monitoring**, **training enrollment**, **bias auditing**, and **tamper-proof evidence generation** — all inside ServiceNow.

---

## 🔍 Core Modules

### 1. Regulatory Monitoring
- 24/7 data ingestion from **EUR-Lex (EU)** and **Federal Register (US)** using Google Cloud Run and REST APIs.  
- Automatic classification, scoring, and alert creation in ServiceNow.  
- Cross-jurisdiction correlation between EU AI Act and NYC LL144 updates.

### 2. AI Literacy Compliance (EU AI Act Article 4)
- Auto-enrolls staff requiring AI literacy based on role and system access.  
- Integrates React + Firebase training site with ServiceNow via n8n.  
- Generates **SHA-256 signed Evidence Packs** verifying training completion.  
- Updates compliance status in real time.

### 3. Bias Audit Compliance (NYC LL 144)
- Aggregates anonymized applicant data from AI hiring tools (AEDTs).  
- Computes selection / scoring impact ratios; flags < 0.8 values.  
- Coordinates internal audits or external auditors via MCP Server.  
- Signs reports and ratios into cryptographic **Evidence Packs**.

### 4. Autonomous Compliance Orchestrator (ACO)
- Supervises AI agent activity across systems.  
- Detects risk and ethical non-compliance in real time.  
- Integrates with regulatory alerts and audit data.

---

## 🧩 System Architecture

| Layer | Shared Components | EU-Specific | NYC-Specific |
|:--|:--|:--|:--|
| 1 Data Ingestion | Cloud Run proxy + Federal Register API | EUR-Lex SPARQL | FR REST API |
| 2 Core Tables | AI Systems / Evidence Packs / Employees | — | — |
| 3 Alert Processing | Regulatory Alerts & Processing Tables | AI Act Alerts | LL144 Alerts |
| 4 Process Flows | — | Training Enrollments / AI Access | Applicants / Bias Audits |
| 5 External Interface | MCP / n8n | Training Agent | External Auditor |
| 6 Evidence Generation | Digital Signature Agent (SHA-256 + salt) | Training Packs | Audit Packs |
| 7 Compliance Logic | Unified Compliance Status | Training Completion Update | Audit Result Update |
| 8 Reporting | Unified Dashboard | Literacy Coverage | Bias Metrics |

All logic resides inside one ServiceNow Scoped App with external Node.js (MCP) and n8n automation.

---

## 🧠 Data and Automation Flows

### EU AI Act Flow – AI Literacy
1. Employee assigned to AI System → auto-enrollment in training.  
2. React + Firebase site records progress; n8n Agent sends results.  
3. ServiceNow validates outcomes, issues feedback, and triggers Digital Signature Agent.  
4. Evidence Pack created → compliance status updated.

### NYC LL 144 Flow – Bias Audits
1. Audit Preparation Agent aggregates and anonymizes applicant data.  
2. Internal Audit Agent calculates selection / scoring ratios.  
3. < 0.8 ratios flagged; results hashed and signed.  
4. Evidence Pack stored; AI System status updated.

---

## 🧾 Key Tables
**Regulatory Alerts**, **AI Systems**, **Training Enrollments**, **Bias Audits**, **Evidence Packs**, **Agent Logs**, **Applicants**, **AI Access Employee**, **Job Roles**  
Each table includes role-specific references, audit trails, and digital signature links for verification.

---

## 🧮 Agents and Licensing

| Agent | Function | Status |
|:--|:--|:--|
| Digital Signature Agent | SHA-256 hashing for Evidence Packs | ✅ Deployed |
| Regulatory Analyzer | Correlates alerts → recommendations | ✅ Deployed |
| Training Orchestrator | Manages AI literacy enrollments | ✅ Deployed |
| Audit Preparation Agent | Collects AEDT data for bias audits | ✅ Deployed |
| Internal Audit Agent | Computes impact ratios | ✅ Deployed |

---

## 📊 Impact Metrics

| Process | Manual Method | With AC³ |
|:--|:--|:--|
| Regulatory Monitoring | Weekly searches | Automated (12 h interval) |
| Evidence Compilation | 3 weeks | Minutes |
| Labor Cost / Audit | ≈ $15 000 | < $200 runtime |
| Risk Exposure | €15 M / $500 per day | Near-zero |
| Training Tracking | Manual | Auto + n8n feedback |
| Audit Prep | Manual aggregation | Automated |
| Visibility | Static Excel | Dynamic Dashboard |

---

## 🧭 Roles and Stakeholders

| Role | Responsibility |
|:--|:--|
| **Deployers** | Ensure compliance for AI systems |
| **Employees** | Complete AI literacy training |
| **Applicants** | Subject to bias audits |
| **Compliance Officers** | Review alerts, evidence, reports |
| **External Auditors** | Validate bias audits (via MCP) |
| **Regulators** | Consume Evidence Packs for proof |

---

## 🧰 Tech Stack

- **ServiceNow** Scoped App + AI Agent Studio  
- **n8n** for training and workflow automation  
- **Node.js (Express)** MCP Server for auditor linking  
- **React + Firebase** AI Literacy portal  
- **Google Cloud Run** + **Federal Register API** data feeds  
- **Digital Signature Service** (SHA-256 with salt)  
- **JSON / PDF** Evidence exports  

---

## 🗓️ Presentation Coordination

- Final practice 8:30 AM (before 10 AM presentation).  
- Business attire, cameras on, virtual backgrounds set.  
- Tasks:  
  - Regulatory alerts owner: refine alerts pipeline and live diagram walkthrough.  
  - Script owner: update to *Kura Capital LLC*, improve closing, add logo.  
  - Visuals owner: export transparent flow diagrams and prepare Q&A notes.

---

## 🌍 Future Work

- Integrate ATS connectors (Greenhouse, Workday).  
- Add California AI Transparency Act support.  
- NLP-based risk summaries from audit datasets.  
- Evidence API for regulators.  
- Expand n8n automations for broader compliance.

---

## 🏁 Summary

**AC³ — AI Compliance Command Center** unifies global AI governance:  
- **EU AI Act Article 4:** AI Literacy training automation.  
- **NYC Local Law 144:** Bias Audit automation.  

One platform. Two jurisdictions. Verified evidence.  
**From manual chaos to one-click compliance.**

---

**Organization:** Kura Capital LLC  
**Category:** AI Governance & RegTech Innovation  
**License:** MIT
