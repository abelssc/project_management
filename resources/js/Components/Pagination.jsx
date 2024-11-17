import { Link } from '@inertiajs/react'
import React from 'react'

const Pagination = ({links}) => {
  return (
    <nav className='text-center mt-4'>
        <ul className='flex gap-2 justify-center'>
            {links.map((link,idx)=>
                <li key={idx}>
                    <Link 
                        preserveScroll
                        href={link.url}
                        dangerouslySetInnerHTML={{ __html:link.label }}
                        className={
                            `inline-block py-2 px-3 rounded-lg text-xs transition-colors 
                            ${link.active ? 'bg-gray-950 text-white dark:bg-gray-200 dark:text-gray-900' : ''}
                            ${link.url 
                                ? 'text-gray-700 hover:bg-gray-300 dark:text-gray-400 dark:hover:bg-gray-700' 
                                : 'text-gray-300 dark:text-gray-500 cursor-not-allowed'}`
                        }
                    >
                    </Link>
                </li>
            )}
        </ul>
    </nav>
  )
}

export default Pagination