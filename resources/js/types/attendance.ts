import { Employee } from './employee';
import { Payroll } from './payroll';

export interface Attendance {
    id: number;
    employee_id: number;
    description: string;
    type: string;
    amount: number;
    amount_formatted: number;
    date: string;
    payroll_id: number | null;
    created_at: string;
    updated_at: string;
    employee?: Employee;
    payroll?: Payroll;
}
