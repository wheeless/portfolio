export interface SelectOption {
    value: string;
    label: string;
}

export interface SelectGroup {
    header: string;
    options: SelectOption[];
}
