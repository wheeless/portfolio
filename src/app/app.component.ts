import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NgOptimizedImage],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
    public readonly me =
        'https://imagedelivery.net/eFpPUO445KI7hjnFeTxrJQ/10228445-077e-41f4-a888-00d41a437600/public';
    public readonly title = 'Kyle W. Wheeless';
}
