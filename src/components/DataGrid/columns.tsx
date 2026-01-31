import type { ColumnDef } from '@tanstack/react-table';
import type { User } from '../../types';

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'firstName',
        header: 'Name',
        cell: ({ row }) => {
            const user = row.original;
            return (
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} title={`${user.firstName} ${user.lastName}`}>
                    <img
                        src={user.image}
                        alt={user.firstName}
                        loading="lazy"
                        decoding="async"
                        style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                    />
                    <span style={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {user.firstName} {user.lastName}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ getValue }) => <span title={getValue() as string} style={{ color: '#64748b' }}>{getValue() as string}</span>,
    },
    {
        accessorKey: 'company.name',
        header: 'Company',
        cell: ({ row }) => {
            const { name, title } = row.original.company;
            return (
                <div style={{ display: 'flex', flexDirection: 'column' }} title={`${name} - ${title}`}>
                    <span style={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</span>
                </div>
            );
        }
    },
    {
        accessorKey: 'phone',
        header: 'Phone',
        cell: ({ getValue }) => <span title={getValue() as string} style={{ fontFamily: 'monospace', color: '#64748b' }}>{getValue() as string}</span>,
    },
];
