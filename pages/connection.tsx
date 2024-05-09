import useSWR from 'swr'
import { useEffect, useState } from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/outline'


export default function Connection() {
  const { data, error, isValidating } = useSWR('/api/finch/introspect', { shouldRetryOnError: false, errorRetryInterval: 0, })
  const [token, setToken] = useState<FinchToken>();

  useEffect(() => {
    console.log(data);
    setToken(data);
  }, data)

  if (isValidating) return "";
  //if (error) return <div>{error.message}</div>

  async function disconnect() {
    await fetch('/api/finch/disconnect')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        window.location.reload();
      })

  }

  if (token) {
    return (
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-2">
          <div className="lg:text-center">
            <h2 className="text-base font-semibold uppercase tracking-wide text-indigo-600">
              Finch
            </h2>
            <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
              Your Connection
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
                      <tbody>
                        <tr className="border-t border-gray-300" key={1}>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{token.payroll_provider_id}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{token.company_id}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{token.username}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{JSON.stringify(token.products, null, 2)}</td>
                          {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{JSON.stringify(item.info.manual)}</td> */}
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <button onClick={() => disconnect()} className="text-indigo-600 hover:text-indigo-900">Disconnect<span className="sr-only">{token.client_id}</span></button>
                          </td>
                        </tr>

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
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base font-semibold uppercase tracking-wide text-indigo-600">
              Finch
            </h2>
            <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
              Your Connection
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Each connection is represented by an access token. Each token contains the provider name, the username used for login, an array of authorized Finch products (i.e. permissions), and if the connection is automated or manual.
            </p>
          </div>

          <div className="overflow-hidden shadow sm:rounded-lg mt-10">
            <div className="border-t border-gray-200">
              <dl>
                <div className='px-4 py-5 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6'>
                  <dt className="text-md font-medium text-gray-500">
                    <div className='flex items-start space-x-4 items-center'>
                      <ExclamationCircleIcon className="h-8 w-8 text-rose-700 mr-2" />
                      No connection exists. Please create a new connection before viewing connection details.
                    </div>
                  </dt>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
