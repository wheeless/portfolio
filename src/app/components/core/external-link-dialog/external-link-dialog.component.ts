import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-external-link-dialog',
    standalone: true,
    template: `
        <div class="dialog-overlay" (click)="onCancel()">
            <div class="dialog-content" (click)="$event.stopPropagation()">
                <h2>External Link</h2>
                <p>How would you like to open this link?</p>
                <p class="url">{{ url }}</p>
                <div class="dialog-actions">
                    <button class="btn-primary" (click)="onNewTab()">New Tab</button>
                    <button class="btn-secondary" (click)="onSameWindow()">Same Window</button>
                    <button class="btn-cancel" (click)="onCancel()">Cancel</button>
                </div>
            </div>
        </div>
    `,
    styles: [
        `
            .dialog-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
            }

            .dialog-content {
                background: #212121;
                padding: 2rem;
                border-radius: 8px;
                border: 1px solid #333;
                max-width: 400px;
                width: 90%;
                text-align: center;
            }

            h2 {
                margin: 0 0 1rem;
                color: #fff;
            }

            p {
                margin-bottom: 1.5rem;
                color: #e0e0e0;
            }

            .dialog-actions {
                display: flex;
                gap: 1rem;
                justify-content: center;
            }

            button {
                padding: 0.75rem 1.5rem;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-weight: 500;
                transition: all 0.3s ease;
            }

            .btn-primary {
                background: #333;
                color: white;
            }

            .btn-primary:hover {
                background: #444;
            }

            .btn-secondary {
                background: #444;
                color: white;
            }

            .btn-secondary:hover {
                background: #555;
            }

            .btn-cancel {
                background: transparent;
                border: 1px solid #333;
                color: #e0e0e0;
            }

            .btn-cancel:hover {
                background: rgba(255, 255, 255, 0.1);
            }

            @media (max-width: 768px) {
                .dialog-actions {
                    flex-direction: column;
                }

                button {
                    width: 100%;
                }
            }
            .url {
                font-family: monospace;
                background: rgba(0, 0, 0, 0.2);
                padding: 8px;
                border-radius: 4px;
                word-break: break-all;
                font-size: 0.9rem;
                margin-bottom: 1.5rem;
                color: #e0e0e0;
            }
        `,
    ],
})
export class ExternalLinkDialogComponent {
    @Input() url!: string;
    @Output() decision = new EventEmitter<'new-tab' | 'same-window' | 'cancel'>();

    onNewTab() {
        this.decision.emit('new-tab');
    }

    onSameWindow() {
        this.decision.emit('same-window');
    }

    onCancel() {
        this.decision.emit('cancel');
    }
}
