import { PersonaMapping, ServiceMapping } from '../types/conversation';

export const personaMappings: PersonaMapping[] = [
	{
		keywords: ['ceo', 'chief', 'director', 'head', 'leader', 'executive', 'founder', 'owner'],
		persona: 'Maria'
	},
	{
		keywords: ['cto', 'tech', 'architect', 'engineering', 'developer', 'technical'],
		persona: 'Mark'
	},
	{
		keywords: ['engineer', 'developer', 'analyst', 'specialist', 'consultant'],
		persona: 'Rakkesh'
	},
	{
		keywords: ['procurement', 'purchasing', 'buyer', 'vendor', 'supplier'],
		persona: 'Vanika'
	},
	{
		keywords: ['student', 'graduate', 'looking', 'opportunity', 'career', 'job'],
		persona: 'Destiny'
	}
];

export const serviceMappings: ServiceMapping[] = [
	{
		keywords: ['data', 'analytics', 'insights', 'reporting', 'database'],
		service: 'Data Solutions'
	},
	{
		keywords: ['ai', 'ml', 'artificial intelligence', 'machine learning', 'automation'],
		service: 'AI Innovation'
	},
	{
		keywords: ['architecture', 'system', 'integration', 'enterprise', 'transformation'],
		service: 'Solution Architecture'
	}
]; 