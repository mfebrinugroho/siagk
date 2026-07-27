import { Search, X } from 'lucide-react';
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
}

const SearchInput = ({ value, onChange }: SearchInputProps) => {
    return (
        // <InputGroup className="max-w-xs">
        //     <InputGroupInput placeholder="Search..." value={value} onChange={(e) => onChange(e.target.value)} />
        //     <InputGroupAddon>
        //         <Search />
        //     </InputGroupAddon>
        // </InputGroup>

        <InputGroup className="relative max-w-xs">
            <InputGroupInput placeholder="Search..." value={value} onChange={(e) => onChange(e.target.value)} />

            {value && (
                <InputGroupAddon>
                    <button
                        type="button"
                        onClick={() => onChange('')}
                        className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </InputGroupAddon>
            )}

            <InputGroupAddon>
                <Search className="h-4 w-4" />
            </InputGroupAddon>
        </InputGroup>
    );
};

export default SearchInput;
