import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-resume',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './resume.component.html',
    styleUrl: './resume.component.css',
})
export class ResumeComponent {
    readonly pdfUrl =
        'https://cdn.kylewheeless.com/resume/Kyle%20Wheeless-Resume.pdf';
}
