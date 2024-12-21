import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RobotComponent } from '../robot/robot.component';
@Component({
    selector: 'app-internal-error',
    standalone: true,
    imports: [RouterLink, RobotComponent],
    templateUrl: './internal-error.component.html',
    styleUrl: './internal-error.component.css',
})
export class InternalErrorComponent {}
