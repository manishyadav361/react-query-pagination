import { memo } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
    error: Error | null;
    onRetry: () => void;
}

export const ErrorState = memo(({ error, onRetry }: ErrorStateProps) => {
    return (
        <div className="data-grid-wrapper">
            <div className="error-container">
                <AlertCircle size={48} color="#ef4444" />
                <p className="error-message">
                    Failed to load users. {error?.message || 'Unknown error'}
                </p>
                <button onClick={onRetry} className="retry-btn">
                    <RefreshCw size={16} /> Retry
                </button>
            </div>
        </div>
    );
});

ErrorState.displayName = 'ErrorState';
