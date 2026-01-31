import { memo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationFooterProps {
    currentPage: number;
    totalPages: number;
    onPrevious: () => void;
    onNext: () => void;
    isPreviousDisabled: boolean;
    isNextDisabled: boolean;
}

export const PaginationFooter = memo(({
    currentPage,
    totalPages,
    onPrevious,
    onNext,
    isPreviousDisabled,
    isNextDisabled
}: PaginationFooterProps) => {
    return (
        <div className="pagination-footer">
            <span className="pagination-info">
                Page {currentPage} of {totalPages}
            </span>
            <div className="pagination-actions">
                <button
                    onClick={onPrevious}
                    disabled={isPreviousDisabled}
                    className="pagination-btn-nav"
                    aria-label="Previous Page"
                >
                    <ChevronLeft size={16} />
                </button>
                <button
                    onClick={onNext}
                    disabled={isNextDisabled}
                    className="pagination-btn-nav"
                    aria-label="Next Page"
                >
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
});

PaginationFooter.displayName = 'PaginationFooter';
