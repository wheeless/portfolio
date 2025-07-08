import { NgOptimizedImage } from '@angular/common';
import { Component, computed, Signal, signal } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { ProjectTag, TAG_CATEGORIES } from '../core/interfaces/tags';
import { ProjectsService } from '../../services/projects.service';
import { Project } from '../core/interfaces/project.interface';
import { animate, style, transition, trigger } from '@angular/animations';

// interface Project {
//     name: string;
//     description: string;
//     image: string;
//     link: string;
//     tags: ProjectTag[];
// }

@Component({
    selector: 'app-projects',
    standalone: true,
    imports: [NgOptimizedImage, RouterLink],
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.css',
    animations: [
        trigger('projectAnimation', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('300ms ease-in-out', style({ opacity: 1 })),
            ]),
        ]),
    ],
})
export class ProjectsComponent {
    public readonly allProjects: Signal<Project[]>;
    public readonly TAG_CATEGORIES = TAG_CATEGORIES;
    public readonly filteredTagCategories: Signal<typeof TAG_CATEGORIES>;
    public currentPage = signal(0);
    public itemsPerPage = signal(6);
    public selectedTags = signal<ProjectTag[]>([]);
    public isTagsExpanded = signal(false);
    page: string | number | null = null;
    constructor(
        private projectsService: ProjectsService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.allProjects = signal(this.projectsService.getAllProjects());

        const usedTags = new Set(
            this.projectsService.getAllProjects().flatMap((project) => project.tags),
        );

        this.filteredTagCategories = computed(() =>
            TAG_CATEGORIES.map((category) => ({
                name: category.name,
                tags: category.tags.filter((tag) => usedTags.has(tag)),
            })).filter((category) => category.tags.length > 0),
        );
    }

    ngOnInit() {
        this.page = this.route.snapshot.queryParamMap.get('page') ?? this.currentPage();
        const pageNumber = parseInt(this.page as string, 10);
        if (!isNaN(pageNumber) && pageNumber >= 0) {
            this.currentPage.set(pageNumber);
            this.setQueryParams();
        } else {
            this.currentPage.set(this.currentPage());
            this.setQueryParams();
        }
    }

    get availableTags(): ProjectTag[] {
        const tagSet = new Set<ProjectTag>();
        this.allProjects().forEach((project) => {
            project.tags.forEach((tag) => tagSet.add(tag));
        });
        return Array.from(tagSet).sort();
    }

    public filteredProjects = computed(() => {
        if (this.selectedTags().length === 0) {
            return this.allProjects();
        }
        return this.allProjects().filter((project) =>
            this.selectedTags().every((tag) => project.tags.includes(tag)),
        );
    });

    public totalPages = computed(() =>
        Math.ceil(this.filteredProjects().length / this.itemsPerPage()),
    );

    get projects(): Project[] {
        const startIndex = this.currentPage() * this.itemsPerPage();
        return this.filteredProjects().slice(startIndex, startIndex + this.itemsPerPage());
    }

    toggleTag(tag: ProjectTag): void {
        const index = this.selectedTags().indexOf(tag);
        if (index === -1) {
            this.selectedTags.set([...this.selectedTags(), tag]);
        } else {
            this.selectedTags.set(this.selectedTags().filter((t) => t !== tag));
        }
        this.currentPage.set(0);
        this.setQueryParams();
    }

    nextPage(): void {
        if (this.currentPage() < this.totalPages()) {
            this.currentPage.set(this.currentPage() + 1);
            this.setQueryParams();
        }
    }

    previousPage(): void {
        if (this.currentPage() > 0) {
            this.currentPage.set(this.currentPage() - 1);
            this.setQueryParams();
        }
    }

    goToPage(page: number): void {
        if (page >= 0 && page <= this.totalPages()) {
            this.currentPage.set(page);
            this.setQueryParams();
        }
    }

    getPageNumbers() {
        return Array.from({ length: this.totalPages() }, (_, i) => i);
    }

    setQueryParams() {
        this.router.navigate(['/projects'], { queryParams: { page: this.currentPage() } });
        return;
    }
}
