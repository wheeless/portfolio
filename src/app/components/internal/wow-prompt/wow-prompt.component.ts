import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { SelectComponent } from '../../core/ui/select/select.component';
import { SelectGroup } from '../../core/interfaces/select.interfaces';

@Component({
    selector: 'app-wow-prompt',
    standalone: true,
    imports: [FormsModule, RouterLink, SelectComponent],
    templateUrl: './wow-prompt.component.html',
    styleUrl: './wow-prompt.component.css',
})
export class WowPromptComponent {
    message = '';
    reply = '';
    race = '';
    isLoading = false;
    error = '';

    selectedRace: string | null = null;
    selectedUsersRace: string | null = null;

    readonly raceGroups: SelectGroup[] = [
        {
            header: 'Alliance',
            options: [
                { value: 'Human', label: 'Human' },
                { value: 'Dwarf', label: 'Dwarf' },
                { value: 'Night Elf', label: 'Night Elf' },
                { value: 'Gnome', label: 'Gnome' },
                { value: 'Draenei', label: 'Draenei' },
                { value: 'Worgen', label: 'Worgen' },
                { value: 'Void Elf', label: 'Void Elf' },
                { value: 'Lightforged Draenei', label: 'Lightforged Draenei' },
                { value: 'Dark Iron Dwarf', label: 'Dark Iron Dwarf' },
                { value: 'Kul Tiran', label: 'Kul Tiran' },
                { value: 'Mechagnome', label: 'Mechagnome' },
            ],
        },
        {
            header: 'Horde',
            options: [
                { value: 'Orc', label: 'Orc' },
                { value: 'Undead', label: 'Undead' },
                { value: 'Tauren', label: 'Tauren' },
                { value: 'Troll', label: 'Troll' },
                { value: 'Blood Elf', label: 'Blood Elf' },
                { value: 'Goblin', label: 'Goblin' },
                { value: 'Nightborne', label: 'Nightborne' },
                { value: 'Highmountain Tauren', label: 'Highmountain Tauren' },
                { value: "Mag'har Orc", label: "Mag'har Orc" },
                { value: 'Zandalari Troll', label: 'Zandalari Troll' },
                { value: 'Vulpera', label: 'Vulpera' },
            ],
        },
        {
            header: 'Neutral',
            options: [
                { value: 'Pandaren', label: 'Pandaren' },
                { value: 'Dracthyr', label: 'Dracthyr' },
            ],
        },
    ];

    private readonly apiUrl = 'https://wow-prompt.kylewheeless.com/';

    constructor(private http: HttpClient) {}

    onRaceChange(value: string | null): void {
        this.selectedRace = value;
    }

    onUsersRaceChange(value: string | null): void {
        this.selectedUsersRace = value;
    }

    async submit() {
        if (!this.message.trim()) return;

        this.isLoading = true;
        this.error = '';
        this.reply = '';

        try {
            const response = await firstValueFrom(
                this.http.post<{ reply: string; race: string }>(this.apiUrl, {
                    message: this.message,
                    ...(this.selectedRace && { race: this.selectedRace }),
                    ...(this.selectedUsersRace && { usersRace: this.selectedUsersRace }),
                }),
            );
            this.reply = response.reply;
            this.race = response.race;
        } catch {
            this.error = 'Something went wrong. Please try again.';
        } finally {
            this.isLoading = false;
        }
    }
}
