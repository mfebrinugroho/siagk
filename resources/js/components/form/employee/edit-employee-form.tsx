import { EmployeeForm, employeeSchema } from '@/schemas/employees.schemas';
import { Employee } from '@/types/employee';
import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import FormEmployee from './form-employee';

interface Props {
    employee: Employee;
}

const EditEmployeeForm = ({ employee }: Props) => {
    const form = useForm<EmployeeForm>({
        name: employee.name,
        gender: employee.gender ?? '',
        pob: employee.pob ?? '',
        dob: employee.dob ?? '',
        religion: employee.religion ?? '',
        education: employee.education ?? '',
        address: employee.address ?? '',
        phone_number: employee.phone_number,
        position: employee.position,
        marital_status: employee.marital_status ?? '',
        pay_date: employee.pay_date?.toString(),
        salary: employee.salary?.toString(),
        days_off: employee.days_off?.toString() ?? '',
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

        form.put(route('employees.update', employee.id));
    };

    return <FormEmployee onSubmit={handleSubmit} form={form} />;
};

export default EditEmployeeForm;
