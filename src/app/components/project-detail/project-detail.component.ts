import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../../services/projects.service';
import { Project } from '../core/interfaces/project.interface';
import { ExternalRouteService } from '../../services/external-redirect.service';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-project-detail',
    standalone: true,
    imports: [NgOptimizedImage, RouterLink],
    template: `
        <main class="page" role="main">
            <div class="content" role="contentinfo">
                @if (project) {
                <div class="project-detail">
                    <h1 tabindex="0">{{ project.name }}</h1>
                    <p class="description" tabindex="0">
                        {{ project.longDescription || project.description }}
                    </p>
                    <div class="actions">
                        @if (project.link) {
                        <button
                            class="primary-button"
                            (click)="redirectToExternal(project.link)"
                            [attr.aria-label]="'View ' + project.name + ' project'"
                        >
                            View Project
                        </button>
                        }
                        <a
                            routerLink="/projects"
                            class="secondary-button"
                            aria-label="Back to projects"
                        >
                            Back to Projects
                        </a>
                    </div>
                    <div class="project-tags">
                        @for (tag of project.tags; track tag) {
                        <span class="tag">{{ tag }}</span>
                        }
                    </div>
                    <div class="project-image">
                        <img
                            [ngSrc]="project.image"
                            [alt]="project.name + ' project thumbnail'"
                            width="800"
                            height="400"
                            class="responsive-image"
                            priority
                            fetchpriority="high"
                        />
                    </div>
                </div>
                } @else {
                <div class="not-found">
                    <h1 tabindex="0">Project Not Found</h1>
                    <p tabindex="0">The project you're looking for doesn't exist.</p>
                    <a routerLink="/projects" class="primary-button" aria-label="Back to projects">
                        Back to Projects
                    </a>
                </div>
                }
            </div>
        </main>
    `,
    styles: [
        `
            .page {
                margin: 0 auto;
                max-width: 1200px;
                padding: 128px 20px;
            }

            .content {
                max-width: 800px;
                margin: 0 auto;
            }

            .project-detail {
                display: flex;
                flex-direction: column;
                gap: 24px;
            }

            h1 {
                font-size: 2.5rem;
                margin-bottom: 1rem;
                color: #fff;
            }

            .description {
                font-size: 1.2rem;
                color: #e0e0e0;
                line-height: 1.6;
            }

            .project-image {
                width: 100%;
                border-radius: 8px;
                overflow: hidden;
            }

            .responsive-image {
                width: 100%;
                height: auto;
                object-fit: cover;
            }

            .project-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin: 16px 0;
            }

            .tag {
                font-size: 0.9rem;
                padding: 6px 12px;
                border-radius: 16px;
                background: #333;
                color: #fff;
            }

            .actions {
                display: flex;
                gap: 16px;
                margin-top: 16px;
            }

            .primary-button,
            .secondary-button {
                padding: 12px 24px;
                border-radius: 8px;
                border: none;
                cursor: pointer;
                font-size: 1rem;
                transition: all 0.2s ease;
                text-decoration: none;
                text-align: center;
            }

            .primary-button {
                background: #444;
                color: white;
            }

            .secondary-button {
                background: transparent;
                border: 1px solid #444;
                color: white;
            }

            .primary-button:hover {
                background: #555;
            }

            .secondary-button:hover {
                background: #333;
            }

            .not-found {
                text-align: center;
            }

            @media (max-width: 768px) {
                .page {
                    padding: 64px 20px;
                }

                h1 {
                    font-size: 2rem;
                }

                .actions {
                    flex-direction: column;
                }
            }
        `,
    ],
})
export class ProjectDetailComponent implements OnInit {
    project?: Project;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private projectsService: ProjectsService,
        private externalRouteService: ExternalRouteService,
    ) {}

    ngOnInit() {
        const slug = this.route.snapshot.paramMap.get('slug');
        if (slug) {
            this.project = this.projectsService.getProjectBySlug(slug);
            if (!this.project) {
                this.router.navigate(['/projects']);
            }
        }
    }

    redirectToExternal(path: string): void {
        this.externalRouteService.redirectToExternal(path, true);
    }
}
