import { Employee } from './employee';

export interface Payroll {
    id: number;
    employee_id: number;
    period_start: string;
    period_end: string;
    description: string;
    basic_salary: number;
    total_bonus: number;
    total_deduction: number;
    net_salary: number;
    status: string;
    paid_at: string;
    created_at: string;
    updated_at: string;
    name?: string;
    employee?: Employee;
    can_generate?: boolean;
}

export interface PayrollUnprocessed extends Employee {
    basic_salary: number;
    period_start: string;
    period_end: string;
    total_bonus: number;
    total_deduction: number;
    net_salary: number;
    can_generate: boolean;
}

export interface PayrollProcesseed extends Payroll {
    employee: Employee;
}
