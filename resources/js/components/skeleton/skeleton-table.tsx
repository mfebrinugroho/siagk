import { Skeleton } from '../ui/skeleton';

const SkeletonTable = () => {
    return (
        <div className="flex w-full flex-col gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
                <div className="flex gap-4" key={index}>
                    <Skeleton className="h-4 flex-1" />
                    <Skeleton className="h-4 w-44" />
                    <Skeleton className="h-4 w-44" />
                    <Skeleton className="h-4 w-44" />
                    <Skeleton className="h-4 w-40" />
                </div>
            ))}
        </div>
    );
};

export default SkeletonTable;
