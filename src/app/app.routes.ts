import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { NotFoundComponent } from './components/core/not-found/not-found.component';
import { ExternalRedirectComponent } from './components/core/external-redirect/external-redirect.component';
import { SocialsComponent } from './components/socials/socials.component';
import { InternalErrorComponent } from './components/core/internal-error/internal-error.component';
import { ComingSoonComponent } from './components/core/coming-soon/coming-soon.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';

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
        path: 'project/:slug',
        component: ProjectDetailComponent,
    },
    {
        path: 'contact',
        component: ContactComponent,
    },
    {
        path: 'services',
        component: ComingSoonComponent,
    },
    {
        path: '**/*.+(jpg|jpeg|png|gif|ico|css|js|pdf|txt)',
        redirectTo: '404',
    },
    {
        path: 'socials',
        component: SocialsComponent,
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
        path: 'four-oh-four',
        redirectTo: '404',
    },
    {
        path: 'four0four',
        redirectTo: '404',
    },
    {
        path: 'not-found',
        redirectTo: '404',
    },
    {
        path: '404',
        redirectTo: '404',
    },
    {
        path: '500',
        component: InternalErrorComponent,
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
