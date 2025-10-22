# **The Lawgorithm Labs' AI Compliance Command Center (AC³)**
**Tagline:** *"From Regulatory Chaos to One-Click Compliance"*

---

## Executive Summary
We are the **Lawgorithm Labs** and we built **AC³ — AI Compliance Command Center** to solve a **€15 million problem**.

Two AI regulations are already active and enforceable:
- **EU AI Act Article 4** — requires documented AI literacy training.  
  **Fine:** €15 million or 3 % of global revenue  
- **NYC Local Law 144** — mandates annual bias audits for hiring AI tools.  
  **Fine:** $500–$1,500 per day per violation  

Current approach = manual Excel tracking, weeks of audit prep, no real-time visibility.  
**AC³ replaces that with automated regulatory monitoring and intelligent compliance analysis on ServiceNow:**

- **Regulatory Monitoring** – 24/7 automated scanning of EU and US regulatory sources via Cloud Run proxy and Federal Register API.  
  Detects changes to AI Act requirements, NYC LL144, and other compliance obligations. Populates regulatory alerts that trigger intelligent analysis.

- **Regulatory Compliance Analyzer Agent** – analyzes incoming regulatory alerts using correlation analysis, context building, and compliance impact assessment.  
  Identifies workflow changes needed, links related regulations across jurisdictions, and prepares alerts for compliance team action.

- **Evidence Packager (Digital Signature) Agent** – generates **SHA-256 cryptographically signed Evidence Packs** with salt for training and audit records, ensuring data integrity, authenticity, and verifiable compliance proof.

Cross-enterprise MCP integration with n8n workflows and external auditors means **AI-to-AI process coordination**, cutting manual compliance work from weeks to hours.

---

## Regulatory Context

### EU AI Act – Article 4 (AI Literacy)
- **Active:** 2 Feb 2025  
- **Who:** Providers → Deployers → Operators → Affected Persons  
- **Requirement:** All staff developing, operating, or affected by AI must receive documented, role-appropriate training.  
- **Evidence:** Training registry + certificates + role/risk mapping.  
- **Penalties:** €15 M / 3 % global turnover.  

**AC³ automates:**
- Automated detection of Article 4 regulatory changes via EUR-Lex SPARQL monitoring.
- Auto-enrollment of employees when assigned to AI Systems.
- AI Literacy training delivery via custom React + Firebase website.
- n8n Agent integration for training completion processing.
- Evidence-pack generation with SHA-256 hash (with salt) for regulatory submission.

---

### NYC Local Law 144 (AEDT Bias Audits)
- **Active:** 5 Jul 2023  
- **Requirement:** Annual independent bias audit for every AI hiring tool (AEDT).  
- **Method:** Measure selection rates by sex/race/ethnicity; impact ratio < 0.80 = potential bias.  
- **Evidence:** Audit report + impact ratios + public summary + candidate notices.  

**AC³ automates:**
- Automated detection of NYC LL144 updates via Federal Register monitoring.
- Audit Preparation Agent: Dataset aggregation, anonymization, and packaging.
- Internal Audit Agent: Fairness metric calculation (selection and scoring methodologies).
- External auditor coordination via MCP Server.
- Signed evidence packaging with tamper-proof verification.

---

## System Architecture

| Layer | Shared Components | EU-Specific | NYC-Specific |
|:--|:--|:--|:--|
| **1 Data Ingestion** | Cloud Run proxy (EU), Federal Register API (US), Scheduled Scripts | EUR-Lex SPARQL queries | Federal Register REST API |
| **2 Core Tables** | `AI Systems`, `Evidence Packs`, `Departments`, `Employees` | — | — |
| **3 Alert Processing** | `regulatory_alert`, `recommendation`, `task` | EU AI Act alerts | NYC LL144 alerts |
| **4 Process Tables** | — | `Training Enrollments`, `AI Access Employee` | `Applicants`, `Bias Audits`, `Agent Logs` |
| **5 External Interface (MCP/n8n)** | Shared Express server with REST webhooks | n8n training agent | Independent Auditor MCP |
| **6 Evidence Generation** | Shared Digital Signature Agent (SHA-256 with salt) | Training Pack | Audit Pack |
| **7 Compliance Logic** | Unified compliance status in `AI Systems` | Update on training completion | Update on audit result |
| **8 Reporting** | Unified dashboard | AI Literacy Status | Bias Audit Results |

