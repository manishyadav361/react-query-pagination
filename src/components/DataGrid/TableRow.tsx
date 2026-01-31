import { memo } from 'react';
import { flexRender, type Row } from '@tanstack/react-table';
import type { User } from '../../types';

interface TableRowProps {
    row: Row<User>;
}

export const TableRow = memo(({ row }: TableRowProps) => {
    return (
        <tr>
            {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="data-grid-td">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
            ))}
        </tr>
    );
});

TableRow.displayName = 'TableRow';
