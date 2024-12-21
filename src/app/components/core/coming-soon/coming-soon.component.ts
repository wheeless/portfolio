import { Component } from '@angular/core';
import { RobotComponent } from '../robot/robot.component';
import { RouterLink } from '@angular/router';
@Component({
    selector: 'app-coming-soon',
    standalone: true,
    imports: [RobotComponent, RouterLink],
    templateUrl: './coming-soon.component.html',
    styleUrl: './coming-soon.component.css',
})
export class ComingSoonComponent {}
