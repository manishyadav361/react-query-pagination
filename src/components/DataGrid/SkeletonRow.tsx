import './DataGrid.css';

export const SkeletonRow = () => {
    return (
        <tr className="skeleton-row">
            <td className="data-grid-td">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div className="skeleton-circle" style={{ width: '32px', height: '32px' }} />
                    <div className="skeleton-bar" style={{ width: '120px', height: '16px' }} />
                </div>
            </td>
            <td className="data-grid-td">
                <div className="skeleton-bar" style={{ width: '180px', height: '16px' }} />
            </td>
            <td className="data-grid-td">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div className="skeleton-bar" style={{ width: '140px', height: '16px' }} />
                    <div className="skeleton-bar" style={{ width: '100px', height: '12px' }} />
                </div>
            </td>
            <td className="data-grid-td">
                <div className="skeleton-bar" style={{ width: '100px', height: '16px' }} />
            </td>
        </tr>
    );
};
