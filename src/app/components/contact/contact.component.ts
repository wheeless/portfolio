import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, RouterModule],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.css',
})
export class ContactComponent {
    contactForm: FormGroup;
    responseMessage: string = '';
    isSubmitting: boolean = false;

    constructor(private fb: FormBuilder, private contactService: ContactService) {
        this.contactForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            message: ['', Validators.required],
            subject: ['', Validators.required],
            phoneNumber: ['N/A'],
        });
    }

    async onSubmit() {
        if (this.contactForm.valid) {
            this.isSubmitting = true;
            try {
                const response = await this.contactService.submitContact(this.contactForm.value);
                this.responseMessage = response.message;
                this.contactForm.reset();
            } catch (error) {
                this.responseMessage = 'An error occurred. Please try again later.';
            } finally {
                this.isSubmitting = false;
            }
        }
    }
}
