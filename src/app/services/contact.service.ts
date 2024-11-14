import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface ContactForm {
    name: string;
    email: string;
    message: string;
    subject: string;
    phoneNumber: string;
}

interface ContactResponse {
    message: string;
}

@Injectable({
    providedIn: 'root',
})
export class ContactService {
    private readonly apiUrl = 'https://api.avernix.com/api/v2/mail/form?mail_token=';
    private readonly tokens = {
        'wheeless.dev': 'Tyq7-YXMiADdPpZa9ig1',
        'kylewheeless.com': '4YiCI8wiodsAAMtq--sg',
    };

    constructor(private http: HttpClient) {}

    private getMailToken(): string {
        const hostname = window.location.hostname;
        // Remove 'www.' if present
        const domain = hostname.replace('www.', '');

        // Return the appropriate token or default to wheeless.dev token
        return this.tokens[domain as keyof typeof this.tokens] || this.tokens['kylewheeless.com'];
    }

    public async submitContact(formData: ContactForm): Promise<ContactResponse> {
        const token = this.getMailToken();
        return firstValueFrom(this.http.post<ContactResponse>(this.apiUrl + token, formData));
    }
}
