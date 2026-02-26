import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges,
    signal,
    computed,
    HostListener,
    ElementRef,
    ViewChild,
} from '@angular/core';
import { SelectGroup, SelectOption } from '../../interfaces/select.interfaces';

@Component({
    selector: 'app-select',
    standalone: true,
    imports: [],
    templateUrl: './select.component.html',
    styleUrl: './select.component.css',
})
export class SelectComponent implements OnChanges {
    @Input() groups: SelectGroup[] = [];
    @Input() placeholder = 'Select an option';
    @Input() searchThreshold = 5;
    @Input() value: string | null = null;

    @Output() selectionChange = new EventEmitter<string | null>();

    @ViewChild('searchInput') searchInputRef?: ElementRef<HTMLInputElement>;

    private readonly groupsSignal = signal<SelectGroup[]>([]);
    readonly searchQuery = signal('');
    readonly isOpen = signal(false);
    readonly selectedValue = signal<string | null>(null);

    readonly totalOptionCount = computed(() =>
        this.groupsSignal().reduce((sum, g) => sum + g.options.length, 0),
    );

    readonly showSearch = computed(() => this.totalOptionCount() > this.searchThreshold);

    readonly filteredGroups = computed(() => {
        const query = this.searchQuery().toLowerCase().trim();
        if (!query) return this.groupsSignal();
        return this.groupsSignal()
            .map((group) => ({
                ...group,
                options: group.options.filter((opt) =>
                    opt.label.toLowerCase().includes(query),
                ),
            }))
            .filter((group) => group.options.length > 0);
    });

    readonly selectedLabel = computed(() => {
        const val = this.selectedValue();
        if (!val) return null;
        for (const group of this.groupsSignal()) {
            const found = group.options.find((o) => o.value === val);
            if (found) return found.label;
        }
        return null;
    });

    constructor(private elementRef: ElementRef) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['groups']) {
            this.groupsSignal.set(this.groups ?? []);
        }
        if (changes['value']) {
            this.selectedValue.set(this.value);
        }
    }

    toggleDropdown(event: Event): void {
        event.stopPropagation();
        this.isOpen.update((v) => !v);
        if (this.isOpen() && this.showSearch()) {
            setTimeout(() => this.searchInputRef?.nativeElement.focus(), 0);
        }
        if (!this.isOpen()) {
            this.searchQuery.set('');
        }
    }

    selectOption(option: SelectOption, event: Event): void {
        event.stopPropagation();
        this.selectedValue.set(option.value);
        this.isOpen.set(false);
        this.searchQuery.set('');
        this.selectionChange.emit(option.value);
    }

    clear(event: Event): void {
        event.stopPropagation();
        this.selectedValue.set(null);
        this.selectionChange.emit(null);
    }

    onSearchInput(event: Event): void {
        this.searchQuery.set((event.target as HTMLInputElement).value);
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: Event): void {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.isOpen.set(false);
            this.searchQuery.set('');
        }
    }

    @HostListener('document:keydown.escape')
    onEscape(): void {
        if (this.isOpen()) {
            this.isOpen.set(false);
            this.searchQuery.set('');
        }
    }
}
