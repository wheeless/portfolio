import { Component, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
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
    submittedMessage = '';
    submittedUsersRace = '';
    conversationHistory: { role: 'user' | 'assistant'; content: string }[] = [];
    isConversationActive = false;

    get threadMessages(): { role: 'user' | 'assistant'; content: string }[] {
        const last = this.conversationHistory[this.conversationHistory.length - 1];
        if (this.displayedReply && last?.role === 'assistant') {
            return this.conversationHistory.slice(0, -1);
        }
        return this.conversationHistory;
    }
    selectedUsersRace: string | null = null;

    @ViewChild('responsePanel') responsePanelRef!: ElementRef<HTMLElement>;

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

    readonly version = '1.0';
    debugMode = false;

    private readonly mockReplies = [
        "You dare approach me with such a question? Very well... I have walked this world since before your kind drew breath. The answer you seek is closer than you think, mortal — but wisdom has a price.",
        "Hmph. Bold of you to ask. I have crushed armies for less. But there is... something refreshing about your directness. Listen well, for I will say this only once.",
        "Ah, a curious one. The spirits whisper your name to me even now. Sit. Let the fire between us illuminate what words alone cannot. I will tell you what I know.",
        "You ask me this? *laughs slowly* I have seen civilizations crumble into dust asking less dangerous questions than yours. But fine. Today I am feeling generous.",
        "Interesting. Most who stand before me tremble. You merely... ask. I respect that. Know that my answer carries the weight of ages — do not take it lightly.",
        "Your question echoes through the Nether itself. I have pondered such things in the dark between worlds. Here is what I have learned after an eternity of searching...",
        "By the Light — or whatever power moves through this place — you have nerve. I will grant you that. And so I will grant you an answer as well. But remember this moment.",
    ];

    private readonly apiUrl = 'https://wow-prompt.kylewheeless.com/';

    constructor(private http: HttpClient, private route: ActivatedRoute) {
        this.debugMode = this.route.snapshot.queryParamMap.get('debug') === 'true';
    }

    ngOnDestroy(): void {
        this.clearTyping();
    }

    private scrollToBottom(): void {
        const el = this.responsePanelRef?.nativeElement;
        if (el) el.scrollTop = el.scrollHeight;
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
                this.scrollToBottom();
            } else {
                this.clearTyping();
                this.isTyping = false;
                this.conversationHistory.push({ role: 'assistant', content: text });
                this.scrollToBottom();
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

    resetConversation(): void {
        this.conversationHistory = [];
        this.isConversationActive = false;
        this.displayedReply = '';
        this.reply = '';
        this.message = '';
        this.error = '';
        this.validationError = '';
        this.clearTyping();
    }

    download(): void {
        const speakerLabel = this.submittedStyle === 'specific'
            ? this.submittedCharacter
            : `The ${this.submittedCharacter}`;

        const lines = [
            '=== Azeroth Speaks ===',
            '',
            `From:  ${this.submittedUsersRace}`,
            `To:    ${this.submittedCharacter}`,
            '',
            '--- Conversation ---',
        ];

        for (const msg of this.conversationHistory) {
            lines.push('');
            if (msg.role === 'user') {
                lines.push(`You: ${msg.content}`);
            } else {
                lines.push(`${speakerLabel}: ${msg.content}`);
            }
        }

        const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `azeroth-speaks-${this.submittedCharacter.toLowerCase().replace(/[\s']+/g, '-')}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    }

    async submit() {
        if (!this.selectedUsersRace || !this.selectedCharacter || !this.message.trim()) {
            this.validationError = 'Please fill in all required fields.';
            return;
        }

        this.validationError = '';
        this.submittedStyle = this.selectedStyle;
        this.submittedCharacter = this.selectedCharacter ?? '';
        this.submittedUsersRace = this.selectedUsersRace ?? '';
        this.submittedMessage = this.message.trim();
        this.conversationHistory.push({ role: 'user', content: this.message.trim() });
        this.message = '';
        setTimeout(() => this.scrollToBottom(), 0);
        this.isLoading = true;
        this.error = '';
        this.reply = '';
        this.displayedReply = '';
        this.clearTyping();

        try {
            let replyText: string;

            if (this.debugMode) {
                await new Promise(resolve => setTimeout(resolve, 1200));
                replyText = this.mockReplies[Math.floor(Math.random() * this.mockReplies.length)];
            } else {
                const response = await firstValueFrom(
                    this.http.post<{ reply: string; race: string }>(this.apiUrl, {
                        style: this.selectedStyle,
                        messages: this.conversationHistory,
                        ...(this.selectedStyle === 'specific'
                            ? { character: this.selectedCharacter }
                            : { race: this.selectedCharacter }),
                        ...(this.selectedUsersRace && { usersRace: this.selectedUsersRace }),
                    }),
                );
                replyText = response.reply;
            }

            this.reply = replyText;
            this.isConversationActive = true;
            this.typeOut(replyText);
        } catch {
            this.error = 'Something went wrong. Please try again.';
            this.conversationHistory.pop();
            this.message = this.submittedMessage;
        } finally {
            this.isLoading = false;
        }
    }
}
