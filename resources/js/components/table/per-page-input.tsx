import { Field, FieldLabel } from '../ui/field';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const PerPageInput = () => {
    return (
        <Field orientation="horizontal" className="w-fit">
            <FieldLabel htmlFor="select-rows-per-page">Show</FieldLabel>
            <Select defaultValue="25">
                <SelectTrigger className="w-20" id="select-rows-per-page">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent align="start">
                    <SelectGroup>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <FieldLabel htmlFor="select-rows-per-page">entries</FieldLabel>
        </Field>
    );
};

export default PerPageInput;