All components run inside one ServiceNow Scoped App with external Node.js (MCP) and n8n integration.

---

## Data Ingestion Pipeline

### Step 1: Continuous Regulatory Monitoring (Every 12 hours)
**EU Data:** Cloud Run proxy service calls EUR-Lex SPARQL endpoint  
**US Data:** Direct REST call to Federal Register API  

**Output:** Scored regulatory documents with:
- Title, document number (CELEX ID, Federal Register page)
- Publication date, effective date, source URL, PDF URL
- Classification (Primary Tracked/Related/Discovery)
- Relevance score (0-100)
- Priority (Critical/High/Medium/Low)

### Step 2: Scheduled Script – Maps Data to ServiceNow
- Retrieves scored documents from Cloud Run and Federal Register
- Maps fields to `x_snc_ai_complia_0_regulatory_alert` table
- Deduplicates by source_url (prevents duplicate alerts)
- Creates alert records with `status = "New"` ready for processing

---

## Alert Processing Pipeline

### Step 3: Regulatory Compliance Analyzer Agent
**Listener:** Triggers when new alert created with `status = "New"` and `alert_processed = false`

**Tool Suite:**

**Tool 1 - Correlation Analyzer**
- Compares EU AI Act requirements across Federal Register updates
- Compares NYC LL144 requirements across Federal Register updates
- Identifies similar requirements across jurisdictions
- Creates correlation links between related regulations
- Stores analysis in `x_snc_ai_complia_0_regulatory_processing` table

**Tool 2 - Alert Creator**
- Reads correlated data from processing table
- Enriches alert with correlation links
- Sets priority and classification
- Updates `x_snc_ai_complia_0_regulatory_alert` with complete information
- Marks alert ready for compliance team action

**Tool 3 - Compliance Context Builder**
- Analyzes regulatory impact on current operations
- Identifies affected workflows:
  - AI Literacy Training Program (if EU AI Act Article 4 related)
  - Bias Audit Workflow (if NYC LL144 related)
- Adds implementation guidance
- Suggests preliminary compliance response
- Links to related regulations in system

### Step 4: Processing Status Tracking
- Updates `alert_processed = true`
- Sets `processing_status = "Completed"`
- Records timestamp and agent name

---

## Process Flows

### EU Flow – AI Literacy (Article 4)

**Part 1: Enrollment & Training**
1. Employee assigned to new AI System → record updated on Employee table.
2. Notification sent to employee with training requirement.
3. Record added to `Training Enrollments` table with `status = "In Progress"`.
4. Employee auto-enrolled in company's in-house AI Literacy training (React + Firebase website).

**Part 2: Completion & Evidence Generation**
1. Employee completes AI Literacy training and submits assessment.
2. n8n Agent detects completion → sends training data to ServiceNow via Scripted REST API.
3. ServiceNow processes results:
   - If failed: Feedback sent to employee via ServiceNow.
   - If passed: Digital Signature Agent triggered.
4. Digital Signature Agent:
   - Creates SHA-256 hash (with salt) of training data.
   - Generates Evidence Pack record.
   - Updates `Training Enrollments` with `status = "Completed"` and evidence reference.
   - Updates `AI Access Employee` table to reflect training completion.
5. `AI Systems.Compliance Status` updated to reflect training coverage.

**Output:** Traceable, cryptographically verified AI literacy proof per employee–system pair.

**Components:**
- AI Literacy Website (React + Firebase)
- ServiceNow Scripted REST API
- n8n Agent for training result processing
- 2 ServiceNow Flows
- 1 Custom Flow Action

---

### NYC Flow – Bias Audits (Local Law 144)

