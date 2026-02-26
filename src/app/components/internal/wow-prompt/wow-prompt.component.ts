import { Component, OnDestroy } from '@angular/core';
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
export class WowPromptComponent implements OnDestroy {
    message = '';
    reply = '';
    isLoading = false;
    error = '';
    displayedReply = '';
    isTyping = false;
    validationError = '';

    selectedStyle: 'default' | 'specific' = 'default';
    submittedStyle: 'default' | 'specific' = 'default';
    selectedCharacter: string | null = null;
    submittedCharacter = '';
    selectedUsersRace: string | null = null;

    private typingInterval: ReturnType<typeof setInterval> | null = null;

    get targetGroups(): SelectGroup[] {
        return this.selectedStyle === 'specific' ? this.npcGroups : this.raceGroups;
    }

    get thinkingText(): string {
        if (!this.selectedCharacter) return 'Azeroth is thinking...';
        if (this.selectedStyle === 'specific') return `${this.selectedCharacter} is thinking...`;
        return `The ${this.selectedCharacter} is thinking...`;
    }

    get speaksPrefix(): string {
        return this.submittedStyle === 'specific' ? '' : 'The ';
    }

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

    readonly npcGroups: SelectGroup[] = [
        {
            header: 'Alliance',
            options: [
                { value: 'Anduin Wrynn', label: 'Anduin Wrynn' },
                { value: 'Jaina Proudmoore', label: 'Jaina Proudmoore' },
                { value: 'Tyrande Whisperwind', label: 'Tyrande Whisperwind' },
                { value: 'Malfurion Stormrage', label: 'Malfurion Stormrage' },
                { value: 'Velen', label: 'Velen' },
                { value: 'Muradin Bronzebeard', label: 'Muradin Bronzebeard' },
                { value: 'Genn Greymane', label: 'Genn Greymane' },
                { value: 'Gelbin Mekkatorque', label: 'Gelbin Mekkatorque' },
                { value: 'Alleria Windrunner', label: 'Alleria Windrunner' },
                { value: 'Turalyon', label: 'Turalyon' },
                { value: 'Moira Thaurissan', label: 'Moira Thaurissan' },
                { value: 'Magni Bronzebeard', label: 'Magni Bronzebeard' },
                { value: 'Khadgar', label: 'Khadgar' },
            ],
        },
        {
            header: 'Horde',
            options: [
                { value: 'Thrall', label: 'Thrall' },
                { value: 'Sylvanas Windrunner', label: 'Sylvanas Windrunner' },
                { value: 'Baine Bloodhoof', label: 'Baine Bloodhoof' },
                { value: "Lor'themar Theron", label: "Lor'themar Theron" },
                { value: "Vol'jin", label: "Vol'jin" },
                { value: 'Garrosh Hellscream', label: 'Garrosh Hellscream' },
                { value: 'Grommash Hellscream', label: 'Grommash Hellscream' },
                { value: 'Cairne Bloodhoof', label: 'Cairne Bloodhoof' },
                { value: 'Rexxar', label: 'Rexxar' },
                { value: 'Lady Liadrin', label: 'Lady Liadrin' },
                { value: 'Thalyssra', label: 'Thalyssra' },
                { value: 'Nathanos Blightcaller', label: 'Nathanos Blightcaller' },
            ],
        },
        {
            header: 'Villains',
            options: [
                { value: 'The Lich King', label: 'The Lich King (Arthas)' },
                { value: 'Illidan Stormrage', label: 'Illidan Stormrage' },
                { value: "Kael'thas Sunstrider", label: "Kael'thas Sunstrider" },
                { value: "Gul'dan", label: "Gul'dan" },
                { value: 'Deathwing', label: 'Deathwing' },
                { value: 'Sargeras', label: 'Sargeras' },
                { value: 'Archimonde', label: 'Archimonde' },
                { value: "Kil'jaeden", label: "Kil'jaeden" },
                { value: 'Queen Azshara', label: 'Queen Azshara' },
                { value: "Kel'Thuzad", label: "Kel'Thuzad" },
                { value: "N'Zoth", label: "N'Zoth" },
                { value: "Xal'atath", label: "Xal'atath" },
            ],
        },
        {
            header: 'Dragon Aspects',
            options: [
                { value: 'Alexstrasza', label: 'Alexstrasza' },
                { value: 'Nozdormu', label: 'Nozdormu' },
                { value: 'Ysera', label: 'Ysera' },
                { value: 'Wrathion', label: 'Wrathion' },
                { value: 'Chromie', label: 'Chromie' },
                { value: 'Kalecgos', label: 'Kalecgos' },
                { value: 'Merithra', label: 'Merithra' },
                { value: 'Fyrakk', label: 'Fyrakk' },
                { value: 'Iridikron', label: 'Iridikron' },
            ],
        },
        {
            header: 'Legends',
            options: [
                { value: 'Medivh', label: 'Medivh' },
                { value: 'Uther the Lightbringer', label: 'Uther the Lightbringer' },
                { value: 'Tirion Fordring', label: 'Tirion Fordring' },
                { value: 'Bolvar Fordragon', label: 'Bolvar Fordragon' },
                { value: 'Brann Bronzebeard', label: 'Brann Bronzebeard' },
                { value: 'Antonidas', label: 'Antonidas' },
                { value: 'Aegwynn', label: 'Aegwynn' },
                { value: 'Chen Stormstout', label: 'Chen Stormstout' },
                { value: 'Lorewalker Cho', label: 'Lorewalker Cho' },
                { value: 'Harrison Jones', label: 'Harrison Jones' },
                { value: 'Leeroy Jenkins', label: 'Leeroy Jenkins' },
            ],
        },
    ];

