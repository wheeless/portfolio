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
    ngOnInit() {
        console.group('Whatcha doin?');
        console.log(
            'Well, since you are here... \n Contact: https://kylewheeless.com/contact \n Github: https://kylewheeless.com/github \n LinkedIn: https://kylewheeless.com/linkedin',
        );
        console.groupEnd();
    }
}
