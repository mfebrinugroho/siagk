import { Link } from '@/types';
import { router } from '@inertiajs/react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '../ui/pagination';

interface Props {
    links: Link[];
}

const PaginationTable = ({ links }: Props) => {
    return (
        <Pagination>
            <PaginationContent>
                {links.map((link, index) => {
                    if (link.label.includes('Previous')) {
                        return (
                            <PaginationItem key={index}>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();

                                        if (link.url) {
                                            router.visit(link.url, {
                                                preserveState: true,
                                                preserveScroll: true,
                                            });
                                        }
                                    }}
                                />
                            </PaginationItem>
                        );
                    }

                    if (link.label.includes('Next')) {
                        return (
                            <PaginationItem key={index}>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();

                                        if (link.url) {
                                            router.visit(link.url, {
                                                preserveState: true,
                                                preserveScroll: true,
                                            });
                                        }
                                    }}
                                />
                            </PaginationItem>
                        );
                    }

                    if (link.label === '...') {
                        return (
                            <PaginationItem key={index}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        );
                    }

                    return (
                        <PaginationItem key={index}>
                            <PaginationLink
                                href="#"
                                isActive={link.active}
                                onClick={(e) => {
                                    e.preventDefault();

                                    if (link.url) {
                                        router.visit(link.url, {
                                            preserveState: true,
                                            preserveScroll: true,
                                        });
                                    }
                                }}
                            >
                                {link.label}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationTable;
