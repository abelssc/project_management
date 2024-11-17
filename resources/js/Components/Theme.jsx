import { applyTheme, savedTheme } from '@/utils/darkmode'
import { ComputerDesktopIcon, MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import React, { useEffect } from 'react'

const Theme = () => {
    const theme=savedTheme();
    useEffect(()=>{
        applyTheme(savedTheme());
    },[])

     const handleThemeChange = (newTheme) => {
        applyTheme(newTheme);     
    };

    return (
        <div className='p-1 grid grid-flow-col gap-1 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:hover:bg-gray-800 dark:focus:bg-gray-800 '>
            <button 
                className={'flex justify-center rounded-md p-2 outline-none transition duration-75 hover:bg-gray-50 focus-visible:bg-gray-50 dark:hover:bg-white/5 dark:focus-visible:bg-white/5 text-gray-400 hover:text-gray-500 focus-visible:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 dark:focus-visible:text-gray-400 '
                    + (theme==='light'?'!text-indigo-400 bg-white/5':'')
                }
                onClick={()=>handleThemeChange('light')}
            >
                <SunIcon width={20}/>
            </button>
            <button 
                className={'flex justify-center rounded-md p-2 outline-none transition duration-75 hover:bg-gray-50 focus-visible:bg-gray-50 dark:hover:bg-white/5 dark:focus-visible:bg-white/5 text-gray-400 hover:text-gray-500 focus-visible:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 dark:focus-visible:text-gray-400 '
                    + (theme==='dark'?'!text-indigo-400 bg-white/5':'')
                }
                onClick={()=>handleThemeChange('dark')}
            >
                <MoonIcon width={20}/>
            </button>
            <button 
                className={'flex justify-center rounded-md p-2 outline-none transition duration-75 hover:bg-gray-50 focus-visible:bg-gray-50 dark:hover:bg-white/5 dark:focus-visible:bg-white/5 text-gray-400 hover:text-gray-500 focus-visible:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 dark:focus-visible:text-gray-400 '
                    + (theme==='system'?'!text-indigo-400 bg-white/5':'')
                }
                onClick={()=>handleThemeChange('system')}
            >
                <ComputerDesktopIcon width={20}/>
            </button>
        </div>
    )
}

export default Theme