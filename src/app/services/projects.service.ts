import { Injectable } from '@angular/core';
import { ProjectTag } from '../components/core/interfaces/tags';
import { Project } from '../components/core/interfaces/project.interface';

@Injectable({
    providedIn: 'root',
})
export class ProjectsService {
    private readonly projects: Project[] = [
        {
            name: 'Avernix Technologies',
            description: 'Homepage for my software company.',
            longDescription:
                'Avernix Technologies is a software company that I founded in 2023. I started the company with the goal of providing high-quality software solutions to businesses and individuals alike. Over the years, I have worked with a variety of clients, from small businesses to large corporations, and I have gained a wealth of experience in the software development industry. Our homepage utilizes Next.js, React, Tailwind CSS, and becomes a full-stack application with a home-built REST API.',
            image: 'https://imagedelivery.net/eFpPUO445KI7hjnFeTxrJQ/10fdbb1f-506c-40c2-5a2c-6d68e735e600/public',
            link: 'https://avernix.com',
            tags: ['Next.js', 'React', 'Business', 'Full Stack'] as ProjectTag[],
        },
        {
            name: 'Avernix Technologies Client Portal',
            description: 'A portal for clients to view their respective services.',
            longDescription:
                'The client portal is a platform that allows clients to view and manage their respective services. It is built with Angular, TypeScript, and utilizes a REST API to fetch and update data. The portal is designed to be user-friendly and efficient, allowing clients to quickly and easily access the information they need.',
            image: 'https://imagedelivery.net/eFpPUO445KI7hjnFeTxrJQ/f8a1973b-bd9b-4259-3e29-c4116bcc0200/public',
            link: 'https://client.avernix.com',
            tags: ['Angular', 'TypeScript', 'Business', 'REST API', 'Full Stack'] as ProjectTag[],
        },
        {
            name: 'NonPro AdCo',
            description: 'Website built for NonPro AdCo.',
            longDescription:
                'The NonPro AdCo website is a platform that allows Non Profit Organizations to connect with NonPro AdCo. It is built with Next.js, React, Tailwind CSS, and utilizes a REST API to fetch and update data. The website is designed to be user-friendly and efficient, utilizing Avernix Technologies home-built form-to-email REST API.',
            image: 'https://imagedelivery.net/eFpPUO445KI7hjnFeTxrJQ/5ca1d04d-fd84-44bb-c3dc-371597997000/public',
            link: 'https://nonproadco.avnxapp.com',
            tags: ['Next.js', 'React', 'Business', 'REST API', 'Full Stack'] as ProjectTag[],
        },
        {
            name: 'Lich Souls Gaming',
            description:
                'Website, game servers, discord bot, and more. Most of the functionality is server-side.',
            longDescription:
                'Lich Souls Gaming is a gaming community founded in 2006. The website was built in 2023/2024, and it is built with Angular, TypeScript, and utilizes a custom REST API to fetch and update data. The Discord bot is built with Node.js, and utilizes the Discord.js library. The game servers are hosted with Linux, and utilize a custom-built game server management system.',
            image: 'https://imagedelivery.net/eFpPUO445KI7hjnFeTxrJQ/c8013b30-459c-4e09-5be2-2705460e1100/public',
            link: 'https://lichsouls.com/dice',
            tags: [
                'Angular',
                'TypeScript',
                'Discord.js',
                'Node.js',
                'Full Stack',
                'SQL',
            ] as ProjectTag[],
        },
        {
            name: 'Blackfox Gaming',
            description:
                'Game servers, discord bot, and more. Most of the functionality is server-side.',
            image: 'https://imagedelivery.net/eFpPUO445KI7hjnFeTxrJQ/aab8d7e2-2e34-44d8-16d5-ab0cf1c9d900/public',
            link: 'https://discord.gg/2cnCzun',
            tags: ['Linux', 'Java', 'Server'] as ProjectTag[],
        },
        {
            name: 'Frankie Goldie',
            description:
                'Website to display all of the authors books, links to purchase, and more.',
            longDescription:
                'Frankie Goldie is a website built with Angular, TypeScript, and utilizes a REST API to fetch and update data. The website is designed to be user-friendly and efficient, utilizing Avernix Technologies home-built form-to-email REST API. The website is hosted with Cloudflare, and utilizes Firebase Firestore and Firebase Functions. This includes a fully custom-built admin dashboard for managing the website.',
            image: 'https://avernix.com/cdn-cgi/imagedelivery/eFpPUO445KI7hjnFeTxrJQ/a8eaa2d4-9d9a-42c4-a837-bbdbe0437d00/public',
            link: 'https://frankiegoldieandfriends.com',
            tags: ['Angular', 'REST API', 'Business', 'Firebase', 'Full Stack'] as ProjectTag[],
        },
        {
            name: 'Express Version Middleware',
            description: 'Middleware for easy versioning of express applications/apis.',
            longDescription:
                'Express Version Middleware is a middleware library for express that allows for easy versioning of express applications/apis. It is built with TypeScript. The middleware is designed to be user-friendly and efficient, allowing for easy versioning of express applications/apis.',
            image: 'https://imagedelivery.net/eFpPUO445KI7hjnFeTxrJQ/f8a1973b-bd9b-4259-3e29-c4116bcc0200/public',
            link: 'https://npmjs.com/package/@trarn/express-version-middleware',
            tags: ['Express', 'JavaScript', 'Maintained', 'NPM'] as ProjectTag[],
        },
        {
            name: 'Logger',
            description: 'Functional logger written in typescript. Easy to use and configure.',
            longDescription:
                'Logger is a logger library for TypeScript/JavaScript. It is built with TypeScript. The logger is designed to be user-friendly and efficient, allowing for easy logging of events and errors.',
            image: 'https://imagedelivery.net/eFpPUO445KI7hjnFeTxrJQ/f8a1973b-bd9b-4259-3e29-c4116bcc0200/public',
            link: 'https://npmjs.com/package/@trarn/logger',
            tags: ['Express', 'TypeScript', 'Maintained', 'NPM'] as ProjectTag[],
        },
        {
            name: 'Middleware',
            description:
                'A poorly named middleware library for express, because it includes helpers as well.',
            longDescription:
                'Middleware is a middleware library for express. It is built with TypeScript. It includes helpers for common tasks such as authentication, authorization, and more.',
            image: 'https://imagedelivery.net/eFpPUO445KI7hjnFeTxrJQ/f8a1973b-bd9b-4259-3e29-c4116bcc0200/public',
            link: 'https://npmjs.com/package/@trarn/middleware',
            tags: ['Express', 'Maintained', 'JavaScript', 'NPM'] as ProjectTag[],
        },
    ].map((project) => ({
        ...project,
        slug: this.generateSlug(project.name),
    }));

    private generateSlug(name: string): string {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }

    getAllProjects(): Project[] {
        return this.projects;
    }

    getProjectBySlug(slug: string): Project | undefined {
        return this.projects.find((project) => project.slug === slug);
    }
}
