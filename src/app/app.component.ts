import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
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
        console.group('Whatcha doin?');
        console.log(
            'Well, since you are here... \n Contact: https://kylewheeless.com/contact \n Github: https://kylewheeless.com/github \n LinkedIn: https://kylewheeless.com/linkedin',
        );
        console.groupEnd();
    }
}