**Part 1: Audit Preparation**
1. Audit Preparation Agent triggered (manual or scheduled).
2. Agent filters `AI Systems` table for AEDT-related systems.
3. User selects which system/tool to audit.
4. Agent aggregates data:
   - Queries `Agent Logs` table for decisions made by selected tool.
   - Uses references to `Applicants` table to compile applicant list.
5. Agent anonymizes and packages data.
6. User prompted: Internal audit or external audit?
   - If internal: Control passes to Internal Audit Agent.
   - If external: Packaged data sent to independent auditor via MCP Server.
7. Record added to `Bias Audits` table.

**Part 2: Internal Audit (if selected)**
1. Internal Audit Agent receives packaged data.
2. Agent conducts fairness analysis:
   - Computes selection impact ratios.
   - Computes scoring impact ratios.
   - Flags any < 0.8 impact ratios as potential bias.
3. Records `Result` (Pass/Fail/Pending) in `Bias Audits` table.
4. Passes results to Digital Signature Agent.

**Part 3: Evidence Generation**
1. Digital Signature Agent receives audit results.
2. Creates SHA-256 hash (with salt) of audit data.
3. Generates Evidence Pack record with:
   - Audit report PDF.
   - Impact ratios (selection and scoring).
   - Digital signature and timestamp.
4. Updates `Bias Audits` table with Evidence Pack reference.
5. Updates `AI Systems.Compliance Status` based on audit result.

**Output:** Verifiable, tamper-proof bias-audit history for each AI System.

**Components:**
- Audit Preparation Agent (AI Agent Studio)
- Internal Audit Agent (AI Agent Studio)
- Digital Signature Agent (AI Agent Studio)
- Independent Auditor MCP Server (In Development)

---

## Data Models

### Regulatory Alerts Table
Core table populated by scheduled data ingestion scripts.

| Field | Type | Description |
|:--|:--|:--|
| title | String | Official title of regulatory document |
| source_url | URL | Direct link to regulatory document |
| regulation_source | Choice (EU, US Federal, US NYC) | Jurisdiction and regulatory body |
| document_number | String | CELEX ID (EU) or Federal Register number (US) |
| publication_date | Date | Official publication date |
| abstract | Rich Text | Summary of regulatory contents |
| pdf_url | URL | Alternative download link |
| agencies | String | Issuing regulatory authority |
| document_type | String | Regulation, Directive, Amendment, Guidance, Notice, Proposal |
| effective_date | Date | Date requirements become enforceable |

### AI Systems Table
Tracks each AI tool and its compliance status.

| Field | Type | Description |
|:--|:--|:--|
| system_id | Auto Number | Unique system identifier |
| name | String | Name of AI system/tool |
| description | String | Function and purpose |
| department | Reference | Department owning system |
| owner | Reference | Employee responsible |
| risk_tier | Choice | Low / Medium / High |
| regulatory_scope | Choice | EU / NYC / Both |
| compliance_status | Choice | Compliant / Pending / Audit Required |
| linked_audit | Reference | Most recent bias audit |
| is_aedt | Boolean | Whether tool is AEDT (hiring AI) |

### Training Enrollments Table
Tracks employee AI Literacy training status.

| Field | Type | Description |
|:--|:--|:--|
| enrollment_id | Auto Number | Unique record ID |
| employee | Reference | Person enrolled in training |
| ai_system | Reference | AI System requiring training |
| enrollment_date | Date/Time | When employee was enrolled |
| completion_date | Date/Time | When training was completed |
| status | Choice | In Progress / Completed / Expired |
| evidence | Reference | Evidence Pack proof of completion |
| training_results | JSON | Results from n8n agent processing |
| feedback | String | Feedback on training performance |

### Bias Audits Table
Tracks bias audits conducted for each AI system.

| Field | Type | Description |
|:--|:--|:--|
| audit_id | Auto Number | Unique audit record |
| ai_system | Reference | AEDT being audited |
| audit_date | Date/Time | When audit was executed |
| impact_ratio | Decimal | Pass/fail fairness metric |
| result | Choice | Pass / Fail / Pending |
| report_pdf | Attachment | Official audit report |
| evidence | Reference | Evidence Pack with signature |
| dataset | JSON | Dataset used for audit |
| audit_type | Choice | Internal Selection / Internal Scoring / External Selection / External Scoring |
| lt_08_selection_ratio | JSON | Results where Selection Impact Ratio < 0.8 |
| lt_08_scoring_ratio | JSON | Results where Scoring Impact Ratio < 0.8 |

