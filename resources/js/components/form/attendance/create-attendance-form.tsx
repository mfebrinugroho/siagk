import { AttendanceForm, attendanceSchema } from '@/schemas/attendances.schemas';
import { Employee } from '@/types/employee';
import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import FormAttendance from './form-attendance';

const CreateAttendanceForm = ({ employee }: { employee: Employee }) => {
    const form = useForm<AttendanceForm>({
        employee_id: employee.id,
        name: employee.name,
        position: employee.position,
        date: '',
        description: '',
        type: '',
        amount: '',
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

        form.post(route('attendances.store'));
    };

    return <FormAttendance form={form} onSubmit={handleSubmit} />;
};

export default CreateAttendanceForm;
