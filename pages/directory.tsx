import useSWR from 'swr'
import { useEffect, useState } from 'react'
import {
  ExclamationCircleIcon
} from '@heroicons/react/outline'
import FinchConnect from '../components/finch-connect'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Directory() {
  const { data, error, isValidating } = useSWR('/api/finch/directory', { revalidateOnFocus: false })
  const [employees, setEmployees] = useState<FinchEmployee[]>();

  useEffect(() => {
    //console.log(data?.data?.individuals)
    setEmployees(data?.data?.individuals)
  }, [data])

  if (error) return <div>{error.message}</div>
  if (!data?.data || !employees) return ""

  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base font-semibold uppercase tracking-wide text-indigo-600">
            Finch
          </h2>
          <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            Company Directory
          </p>
          <p className="mt-4 mb-16 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Retrieve an entire company's employee directory + organizational structure directly from their payroll provider's system.
          </p>
        </div>

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
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{employee?.department.name}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{employee?.manager?.id}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                            <span className={classNames(
                              employee.is_active ? 'text-green-800 bg-green-100' : 'text-red-800 bg-red-100', 'inline-flex rounded-full px-2 text-xs font-semibold leading-5 '
                            )}>{(employee.is_active) ? 'Active' : 'Inactive'}</span>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <a href={`/api/finch/individual/${employee.id}`} className="text-indigo-600 hover:text-indigo-900">View<span className="sr-only">{employee.id}</span></a>
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
      </div>
    </div>
  )
}
