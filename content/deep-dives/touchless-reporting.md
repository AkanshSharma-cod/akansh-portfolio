---
title: "Touchless Reporting — Agentic AI for Financial Reporting"
project: touchless-reporting
tags: [agentic-ai, fastapi, react, microsoft-agent-framework, azure, financial-reporting]
draft: true
---

> DRAFT — auto-generated from resume facts. Review and refine before embedding. Do not add metrics that aren't true.

# Touchless Reporting

## What it is
Touchless Reporting is an agentic AI system Akansh built at Bosch that automated the
creation of MBRs (Monthly Business Reviews). It removed manual effort from a recurring,
high-stakes financial reporting process so controllers could focus on judgment rather than
assembly.

## Scale
The system served 95 controllers across 15 legal entities and 11 countries, handling
consolidated financial reporting across sectors, geographies, divisions, and
multi-currency planning scenarios.

## Architecture & approach
- A **FastAPI** backend exposed an enterprise data layer with **Pydantic** validation and
  **real-time SSE streaming**, so results could surface to the UI as they were produced.
- The intelligence layer used the **Microsoft Agent Framework (MAF)** to orchestrate
  multiple specialized agents (data, sanity-check, and narrative) in sequence — see the
  multi-agent framework deep dive for detail.
- **Azure-hosted LLMs** powered the reasoning and natural-language generation steps.
- A **React** frontend surfaced the generated reviews and let users explore the data.

## Data
In production, data was sourced from the team's **Redmesh** modeling layer. For the
development prototype, **SQLite** was used to iterate quickly before connecting to
production sources.

## Why it mattered
It turned a manual, repetitive monthly reporting cycle into a largely automated one
("touchless"), standardizing financial commentary and checks across many entities and
countries while keeping humans in control of the final review.
