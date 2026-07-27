import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

interface SearchSelectProps<T> {
    options: T[];
    value?: T | null;
    onChange: (value: T) => void;
    getLabel: (item: T) => string;
    getValue: (item: T) => string;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyText?: string;

    disabled?: boolean;
}

export default function SearchSelect<T>({
    options,
    value,
    onChange,
    getLabel,
    getValue,
    placeholder = 'Pilih Data',
    searchPlaceholder = 'Cari...',
    emptyText = 'Data tidak ditemukan',
    disabled,
}: SearchSelectProps<T>) {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="!bg-popover flex w-full items-center justify-between p-6" disabled={disabled}>
                    {value ? getLabel(value) : placeholder}

                    <ChevronDownIcon />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                <Command className="gap-2">
                    <CommandInput placeholder={searchPlaceholder} />

                    <CommandList>
                        <CommandEmpty>{emptyText}</CommandEmpty>

                        {options.map((item) => (
                            <CommandItem
                                className="!bg-popover !text-foreground data-[selected=true]:!bg-muted data-[selected=true]:!text-muted-foreground cursor-pointer transition-colors"
                                key={getValue(item)}
                                value={getLabel(item)}
                                onSelect={() => {
                                    onChange(item);
                                    setOpen(false);
                                }}
                            >
                                {getLabel(item)}
                            </CommandItem>
                        ))}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

// export default SearchSelect;
