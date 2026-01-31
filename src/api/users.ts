import { apiClient } from './client';
import type { User, ApiResponse } from '../types';

// Internal interface for our app's consumption (normalizes the response)
export interface PaginatedUsers {
    data: User[];
    total: number;
    total_pages: number;
    page: number;
}

export const fetchUsers = async (page: number = 1, limit: number = 10, signal?: AbortSignal): Promise<PaginatedUsers> => {
    const skip = (page - 1) * limit;

    const select = 'firstName,lastName,email,phone,company,image';

    const { data } = await apiClient.get<ApiResponse>(`/users?limit=${limit}&skip=${skip}&select=${select}`, { signal });

    return {
        data: data.users,
        total: data.total,
        total_pages: limit > 0 ? Math.ceil(data.total / limit) : 0,
        page
    };
};
