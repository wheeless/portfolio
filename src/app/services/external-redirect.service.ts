import { Injectable, ApplicationRef, ComponentRef, createComponent, Type } from '@angular/core';
import { ExternalLinkDialogComponent } from '../components/core/external-link-dialog/external-link-dialog.component';

@Injectable({
    providedIn: 'root',
})
export class ExternalRouteService {
    private dialogRef: ComponentRef<ExternalLinkDialogComponent> | null = null;

    constructor(private appRef: ApplicationRef) {}

    private routes = new Map<string, string>([
        ['instagram', 'https://www.instagram.com/kwheel_s'],
        ['github', 'https://github.com/wheeless'],
        ['linkedin', 'https://www.linkedin.com/in/kylewheeless'],
        ['x', 'https://x.com/AvernixTrarn'],
        ['twitter', 'https://twitter.com/AvernixTrarn'],
        ['twitch', 'https://www.twitch.tv/trarnlive'],
        ['tiktok', 'https://www.tiktok.com/@kwheel_s'],
        ['facebook', 'https://www.facebook.com/KyleOfOz'],
    ]);

    private isBot(): boolean {
        return /bot|crawler|spider|crawling/i.test(navigator.userAgent);
    }

    redirectToExternal(path: string): void {
        const url = this.routes.get(path);
        if (!url) {
            console.error(`No external route found for: ${path}`);
            return;
        }

        if (this.isBot()) {
            window.location.href = url;
            return;
        }

        this.showDialog().then((decision) => {
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
    }

    private showDialog(): Promise<'new-tab' | 'same-window' | 'cancel'> {
        return new Promise((resolve) => {
            // Create dialog component
            const dialogComponent = createComponent(ExternalLinkDialogComponent, {
                environmentInjector: this.appRef.injector,
            });

            // Add to DOM
            document.body.appendChild(dialogComponent.location.nativeElement);
            this.appRef.attachView(dialogComponent.hostView);
            this.dialogRef = dialogComponent;

            // Listen for decision
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
