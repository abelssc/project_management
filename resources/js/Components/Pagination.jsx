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
                            'inline-block py-2 px-3 rounded-lg  text-xs ' 
                            + (link.active?'bg-gray-950 ':'')
                            + (link.url?'text-gray-200 hover:bg-gray-950':'text-gray-500 cursor-not-allowed ')
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