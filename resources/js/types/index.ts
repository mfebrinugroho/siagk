import { LucideIcon } from 'lucide-react';

export interface Link {
    url: string | null;
    label: string;
    active: boolean;
}

export interface ResponsePagination<T> {
    data: T[];
    links: Link[];
    // current_page: number;
    // last_page: number;
    // per_page: number;
    // total: number;
    // from: number | null;
    // to: number | null;
}

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface Flash {
    success?: string;
    error?: string;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    today: string;
    flash: Flash;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
