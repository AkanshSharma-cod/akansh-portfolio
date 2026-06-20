export const profile = {
  name: 'Akansh Sharma',
  title: 'AI Engineer · Full-Stack AI & Analytics',
  location: 'Bangalore, India',
  tagline:
    'I build end-to-end AI systems — RAG pipelines, multi-agent orchestration, and the APIs and frontends that surface them. 3.75 years shipping production AI at Bosch.',
  resumeUrl: '/Akansh_Sharma_Resume.pdf',
  // TODO: replace with your real profile URLs.
  links: {
    email: 'akanshsh15@gmail.com',
    phone: '+91 9663211506',
    linkedin: 'www.linkedin.com/in/akansh-sharma', 
    github: 'https://github.com/AkanshSharma-cod', // TODO: add your handle
  },
};

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  points: string[];
}

export const experience: ExperienceItem[] = [
  {
    role: 'AI Engineer / Sr. Data Analyst',
    company: 'Bosch Global Software Technologies Ltd.',
    location: 'Bangalore',
    period: 'Jan 2024 – Present',
    points: [
      'Built Touchless Reporting, an agentic AI system automating MBR creation for 95 controllers across 15 legal entities and 11 countries (Python, FastAPI, Microsoft Agent Framework, Azure-hosted LLMs, React).',
      'Built a FastAPI enterprise data layer with Pydantic validation and real-time SSE streaming for consolidated, multi-currency financial reporting.',
      'Designed a multi-agent framework orchestrating data, sanity-check, and narrative agents with function-calling tools for anomaly detection and AI-generated variance commentary.',
      'Led AI Talent Flux (Copilot Studio, Power Automate) automating skill mapping and mentorship matching — €25,434 annual savings.',
      'Built a deployed RAG news aggregator (LangChain, LangGraph, ChromaDB, GPT) distributing AI-curated newsletters company-wide.',
      'Migrated analytics to Microsoft Fabric — 2x faster queries, 40% faster refreshes; GPT-powered DAX optimization improved analyst productivity 50%.',
    ],
  },
  {
    role: 'Data Analyst',
    company: 'Bosch Global Software Technologies Ltd.',
    location: 'Bangalore',
    period: 'Oct 2022 – Jan 2024',
    points: [
      'Developed and maintained Power BI dashboards for operational and IAM analytics.',
      'Built SQL-based ETL and data validation processes improving reporting accuracy.',
      'Created DAX measures and optimized semantic models for KPI tracking.',
      'Automated recurring reporting, reducing manual effort.',
    ],
  },
];

export interface Project {
  title: string;
  blurb: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    title: 'Touchless Reporting',
    blurb:
      'Agentic AI system that automated Monthly Business Review creation for 95 controllers across 11 countries — FastAPI + SSE backend, Microsoft Agent Framework, Azure LLMs, React frontend.',
    tags: ['Agentic AI', 'FastAPI', 'MAF', 'Azure', 'React'],
  },
  {
    title: 'Multi-Agent AI Framework',
    blurb:
      'Orchestrates specialized data, sanity-check, and narrative agents in sequence using function-calling tools — powering anomaly detection, financial sanity checks, and variance commentary.',
    tags: ['Multi-Agent', 'Function Calling', 'Orchestration'],
  },
  {
    title: 'AI-Powered News Aggregator',
    blurb:
      'Deployed end-to-end RAG pipeline (semantic search → embeddings → retrieval → generation) that curates, summarizes, and distributes AI-written newsletters company-wide.',
    tags: ['RAG', 'LangChain', 'LangGraph', 'ChromaDB', 'GPT'],
  },
  {
    title: 'AI Talent Flux',
    blurb:
      'Enterprise initiative automating skill mapping, mentorship matching, and learning recommendations with Copilot Studio and Power Automate — €25,434 annual savings.',
    tags: ['Copilot Studio', 'Power Automate', 'Automation'],
  },
  {
    title: 'Microsoft Fabric Migration & DAX Optimization',
    blurb:
      'Migrated analytics to Fabric (Lakehouse, Warehouse, Direct Lake) for 2x faster queries; GPT-powered DAX optimization framework lifted analyst productivity 50%.',
    tags: ['Microsoft Fabric', 'Power BI', 'DAX', 'ETL'],
  },
  {
    title: 'LLMOps & Observability Framework',
    blurb:
      'Containerized LLM app instrumented end-to-end with Langfuse — tracking latency, token usage, and prompt-execution patterns as a foundation for production LLMOps.',
    tags: ['LLMOps', 'Langfuse', 'Docker', 'Claude API'],
  },
];

export interface SkillGroup {
  label: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  { label: 'Programming', items: ['Python', 'SQL'] },
  {
    label: 'AI & LLM Frameworks',
    items: ['LangChain', 'LangGraph', 'ChromaDB', 'Microsoft Agent Framework', 'Hugging Face'],
  },
  {
    label: 'LLM Platforms & APIs',
    items: ['OpenAI GPT', 'Claude', 'Azure OpenAI', 'Azure AI Foundry'],
  },
  {
    label: 'Backend & App Dev',
    items: ['FastAPI', 'Pydantic', 'SQLite', 'Server-Sent Events'],
  },
  { label: 'Frontend & Viz', items: ['React', 'Recharts', 'Streamlit'] },
  {
    label: 'Data & Analytics',
    items: ['DAX', 'Power Query', 'Sempy', 'Pandas', 'Polars', 'Scikit-learn'],
  },
  {
    label: 'Cloud & Data Platforms',
    items: ['Microsoft Fabric', 'Databricks', 'Microsoft Azure'],
  },
  { label: 'DevOps & Monitoring', items: ['Docker', 'Langfuse', 'Git', 'Azure DevOps'] },
];

export const certifications = [
  'Microsoft Fabric Analytics Engineer (DP-600)',
  'Databricks — Gen AI Fundamentals',
  'Developing CI/CD Solutions with Azure DevOps',
  'Power BI Data Modeling with DAX',
  'HarvardX CS50: Programming with Python',
];

export interface StackItem {
  label: string;
  icon: string; // Material Symbols Outlined name
}

export const primaryStack: StackItem[] = [
  { label: 'Python', icon: 'terminal' },
  { label: 'FastAPI', icon: 'bolt' },
  { label: 'LangChain / LangGraph', icon: 'account_tree' },
  { label: 'RAG & Vector Search', icon: 'search' },
  { label: 'Multi-Agent Systems', icon: 'hub' },
  { label: 'Azure OpenAI', icon: 'cloud' },
  { label: 'Microsoft Fabric', icon: 'database' },
  { label: 'React', icon: 'code' },
];

export const suggestedPrompts = [
  'What did Akansh build at Bosch?',
  'Tell me about the agentic financial reporting system',
  "What's his experience with RAG?",
  'Which LLM frameworks does he know?',
];
