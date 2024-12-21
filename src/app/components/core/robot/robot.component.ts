import { Component, Input } from '@angular/core';

@Component({
    selector: 'robot',
    standalone: true,
    imports: [],
    templateUrl: './robot.component.html',
    styleUrl: './robot.component.css',
})
export class RobotComponent {
    @Input() message = '500';
}
