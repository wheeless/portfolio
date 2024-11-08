import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface ContactForm {
    name: string;
    email: string;
    message: string;
}

interface ContactResponse {
    message: string;
}

@Injectable({
    providedIn: 'root',
})
export class ContactService {
    private readonly apiUrl = 'https://api.avernix.com/api/v2/mail/form?mail_token='; // Replace with your actual endpoint
    private readonly mail_token = 'Tyq7-YXMiADdPpZa9ig1';
    constructor(private http: HttpClient) {}

    public async submitContact(formData: ContactForm): Promise<ContactResponse> {
        return firstValueFrom(
            this.http.post<ContactResponse>(this.apiUrl + this.mail_token, formData),
        );
    }
}
