import { PersonaMapping, ServiceMapping } from '../types/conversation';

export const personaMappings: PersonaMapping[] = [
	{
		keywords: [
			// Business Leadership
			'ceo', 'cfo', 'coo', 'cmo', 'chief executive', 'chief financial', 'chief operating', 'chief marketing',
			// Digital/Innovation Leadership
			'chief digital', 'chief commercial', 'chief product', 'chief innovation',
			// Department Leadership
			'head of sales', 'head of marketing', 'head of business', 'head of strategy', 'head of operations',
			'head of customer', 'head of transformation', 'head of hr', 'head of innovation', 'head of digital',
			// Business Focus
			'business leader', 'executive director', 'managing director', 'commercial director',
			// Common Business Terms
			'revenue', 'growth', 'strategy', 'transformation', 'efficiency', 'roi', 'market share'
		],
		persona: 'Maria'
	},
	{
		keywords: [
			// Tech Leadership
			'cto', 'cio', 'chief technology', 'chief information', 'chief technical', 'vp of engineering',
			'head of technology', 'head of it', 'head of engineering', 'head of architecture', 'head of infrastructure',
			'it director', 'technology director', 'technical director',
			// Platform/Operations
			'head of platforms', 'head of devops', 'head of cloud', 'head of security',
			'director of engineering', 'director of technology',
			// Tech Strategy Terms
			'technology strategy', 'digital transformation', 'enterprise architecture', 'tech stack',
			'infrastructure', 'cloud strategy', 'security strategy'
		],
		persona: 'Mark T'
	},
	{
		keywords: [
			// Data Leadership
			'chief data', 'chief analytics', 'cdo', 'chief data scientist',
			'head of data', 'head of analytics', 'head of ai', 'head of ml',
			'director of data', 'director of analytics',
			// Data Strategy Terms
			'data strategy', 'analytics strategy', 'data governance', 'data transformation',
			'machine learning strategy', 'ai strategy', 'data-driven'
		],
		persona: 'Mark D'
	},
	{
		keywords: [
			// Technical Implementation
			'solution architect', 'technical architect', 'software architect', 'systems architect',
			'lead engineer', 'senior developer', 'senior engineer', 'principal engineer',
			'devops engineer', 'platform engineer', 'software engineer',
			// Technical Terms
			'api', 'microservices', 'kubernetes', 'docker', 'ci/cd', 'aws', 'azure',
			'coding', 'programming', 'development', 'implementation', 'integration'
		],
		persona: 'Rakesh T'
	},
	{
		keywords: [
			// Data Implementation
			'data scientist', 'data engineer', 'data architect', 'ml engineer',
			'analytics engineer', 'bi developer', 'data analyst',
			// Data Technical Terms
			'machine learning', 'deep learning', 'neural networks', 'data pipeline',
			'etl', 'data modeling', 'data warehouse', 'big data', 'data lake',
			'python', 'r', 'sql', 'tensorflow', 'pytorch'
		],
		persona: 'Rakesh D'
	},
	{
		keywords: [
			// Procurement
			'procurement', 'purchasing', 'buyer', 'vendor', 'supplier',
			'sourcing', 'contract', 'tender', 'rfp', 'rfq',
			'procurement manager', 'category manager', 'vendor manager'
		],
		persona: 'Vanika'
	},
	{
		keywords: [
			// Career/Education
			'student', 'graduate', 'internship', 'placement',
			'looking for job', 'job opportunity', 'career', 'position',
			'entry level', 'junior', 'fresh graduate', 'recent graduate'
		],
		persona: 'Destiny'
	}
];

export const serviceMappings: ServiceMapping[] = [
	{
		keywords: [
			// Data Solutions
			'data', 'analytics', 'insights', 'reporting', 'database',
			'data quality', 'data governance', 'data strategy',
			'data management', 'data platform', 'data architecture',
			'business intelligence', 'data visualization', 'dashboards'
		],
		service: 'Data Solutions'
	},
	{
		keywords: [
			// AI Innovation
			'ai', 'ml', 'artificial intelligence', 'machine learning',
			'deep learning', 'neural networks', 'nlp', 'computer vision',
			'predictive analytics', 'automation', 'cognitive computing',
			'ai strategy', 'ml ops', 'ai implementation'
		],
		service: 'AI Innovation'
	},
	{
		keywords: [
			// Solution Architecture
			'architecture', 'system', 'integration', 'enterprise', 'transformation',
			'cloud architecture', 'microservices', 'api design',
			'system design', 'technical architecture', 'solution design',
			'enterprise architecture', 'digital transformation'
		],
		service: 'Solution Architecture'
	}
]; 