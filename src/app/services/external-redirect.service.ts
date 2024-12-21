import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ExternalRouteService {
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

    redirectToExternal(path: string): void {
        const url = this.routes.get(path);
        if (url) {
            window.location.href = url;
        } else {
            console.error(`No external route found for: ${path}`);
        }
    }
}
