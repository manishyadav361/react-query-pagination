import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchUsers } from '../api/users';

// Hook for standard Pagination
export const usePaginatedUsers = (page: number, limit: number) => {
    return useQuery({
        queryKey: ['users', 'paginated', page, limit],
        queryFn: ({ signal }) => fetchUsers(page, limit, signal),
        placeholderData: keepPreviousData,
        staleTime: 1000 * 60 * 5, // 5 mins
    });
};
