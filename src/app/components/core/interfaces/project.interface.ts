import { ProjectTag } from './tags';

export interface Project {
    name: string;
    description: string;
    longDescription?: string;
    image: string;
    link: string;
    tags: ProjectTag[];
    slug?: string;
    comingSoon?: boolean;
}
