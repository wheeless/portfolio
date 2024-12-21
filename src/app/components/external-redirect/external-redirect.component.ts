import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExternalRouteService } from '../../services/external-redirect.service';

@Component({
    selector: 'app-external-redirect',
    standalone: true,
    imports: [],
    template: `
        <main class="page" role="main">
            <div class="content" role="contentinfo">
                <h1 tabindex="0">Redirecting...</h1>
                <p tabindex="0">You are being redirected to an external website.</p>
            </div>
        </main>
    `,
    styles: [
        `
            .page {
                margin: 0 auto;
                max-width: 1200px;
                padding: 128px 20px;
                min-height: 80vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .content {
                text-align: center;
                max-width: 600px;
            }

            h1 {
                font-size: 2.5rem;
                margin-bottom: 1rem;
                color: #fff;
            }

            p {
                font-size: 1.2rem;
                color: #e0e0e0;
                margin-bottom: 2rem;
                line-height: 1.6;
            }

            @media (max-width: 768px) {
                .page {
                    padding: 64px 20px;
                }

                h1 {
                    font-size: 2rem;
                }
            }
        `,
    ],
})
export class ExternalRedirectComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private externalRouteService: ExternalRouteService,
    ) {}

    ngOnInit(): void {
        const path = this.route.snapshot.routeConfig?.path || '';
        this.externalRouteService.redirectToExternal(path);
    }
}
