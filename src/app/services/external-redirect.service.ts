import { Injectable, ApplicationRef, ComponentRef, createComponent, Type } from '@angular/core';
import { ExternalLinkDialogComponent } from '../components/core/external-link-dialog/external-link-dialog.component';
import { ProjectsService } from './projects.service';

@Injectable({
    providedIn: 'root',
})
export class ExternalRouteService {
    private dialogRef: ComponentRef<ExternalLinkDialogComponent> | null = null;

    private projects: Map<string, string | undefined>;
    private socials = new Map<string, string>([
        ['instagram', 'https://www.instagram.com/kwheel_s'],
        ['github', 'https://github.com/wheeless'],
        ['linkedin', 'https://www.linkedin.com/in/kylewheeless'],
        ['x', 'https://x.com/AvernixTrarn'],
        ['twitter', 'https://twitter.com/AvernixTrarn'],
        ['twitch', 'https://www.twitch.tv/trarnlive'],
        ['tiktok', 'https://www.tiktok.com/@kwheel_s'],
        ['facebook', 'https://www.facebook.com/KyleOfOz'],
    ]);

    private categoryMap: { [key: string]: Map<string, string> };

    constructor(private appRef: ApplicationRef, private projectsService: ProjectsService) {
        this.projects = new Map(
            this.projectsService
                .getAllProjects()
                .filter((project) => project.link && project.link.length > 0)
                .map((project) => [project.slug as string, project.link]),
        );

        this.categoryMap = {
            socials: this.socials,
            projects: this.projects as Map<string, string>,
        };
    }

    private isBot(): boolean {
        return /bot|crawler|spider|crawling|headless|prerender|scraper|lighthouse|slurp|googlebot|bingbot|yandex|baidu|duckduckbot|yahoo|baiduspider|facebookexternalhit|whatsapp|telegram|discord|slack|twitter|semrush|ahrefs|mj12bot|archive.org_bot/i.test(
            navigator.userAgent,
        );
    }

    redirectToExternal(
        path: string,
        showDialog: boolean = false,
        category: string = 'socials',
    ): void {
        const url = this.categoryMap[category as keyof typeof this.categoryMap].get(path) || path;
        console.log(`Redirecting to URL: ${url} (Category: ${category}, Path: ${path})`);

        if (url.startsWith('http://') || url.startsWith('https://')) {
            if (this.isBot() || !showDialog) {
                window.location.href = url;
                return;
            }
            this.showDialog(url).then((decision) => {
                switch (decision) {
                    case 'new-tab':
                        window.open(url, '_blank', 'noopener,noreferrer');
                        break;
                    case 'same-window':
                        window.location.href = url;
                        break;
                    case 'cancel':
                        // Do nothing
                        break;
                }
            });
        } else {
            console.error(`Invalid URL or route: ${path}`);
            return;
        }
    }

    private showDialog(url: string): Promise<'new-tab' | 'same-window' | 'cancel'> {
        return new Promise((resolve) => {
            const dialogComponent = createComponent(ExternalLinkDialogComponent, {
                environmentInjector: this.appRef.injector,
            });
            dialogComponent.instance.url = url;

            document.body.appendChild(dialogComponent.location.nativeElement);
            this.appRef.attachView(dialogComponent.hostView);
            this.dialogRef = dialogComponent;

            dialogComponent.instance.decision.subscribe((decision) => {
                this.closeDialog();
                resolve(decision);
            });
        });
    }

    private closeDialog(): void {
        if (this.dialogRef) {
            this.appRef.detachView(this.dialogRef.hostView);
            this.dialogRef.destroy();
            this.dialogRef = null;
        }
    }
}
