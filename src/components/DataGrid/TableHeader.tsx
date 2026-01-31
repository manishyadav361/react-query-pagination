import { memo } from 'react';
import { flexRender, type HeaderGroup } from '@tanstack/react-table';
import type { User } from '../../types';

interface TableHeaderProps {
    headerGroups: HeaderGroup<User>[];
}

export const TableHeader = memo(({ headerGroups }: TableHeaderProps) => {
    return (
        <thead className="data-grid-thead">
            {headerGroups.map(headerGroup => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                        <th key={header.id} className="data-grid-th">
                            {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                    ))}
                </tr>
            ))}
        </thead>
    );
});

TableHeader.displayName = 'TableHeader';
