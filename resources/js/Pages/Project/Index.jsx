import Pagination from '@/Components/Pagination'
import SelectInput from '@/Components/SelectInput'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from '@/utils/constants'
import { Head, Link, router } from '@inertiajs/react'
import React from 'react'
import { debounce } from 'lodash'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'

const Index = ({projects,queryParams}) => {

    const handleChange=debounce((name,value)=>{
        queryParams[name] = value;
        if(value==='') delete queryParams[name];
        router.get(route('project.index'),queryParams,{preserveState:true});
    },300);

    const sortColumn=(sort_column,sort_direction='asc')=>{
        queryParams.sort_column = sort_column;
        queryParams.sort_direction = sort_direction;
        router.get(route('project.index'),queryParams,{preserveState:true});
    };

  return (
    <AuthenticatedLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                Projects
            </h2>
        }
    >
        <Head title="Projects Page" />

        <div className="py-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div className="p-6 text-gray-900 dark:text-gray-100 overflow-auto">
                        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500'>
                                <tr className='text-nowrap'>
                                    <th className='px-3 py-4'></th>
                                    <th className='px-3 py-4'></th>
                                    <th className='px-3 py-4'>
                                        <TextInput 
                                            placeholder="Project Name" 
                                            className='w-full text-sm'
                                            defaultValue={queryParams.name}
                                            onChange={(e)=>handleChange('name',e.target.value)}
                                        />
                                    </th>
                                    <th className='px-3 py-4'>
                                        <SelectInput
                                            className='w-full text-sm'
                                            defaultValue={queryParams.status}
                                            onChange={(e)=>handleChange('status',e.target.value)}
                                        >
                                            <option value=''>All</option>
                                            {
                                                Object.keys(PROJECT_STATUS_TEXT_MAP).map(key => (
                                                    <option key={key} value={key}>{PROJECT_STATUS_TEXT_MAP[key]}</option>
                                                ))
                                            }
                                        </SelectInput>
                                    </th>
                                    <th className='px-3 py-4'></th>
                                    <th className='px-3 py-4'></th>
                                    <th className='px-3 py-4'></th>
                                    <th className='px-3 py-4 text-right'></th>
                                </tr>
                            </thead>
                            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500'>
                                <tr className='text-nowrap'>
                                    <th className='px-3 py-4'>
                                        <div className='flex gap-1 cursor-pointer'>
                                            ID {
                                                queryParams.sort_column==='id' && queryParams.sort_direction==='desc'
                                                ?<ChevronUpIcon width={14} onClick={()=>sortColumn('id','asc')}/>
                                                :<ChevronDownIcon width={14} onClick={()=>sortColumn('id','desc')}/>
                                            }
                                        </div>
                                    </th>
                                    <th className='px-3 py-4'>IMAGE</th>
                                    <th className='px-3 py-4'>
                                        <div className='flex gap-1 cursor-pointer'>
                                            NAME {
                                                queryParams.sort_column==='name' && queryParams.sort_direction==='desc'
                                                ?<ChevronUpIcon width={14} onClick={()=>sortColumn('name','asc')}/>
                                                :<ChevronDownIcon width={14} onClick={()=>sortColumn('name','desc')}/>
                                            }
                                        </div>
                                    </th>
                                    <th className='px-3 py-4'>
                                       <div className='flex gap-1 cursor-pointer'>
                                        STATUS {
                                                queryParams.sort_column==='status' && queryParams.sort_direction==='desc'
                                                ?<ChevronUpIcon width={14} onClick={()=>sortColumn('status','asc')}/>
                                                :<ChevronDownIcon width={14} onClick={()=>sortColumn('status','desc')}/>
                                            }
                                       </div>
                                            
                                    </th>
                                    <th className='px-3 py-4'>
                                       <div className='flex gap-1 cursor-pointer'>
                                        CREATE DATE {
                                                queryParams.sort_column==='created_at' && queryParams.sort_direction==='desc'
                                                ?<ChevronUpIcon width={14} onClick={()=>sortColumn('created_at','asc')}/>
                                                :<ChevronDownIcon width={14} onClick={()=>sortColumn('created_at','desc')}/>
                                            }
                                       </div>
                                    </th>
                                    <th className='px-3 py-4'>
                                        <div className='flex gap-1 cursor-pointer'>
                                            DUE DATE {
                                                queryParams.sort_column==='due_date' && queryParams.sort_direction==='desc'
                                                ?<ChevronUpIcon width={14} onClick={()=>sortColumn('due_date','asc')}/>
                                                :<ChevronDownIcon width={14} onClick={()=>sortColumn('due_date','desc')}/>
                                            }
                                        </div>
                                    </th>
                                    <th className='px-3 py-4'>CREATED BY</th>
                                    <th className='px-3 py-4 text-right'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.data.map(project=>
                                    <tr key={project.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                        <td className='px-3 py-2'>{project.id}</td>
                                        <td className='px-3 py-2'>
                                            <img src={project.image_path} className='w-[60px]' />
                                        </td>
                                        <td className='px-3 py-2'>{project.name}</td>
                                        <td className='px-3 py-2'>
                                            <div className={
                                                'px-2 py-1 text-white text-xs rounded '
                                                + (PROJECT_STATUS_CLASS_MAP[project.status])
                                            }>
                                                {PROJECT_STATUS_TEXT_MAP[project.status]}
                                            </div>
                                        </td>
                                        <td className='px-3 py-2 text-nowrap'>
                                            <div>
                                                {project.created_at}
                                            </div>
                                        </td>
                                        <td className='px-3 py-2 text-nowrap'>{project.due_date}</td>
                                        <td className='px-3 py-2'>{project.createdBy.name}</td>
                                        <td>
                                            <Link href={route('project.edit',project.id)}
                                                className='font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1'
                                            >
                                                Edit
                                            </Link>
                                            <Link href={route('project.destroy',project.id)}
                                                className='font-medium text-red-600 dark:text-red-500 hover:underline mx-1'
                                            >
                                                Delete
                                            </Link>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <Pagination links={projects.meta.links} />
                    </div>
                </div>
            </div>
        </div>

    </AuthenticatedLayout>
  )
}

export default Index