### Agent Logs Table
Records all decisions/actions made by AEDT tools.

| Field | Type | Description |
|:--|:--|:--|
| log_id | Auto Number | Unique decision ID |
| timestamp | Date/Time | When decision was made |
| ai_system | Reference | AI tool that made decision |
| applicant | Reference | Person evaluated |
| decision_type | Choice | Rejected / Moved Forward |
| role | Reference | Job role applicant applied for |

### Applicants Table
Records applicants evaluated by AEDT tools.

| Field | Type | Description |
|:--|:--|:--|
| number | Auto Number | Unique applicant ID |
| name | String | Applicant's name |
| sex | Choice | Male / Female |
| race | Choice | Race of applicant |
| hispanic_latino | Boolean | Whether applicant is Hispanic/Latino |
| job_role | Reference | Job role applied for |
| status | Choice | Rejected / Moved Forward |
| ai_score | Integer | Score given by AI tool |

### Evidence Pack Table
Tamper-proof compliance proof artifacts.

| Field | Type | Description |
|:--|:--|:--|
| number | Auto Number | Unique ID |
| name | String | "EU AI Training Evidence – Q4 2025" or "NYC Bias Audit Evidence – Resume Screener" |
| regulatory_scope | Choice | EU / NYC / Other |
| ai_system | Reference | Associated AI system |
| source | Choice | Internal Audit / External Audit / Training |
| audit_id | Reference | Links to Bias Audits (if applicable) |
| training_id | Reference | Links to Training Enrollments (if applicable) |
| digital_signature | String | SHA-256 hash (with salt) for tamper-proof verification |
| generation_date | Date/Time | When evidence pack was created |
| signed_by | String | Name of signing agent |
| hashed_data | JSON | Data used to generate signature |

### AI Access Employee Table
Records users with AI System access.

| Field | Type | Description |
|:--|:--|:--|
| ai_system | Reference | AI System user has access to |
| needs_ai_training | Boolean | Whether user needs training |
| employee | Reference | Employee assigned system |
| department | Reference | Department owning system |

### Job Roles Table
Records company job roles.

| Field | Type | Description |
|:--|:--|:--|
| number | Auto Number | Role ID |
| title | String | Role title |
| description | String | Brief description |
| department | Reference | Department where role belongs |
| salary_range | String | Salary range |

---

## Unified Dashboard
- **Filter:** by Regulatory Scope (EU / NYC).  
- **Display:** AI System → owner, department, risk tier, compliance status.  
- **Widgets:** AI Literacy coverage %, Bias audit impact ratios + < 0.8 alerts, Evidence Pack links.

---

## AI Agents

AC³ leverages AI Agent Studio to build intelligent, event-driven compliance automation. The following agents power the system:

### Current Implementation

| Agent | Type | Purpose | Status |
|:--|:--|:--|:--|
| **Digital Signature Agent** | AI Agent Studio | Generates SHA-256 cryptographic signatures for Evidence Packs | ✅ Deployed |

### In Development

| Agent | Type | Purpose | Status |
|:--|:--|:--|:--|
| **Regulatory Compliance Analyzer** | AI Agent Studio | Analyzes regulatory alerts, identifies impact areas, generates recommendations and action plans | 🔄 In Development |
| **Training Orchestrator Agent** | AI Agent Studio | Manages EU AI Literacy enrollment, tracks completion, triggers evidence generation | 📋 Designed |
| **Audit Preparation Agent** | AI Agent Studio | Filters AEDT systems, aggregates audit data, anonymizes datasets, prompts for internal/external audit selection | 📋 Designed |
| **Internal Audit Agent** | AI Agent Studio | Conducts fairness analysis (selection and scoring impact ratios), flags potential bias | 📋 Designed |
| **Independent Auditor MCP Server** | n8n + Node.js | External auditor coordination via MCP protocol | 📋 Designed |

