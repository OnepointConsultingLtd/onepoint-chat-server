import { PersonaMapping, ServiceMapping } from "../types/conversation";

export const personaMappings: PersonaMapping[] = [
  {
    keywords: [
      // Business Leadership
      "ceo",
      "cfo",
      "coo",
      "cmo",
      "chief executive",
      "chief financial",
      "chief operating",
      "chief marketing",
      // Digital/Innovation Leadership
      "chief digital",
      "chief commercial",
      "chief product",
      "chief innovation",
      // Department Leadership
      "head of sales",
      "head of marketing",
      "head of business",
      "head of strategy",
      "head of operations",
      "head of customer",
      "head of transformation",
      "head of hr",
      "head of innovation",
      "head of digital",
      // Business Focus
      "business leader",
      "executive director",
      "managing director",
      "commercial director",
      // Common Business Terms
      "revenue",
      "growth",
      "strategy",
      "transformation",
      "efficiency",
      "roi",
      "market share",
    ],
    persona: "Maria",
  },
  {
    keywords: [
      // Tech Leadership
      "cto",
      "cio",
      "chief technology",
      "chief information",
      "chief technical",
      "vp of engineering",
      "head of technology",
      "head of it",
      "head of engineering",
      "head of architecture",
      "head of infrastructure",
      "it director",
      "technology director",
      "technical director",
      // Platform/Operations
      "head of platforms",
      "head of devops",
      "head of cloud",
      "head of security",
      "director of engineering",
      "director of technology",
      // Tech Strategy Terms
      "technology strategy",
      "digital transformation",
      "enterprise architecture",
      "tech stack",
      "infrastructure",
      "cloud strategy",
      "security strategy",
    ],
    persona: "Mark T",
  },
  {
    keywords: [
      // Data Leadership
      "chief data",
      "chief analytics",
      "cdo",
      "chief data scientist",
      "head of data",
      "head of analytics",
      "head of ai",
      "head of ml",
      "director of data",
      "director of analytics",
      // Data Strategy Terms
      "data strategy",
      "analytics strategy",
      "data governance",
      "data transformation",
      "machine learning strategy",
      "ai strategy",
      "data-driven",
    ],
    persona: "Mark D",
  },
  {
    keywords: [
      // Technical Implementation
      "solution architect",
      "technical architect",
      "software architect",
      "systems architect",
      "lead engineer",
      "senior developer",
      "senior engineer",
      "principal engineer",
      "devops engineer",
      "platform engineer",
      "software engineer",
      // Technical Terms
      "api",
      "microservices",
      "kubernetes",
      "docker",
      "ci/cd",
      "aws",
      "azure",
      "coding",
      "programming",
      "development",
      "implementation",
      "integration",
    ],
    persona: "Rakesh T",
  },
  {
    keywords: [
      // Data Implementation
      "data scientist",
      "data engineer",
      "data architect",
      "ml engineer",
      "analytics engineer",
      "bi developer",
      "data analyst",
      // Data Technical Terms
      "machine learning",
      "deep learning",
      "neural networks",
      "data pipeline",
      "etl",
      "data modeling",
      "data warehouse",
      "big data",
      "data lake",
      "python",
      "r",
      "sql",
      "tensorflow",
      "pytorch",
    ],
    persona: "Rakesh D",
  },
  {
    keywords: [
      // Procurement
      "procurement",
      "purchasing",
      "buyer",
      "vendor",
      "supplier",
      "sourcing",
      "contract",
      "tender",
      "rfp",
      "rfq",
      "procurement manager",
      "category manager",
      "vendor manager",
    ],
    persona: "Vanika",
  },
  {
    keywords: [
      // Career/Education
      "student",
      "graduate",
      "internship",
      "placement",
      "looking for job",
      "job opportunity",
      "career",
      "position",
      "entry level",
      "junior",
      "fresh graduate",
      "recent graduate",
    ],
    persona: "Destiny",
  },
];

