import useSWR from 'swr'
import { useEffect, useState } from 'react'
import { EyeIcon, CodeIcon } from '@heroicons/react/outline'
import { CodeBlock, nord } from "react-code-blocks";
import { Tab } from '@headlessui/react'

export default function Company() {
  const { data, error } = useSWR('/api/finch/company', { revalidateOnFocus: false })
  const [company, setCompany] = useState<FinchCompany>();
  const [toggle, setToggle] = useState(true)

  useEffect(() => {
    console.log(data)
    console.log(error)
    setCompany(data)
  }, [data, error])

  if (error) return <pre className="mx-auto max-w-5xl p-10">{JSON.stringify(error.message, null, 2)}</pre>
  if (!data || !company) return ""

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base font-semibold uppercase tracking-wide text-indigo-600">
            Finch
          </h2>
          <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            Company Information
          </p>
          <p className="mt-4 mb-16 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Learn more about the <a className='text-indigo-600' href="https://developer.tryfinch.com/docs/reference/33162be1eed72-company" target="_blank">/company</a> API Endpoint.
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
                    <div className="overflow-hidden border border-t-none border-gray-200 sm:rounded-lg sm:rounded-t-none">
                      <div className="px-4 py-5 sm:px-6">
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">ID</dt>
                            <dd className="mt-1 text-sm text-gray-900">{company?.id}</dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">Legal Name</dt>
                            <dd className="mt-1 text-sm text-gray-900">{company?.legal_name}</dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">EIN</dt>
                            <dd className="mt-1 text-sm text-gray-900">{company?.ein}</dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">Entity Type + Subtype</dt>
                            <dd className="mt-1 text-sm text-gray-900">{company?.entity?.type}, {company?.entity?.subtype ?? "null"}</dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">Primary Email</dt>
                            <dd className="mt-1 text-sm text-gray-900">{company?.primary_email}</dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">Primary Phone Number</dt>
                            <dd className="mt-1 text-sm text-gray-900">{company?.primary_phone_number}</dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">Departments</dt>
                            <>
                              {company.departments.map(dept => (
                                <dd className="mt-1 text-sm text-gray-900">{dept.name}</dd>
                              ))}
                            </>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">Locations</dt>
                            <>
                              {company.locations.map(location => (
                                <>
                                  <dd className="mt-1 text-sm text-gray-900">{location.line1}</dd>
                                  <dd className="mt-1 text-sm text-gray-900">{location.line2}</dd>
                                  <dd className="mt-1 text-sm text-gray-900">{location.city}, {location.state} {location.postal_code}</dd>
                                  <dd className="mt-1 text-sm text-gray-900 mb-6">{location.country}</dd>
                                </>
                              ))}
                            </>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">Accounts</dt>
                            <>
                              {company.accounts.map(account => (
                                <>
                                  <dd className="mt-1 text-sm text-gray-900">Institution Name: {account?.institution_name ?? 'null'}</dd>
                                  <dd className="mt-1 text-sm text-gray-900">Account Name: {account?.account_name ?? 'null'}</dd>
                                  <dd className="mt-1 text-sm text-gray-900">Account Type: {account?.account_type ?? 'null'}</dd>
                                  <dd className="mt-1 text-sm text-gray-900">Routing Number: {account?.routing_number ?? 'null'}</dd>
                                  <dd className="mt-1 text-sm text-gray-900 mb-6">Account Number: {account?.account_number ?? 'null'}</dd>
                                </>
                              ))}
                            </>
                          </div>
                        </dl>
                      </div>
                    </div>
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
                    <div className="overflow-hidden border border-t-none border-gray-200 sm:rounded-lg sm:rounded-t-none">

                        <CodeBlock
                          text={JSON.stringify(company, null, "\t")}
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
