import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectTag, TAG_CATEGORIES } from '../core/interfaces/tags';
import { ProjectsService } from '../../services/projects.service';
import { Project } from '../core/interfaces/project.interface';

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
})
export class ProjectsComponent {
    public readonly allProjects: Project[];
    public readonly TAG_CATEGORIES = TAG_CATEGORIES;
    public filteredTagCategories: typeof TAG_CATEGORIES;

    constructor(private projectsService: ProjectsService) {
        this.allProjects = this.projectsService.getAllProjects();

        const usedTags = new Set(
            this.projectsService.getAllProjects().flatMap((project) => project.tags),
        );

        this.filteredTagCategories = TAG_CATEGORIES.map((category) => ({
            name: category.name,
            tags: category.tags.filter((tag) => usedTags.has(tag)),
        })).filter((category) => category.tags.length > 0); // Remove empty categories
    }

    public currentPage = 1;
    public itemsPerPage = 6;
    public selectedTags: ProjectTag[] = [];
    public isTagsExpanded = false;

    get availableTags(): ProjectTag[] {
        const tagSet = new Set<ProjectTag>();
        this.allProjects.forEach((project) => {
            project.tags.forEach((tag) => tagSet.add(tag));
        });
        return Array.from(tagSet).sort();
    }

    get filteredProjects(): Project[] {
        if (this.selectedTags.length === 0) {
            return this.allProjects;
        }
        return this.allProjects.filter((project) =>
            this.selectedTags.every((tag) => project.tags.includes(tag)),
        );
    }

    get totalPages(): number {
        return Math.ceil(this.filteredProjects.length / this.itemsPerPage);
    }

    get projects(): Project[] {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        return this.filteredProjects.slice(startIndex, startIndex + this.itemsPerPage);
    }

    toggleTag(tag: ProjectTag): void {
        const index = this.selectedTags.indexOf(tag);
        if (index === -1) {
            this.selectedTags.push(tag);
        } else {
            this.selectedTags.splice(index, 1);
        }
        this.currentPage = 1; // Reset to first page when filtering
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
