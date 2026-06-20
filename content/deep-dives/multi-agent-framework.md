---
title: "Multi-Agent AI Framework — Orchestrated Specialized Agents"
project: multi-agent-framework
tags: [multi-agent, agentic-ai, function-calling, microsoft-agent-framework, anomaly-detection]
draft: true
---

> DRAFT — auto-generated from resume facts. Review and refine before embedding. Do not add metrics that aren't true.

# Multi-Agent AI Framework

## What it is
A multi-agent AI framework Akansh designed and built that orchestrates specialized agents
in sequence to produce trustworthy financial analysis. It is the reasoning engine behind
the Touchless Reporting system.

## The agents
The framework coordinates three kinds of specialized agents:
- **Data agents** — retrieve and prepare the relevant financial data.
- **Sanity-check agents** — run financial sanity checks and anomaly detection to catch
  issues before they reach a human.
- **Narrative agents** — generate variance commentary in natural language, explaining what
  changed and why.

## How it works
Agents use **function-calling tools** to do their work, which powers:
- anomaly detection,
- financial sanity checks,
- AI-generated variance commentary, and
- natural-language data exploration (asking questions of the data in plain English).

The agents run **in sequence** — orchestration patterns and prompt-engineering strategies
were defined deliberately so each stage hands clean, validated context to the next.

## Why sequential orchestration
Running specialized agents in a defined order — fetch, validate, then narrate — keeps each
agent's job narrow and auditable, and prevents unchecked numbers from flowing into the
generated commentary.
