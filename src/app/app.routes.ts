import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ExternalRedirectComponent } from './components/external-redirect/external-redirect.component';

export const routes: Routes = [
    {
        path: 'home',
        redirectTo: '',
        pathMatch: 'full',
    },
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'projects',
        component: ProjectsComponent,
    },
    {
        path: 'contact',
        component: ContactComponent,
    },
    {
        path: '**/*.+(jpg|jpeg|png|gif|ico|css|js|pdf|txt)',
        redirectTo: '404',
    },
    {
        path: 'github',
        component: ExternalRedirectComponent,
    },
    {
        path: 'instagram',
        component: ExternalRedirectComponent,
    },
    {
        path: 'linkedin',
        component: ExternalRedirectComponent,
    },
    {
        path: 'x',
        component: ExternalRedirectComponent,
    },
    {
        path: 'twitter',
        component: ExternalRedirectComponent,
    },
    {
        path: 'twitch',
        component: ExternalRedirectComponent,
    },
    {
        path: 'tiktok',
        component: ExternalRedirectComponent,
    },
    {
        path: 'facebook',
        component: ExternalRedirectComponent,
    },
    {
        path: '**',
        redirectTo: '404',
    },
    {
        path: '404',
        component: NotFoundComponent,
    },
];
