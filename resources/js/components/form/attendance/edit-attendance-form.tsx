import { AttendanceForm, attendanceSchema } from '@/schemas/attendances.schemas';
import { Attendance } from '@/types/attendance';
import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import FormAttendance from './form-attendance';

interface Props {
    attendance: Attendance;
}
const EditAttendanceForm = ({ attendance }: Props) => {
    const form = useForm<AttendanceForm>({
        employee_id: attendance.employee_id,
        name: attendance.employee?.name,
        position: attendance.employee?.position,
        date: attendance.date,
        description: attendance.description,
        type: attendance.type,
        amount: attendance.amount.toString(),
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

        form.put(route('attendances.update', attendance.id));
    };

    return <FormAttendance form={form} onSubmit={handleSubmit} />;
};

export default EditAttendanceForm;