### Agent Licensing & Token Usage

All agents run on ServiceNow AI Agent Studio with metered assist tokens:
- **Licensing:** Pro Plus or Enterprise Plus required
- **Token Allocation:** Typically 100,000 assists/year per SKU
- **AC³ Consumption:** ~18,000 assists/year (18% of budget)
- **Per Execution:** Regulatory Analyzer ~50 assists, Digital Signature ~10 assists
- **Monitoring:** Real-time dashboard in AI Agent Orchestrator

See [ServiceNow AI Agent Studio - Licensing & Capacity Guide](#licensing--capacity) for details.

---

## Licensing & Capacity

### ServiceNow AI Agent Studio Model

ServiceNow uses a metered "Assist Token" model (not ChatGPT-style token consumption):

**License Requirements:**
- Pro Plus or Enterprise Plus add-on
- Purchased by seat
- No public pricing (contact ServiceNow sales for quote)

**Token Allocation:**
- Typical annual allocation: 100,000 assists/year
- Each autonomous action consumes fixed tokens
- Simple tasks: 1 assist (e.g., summarization)
- Complex workflows: 5-10 assists (multi-step analysis)

**Monitoring & Alerts:**
- Real-time dashboard in AI Agent Orchestrator
- Shows token usage vs. allocation
- Alerts when approaching 80% utilization
- No auto-charges for overages (purchase top-up packs if needed)

**AC³ Consumption:**
- Regulatory alerts: ~50 assists per batch
- Evidence generation: ~10 assists per execution
- Estimated annual: ~18,000 assists (well within budget)

---


- **ServiceNow:** Scoped Application, AI Agent Studio, Scripted REST APIs, Flows, Tables  
- **Google Cloud Run:** EU regulatory data fetcher (Cloud Run proxy)
- **Federal Register API:** US regulatory data source
- **Node.js (Express):** MCP Server foundation for external auditor coordination (In Development)
- **n8n:** Training completion agent and workflow automation  
- **React + Firebase:** AI Literacy training frontend  
- **Digital Signature Service:** SHA-256 hash generation with salt for Evidence Packs  
- **JSON / PDF:** Evidence Packs and Audit Reports  

---

## Roles
| Role | Responsibility |
|:--|:--|
| **Deployers** | Companies using AI systems; ensure compliance. |
| **Employees** | Require AI literacy training (EU Act Article 4). |
| **Applicants** | Evaluated by AEDT tools; subject to bias audits (NYC Law 144). |
| **Compliance Officers** | Review alerts, recommendations, and evidence; manage compliance status. |
| **External Auditors (MCP)** | Validate bias audit data and return certified results. |
| **Regulators** | Consume Evidence Packs for compliance verification. |

---

## Impact

| Metric | Manual Process | With AC³ |
|:--|:--|:--|
| Regulatory monitoring | Weekly manual scan | 24/7 automated (every 12h) |
| Evidence compilation | ~3 weeks | Minutes |
| Labor cost | ~$15,000 per audit | <$200 runtime |
| Risk exposure | €15 M / $500 per day | Near-zero violations |
| Visibility | Static spreadsheets | Real-time dashboard |
| Training tracking | Manual enrollments | Auto-enrollment + n8n tracking |
| Audit prep | Days of manual work | Automated data aggregation |

---

## Next Steps
- Integrate ATS connectors (Greenhouse, Workday).  
- Add California AI Transparency Act support.  
- Implement NLP risk summaries from audit datasets.  
- Expose Evidence API for regulators.  
- Expand n8n automation for additional compliance workflows.

---

## Summary
AC³ unifies compliance for two active AI laws inside one ServiceNow application:
- **EU AI Act Article 4 → AI Literacy Compliance** (automated enrollment, training tracking, evidence generation)
- **NYC Local Law 144 → Bias Audit Compliance** (audit preparation, internal/external audit coordination, impact ratio verification)

One shared regulatory monitoring system, two specialized flows, cryptographically signed evidence, and AI-to-AI process coordination.  
**From manual chaos to one-click compliance.**

