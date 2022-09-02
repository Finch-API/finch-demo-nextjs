import useSWR from 'swr'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Tab } from '@headlessui/react'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function formatPhoneNumber(phoneNumberString: string) {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    var intlCode = (match[1] ? '+1 ' : '');
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  }
  return null;
}

function formatCurrency(amount: number = 0, currency_code: string = 'USD') {
  // Convert from cents
  amount *= 100;
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency_code,
  })
  return formatter.format(amount);
}

export default function Employee() {
  const { employee_id } = useRouter().query;
  const { data: individual, error: indError } = useSWR(employee_id ? `/api/finch/individual/${employee_id}` : null, { revalidateOnFocus: false })
  const { data: employment, error: empError } = useSWR(employee_id ? `/api/finch/employment/${employee_id}` : null, { revalidateOnFocus: false })
  const [employee, setEmployee] = useState<FinchIndividual>();
  const [employeeEmployment, setEmployeeEmployment] = useState<FinchIndividualEmployment>();

  useEffect(() => {
    console.log(individual?.data);
    setEmployee(individual?.data);
  }, [individual])

  useEffect(() => {
    console.log(employment?.data);
    setEmployeeEmployment(employment?.data);
  }, [employment])

  if (indError) return <div>{indError.message}</div>
  if (!individual?.data || !employee) return "";

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
            Read individual data including income and employment data.
            <br></br>
            Learn more about the <a className='text-indigo-600' href="https://developer.tryfinch.com/docs/reference/9d6c83b09e205-individual" target="_blank">/individual</a> and the <a className='text-indigo-600' href="https://developer.tryfinch.com/docs/reference/1ba5cdec4c979-employment" target="_blank">/employment</a> API Endpoints.
          </p>
        </div>

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
                        <dd className="mt-1 text-sm text-gray-900">{employee.dob}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Gender</dt>
                        <dd className="mt-1 text-sm text-gray-900">{employee.gender}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <>
                          <dt className="text-sm font-medium text-gray-500">Email addresses</dt>
                          {employee.emails.map((email) => (
                            <dd className="mt-1 text-sm text-gray-900">{email.data} <span className="mt-1 text-sm text-gray-500"> - {email.type}</span> </dd>
                          ))}
                        </>
                      </div>
                      <div className="sm:col-span-1">
                        <>
                          <dt className="text-sm font-medium text-gray-500">Phone Numbers</dt>
                          {employee.phone_numbers.map((number) => (
                            <dd className="mt-1 text-sm text-gray-900">{formatPhoneNumber(number.data)} <span className="mt-1 text-sm text-gray-500"> - {number.type}</span></dd>
                          ))}
                        </>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">Residence</dt>
                        <dd className="mt-1 text-sm text-gray-900">{employee.residence.line1}</dd>
                        <dd className="mt-1 text-sm text-gray-900">{employee.residence.line2}</dd>
                        <dd className="mt-1 text-sm text-gray-900">{employee.residence.city}, {employee.residence.state} {employee.residence.postal_code}</dd>
                        <dd className="mt-1 text-sm text-gray-900">{employee.residence.country}</dd>
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
                        <dd className="mt-1 text-sm text-gray-900">{employeeEmployment?.department.name}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Employment type</dt>
                        <dd className="mt-1 text-sm text-gray-900">{employeeEmployment?.employment.type} - {employeeEmployment?.employment.subtype} </dd>
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
                        <dd className="mt-1 text-sm text-gray-900">{employeeEmployment?.location.city}, {employee.residence.state} {employee.residence.postal_code}</dd>
                        <dd className="mt-1 text-sm text-gray-900">{employeeEmployment?.location.country}</dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">Current Income</dt>
                        <dd className="mt-1 text-sm text-gray-900">{formatCurrency(employeeEmployment?.income?.amount, employeeEmployment?.income?.currency) + ' ' + employeeEmployment?.income.currency.toUpperCase() + ' ' + employeeEmployment?.income.unit.toUpperCase()}</dd>
                        <dd className="mt-1 text-sm text-gray-900">{'Effective: ' + employeeEmployment?.income.effective_date}</dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">Income history</dt>
                        {employeeEmployment?.income_history.map((income) => (
                          <>
                            <dd className="mt-1 text-sm text-gray-900">{formatCurrency(income?.amount, income?.currency) + ' ' + income?.currency.toUpperCase() + ' ' + income?.unit.toUpperCase()}</dd>
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
      </div>
    </div>
  )
}
