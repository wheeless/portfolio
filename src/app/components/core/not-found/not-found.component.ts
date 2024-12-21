import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RobotComponent } from '../robot/robot.component';

@Component({
    selector: 'app-not-found',
    standalone: true,
    imports: [RouterLink, RobotComponent],
    templateUrl: './not-found.component.html',
    styleUrl: './not-found.component.css',
})
export class NotFoundComponent {}
