# Forward Deployed Engineer (FDE) Expert — Course Platform

A modern, production-grade interactive educational website built with **Techno Blue & Obsidian Black Gradients**, strictly matching the design system, typography, and curriculum structure of **[Build Fast with AI (buildfastwithai.com/fde)](https://www.buildfastwithai.com/fde)**.

---

## 🚀 Live Preview

The local preview server is running at:
**[http://localhost:3000](http://localhost:3000)**

You can also directly double-click `index.html` to open it in any web browser without needing a build step.

---

## 🎓 54-Hour Intensive Masterclass Structure

Every single day is structured as a **3.5 to 4.5 hour intensive deep-dive** consisting of 6 dedicated sections:

1. **Section 1 · Enterprise Discovery Brief & Transcript:** Realistic executive interview transcript, business failure costs, SLA contracts, and architectural problem decomposition.
2. **Section 2 · Low-Level Theory & Mathematical Foundations:** First-principles theory, mathematical equations (Attention KV cache complexity, Vector spaces, BM25 TF-IDF, Reciprocal Rank Fusion RRF, Token cost economics), and wire protocols.
3. **Section 3 · Production Python Reference Implementation:** Fully typed, runnable Python 3.12 architectures with error handling, logging, and zero-hallucination guardrails.
4. **Section 4 · 3-Hour Hands-On Production Lab:** Multi-milestone technical lab with a target acceptance schema, starter boilerplate, and complete working reference solution.
5. **Section 5 · FDE Field Notes & War Stories:** Hard-earned lessons from real deployments at Palantir, OpenAI, Anthropic, and top enterprises.
6. **Section 6 · Technical Assessment & Certification Screen:** 3 rigorous technical examination questions per day (42 total questions) with instant scoring and multi-paragraph explanations.

---

## 📚 14-Day Day-by-Day Comprehensive Syllabus

### Week 1: Plain Python, Tool Calling & Agent Systems
- **Day 1: The FDE Mindset, Client Discovery & System Architecture** (3.5 Hours)
  - Mathematical modeling of token economics ($C = (T_{in}P_{in} + T_{out}P_{out})/10^6$), latency budgeting, and establishing the Deterministic vs Stochastic Boundary.
- **Day 2: Plain Python Agent Core — Loops, State Machines & Context Pruning** (3.5 Hours)
  - Bare-metal Finite State Machines (FSMs), attention sinks, KV-cache dynamics, and sliding-window context eviction.
- **Day 3: Build 01 — Live Tool-Calling Agent with Structured JSON & MCP** (4.0 Hours)
  - JSON Schema RFC 7159 standards, parameter coercion, live financial APIs, and Notion deliverable payloads.
- **Day 4: Build 02 — Production RAG Agent with Exact Verified Citations** (4.0 Hours)
  - Dense Cosine Vector retrieval, Sparse BM25, Reciprocal Rank Fusion (RRF), Cross-Encoder reranking, and citation verification gates.
- **Day 5: Build 03 — Multi-Agent System with Router & Quality Checker** (4.0 Hours)
  - State graphs (DAGs vs cyclic loops), supervisor intent routing, isolated worker pods (Billing, Shipping, Refunds), and decoupled Quality Review gates.
- **Day 6: Build 04 — Production Evals, Guardrails & Langfuse Tracing** (4.5 Hours)
  - 50-item golden test set design, prompt injection defenses, HIPAA-compliant PII regex masking, and distributed tracing spans.
- **Day 7: Capstone Architecture & Formal ADR-001 Specification** (3.5 Hours)
  - The 4 enterprise tracks (Insurance Claims, CRM Copilot, Legal Contract Reviewer, Autonomous SQL Data Copilot) and formal ADR-001 documentation.

### Week 2: Agentic Development, MCP & Enterprise Production
- **Day 8: Agentic Coding with Claude Code, Cursor & Codex** (3.5 Hours)
  - Spec-Driven Development (SDD), plan mode vs act mode, AST git diff review, and automated unit test generation.
- **Day 9: Custom Model Context Protocol (MCP) Server Development** (4.0 Hours)
  - JSON-RPC 2.0 protocol lifecycle, stdio and SSE transport layers, and exposing database schemas as Resources and ledger lookups as Tools.
- **Day 10: Persistent Long-Term Memory & Isolated Docker Sandboxes** (4.0 Hours)
  - 3-tier memory systems (working, Redis session, vector long-term), Linux cgroups/seccomp, and isolated ephemeral Docker containers with zero network access.
- **Day 11: Production Hardening, Token Economics & Latency Optimization** (3.5 Hours)
  - Prompt Caching (KV-cache reuse for 90% savings), model cascading (Haiku vs Sonnet), and circuit breakers with exponential backoff and full jitter.
- **Day 12: Full-Stack FDE Delivery — FastAPI, React/Next.js & SSE Streaming** (4.0 Hours)
  - Server-Sent Events token streaming, real-time tool execution chips, Human-in-the-Loop approval drawers, and Docker Compose orchestration.
- **Day 13: Client Acceptance Testing (CAT), Red-Teaming & Stress Audits** (4.0 Hours)
  - OWASP Top 10 for LLMs test vectors, concurrency stress tests, thread safety, and automated secret scrubbing.
- **Day 14: Production Handover, Runbooks, Client Demo & Capstone Certification** (4.5 Hours)
  - Enterprise production runbook (P1/P2/P3 incident playbooks), Prometheus/Langfuse health monitor, executive ROI calculations, and graduation credential.

---

## 🛠️ File Structure

- [`index.html`](file:///d:/AntiGravity/FDE/index.html): Main interactive web application with navigation, live simulators, course viewer, and ROI calculator.
- [`styles.css`](file:///d:/AntiGravity/FDE/styles.css): Techno Blue & Obsidian Black theme tokens, paper mode high-contrast overrides, typography rules, and animations.
- [`curriculum_week1.js`](file:///d:/AntiGravity/FDE/curriculum_week1.js): Comprehensive, low-level modules for Days 1 through 7 (158KB of rich content).
- [`curriculum_week2.js`](file:///d:/AntiGravity/FDE/curriculum_week2.js): Comprehensive, low-level modules for Days 8 through 14 (82KB of rich content).
- [`app.js`](file:///d:/AntiGravity/FDE/app.js): Application logic, live simulators, markdown/LaTeX parser, and state persistence.
