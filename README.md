# **AI Compliance Command Center (AC³)**
**Tagline:** *“From Regulatory Chaos to One-Click Compliance”*

---

## Executive Summary
We built **AC³ — AI Compliance Command Center** to solve a **€15 million problem**.

Two AI regulations are already active and enforceable:
- **EU AI Act Article 4** — requires documented AI literacy training.  
  **Fine:** €15 million or 3 % of global revenue  
- **NYC Local Law 144** — mandates annual bias audits for hiring AI tools.  
  **Fine:** $500–$1,500 per day per violation  

Current approach = manual Excel tracking, weeks of audit prep, no real-time visibility.  
**AC³ replaces that with three coordinated AI agents on ServiceNow:**

- **Training Orchestrator Agent** – manages AI literacy training under the **EU AI Act (Article 4)**.  
  Detects employees needing training, auto-enrolls them, tracks completion, and triggers evidence generation.

- **Audit Coordinator Agent** – manages bias audits required by **NYC Local Law 144**.  
  Handles audit scheduling, dataset preparation, and coordination with external MCP auditors.  
  - **Sub-Function:** *Internal Audit Agent* — performs internal fairness testing (selection and impact ratio checks) before sending data for external audit.

- **Evidence Packager (Digital Signature) Agent** – generates **SHA-256 cryptographically signed Evidence Packs** for both training and audit records, ensuring data integrity and verifiable compliance.

Cross-enterprise MCP integration means **AI-to-AI audit coordination**, cutting a 21-day workflow to minutes.

---

## Regulatory Context

### EU AI Act – Article 4 (AI Literacy)
- **Active:** 2 Feb 2025  
- **Who:** Providers → Deployers → Operators → Affected Persons  
- **Requirement:** All staff developing, operating, or affected by AI must receive documented, role-appropriate training.  
- **Evidence:** Training registry + certificates + role/risk mapping.  
- **Penalties:** €15 M / 3 % global turnover.  

**AC³ automates:**
- Role-based training assignment when employee gains access to an AI System.  
- Completion tracking via MCP integration.  
- Evidence-pack generation with SHA-256 hash for regulators.

---

### NYC Local Law 144 (AEDT Bias Audits)
- **Active:** 5 Jul 2023  
- **Requirement:** Annual independent bias audit for every AI hiring tool (AEDT).  
- **Method:** Measure selection rates by sex/race/ethnicity; impact ratio < 0.80 = potential bias.  
- **Evidence:** Audit report + impact ratios + public summary + candidate notices.  

**AC³ automates:**
- Scheduling and dataset prep.  
- Transmission to external auditor (MCP Server).  
- Receipt of results and signed evidence packaging.

---

## System Architecture

| Layer | Shared Components | EU-Specific | NYC-Specific |
|:--|:--|:--|:--|
| **1 Core Tables** | `AI Systems`, `Evidence Packs`, `Departments`, `Employees` | — | — |
| **2 Process Tables** | — | `Training Enrollments` | `Applicants`, `Bias Audits`, `Agent Logs` |
| **3 External Interface (MCP)** | Shared Express server with REST webhooks | `/training` endpoint | `/audit` endpoint |
| **4 Evidence Generation** | Shared Digital Signature Agent (SHA-256 + pack storage) | Training Pack | Audit Pack |
| **5 Compliance Logic** | Unified compliance status in `AI Systems` | Update on training completion | Update on audit result |
| **6 Reporting** | Unified dashboard | AI Literacy Status | Bias Audit Results |

All components run inside one ServiceNow Scoped App with external Node.js (MCP) integration.

---

## Agents

| Agent | Role |
|:--|:--|
| **Training Orchestrator** | Watches `Employee.AI Systems`; auto-creates `Training Enrollment`; notifies employee. |
| **Audit Coordinator** | Filters `AI Systems` for AEDT; collects data from `Agent Logs` + `Applicants`; sends package to MCP or Internal Audit Agent. |
| **Internal Audit Agent** | Computes selection and impact ratios; flags < 0.8; writes `Bias Audit` record. |
| **Digital Signature Agent** | Generates SHA-256 signature and creates `Evidence Pack`. |

