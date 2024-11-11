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
        'https://imagedelivery.net/eFpPUO445KI7hjnFeTxrJQ/a1d3c2a4-e8e7-4697-cead-365630bc7e00/public';
    public readonly title = 'Kyle W. Wheeless';
    public readonly avernix =
        'https://imagedelivery.net/eFpPUO445KI7hjnFeTxrJQ/f8a1973b-bd9b-4259-3e29-c4116bcc0200/public';

    ngOnInit() {
        console.log('Whatcha doin? Well, since you are here...');
        console.log('https://kylewheeless.com/contact');
        console.log('https://github.com/wheeless');
        console.log('https://www.linkedin.com/in/kylewheeless');
    }
}
