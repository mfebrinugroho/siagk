import { Search } from 'lucide-react';
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
}

const SearchInput = ({ value, onChange }: SearchInputProps) => {
    return (
        <InputGroup className="max-w-xs">
            <InputGroupInput placeholder="Search..." value={value} onChange={(e) => onChange(e.target.value)} />
            <InputGroupAddon>
                <Search />
            </InputGroupAddon>
        </InputGroup>
    );
};

export default SearchInput;
