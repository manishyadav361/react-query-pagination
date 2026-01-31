import { useState, useEffect, useCallback } from 'react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { useQueryClient } from '@tanstack/react-query';
import { usePaginatedUsers } from '../../hooks/useUsers';
import { fetchUsers } from '../../api/users';
import { columns } from './columns';
import { SkeletonRow } from './SkeletonRow';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { ErrorState } from './ErrorState';
import { PaginationFooter } from './PaginationFooter';
import './DataGrid.css';

interface DataGridProps {
    limit: number;
}

export const DataGrid = ({ limit }: DataGridProps) => {
    const [page, setPage] = useState(1);
    const queryClient = useQueryClient();

    const {
        data: paginatedData,
        isPlaceholderData,
        isLoading,
        isError,
        error,
        refetch
    } = usePaginatedUsers(page, limit);

    // Reset page when limit changes
    useEffect(() => {
        setPage(1);
    }, [limit]);

    // Prefetching logic
    useEffect(() => {
        const totalPages = paginatedData?.total_pages || 1;
        if (!isPlaceholderData && !isLoading && page < totalPages) {
            const nextPage = page + 1;
            queryClient.prefetchQuery({
                queryKey: ['users', 'paginated', nextPage, limit],
                queryFn: ({ signal }) => fetchUsers(nextPage, limit, signal),
                staleTime: 1000 * 60 * 5,
            });
        }
    }, [paginatedData, isPlaceholderData, isLoading, page, limit, queryClient]);

    const tableData = paginatedData?.data || [];

    const table = useReactTable({
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    // Memoized callbacks for pagination
    const handlePrevious = useCallback(() => {
        setPage(old => Math.max(old - 1, 1));
    }, []);

    const handleNext = useCallback(() => {
        if (!isPlaceholderData && page < (paginatedData?.total_pages || 1)) {
            setPage(old => old + 1);
        }
    }, [isPlaceholderData, page, paginatedData?.total_pages]);

    // Error state
    if (isError) {
        return <ErrorState error={error} onRetry={refetch} />;
    }

    const totalPages = paginatedData?.total_pages || 1;

    return (
        <div className="data-grid-wrapper">
            <div className="data-grid-container">
                <table className="data-grid-table">
                    <TableHeader headerGroups={table.getHeaderGroups()} />
                    <tbody className="data-grid-tbody">
                        {isLoading && tableData.length === 0 ? (
                            Array.from({ length: limit }).map((_, i) => (
                                <SkeletonRow key={i} />
                            ))
                        ) : (
                            table.getRowModel().rows.map(row => (
                                <TableRow key={row.id} row={row} />
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <PaginationFooter
                currentPage={page}
                totalPages={totalPages}
                onPrevious={handlePrevious}
                onNext={handleNext}
                isPreviousDisabled={page === 1}
                isNextDisabled={isPlaceholderData || page === totalPages}
            />
        </div>
    );
};
