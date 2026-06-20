---
title: "AI-Powered News Aggregator — End-to-End RAG Pipeline"
project: news-aggregator-rag
tags: [rag, langchain, langgraph, chromadb, gpt, embeddings, semantic-search]
draft: true
---

> DRAFT — auto-generated from resume facts. Review and refine before embedding. Do not add metrics that aren't true.

# AI-Powered News Aggregator

## What it is
An AI-powered news aggregator Akansh developed at Bosch that automates content curation,
summarization, and company-wide newsletter distribution. It was deployed in production and
distributes AI-curated newsletters across the company.

## The RAG pipeline
It is built on an end-to-end Retrieval-Augmented Generation (RAG) pipeline that spans:
- **semantic search** over collected content,
- **vector embeddings** to represent articles,
- **retrieval** of the most relevant material, and
- **LLM-powered generation** to summarize and compose the newsletter.

## Stack
- **LangChain** and **LangGraph** for orchestrating the pipeline and its steps.
- **ChromaDB** as the vector store for embeddings and semantic retrieval.
- **GPT** as the LLM for summarization and generation.

## Why it mattered
It replaced manual content curation with an automated pipeline that finds, summarizes, and
distributes relevant news — demonstrating a complete RAG system from ingestion through
generation, running company-wide.
