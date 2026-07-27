import { AttendanceForm, attendanceSchema } from '@/schemas/attendances.schemas';
import { Employee } from '@/types/employee';
import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import FormFilterAttendance from './form-filter-attendance';

interface Props {
    employee: Employee;
    query: {
        employee_id: number;
        start_date: string;
        end_date: string;
    };
}

const CreateFilterAttendanceForm = ({ employee, query }: Props) => {
    const form = useForm<AttendanceForm>({
        employee_id: employee.id,
        name: employee.name,
        position: employee.position,
        date: '',
        description: '',
        type: '',
        amount: '',
        start_date: query.start_date,
        end_date: query.end_date,
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = attendanceSchema.safeParse(form.data);

        if (!result.success) {
            form.clearErrors();

            const errors = result.error.flatten().fieldErrors;

            Object.entries(errors).forEach(([field, messages]) => {
                if (messages?.length) {
                    form.setError(field as keyof AttendanceForm, messages[0]);
                }
            });

            return;
        }

        form.post(route('filter-attendances.store'));
    };

    return <FormFilterAttendance form={form} onSubmit={handleSubmit} query={query} />;
};

export default CreateFilterAttendanceForm;