export const serviceMappings: ServiceMapping[] = [
  {
    keywords: [
      "ai strategy",
      "artificial intelligence strategy",
      "machine learning strategy",
      "ai roadmap",
      "ai vision",
      "ai planning",
      "ai governance",
    ],
    service: "AI Strategy",
  },
  {
    keywords: [
      "ai architecture",
      "ml architecture",
      "ai design",
      "model architecture",
      "ai infrastructure",
      "ai system design",
    ],
    service: "AI Architecture",
  },
  {
    keywords: [
      "ai proof of value",
      "ai pov",
      "ai poc",
      "proof of concept",
      "proof of value",
      "prototype",
      "ai experimentation",
    ],
    service: "AI Proof of Value",
  },
  {
    keywords: [
      "ai build",
      "ai development",
      "ml model development",
      "ai engineering",
      "model training",
      "ai implementation",
    ],
    service: "AI Build",
  },
  {
    keywords: [
      "ai scaling",
      "ai production",
      "ai deployment",
      "mlops",
      "scaling ai",
      "ai lifecycle",
    ],
    service: "AI Scaling",
  },
  {
    keywords: [
      "ai managed",
      "ai monitoring",
      "ai operations",
      "ai support",
      "managed ai services",
      "ai optimization",
    ],
    service: "AI Managed",
  },
  {
    keywords: [
      "accelerated by onepoint",
      "story arc 2",
      "onepoint acceleration",
      "innovation by onepoint",
    ],
    service: "Story arc 2 - Accelerated by Onepoint",
  },
  {
    keywords: [
      "platform",
      "onepoint platform",
      "ai platform",
      "digital platform",
    ],
    service: "Platforms",
  },
  {
    keywords: [
      "smart advisors",
      "advisor platform",
      "onepoint smart advisors",
    ],
    service: "The Onepoint Smart Advisors™ Platform",
  },
  {
    keywords: ["d-well", "onepoint d-well"],
    service: "Onepoint D-Well™",
  },
  {
    keywords: ["res-ai", "resource ai", "onepoint res-ai"],
    service: "Onepoint Res-AI™",
  },
  {
    keywords: ["expert matcher", "onepoint expertmatcher"],
    service: "Onepoint ExpertMatcher™",
  },
  {
    keywords: [
      "smart company advisor",
      "osca",
      "onepoint osca",
      "onepoint smart company advisor",
    ],
    service: "Onepoint Smart Company Advisor™ (Osca)",
  },
  {
    keywords: [
      "smart converters",
      "converter platform",
      "onepoint smart converters",
    ],
    service: "The Onepoint Smart Converters™ Platform",
  },
  {
    keywords: [
      "convertwise",
      "s1000d",
      "onepoint convertwise",
      "convertwise s1000d",
    ],
    service: "Onepoint ConvertWise™ S1000D Edition",
  },
  {
    keywords: [
      "smart curators",
      "curation platform",
      "onepoint smart curators",
    ],
    service: "The Onepoint Smart Curators™ Platform",
  },
  {
    keywords: [
      "curation studio",
      "onepoint curation studio",
      "content curation",
    ],
    service: "Onepoint Curation Studio™",
  },
  {
    keywords: [
      "adaptive discovery",
      "onepoint adaptive discovery",
      "data discovery",
    ],
    service: "Onepoint Adaptive Discovery™",
  },
  {
    keywords: [
      "toolkit",
      "boomi",
      "ai ecosystem",
      "onepoint ai ecosystem for boomi",
    ],
    service: "Onepoint AI Ecosystem for Boomi",
  },
  {
    keywords: ["ai engine", "onepoint ai engine"],
    service: "Onepoint AI Engine™",
  },
  {
    keywords: [
      "framework",
      "data framework",
      "analytics framework",
      "body of knowledge",
      "onepoint data & analytics body of knowledge",
    ],
    service: "Onepoint Data & Analytics Body of Knowledge™",
  },
  {
    keywords: [
      "agentic architecture",
      "agentic framework",
      "agentic body of knowledge",
      "onepoint agentic architecture",
    ],
    service: "Onepoint Agentic Architecture Body of Knowledge™",
  },
  {
    keywords: [
      "reference architecture",
      "data & analytics framework",
      "onepoint reference architecture framework",
    ],
    service: "Onepoint Reference Architecture Framework for Data & Analytics™",
  },
  {
    keywords: [
      "method",
      "valuepath",
      "value path",
      "onepoint valuepath",
    ],
    service: "Onepoint Valuepath™",
  },
  {
    keywords: [
      "rapid value",
      "rapid method",
      "onepoint rapid value method",
    ],
    service: "Onepoint Rapid Value Method™",
  },
];
