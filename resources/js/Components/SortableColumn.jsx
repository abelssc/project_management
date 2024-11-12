import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { router } from '@inertiajs/react';
import React from 'react'

const SortableColumn = ({label,column,queryParams,url}) => {

    const isSortedAsc = queryParams.sort_column===column && queryParams.sort_direction==='desc'
    const sortColumn = () => {
        const newSortDirection = isSortedAsc ? 'asc' : 'desc';
        
        // Clona y actualiza queryParams para evitar mutación directa
        const updatedParams = { 
            ...queryParams, 
            sort_column: column, 
            sort_direction: newSortDirection 
        };

        // Realiza la solicitud de navegación con los nuevos parámetros
        router.get(route(url), updatedParams, { preserveState: true });
    };

    return (
        <div className='flex gap-1 cursor-pointer' onClick={sortColumn}>
            {label} 
            {
                isSortedAsc
                    ? <ChevronUpIcon width={14} />
                    : <ChevronDownIcon width={14} />
            }
        </div>
    )
}

export default SortableColumn