    private readonly promptLabels = [
        'What would you ask?',
        'Speak your mind, traveler.',
        'What wisdom do you seek?',
        'State your purpose.',
        'Speak, champion.',
        'What knowledge do you seek?',
        'What troubles you, adventurer?',
        'Speak freely, hero.',
        'What would you have me say?',
        'Ask, and it shall be answered.',
        'What do you wish to know?',
        'The spirits are listening. Speak.',
        'Speak, mortal.',
        'Your words carry weight. Choose them wisely.',
        'What would you know of this world?',
    ];

    readonly promptLabel = this.promptLabels[Math.floor(Math.random() * this.promptLabels.length)];

    private readonly apiUrl = 'https://wow-prompt.kylewheeless.com/';

    constructor(private http: HttpClient) {}

    ngOnDestroy(): void {
        this.clearTyping();
    }

    private clearTyping(): void {
        if (this.typingInterval) {
            clearInterval(this.typingInterval);
            this.typingInterval = null;
        }
    }

    private typeOut(text: string): void {
        this.clearTyping();
        this.displayedReply = '';
        this.isTyping = true;
        let i = 0;
        this.typingInterval = setInterval(() => {
            if (i < text.length) {
                this.displayedReply += text[i++];
            } else {
                this.clearTyping();
                this.isTyping = false;
            }
        }, 25);
    }

    onStyleChange(): void {
        this.selectedCharacter = null;
    }

    onCharacterChange(value: string | null): void {
        this.selectedCharacter = value;
    }

    onUsersRaceChange(value: string | null): void {
        this.selectedUsersRace = value;
    }

    async submit() {
        if (!this.selectedUsersRace || !this.selectedCharacter || !this.message.trim()) {
            this.validationError = 'Please fill in all required fields.';
            return;
        }

        this.validationError = '';
        this.submittedStyle = this.selectedStyle;
        this.submittedCharacter = this.selectedCharacter ?? '';
        this.isLoading = true;
        this.error = '';
        this.reply = '';
        this.displayedReply = '';
        this.clearTyping();

        try {
            const response = await firstValueFrom(
                this.http.post<{ reply: string; race: string }>(this.apiUrl, {
                    message: this.message,
                    style: this.selectedStyle,
                    ...(this.selectedStyle === 'specific'
                        ? { character: this.selectedCharacter }
                        : { race: this.selectedCharacter }),
                    ...(this.selectedUsersRace && { usersRace: this.selectedUsersRace }),
                }),
            );
            this.reply = response.reply;
            this.typeOut(response.reply);
        } catch {
            this.error = 'Something went wrong. Please try again.';
        } finally {
            this.isLoading = false;
        }
    }
}
