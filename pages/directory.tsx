import useSWR from 'swr'
import { useEffect, useState } from 'react'
import { classNames } from '../util/classnames'
import { EyeIcon, CodeIcon } from '@heroicons/react/outline'
import { CodeBlock, nord } from "react-code-blocks";
import { Tab } from '@headlessui/react'

export default function Directory() {
  const { data, error } = useSWR('/api/finch/directory', { revalidateOnFocus: false })
  const [employees, setEmployees] = useState<FinchEmployee[]>();
  const [toggle, setToggle] = useState(true)
  
  useEffect(() => {
    console.log(data)
    console.log(error)
    setEmployees(data?.individuals)
  }, [data, error])

  if (error) return <pre className="mx-auto max-w-5xl p-10">{JSON.stringify(error.message, null, 2)}</pre>
  if (!data || !employees) return ""

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base font-semibold uppercase tracking-wide text-indigo-600">
            Finch
          </h2>
          <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            Company Directory
          </p>
          <p className="mt-4 mb-16 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Learn more about the <a className='text-indigo-600' href="https://developer.tryfinch.com/docs/reference/12419c085fc0e-directory" target="_blank">/directory</a> API Endpoint.
          </p>
        </div>

        <div className="flex justify-end px-4 sm:px-6 lg:px-8">
          <div className="flex">
            <Tab.Group>
              <Tab.List className="inline-flex rounded-l rounded-r p-1 text-xs">
                <Tab className={`border-l border-t border-b border-indigo-600 py-2 px-4 rounded-l ${!toggle ? 'text-indigo-600 hover:bg-indigo-600 hover:text-white' : 'bg-indigo-600 text-white'}`} onClick={() => setToggle(true)}><EyeIcon className={`inline-flex h-4 w-4 ml-1 mr-2  ${toggle ? 'hover:text-white' : ''}`} /> Preview</Tab>
                <Tab className={`border border-indigo-600 py-2 px-4 rounded-r ${toggle ? 'text-indigo-600 hover:bg-indigo-600 hover:text-white' : 'bg-indigo-600 text-white'}`} onClick={() => setToggle(false)}><CodeIcon className={`inline-flex h-4 w-4 ml-1 mr-2 ${toggle ? 'hover:text-white' : ''}`} /> Code</Tab>
              </Tab.List>
            </Tab.Group>
          </div>
        </div>

        {toggle && (
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">Individual Id</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">First Name</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Last Name</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Department</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Manager Id</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Is Active?</th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">View</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {employees.map((employee, index) => (
                        <tr className="border-t border-gray-300" key={index}>
                          <td className="whitespace-nowrap py-4 pl-4 text-sm font-semibold text-gray-900 sm:pl-6">{employee.id}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{employee?.first_name}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{employee?.last_name}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{employee?.department?.name ? employee?.department?.name : 'none'}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{employee?.manager?.id ? (<a className="text-indigo-600 hover:text-indigo-900" href={`/employee/${employee?.manager?.id}`}>
                            {employee?.manager?.id}
                          </a>) : 'none'}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                            <span className={classNames(
                              employee.is_active ? 'text-green-800 bg-green-100' : 'text-red-800 bg-red-100', 'inline-flex rounded-full px-2 text-xs font-semibold leading-5 '
                            )}>{(employee.is_active) ? 'Active' : 'Inactive'}</span>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <a href={`/employee/${employee.id}`} className="text-indigo-600 hover:text-indigo-900">View<span className="sr-only">{employee.id}</span></a>
                          </td>
                        </tr>
                      ))}


                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
        {!toggle && (
          <div className="px-4 sm:px-6 lg:px-8">
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <CodeBlock
                  text={JSON.stringify(employees, null, "\t")}
                  language='json'
                  showLineNumbers={true}
                  theme={nord}
                />
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  )
}
