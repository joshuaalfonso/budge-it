import type { TransactionFilters } from '@/types/transaction.types';
import { useSearchParams } from 'react-router-dom';

type CursorDirection = 'next' | 'previous';

export const useTransactionFilters = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const filters: TransactionFilters = Object.fromEntries(searchParams.entries());

    const setFilter = (
        key: keyof TransactionFilters,
        value: string | undefined
    ) => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);

            if (value) {
                newParams.set(key, value);
            } else {
                newParams.delete(key);
            }

            newParams.delete('cursor_date');
            newParams.delete('cursor_id');
            newParams.delete('direction');

            return newParams;
        });
    };

    const setCursor = (cursor_date: string, cursor_id: number, direction: CursorDirection) => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            
            newParams.set('cursor_date', cursor_date);
            newParams.set('cursor_id', cursor_id.toString());
            newParams.set('direction', direction);
            
            return newParams;
        });
    };

    const clearFilters = () => {
        setSearchParams({});
    };

    return { filters, setFilter, clearFilters, searchParams, setCursor };
};