import useSWR from 'swr'
import { useEffect, useState } from 'react'
import { EyeIcon, CodeIcon } from '@heroicons/react/outline'
import { CodeBlock, nord } from "react-code-blocks";
import { useRouter } from 'next/router'
import { Tab } from '@headlessui/react'
import { formatCurrency, formatPhoneNumber } from '../../util/format'
import { classNames } from '../../util/classnames'

export default function Employee() {
  const { employee_id } = useRouter().query;
  const { data: individual, error: indError } = useSWR(employee_id ? `/api/finch/individual/${employee_id}` : null, { revalidateOnFocus: false })
  const { data: employment, error: empError } = useSWR(employee_id ? `/api/finch/employment/${employee_id}` : null, { revalidateOnFocus: false })
  const [employee, setEmployee] = useState<FinchIndividual>();
  const [employeeEmployment, setEmployeeEmployment] = useState<FinchIndividualEmployment>();
  const [toggle, setToggle] = useState(true)

  useEffect(() => {
    console.log(individual);
    setEmployee(individual);
  }, [individual])

  useEffect(() => {
    console.log(employment);
    setEmployeeEmployment(employment);
  }, [employment])

  if (indError) return <pre className="mx-auto max-w-5xl p-10">{JSON.stringify(indError.message, null, 2)}</pre>
  if (empError) return <pre className="mx-auto max-w-5xl p-10">{JSON.stringify(empError.message, null, 2)}</pre>
  if (!individual || !employment || !employee) return ""

  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base font-semibold uppercase tracking-wide text-indigo-600">
            Finch
          </h2>
          <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            Individual + Employment
          </p>
          <p className="mt-4 mb-16 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Learn more about the <a className='text-indigo-600' href="https://developer.tryfinch.com/docs/reference/9d6c83b09e205-individual" target="_blank">/individual</a> and the <a className='text-indigo-600' href="https://developer.tryfinch.com/docs/reference/1ba5cdec4c979-employment" target="_blank">/employment</a> API Endpoints.
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
        <div className="relative border-b border-gray-200 pb-5 sm:pb-0">
          <div className="md:flex md:items-center">
            <div>
              <div className='flex'>
                <h3 className="text-lg font-medium leading-6 text-gray-900">{employee.first_name + ' ' + employee.last_name}</h3>
                <span className={classNames(
                  employeeEmployment?.is_active ? 'text-green-800 bg-green-100' : 'text-red-800 bg-red-100', 'ml-2 inline-flex rounded-full px-2 text-xs font-semibold leading-5 items-center'
                )}>{(employeeEmployment?.is_active) ? 'Active' : 'Inactive'}</span>
              </div>

              <p className="mt-1 max-w-2xl text-sm text-gray-500">{employee.id}</p>
            </div>
          </div>


          <Tab.Group>
            <Tab.List className="mt-4 -mb-px flex space-x-8">
              <Tab className={({ selected }) => classNames(
                selected
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm'
              )}>Individual</Tab>
              <Tab className={({ selected }) => classNames(
                selected
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm'
              )}>Employment</Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <div className="overflow-hidden bg-white border border-t-none border-gray-200 sm:rounded-lg sm:rounded-t-none">
                  <div className="px-4 py-5 sm:px-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Date of birth</dt>
                        <dd className="mt-1 text-sm text-gray-900">{employee?.dob}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Gender</dt>
                        <dd className="mt-1 text-sm text-gray-900">{employee?.gender}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <>
                          <dt className="text-sm font-medium text-gray-500">Email addresses</dt>
                          {employee.emails.map((email) => (
                            <dd className="mt-1 text-sm text-gray-900">{email?.data} <span className="mt-1 text-sm text-gray-500"> - {email?.type}</span> </dd>
                          ))}
                        </>
                      </div>
                      <div className="sm:col-span-1">
                        <>
                          <dt className="text-sm font-medium text-gray-500">Phone Numbers</dt>
                          {employee.phone_numbers?.map((number) => (
                            <dd className="mt-1 text-sm text-gray-900">{formatPhoneNumber(number.data)} <span className="mt-1 text-sm text-gray-500"> - {number.type}</span></dd>
                          ))}
                        </>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">Residence</dt>
                        <dd className="mt-1 text-sm text-gray-900">{employee?.residence?.line1}</dd>
                        <dd className="mt-1 text-sm text-gray-900">{employee?.residence?.line2}</dd>
                        <dd className="mt-1 text-sm text-gray-900">{employee?.residence?.city}, {employee?.residence?.state} {employee?.residence?.postal_code}</dd>
                        <dd className="mt-1 text-sm text-gray-900">{employee?.residence?.country}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div className="overflow-hidden bg-white border border-t-none border-gray-200 sm:rounded-lg sm:rounded-t-none">
                  <div className="px-4 py-5 sm:px-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Title</dt>
                        <dd className="mt-1 text-sm text-gray-900">{employeeEmployment?.title}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Department</dt>
                        <dd className="mt-1 text-sm text-gray-900">{employeeEmployment?.department?.name}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Employment type</dt>
                        <dd className="mt-1 text-sm text-gray-900">{employeeEmployment?.employment?.type} - {employeeEmployment?.employment?.subtype} </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Is active</dt>
                        <dd className="mt-1 text-sm text-gray-900">{JSON.stringify(employeeEmployment?.is_active)}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Start date</dt>
                        <dd className="mt-1 text-sm text-gray-900">{employeeEmployment?.start_date}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">End date</dt>
                        <dd className="mt-1 text-sm text-gray-900">{employeeEmployment?.end_date ? employeeEmployment?.end_date : 'none'}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Manager</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {employeeEmployment?.manager?.id ? (<a className="text-indigo-600" href={`/employee/${employeeEmployment?.manager?.id}`}>
                            {employeeEmployment?.manager?.id}
                          </a>) : 'none'}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Class code</dt>
                        <dd className="mt-1 text-sm text-gray-900">{employeeEmployment?.class_code ? employeeEmployment?.class_code : 'none'}</dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">Location</dt>
                        <dd className="mt-1 text-sm text-gray-900">{employeeEmployment?.location.line1}</dd>
                        <dd className="mt-1 text-sm text-gray-900">{employeeEmployment?.location.line2}</dd>
                        <dd className="mt-1 text-sm text-gray-900">{employeeEmployment?.location.city}, {employee?.residence?.state} {employee?.residence?.postal_code}</dd>
                        <dd className="mt-1 text-sm text-gray-900">{employeeEmployment?.location.country}</dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">Current Income</dt>
                        <dd className="mt-1 text-sm text-gray-900">{formatCurrency(employeeEmployment?.income?.amount) + ' ' + employeeEmployment?.income?.currency?.toUpperCase() + ' ' + employeeEmployment?.income?.unit?.toUpperCase()}</dd>
                        <dd className="mt-1 text-sm text-gray-900">{'Effective: ' + employeeEmployment?.income?.effective_date}</dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">Income history</dt>
                        {employeeEmployment?.income_history.map((income) => (
                          <>
                            <dd className="mt-1 text-sm text-gray-900">{formatCurrency(income?.amount) + ' ' + income?.currency.toUpperCase() + ' ' + income?.unit?.toUpperCase()}</dd>
                            <dd className="mt-1 text-sm text-gray-900">{'Effective: ' + income?.effective_date}</dd>
                          </>

                        ))}
                      </div>
                    </dl>
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
        )}
        {!toggle && (
          <div className="px-4 sm:px-6 lg:px-8">
            <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
              Individual
            </p>
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <div className="overflow-hidden bg-white border border-t-none border-gray-200 sm:rounded-lg sm:rounded-t-none">

                      <CodeBlock
                        text={JSON.stringify(individual, null, "\t")}
                        language='json'
                        showLineNumbers={true}
                        theme={nord}
                      />

                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
              Employment
            </p>
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <div className="overflow-hidden bg-white border border-t-none border-gray-200 sm:rounded-lg sm:rounded-t-none">

                      <CodeBlock
                        text={JSON.stringify(employment, null, "\t")}
                        language='json'
                        showLineNumbers={true}
                        theme={nord}
                      />

                  </div>
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
