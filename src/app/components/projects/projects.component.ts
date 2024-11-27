import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Project {
    name: string;
    description: string;
    image: string;
    link: string;
}

@Component({
    selector: 'app-projects',
    standalone: true,
    imports: [NgOptimizedImage, RouterLink],
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.css',
})
export class ProjectsComponent {
    public readonly allProjects: Project[] = [
        {
            name: 'Avernix Technologies',
            description: 'Homepage for my software company.',
            image: 'https://imagedelivery.net/eFpPUO445KI7hjnFeTxrJQ/10fdbb1f-506c-40c2-5a2c-6d68e735e600/public',
            link: 'https://avernix.com',
        },
        {
            name: 'Avernix Technologies Client Portal',
            description: 'A portal for clients to view their respective services.',
            image: 'https://imagedelivery.net/eFpPUO445KI7hjnFeTxrJQ/f8a1973b-bd9b-4259-3e29-c4116bcc0200/public',
            link: 'https://client.avernix.com',
        },
        {
            name: 'NonPro AdCo',
            description: 'Website built for NonPro AdCo.',
            image: 'https://imagedelivery.net/eFpPUO445KI7hjnFeTxrJQ/5ca1d04d-fd84-44bb-c3dc-371597997000/public',
            link: 'https://nonproadco.avnxapp.com',
        },
        {
            name: 'Lich Souls Gaming',
            description:
                'Website, game servers, discord bot, and more. Most of the functionality is server-side.',
            image: 'https://imagedelivery.net/eFpPUO445KI7hjnFeTxrJQ/c8013b30-459c-4e09-5be2-2705460e1100/public',
            link: 'https://lichsouls.com/dice',
        },
        {
            name: 'Blackfox Gaming',
            description:
                'Game servers, discord bot, and more. Most of the functionality is server-side.',
            image: 'https://imagedelivery.net/eFpPUO445KI7hjnFeTxrJQ/aab8d7e2-2e34-44d8-16d5-ab0cf1c9d900/public',
            link: 'https://discord.gg/2cnCzun',
        },
        {
            name: 'Frankie Goldie',
            description:
                'Website to display all of the authors books, links to purchase, and more.',
            image: 'https://avernix.com/cdn-cgi/imagedelivery/eFpPUO445KI7hjnFeTxrJQ/a8eaa2d4-9d9a-42c4-a837-bbdbe0437d00/public',
            link: 'https://frankiegoldieandfriends.com',
        },
        {
            name: 'Express Version Middleware',
            description: 'Middleware for easy versioning of express applications/apis.',
            image: 'https://imagedelivery.net/eFpPUO445KI7hjnFeTxrJQ/f8a1973b-bd9b-4259-3e29-c4116bcc0200/public',
            link: 'https://npmjs.com/package/@trarn/express-version-middleware',
        },
        {
            name: 'Logger',
            description: 'Functional logger written in typescript. Easy to use and configure.',
            image: 'https://imagedelivery.net/eFpPUO445KI7hjnFeTxrJQ/f8a1973b-bd9b-4259-3e29-c4116bcc0200/public',
            link: 'https://npmjs.com/package/@trarn/logger',
        },
        {
            name: 'Middleware',
            description: 'A poorly named library for express, because it includes helpers as well.',
            image: 'https://imagedelivery.net/eFpPUO445KI7hjnFeTxrJQ/f8a1973b-bd9b-4259-3e29-c4116bcc0200/public',
            link: 'https://npmjs.com/package/@trarn/middleware',
        },
    ];

    public currentPage = 1;
    public itemsPerPage = 6;
    public totalPages = Math.ceil(this.allProjects.length / this.itemsPerPage);

    get projects(): Project[] {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        return this.allProjects.slice(startIndex, startIndex + this.itemsPerPage);
    }

    nextPage(): void {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
        }
    }

    previousPage(): void {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
    }

    goToPage(page: number): void {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
        }
    }

    getPageNumbers() {
        return Array.from({ length: this.totalPages }, (_, i) => i);
    }
}
