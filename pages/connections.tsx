import useSWR from 'swr'
import { useEffect, useState } from 'react'
import {
  ExclamationCircleIcon
} from '@heroicons/react/outline'
import FinchConnect from '../components/finch-connect'

// TODO: put this into a @types file
type FinchProvider = {
  token: string,
  data: FinchToken
}
type FinchToken = {
  client_id: string,
  company_id: string,
  products: string[],
  username: string,
  payroll_provider_id: string,
  manual: boolean
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Connections() {
  const { data, error, isValidating } = useSWR('/api/finch/introspect', fetcher, { revalidateOnFocus: false })
  const [providers, setProviders] = useState<FinchProvider[]>();

  useEffect(() => {
    console.log(data?.data);
    setProviders(data?.data);
  }, data)

  //if (isLoading) return <div>Loading...</div>;
  if (!providers || isValidating) return "";
  if (error) return <div>{error.message}</div>

  const providersList = Array.from(providers);

  function disconnect(payroll_provider_id: string, company_id: string) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payroll_provider_id, company_id })
    };

    fetch('/api/finch/disconnect', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        window.location.reload();
      })

  }

  if (providersList.length !== 0) {
    return (
      <div className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base font-semibold uppercase tracking-wide text-indigo-600">
              Finch
            </h2>
            <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
              My Connections
            </p>
            <p className="mt-4 mb-16 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Each connection is represented by an access token. Each token contains the provider name, the username used for login, an array of authorized Finch products (i.e. permissions), and if the connection is automated or manual.
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
                          <th scope="col" className="py-3.5 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">Access Token</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Provider_ID</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Company_ID</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Username</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Products</th>
                          {/* <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Manual</th> */}
                          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Disconnect</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {providersList.map((item, index) => (
                          <tr className="border-t border-gray-300" key={index}>
                            <td className="whitespace-nowrap py-4 pl-4 text-sm font-normal text-gray-500 sm:pl-6">{item.token}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{item.data.payroll_provider_id}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{item.data.company_id}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{item.data.username}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{JSON.stringify(item.data.products, null, 2)}</td>
                            {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{JSON.stringify(item.info.manual)}</td> */}
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <button onClick={() => disconnect(item.data.payroll_provider_id, item.data.company_id)} className="text-indigo-600 hover:text-indigo-900">Disconnect<span className="sr-only">{item.token}</span></button>
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
  } else {
    return (
      <div className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base font-semibold uppercase tracking-wide text-indigo-600">
              Finch
            </h2>
            <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
              My Connections
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Each connection is represented by an access token. Each token contains the provider name, the username used for login, an array of authorized Finch products (i.e. permissions), and if the connection is automated or manual.
            </p>
          </div>

          <div className="overflow-hidden bg-white shadow sm:rounded-lg mt-10">
            <div className="px-4 py-5 sm:px-6 relative">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Read account information associated with an access tokens
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Contains client_id, Finch uuid, array of authorized Finch products, account username used for login, and payroll provider associated with a specific access token.
              </p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className="text-sm font-medium text-gray-500">
                    <div className='flex items-start space-x-4'>
                      <ExclamationCircleIcon className="h-12 w-12 text-rose-700 mr-2" />
                      No providers exist for this organization. Please connect a provider before inspecting tokens.
                    </div>
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <FinchConnect />
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
