export type ProgrammingLanguage =
    | 'TypeScript'
    | 'JavaScript'
    | 'Python'
    | 'Java'
    | 'C#'
    | 'PHP'
    | 'Ruby'
    | 'Go'
    | 'Rust'
    | 'C++'
    | 'SQL';

export type Framework =
    | 'Angular'
    | 'React'
    | 'Vue'
    | 'Next.js'
    | 'Node.js'
    | 'Express'
    | 'Django'
    | 'Flask'
    | 'Spring'
    | 'ASP.NET'
    | 'Laravel'
    | 'Ruby on Rails'
    | 'Discord.js';

export type Technology =
    | 'Docker'
    | 'Kubernetes'
    | 'AWS'
    | 'Azure'
    | 'GCP'
    | 'Firebase'
    | 'MongoDB'
    | 'PostgreSQL'
    | 'MySQL'
    | 'Redis'
    | 'GraphQL'
    | 'REST API'
    | 'NPM'
    | 'Linux'
    | 'Server';

export type ProjectType =
    | 'Frontend'
    | 'Backend'
    | 'Full Stack'
    | 'Mobile'
    | 'Desktop'
    | 'Web'
    | 'API'
    | 'Library'
    | 'Framework'
    | 'Tool'
    | 'Plugin'
    | 'Extension';

export type BusinessCategory =
    | 'Business'
    | 'E-commerce'
    | 'Enterprise'
    | 'SaaS'
    | 'B2B'
    | 'B2C'
    | 'Startup'
    | 'Open Source'
    | 'Portfolio'
    | 'Educational';

export type DevelopmentPractice =
    | 'CI/CD'
    | 'TDD'
    | 'Agile'
    | 'DevOps'
    | 'Microservices'
    | 'Serverless'
    | 'PWA'
    | 'REST'
    | 'Testing'
    | 'Documentation';

export type ProjectStatus =
    | 'In Development'
    | 'Maintained'
    | 'Completed'
    | 'Archived'
    | 'Beta'
    | 'Alpha'
    | 'MVP'
    | 'Production';

export type ProjectTag =
    | ProgrammingLanguage
    | Framework
    | Technology
    | ProjectType
    | BusinessCategory
    | DevelopmentPractice
    | ProjectStatus;

export interface TagCategory {
    name: string;
    tags: ProjectTag[];
}

export const TAG_CATEGORIES: TagCategory[] = [
    {
        name: 'Languages',
        tags: [
            'TypeScript',
            'JavaScript',
            'Python',
            'Java',
            'C#',
            'PHP',
            'Ruby',
            'Go',
            'Rust',
            'C++',
            'SQL',
        ],
    },
    {
        name: 'Frameworks',
        tags: [
            'Angular',
            'React',
            'Vue',
            'Next.js',
            'Node.js',
            'Express',
            'Django',
            'Flask',
            'Spring',
            'ASP.NET',
            'Laravel',
            'Ruby on Rails',
            'Discord.js',
        ],
    },
    {
        name: 'Technologies',
        tags: [
            'Docker',
            'Kubernetes',
            'AWS',
            'Azure',
            'GCP',
            'Firebase',
            'MongoDB',
            'PostgreSQL',
            'MySQL',
            'Redis',
            'GraphQL',
            'REST API',
        ],
    },
    {
        name: 'Project Types',
        tags: [
            'Frontend',
            'Backend',
            'Full Stack',
            'Mobile',
            'Desktop',
            'Web',
            'API',
            'Library',
            'Framework',
            'Tool',
            'Plugin',
            'Extension',
        ],
    },
    {
        name: 'Business',
        tags: [
            'Business',
            'E-commerce',
            'Enterprise',
            'SaaS',
            'B2B',
            'B2C',
            'Startup',
            'Open Source',
            'Portfolio',
            'Educational',
        ],
    },
    {
        name: 'Practices',
        tags: [
            'CI/CD',
            'TDD',
            'Agile',
            'DevOps',
            'Microservices',
            'Serverless',
            'PWA',
            'REST',
            'Testing',
            'Documentation',
        ],
    },
    {
        name: 'Status',
        tags: [
            'In Development',
            'Maintained',
            'Completed',
            'Archived',
            'Beta',
            'Alpha',
            'MVP',
            'Production',
        ],
    },
];
