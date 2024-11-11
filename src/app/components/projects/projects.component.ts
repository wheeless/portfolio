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
    public readonly projects: Project[] = [
        {
            name: 'Avernix Technologies',
            description: 'Homepage for my software company.',
            image: 'https://imagedelivery.net/eFpPUO445KI7hjnFeTxrJQ/10fdbb1f-506c-40c2-5a2c-6d68e735e600/public',
            link: 'https://avernix.com',
        },
        {
            name: 'Client Portal',
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

        // Add more projects as needed
    ];
}
