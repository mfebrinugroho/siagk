import { Employee } from './employee';

export interface Attendance {
    id: number;
    employee_id: number;
    description: string;
    type: string;
    amount: number;
    amount_formatted: number;
    date: string;
    created_at: string;
    updated_at: string;
    employee?: Employee;
}
