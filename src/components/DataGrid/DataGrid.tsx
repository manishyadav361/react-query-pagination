import { useState, useEffect } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    flexRender
} from '@tanstack/react-table';
import { useQueryClient } from '@tanstack/react-query'; // Import queryClient
import { usePaginatedUsers } from '../../hooks/useUsers';
import { fetchUsers } from '../../api/users'; // Import fetcher for prefetch
import { columns } from './columns';
import { SkeletonRow } from './SkeletonRow';
import { ChevronLeft, ChevronRight, AlertCircle, RefreshCw } from 'lucide-react'; // Added icons
import './DataGrid.css';

interface DataGridProps {
    limit: number;
}

export const DataGrid = ({ limit }: DataGridProps) => {
    const [page, setPage] = useState(1);
    const queryClient = useQueryClient(); // Init client

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

    // --- Prefetching Logic ---
    useEffect(() => {
        const totalPages = paginatedData?.total_pages || 1;
        if (!isPlaceholderData && !isLoading && page < totalPages) {
            const nextPage = page + 1;
            queryClient.prefetchQuery({
                queryKey: ['users', 'paginated', nextPage, limit],
                queryFn: ({ signal }) => fetchUsers(nextPage, limit, signal),
                staleTime: 1000 * 60 * 5, // Match hook staleTime
            });
        }
    }, [paginatedData, isPlaceholderData, isLoading, page, limit, queryClient]);

    const tableData = paginatedData?.data || [];

    const table = useReactTable({
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    // --- Error State ---
    if (isError) {
        return (
            <div className="data-grid-wrapper">
                <div className="error-container">
                    <AlertCircle size={48} color="#ef4444" />
                    <p className="error-message">
                        Failed to load users. {error instanceof Error ? error.message : 'Unknown error'}
                    </p>
                    <button onClick={() => refetch()} className="retry-btn">
                        <RefreshCw size={16} /> Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="data-grid-wrapper">
            <div className="data-grid-container">
                <table className="data-grid-table">
                    <thead className="data-grid-thead">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className="data-grid-th">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="data-grid-tbody">
                        {isLoading && tableData.length === 0 ? (
                            // Render Skeletons
                            Array.from({ length: limit }).map((_, i) => (
                                <SkeletonRow key={i} />
                            ))
                        ) : (
                            // Standard Rows
                            table.getRowModel().rows.map(row => (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className="data-grid-td">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="pagination-footer">
                <span className="pagination-info">
                    Page {page} of {paginatedData?.total_pages || 1}
                </span>
                <div className="pagination-actions">
                    <button
                        onClick={() => setPage(old => Math.max(old - 1, 1))}
                        disabled={page === 1}
                        className="pagination-btn-nav"
                        aria-label="Previous Page"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        onClick={() => {
                            if (!isPlaceholderData && page < (paginatedData?.total_pages || 1)) {
                                setPage(old => old + 1);
                            }
                        }}
                        disabled={isPlaceholderData || page === (paginatedData?.total_pages || 1)}
                        className="pagination-btn-nav"
                        aria-label="Next Page"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};
