import { EmployeeForm, employeeSchema } from '@/schemas/employees.schemas';
import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import FormEmployee from './form-employee';

const CreateEmployeeForm = () => {
    const form = useForm<EmployeeForm>({
        name: '',
        gender: '',
        pob: '',
        dob: '',
        religion: '',
        education: '',
        address: '',
        phone_number: '',
        position: '',
        marital_status: '',
        pay_date: '',
        salary: '',
        days_off: '',
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = employeeSchema.safeParse(form.data);

        if (!result.success) {
            form.clearErrors();

            const errors = result.error.flatten().fieldErrors;

            Object.entries(errors).forEach(([field, messages]) => {
                if (messages?.length) {
                    form.setError(field as keyof EmployeeForm, messages[0]);
                }
            });

            return;
        }

        form.post(route('employees.store'));
    };

    return <FormEmployee form={form} onSubmit={handleSubmit} />;
};

export default CreateEmployeeForm;
