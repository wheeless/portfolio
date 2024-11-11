import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [NgOptimizedImage, RouterLink],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {
    public readonly me =
        'https://imagedelivery.net/eFpPUO445KI7hjnFeTxrJQ/74e0cd1b-64d4-49f3-a09c-64ac029fe500/public';
    public readonly title = 'Kyle W. Wheeless';
    public readonly avernix =
        'https://imagedelivery.net/eFpPUO445KI7hjnFeTxrJQ/f8a1973b-bd9b-4259-3e29-c4116bcc0200/public';
}
