import Pagination from '@/Components/Pagination'
import SelectInput from '@/Components/SelectInput'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from '@/utils/constants'
import { Head, Link, router } from '@inertiajs/react'
import React from 'react'
import { debounce } from 'lodash'
import SortableColumn from '@/Components/SortableColumn'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import InputLabel from '@/Components/InputLabel'

const Index = ({ projects, queryParams = {} }) => {

    const handleChange = debounce((name, value) => {
        queryParams[name] = value;
        if (value === '') delete queryParams[name];
        router.get(route('project.index'), queryParams, { preserveState: true });
    }, 300);

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
                        <div className="py-6 text-gray-900 dark:text-gray-100 overflow-auto">
                            <div className='p-6 pt-0 text-xs uppercase text-gray-700  dark:text-gray-400 '>
                                <div className='flex gap-2'>
                                    <div>
                                        <InputLabel value="Creado desde" className='text-xs mb-1'/>
                                        <TextInput
                                            className='text-sm'
                                            type='date'
                                            defaultValue={queryParams.created_from}
                                            onChange={e => handleChange('created_from', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <InputLabel value="Creado hasta" className='text-xs mb-1'/>
                                        <TextInput
                                            className='text-sm'
                                            type='date'
                                            defaultValue={queryParams.created_until}
                                            onChange={e => handleChange('created_until', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 -mx-6 dark:text-gray-400 border-b dark:border-gray-700'>
                                    <tr className='text-nowrap'>
                                        <th className='px-3 py-4'>
                                            <SortableColumn label="ID" column='id' queryParams={queryParams} url="project.index" />
                                        </th>
                                        <th className='px-3 py-4'>IMAGE</th>
                                        <th className='px-3 py-4'>
                                            <div className='flex gap-2'>
                                                <TextInput
                                                    placeholder="Project Name"
                                                    className='w-full text-sm'
                                                    defaultValue={queryParams.name}
                                                    onChange={(e) => handleChange('name', e.target.value)}
                                                />
                                                <SortableColumn label="" column='name' queryParams={queryParams} url="project.index" />
                                            </div>
                                        </th>
                                        <th className='px-3 py-4'>
                                            <div className='flex gap-2'>
                                                <SelectInput
                                                    className='w-full text-sm'
                                                    defaultValue={queryParams.status}
                                                    onChange={(e) => handleChange('status', e.target.value)}
                                                >
                                                    <option value=''>Status - All</option>
                                                    {
                                                        Object.keys(PROJECT_STATUS_TEXT_MAP).map(key => (
                                                            <option key={key} value={key}>{PROJECT_STATUS_TEXT_MAP[key]}</option>
                                                        ))
                                                    }
                                                </SelectInput>
                                                <SortableColumn label="" column='status' queryParams={queryParams} url="project.index" />
                                            </div>
                                        </th>
                                        <th className='px-3 py-4'>
                                            <SortableColumn label="CREATE DATE" column='created_at' queryParams={queryParams} url="project.index" />
                                        </th>
                                        <th className='px-3 py-4'>
                                            <SortableColumn label="DUE DATE" column='due_date' queryParams={queryParams} url="project.index" />
                                        </th>
                                        <th className='px-3 py-4'>CREATED BY</th>
                                        <th className='px-3 py-4 text-right'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.data.map(project =>
                                        <tr key={project.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                            <td className='px-3 py-2'>{project.id}</td>
                                            <td className='px-3 py-2'>
                                                <img src={project.image_path} className='w-[60px]' />
                                            </td>
                                            <td className='px-3 py-2'>
                                                <Link href={route('project.show',project.id)}
                                                    className='hover:text-blue-600 text-blue-400'
                                                >
                                                    {project.name}
                                                </Link>
                                            </td>
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
                                            <td className='px-3 py-2'>
                                                <div className='flex gap-1'>
                                                    <Link href={route('project.edit', project.id)}
                                                        className='font-medium text-blue-600 dark:text-blue-500'
                                                    >
                                                        <PencilSquareIcon width={20} className='hover:text-blue-800 dark:hover:text-blue-300' />
                                                    </Link>
                                                    <Link href={route('project.destroy', project.id)}
                                                        className='font-medium text-red-600 dark:text-red-500'
                                                    >
                                                        <TrashIcon width={20} className='hover:text-red-800 dark:hover:text-red-300' />
                                                    </Link>

                                                </div>
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