---

## Data Model Highlights

### AI Systems
Tracks each AI tool (department, owner, risk tier, compliance status).  
Links to latest Bias Audit and Evidence Pack.

### Training Enrollments
Connects Employee ↔ AI System.  
Records enrollment/completion dates, status, and training data (JSON) from MCP.

### Bias Audits
Stores audit date, impact ratios, result (Pass/Fail), dataset (JSON), and report PDF.  
Field `Audit Type (Internal | External)` distinguishes auditor source.

### Agent Logs + Applicants
Capture AI decision events and applicant demographics (sex, race, ethnicity, AI score, outcome) for audit analysis.

### Evidence Packs
Tamper-proof records for training and audits (SHA-256 hash, digital signature, timestamp, scope EU/NYC).

---

## Process Flows

### EU Flow — AI Literacy
1. Employee assigned to new AI System → auto-enrollment created.  
2. Employee completes training on AI Literacy website.  
3. MCP Server detects completion → sends data to ServiceNow.  
4. ServiceNow updates `Training Enrollment`.  
5. Digital Signature Agent creates `Evidence Pack` + updates `AI Systems.Compliance Status`.

**Output:** Traceable AI literacy proof per employee–system pair.

---

### NYC Flow — Bias Audits
1. AI tool decisions logged to `Agent Logs` → linked `Applicants`.  
2. Internal Audit Agent aggregates data, computes impact ratios, flags < 0.8.  
3. Audit Coordinator sends JSON dataset to MCP Server for external audit.  
4. MCP Server returns Pass/Fail + report URL.  
5. Bias Audit record and Evidence Pack created; `AI Systems.Compliance Status` updated.

**Output:** Verifiable bias-audit history for each AI System.

---

## Unified Dashboard
- **Filter:** by Regulatory Scope (EU / NYC).  
- **Display:** AI System → owner, department, risk tier, compliance status.  
- **Widgets:** AI Literacy coverage %, Bias audit impact ratios + < 0.8 alerts, Evidence Pack links.

---

## Tech Stack
- **ServiceNow:** Scoped Application, Scripted REST APIs, Flows, Tables  
- **Node.js (Express):** MCP Server (`/training`, `/audit`)  
- **React + Firebase:** AI Literacy training frontend  
- **Digital Signature Agent:** SHA-256 hash and storage service  
- **JSON / PDF:** Evidence Packs and Audit Reports  

---

## Roles
| Role | Responsibility |
|:--|:--|
| **Deployers** | Companies using AI systems. |
| **Employees** | Require AI literacy training (EU Act). |
| **Applicants** | Evaluated by AEDT tools (NYC Law). |
| **External Auditors (MCP)** | Validate data and return results. |
| **Regulators** | Consume Evidence Packs for compliance verification. |

---

## Impact

| Metric | Manual Process | With AC³ |
|:--|:--|:--|
| Evidence Compilation | ≈ 3 weeks | minutes |
| Labor Cost | ≈ $15 000 per audit | < $200 runtime |
| Risk Exposure | €15 M / $500 per day | Zero violations |
| Visibility | Static spreadsheets | Real-time dashboard |

---

## Next Steps
- Integrate ATS connectors (Greenhouse, Workday).  
- Add California AI Transparency Act support.  
- Implement NLP risk summaries from audit datasets.  
- Expose Evidence API for regulators.

---


---

### Summary
AC³ unifies compliance for two active AI laws inside one ServiceNow application:
- **EU AI Act → AI Literacy Compliance**  
- **NYC LL 144 → Bias Audit Compliance**

One shared core, two flows, and instant evidence generation.  
**From manual chaos to one-click compliance.**

